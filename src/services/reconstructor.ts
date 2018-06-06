import { XPathModels, XPathParser } from 'ts-xpath';
import { PathVariable } from './extractinator';
import XPathMode from '../components/xpath-editor/xpath-mode';

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
        if (!variables || variables.length == 0) {
            return '<node cat="top"></node>';
        }

        let index: { [name: string]: Node } = {};
        for (let variable of variables) {
            index[variable.name] = { children: [], variable: Object.assign({}, variable) };
        }

        // determine the children
        for (let variable of variables) {
            if (variable.path.length == 0 || variable.path[0] != '$') {
                // root node
                continue;
            }

            let parentName = variable.path.split('/', 1)[0];
            let parent = index[parentName];
            if (parent == undefined) {
                throw `Parent not found: ${parentName}`;
            }
            parent.children.push(index[variable.name]);
        }

        if (xpath != null) {
            index['$node'].variable.path = xpath.substring(1); // assuming it starts with //
        }

        return '<node cat="top">' + this.constructRecursively(index['$node']).join('\n') + '</node>';
    }

    private constructRecursively(node: Node, level = 0) {
        let xpath = node.variable.path.substr(node.variable.path.indexOf('/'));
        let parsed = this.parser.parse(xpath);
        let attributesString = '';
        if (parsed.type == 'path') {
            let path = parsed;
            let step = path.steps[0];
            let attributes = this.constructAttributes(step.predicates);
            if (attributes.length) {
                attributesString = ' ' + this.constructAttributes(step.predicates)
                    .map(attr => attr.name + (attr.value == null ? '' : `="${attr.value}"`)).join(' ');
            }
        }

        let result = [this.indent(level, `<node varName="${node.variable.name}"${attributesString}>`)];
        for (let child of node.children) {
            result.push(...this.constructRecursively(child, level + 1));
        }

        result.push(this.indent(level, '</node>'));
        return result;
    }

    private constructAttributes(expression: XPathModels.XPathExpression[]) {
        let attributes: { name: string, value: string | null }[] = [];
        for (let predicate of expression) {
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
                            if (predicate.properties.type == '<' ||
                                predicate.properties.type == '<=' ||
                                predicate.properties.type == '>' ||
                                predicate.properties.type == '>=' ||
                                predicate.properties.type == '!=' ||
                                predicate.properties.type == '==') {

                                // attribute test
                                let left = predicate.properties.left;
                                let right = predicate.properties.right;

                                let yieldSide = (side: XPathModels.XPathExpression, other: XPathModels.XPathExpression) =>
                                    (side.type == 'path' && side.steps.length && side.steps[0].properties.axis == 'attribute')
                                        ? [{
                                            name: side.steps[0].properties.name,
                                            value: other.type == 'string' || other.type == 'numeric' ? other.value.toString() : other.toXPath()
                                        }]
                                        : [];

                                attributes.push(...yieldSide(left, right));
                                attributes.push(...yieldSide(right, left));
                            }
                            break;
                    }
                    break;
                case 'path':
                    if (predicate.steps[0].properties.axis == 'attribute') {
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

type Node = { children: Node[], variable: PathVariable };