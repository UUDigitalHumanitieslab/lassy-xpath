import { XPathModels, XPathParser } from 'ts-xpath';
import { PathVariable } from './extractinator';

const IndentSize = 4;

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

        return '<node cat="top">' + this.constructRecursively(index['$node']).join('\n') + '</node>';
    }

    private constructRecursively(node: Node, level = 0) {
        const xpath = node.variable.path.substr(node.variable.path.indexOf('/'));
        const parsed = this.parser.parse(xpath);
        let attributesString = '';
        if (parsed.type === 'path') {
            const path = parsed;
            const step = path.steps[0];
            const attributes = this.constructAttributes(step.predicates);
            if (attributes.length) {
                attributesString = ' ' + this.constructAttributes(step.predicates)
                    .map(attr => attr.name + `="${attr.value || '*'}"`).join(' ');
            }
        }

        const result = [this.indent(level, `<node varName="${node.variable.name}"${attributesString}>`)];
        for (const child of node.children) {
            result.push(...this.constructRecursively(child, level + 1));
        }

        result.push(this.indent(level, '</node>'));
        return result;
    }

    private constructAttributes(expression: XPathModels.XPathExpression[]) {
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
