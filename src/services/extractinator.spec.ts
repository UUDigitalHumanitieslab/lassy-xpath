import { Extractinator, Location, PathVariable } from './extractinator';
import { XPathModels } from 'ts-xpath';

describe("XPath Extractinator",
    () => {
        let extractinator: Extractinator;

        beforeEach(() => {
            extractinator = new Extractinator();
        })

        it("Ignores empty input", () => {
            expectExtract('', [], false, false);
        });

        it("Ignores malformed input", () => {
            let parseError: XPathModels.ParseError | null = null;
            let result: PathVariable[] | null = null;
            try {
                result = extractinator.extract('//node[');
            }
            catch (error) {
                if (error instanceof XPathModels.ParseError) {
                    parseError = error;
                }
            }

            expect(result).toBeFalsy('No results should be returned if the input is malformed!');
            expect(parseError).toBeTruthy('No ParseError was thrown!');
        });

        it("Extracts root", () => {
            // the root is implicit and called $node; it shouldn't be returned as extracted
            expectExtract('//node', [], false);
        });

        it("Ignores parent's attributes", () => {
            expectExtract('//node[@pt="vnw"]', []);
        });

        it("Extracts child", () => {
            expectExtract('//node[node]', [{ name: '$node1', path: '$node/node', location: location(7) }]);
        });

        it("Extracts child with attributes", () => {
            expectExtract('//node[node[@pt="vnw" and @rel="su"]]', [{
                name: '$node1',
                path: '$node/node[@pt = "vnw" and @rel = "su"]',
                location: location(7)
            }]);
        });

        it("Extracts attributes without value", () => {
            expectExtract('//node[node[@pt and @rel]]', [{
                name: '$node1',
                path: '$node/node[@pt and @rel]',
                location: location(7)
            }]);

            expectExtract('//node[node[@pt and @rel or node[@cat]]]', [{
                name: '$node1',
                path: '$node/node[@pt and @rel or node[@cat]]',
                location: location(7)
            }, {
                name: '$node2',
                path: '$node1/node[@cat]',
                location: location(28)
            }]);
        });

        it("Extracts double predicates", () => {
            expectExtract('//node[@rel="obj1"][node[@rel="su"]]', [{
                name: '$node1',
                path: '$node/node[@rel = "su"]',
                location: location(20)
            }]);
            expectExtract('//node[@rel="obj1"][node[@rel="su"][node[@cat and @pt]]]', [{
                name: '$node1',
                path: '$node/node[@rel = "su"][node[@cat and @pt]]',
                location: location(20)
            }, {
                name: '$node2',
                path: '$node1/node[@cat and @pt]',
                location: location(36)
            }]);
        });

        it("Extracts multiple children", () => {
            expectExtract(
                '//node[@cat="smain" and node and node[@cat="np"]]',
                [{ name: '$node1', path: '$node/node', location: location(24) },
                { name: '$node2', path: '$node/node[@cat = "np"]', location: location(33) }]);
        });

        it("Extracts sub-children", () => {
            expectExtract(
                '//node[node[node and node[@pt="lid"]]]',
                [{ name: '$node1', path: '$node/node[node and node[@pt = "lid"]]', location: location(7) },
                { name: '$node2', path: '$node1/node', location: location(12) },
                { name: '$node3', path: '$node1/node[@pt = "lid"]', location: location(21) }]);
        });

        it("Extracts union", () => {
            expectExtract(
                '//node[node[@pt = "lid"] | node[@pt="vnw" and number(@begin) > 5]]',
                [{ name: '$node1', path: '$node/node[@pt = "lid"]', location: location(7) },
                { name: '$node2', path: '$node/node[@pt = "vnw" and number(@begin) > 5]', location: location(27) }]);
        });

        it("Extracts parent paths", () => {
            expectExtract(
                '//node[@pt="n" and @rel="obj1" and ../node[@lemma="eten"]]',
                [{ name: '$node1', path: '$node/../node[@lemma = "eten"]', location: location(38) }]);
            expectExtract(
                '//node[@pt="n" and @rel="obj1" and ../node[@cat="np" and node[@pt = "lid"]]]',
                [{ name: '$node1', path: '$node/../node[@cat = "np" and node[@pt = "lid"]]', location: location(38) },
                { name: '$node2', path: '$node1/node[@pt = "lid"]', location: location(57) }]);
        });

        let location = (column: number, line: number = 1, length: number = 4) => {
            return new Location(line, column, column + length);
        }

        let expectExtract = (xpath: string, expectedPaths: PathVariable[], checkOrdered: boolean = true, hasRoot = true) => {
            let rootNode = { name: '$node', path: '*', location: location(2) };
            let actualPaths = extractinator.extract(xpath);
            const expectedPathsMapped = (hasRoot ? [rootNode].concat(expectedPaths) : expectedPaths).map(formatPathVariables);
            expect(actualPaths.map(formatPathVariables)).toEqual(expectedPathsMapped, xpath);
            let subPath = xpath.substring('//node['.length, xpath.length - 1);

            if (actualPaths.length) {
                // check whether the annotation works
                let annotated = extractinator.annotate(xpath, actualPaths);
                expect(annotated.map(a => a.token.text).join('')).toEqual(xpath, "Annotation should return the precise input.");
                let missingPaths = actualPaths.concat([]);
                for (let token of annotated) {
                    if (token.variable) {
                        let index = missingPaths.findIndex(t => t == token.variable);
                        if (index == -1) {
                            fail();
                        }
                        missingPaths.splice(index, 1);
                    }
                }
                expect(missingPaths).toEqual([], "Paths missing!");
            }

            if (checkOrdered) {
                xpath = `//node[@cat="smain" and not(.//node[position() < last()][number(@begin) > number(following-sibling::node/@begin)]) and ${subPath}]`;
                let orderedResult = extractinator.extract(xpath);
                expect(orderedResult.map(formatPathVariables)).toEqual((hasRoot ? [rootNode] : []).concat(expectedPaths.map(variable => {
                    return {
                        name: variable.name,
                        path: variable.path,
                        location: location(variable.location.firstColumn + 112)
                    };
                })).map(formatPathVariables), xpath);
            }
        }

        function formatPathVariables(path: PathVariable) {
            return `${path.name} := ${path.path} (${path.location.line}:${path.location.firstColumn}-${path.location.lastColumn})`;
        }
    });