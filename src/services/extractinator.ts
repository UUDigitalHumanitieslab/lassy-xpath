import { XPathModels, XPathParser } from 'ts-xpath';

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
        let parsed = this.parser.parse(xPath);
        // expect any query to at least start with //node
        if (parsed.type == 'path') {
            let children = parsed.getChildren();
            if (children.length != 2) {
                throw new FormatError('path_start');
            }

            let nameGenerator = new NameGenerator();
            let result = [{
                name: '$node',
                path: '*',
                location: getLocation(children[1].properties.location)
            }].concat(this.extractRecursively(
                "$node",
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
        let annotated = this.parser.annotate(xPath);
        let result: { token: XPathModels.XPathToken, variable: PathVariable | null }[] = [];

        for (let token of annotated) {
            let variable: PathVariable | null = null;
            if (token.type == 'node.name' && token.expression.properties.name == 'node') {
                // expect any query to at least start with //node            
                let location = getLocation(token.expression.properties.location);
                variable = variables.find(v => location.equals(v.location));
            }

            result.push({ token, variable });
        }

        return result;
    }

    private extractRecursively(parentName: string, children: XPathModels.XPathExpression[], nameGenerator: () => string): PathVariable[] {
        let result: PathVariable[] = [];

        for (let child of children) {
            switch (child.type) {
                case "path":
                    // this is a level below the parent e.g. $parent/*
                    let name = nameGenerator();

                    for (let step of child.steps) {
                        if (step.properties.axis == 'child') {
                            result.push({ name, path: `${parentName}/${child.toXPath()}`, location: getLocation(step.properties.location) });
                            result.push(...this.extractRecursively(name, step.predicates, nameGenerator));
                        } else {
                            throw new FormatError('axis_type', [step.properties.axis]);
                        }
                    }

                    break;

                case "operation":
                    // this is an operation at the current level, only interested in possible children
                    // e.g. $parent[* and *]
                    if (child.operationType == "and" || child.operationType == "or" || child.operationType == "union") {
                        result.push(...this.extractRecursively(parentName, child.getChildren(), nameGenerator));
                    }
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
        }[this.type]
    }
}

export interface PathVariable {
    name: string,
    path: string,
    location: Location
}

export class Location {
    constructor(public line: number, public firstColumn: number, public lastColumn: number) {
    }

    equals(location: Location) {
        return this.line == location.line && this.firstColumn == location.firstColumn && this.lastColumn == location.lastColumn;
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
