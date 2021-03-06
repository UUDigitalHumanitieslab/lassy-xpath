import { XPathModels, XPathParser } from 'ts-xpath';
import { XPathAttributes, XPathAttribute } from '../common/index';

export class Extractinator {
    private parser: XPathParser;

    constructor() {
        this.parser = new XPathParser();
    }

    /**
     * Extracts a variable for each node matched by the query.
     * @param xPath Query to analyse.
     * @throws {XPathModels.ParseError} The provided query is malformed.
     * @throws {FormatError} The provided query is in an unexpected format.
     */
    extract(xPath: string): PathVariable[] {
        if (!xPath || !xPath.trim()) { return []; }
        const parsed = this.parser.parse(xPath);
        // expect any query to at least start with //node
        if (parsed.type === 'path') {
            const children = parsed.getChildren();
            if (children.length !== 2) {
                throw new FormatError('path_start');
            }

            const nameGenerator = new NameGenerator();
            const result = [{
                name: '$node',
                path: '*',
                location: getLocation(children[1].properties.location)
            }].concat(this.extractRecursively(
                '$node',
                children[1].getChildren(),
                () => nameGenerator.get()));
            return result;
        }

        return [];
    }

    /**
     * Annotates the xpath and marks parts referencing any of the passed variables.
     * @param xPath
     * @param variables
     */
    annotate(xPath: string, variables: PathVariable[]) {
        const annotated = this.parser.annotate(xPath);
        const result: { token: XPathModels.XPathToken, variable: PathVariable | null, description: string | null }[] = [];

        let currentAttribute: XPathAttribute | null = null;
        for (const token of annotated) {
            let variable: PathVariable | null = null;
            let description: string | null = null;
            if (token.type === 'node.name') {
                if (token.expression.properties.name === 'node') {
                    // expect any query to at least start with //node
                    const location = getLocation(token.expression.properties.location);
                    variable = variables.find(v => location.equals(v.location));
                } else {
                    currentAttribute = XPathAttributes[token.text];
                    if (currentAttribute) {
                        description = currentAttribute.description;
                    }
                }
            } else if (currentAttribute && token.type === 'string.value') {
                const value = currentAttribute.values.find(val => val[0] === token.text);
                if (value) {
                    description = value[1];
                }
            }

            result.push({ token, variable, description });
        }

        return result;
    }

    private extractRecursively(parentName: string, children: XPathModels.XPathExpression[], nameGenerator: () => string): PathVariable[] {
        const result: PathVariable[] = [];

        for (const child of children) {
            switch (child.type) {
                case 'path':
                    // this is a level below the parent e.g. $parent/*)
                    let abort = false;
                    for (const step of child.steps) {
                        if (abort) {
                            break;
                        }
                        if (/^(meta|metadata|ancestor::alpino_ds)$/.test(step.mainXPath(false))) {
                            // ignore metadata
                            continue;
                        }
                        switch (step.properties.axis) {
                            case 'child':
                                {
                                    const name = nameGenerator();
                                    result.push({
                                        name,
                                        path: `${parentName}/${child.toXPath()}`,
                                        location: getLocation(step.properties.location)
                                    });
                                    result.push(...this.extractRecursively(name, step.predicates, nameGenerator));
                                }
                                break;

                            case 'self':
                                {
                                    const index = child.steps.indexOf(step);
                                    const remaining = child.steps.slice(index + 1);
                                    if (remaining.length >= 2) {
                                        if (remaining[0].properties.axis === 'descendant-or-self') {
                                            abort = true;
                                            // use the context node
                                            const name = nameGenerator();
                                            result.push({
                                                name,
                                                path: `${parentName}//${remaining[1].toXPath()}`,
                                                // location of the node selector
                                                location: getLocation(remaining[1].properties.location)
                                            });

                                            result.push(...this.extractRecursively(
                                                name,
                                                remaining.slice(1).map(s => s.predicates).reduce((prev, curr) => prev.concat(curr), []),
                                                nameGenerator));
                                        }
                                    }
                                }
                                break;

                            case 'parent':
                                // A parent could either be represented by a step with predicates for the node
                                // (axis specifier) e.g. parent::node, or a subsequent (child) step in the current
                                // PathPathExpr.
                                if (step.predicates.length) {
                                    const name = nameGenerator();
                                    result.push({
                                        name,
                                        path: `${parentName}/../../node${
                                            step.predicates.map(p => `[${p.toXPath()}]`).join()}`,
                                        location: getLocation(step.properties.location)
                                    });
                                    result.push(...this.extractRecursively(name, step.predicates, nameGenerator));
                                }

                                break;

                            case 'descendant':
                            case 'descendant-or-self':
                            case 'ancestor':
                            case 'ancestor-or-self':
                            case 'following':
                            case 'following-sibling':
                            case 'preceding':
                            case 'preceding-sibling':
                                {
                                    const name = nameGenerator();
                                    result.push({
                                        name,
                                        path: `${parentName}/${step.properties.axis}::node${
                                            step.predicates.map(p => `[${p.toXPath()}]`).join()}`,
                                        location: getLocation(step.properties.location)
                                    });
                                    result.push(...this.extractRecursively(name, step.predicates, nameGenerator));
                                }
                                break;

                            case 'attribute':
                                // We are only interested in nodes,
                                // an attribute shouldn't be returned as
                                // a separate path.
                                break;

                            default:
                                console.error(`Unknown axis type ${step.properties.axis}`);
                                throw new FormatError('axis_type', [step.properties.axis]);
                        }
                    }

                    break;

                case 'operation':
                    // this is an operation at the current level, only interested in possible children
                    // e.g. $parent[* and *]
                    if (child.operationType === 'and' || child.operationType === 'or' || child.operationType === 'union') {
                        result.push(...this.extractRecursively(parentName, child.getChildren(), nameGenerator));
                    }
                    break;
            }
        }

        return result;
    }
}

export class FormatError {
    constructor(public type: 'path_start' | 'operation_type' | 'axis_type', public details: string[] = []) {
    }

    public get message() {
        return {
            'path_start': 'Unexpected path format! Expected it should start with //node.',
            'operation_type': `Unexpected operation type ${this.details[0]}.`,
            'axis_type': `Unknown axis type (${this.details[0]}).`
        }[this.type];
    }
}

export interface PathVariable {
    name: string;
    path: string;
    location: Location;
}

export class Location {
    constructor(public line: number, public firstColumn: number, public lastColumn: number) {
    }

    equals(location: Location) {
        return this.line === location.line && this.firstColumn === location.firstColumn && this.lastColumn === location.lastColumn;
    }
}

function getLocation(location: XPathModels.ParseLocation): Location {
    return new Location(location.firstLine, location.firstColumn, location.lastColumn);
}

class NameGenerator {
    private index = 1;
    get() {
        return `$node${this.index++}`;
    }
}
