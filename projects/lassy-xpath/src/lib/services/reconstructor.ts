import { XPathModels, XPathParser } from 'ts-xpath';
import { PathVariable } from './extractinator';

const IndentSize = 4;

interface Attribute {
    name: string,
    value: string | null
}

export class Reconstructor {
    private parser: XPathParser;

    constructor() {
        this.parser = new XPathParser();
    }

    /**
     * Reconstructs a minimal tree matching the specified variables
     * @param variables The variables to analyse
     * @param variables The xpath to extract the root's properties from
     * @returns An XML node structure
     */
    construct(variables: PathVariable[], xpath: string = null): string {
        if (!variables || variables.length === 0) {
            return '<node cat="top"></node>';
        }

        const index: { [name: string]: Node } = {};
        for (const variable of variables) {
            index[variable.name] = { children: [], variable: Object.assign({}, variable) };
        }

        // determine the children
        for (const variable of variables) {
            if (variable.path.length === 0 || variable.path[0] !== '$') {
                // root node
                continue;
            }

            const parentName = variable.path.split('/', 1)[0];
            const parent = index[parentName];
            if (parent === undefined) {
                throw new Error(`Parent not found: ${parentName}`);
            }
            parent.children.push(index[variable.name]);
        }

        if (xpath != null) {
            index['$node'].variable.path = xpath.substring(1); // assuming it starts with //
        }

        return '<node cat="top">' + this.constructRecursively(index['$node'], 0).join('\n') + '</node>';
    }

    private constructRecursively(node: Node, level = 0, predicates?: XPathModels.XPathExpression[]): string[] {
        if (!predicates) {
            const xpath = node.variable.path.substr(node.variable.path.indexOf('/'));
            const parsed = this.parser.parse(xpath);
            if (parsed.type === 'path') {
                const path = parsed;
                const step = path.steps[0];

                if (step.properties.axis === 'descendant-or-self') {
                    return [this.indent(level, '<node>'),
                    ...this.constructRecursively(node, level + 1, path.steps[1].predicates),
                    this.indent(level, '</node>')];
                }

                predicates = step.predicates;
            }
        }

        let attributesString = '';
        if (predicates) {
            const attributes = this.constructAttributes(predicates);
            if (attributes.length) {
                attributesString = ' ' + this.attributesString(this.constructAttributes(predicates));
            }
        }

        const result = [this.indent(level, `<node varName="${node.variable.name}"${attributesString}>`)];
        for (const child of node.children) {
            result.push(...this.constructRecursively(child, level + 1));
        }

        result.push(this.indent(level, '</node>'));
        return result;
    }

    private attributesString(attributes: Attribute[]) {
        const merged: { [name: string]: string } = {};
        for (const attr of attributes) {
            const value = attr.value || '*';
            if (attr.name in merged) {
                merged[attr.name] += `|${value}`;
            } else {
                merged[attr.name] = value;
            }
        }
        return Object.entries(merged).map(([name, value]) => `${name}="${value}"`).join(' ');
    }

    private constructAttributes(expression: XPathModels.XPathExpression[]): Attribute[] {
        const attributes: { name: string, value: string | null }[] = [];
        for (const predicate of expression) {
            switch (predicate.type) {
                case 'operation':
                    switch (predicate.operationType) {
                        case 'and':
                        case 'or':
                        case 'union':
                            // combined attributes
                            attributes.push(...this.constructAttributes(predicate.getChildren()));
                            break;

                        default:
                            switch (predicate.properties.type) {
                                case '<':
                                case '<=':
                                case '>':
                                case '>=':
                                case '!=':
                                case '==':
                                    // attribute test
                                    const left = predicate.properties.left;
                                    const right = predicate.properties.right;

                                    const yieldSide = (side: XPathModels.XPathExpression, other: XPathModels.XPathExpression) =>
                                        (side.type === 'path' && side.steps.length && side.steps[0].properties.axis === 'attribute')
                                            ? [{
                                                name: side.steps[0].properties.name,
                                                value: other.type === 'string' ||
                                                    other.type === 'numeric' ? other.value.toString() : other.toXPath()
                                            }]
                                            : [];

                                    attributes.push(...yieldSide(left, right));
                                    attributes.push(...yieldSide(right, left));
                                    break;
                            }
                            break;
                    }
                    break;
                case 'path':
                    if (predicate.steps[0].properties.axis === 'attribute') {
                        // singular attribute
                        attributes.push({ name: predicate.steps[0].properties.name, value: null });
                    }
                    break;
            }
        }
        return attributes;
    }
    private indent(count: number, text: string) {
        return ' '.repeat(count * IndentSize) + text;
    }
}

interface Node { children: Node[]; variable: PathVariable; }
