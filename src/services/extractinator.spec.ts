import { Extractinator, Location, PathVariable } from './extractinator';
import { XPathModels } from 'ts-xpath';

describe('XPath Extractinator',
    () => {
        let extractinator: Extractinator;

        beforeEach(() => {
            extractinator = new Extractinator();
        });

        it('Ignores empty input', () => {
            expectExtract('', [], false, false);
        });

        it('Ignores malformed input', () => {
            let parseError: XPathModels.ParseError | null = null;
            let result: PathVariable[] | null = null;
            try {
                result = extractinator.extract('//node[');
            } catch (error) {
                if (error instanceof XPathModels.ParseError) {
                    parseError = error;
                }
            }

            expect(result).toBeFalsy('No results should be returned if the input is malformed!');
            expect(parseError).toBeTruthy('No ParseError was thrown!');
        });

        it('Extracts root', () => {
            // the root is implicit and called $node; it shouldn't be returned as extracted
            expectExtract('//node', [], false);
        });

        it('Ignores parent\'s attributes', () => {
            expectExtract('//node[@pt="vnw"]', []);
        });

        it('Extracts child', () => {
            expectExtract('//node[node]', [{ name: '$node1', path: '$node/node', location: location(7) }]);
        });

        it('Extracts child with attributes', () => {
            expectExtract('//node[node[@pt="vnw" and @rel="su"]]', [{
                name: '$node1',
                path: '$node/node[@pt = "vnw" and @rel = "su"]',
                location: location(7)
            }]);
        });

        it('Extracts attributes without value', () => {
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

        it('Extracts double predicates', () => {
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

        it('Extracts multiple children', () => {
            expectExtract(
                '//node[@cat="smain" and node and node[@cat="np"]]',
                [{ name: '$node1', path: '$node/node', location: location(24) },
                { name: '$node2', path: '$node/node[@cat = "np"]', location: location(33) }]);
        });

        it('Extracts sub-children', () => {
            expectExtract(
                '//node[node[node and node[@pt="lid"]]]',
                [{ name: '$node1', path: '$node/node[node and node[@pt = "lid"]]', location: location(7) },
                { name: '$node2', path: '$node1/node', location: location(12) },
                { name: '$node3', path: '$node1/node[@pt = "lid"]', location: location(21) }]);
        });

        it('Extracts union', () => {
            expectExtract(
                '//node[node[@pt = "lid"] | node[@pt="vnw" and number(@begin) > 5]]',
                [{ name: '$node1', path: '$node/node[@pt = "lid"]', location: location(7) },
                { name: '$node2', path: '$node/node[@pt = "vnw" and number(@begin) > 5]', location: location(27) }]);
        });

        it('Extracts all path axes', () => {
            expectExtract(
                '//node[@pt="n" and @rel="obj1" and ../node[@lemma="eten"]]',
                [{ name: '$node1', path: '$node/../node[@lemma = "eten"]', location: location(38) }]);
            expectExtract(
                '//node[@pt="n" and @rel="obj1" and ../node[@cat="np" and node[@pt = "lid"]]]',
                [{ name: '$node1', path: '$node/../node[@cat = "np" and node[@pt = "lid"]]', location: location(38) },
                { name: '$node2', path: '$node1/node[@pt = "lid"]', location: location(57) }]);

            expectExtract(
                '//node[@cat="np" and descendant::node[@pt="let"]]',
                [{ name: '$node1', path: '$node/descendant::node[@pt = "let"]', location: location(33) }]);

            expectExtract(
                '//node[@cat="np" and descendant-or-self::node[@pt="let"]]',
                [{ name: '$node1', path: '$node/descendant-or-self::node[@pt = "let"]', location: location(41) }]);

            expectExtract(
                '//node[@pt="lid" and following-sibling::node[@cat="np" and node[@pt="n"]]]',
                [{ name: '$node1', path: '$node/following-sibling::node[@cat = "np" and node[@pt = "n"]]', location: location(40) },
                { name: '$node2', path: '$node1/node[@pt = "n"]', location: location(59) }]);

            expectExtract(
                `//node[@pt and
                ((@rel="hd" and parent::node[@rel="obj1" and ../node[@lemma="eten" and @rel="hd"]]) or
                @rel="obj1" and parent::node[@lemma="eten"])]`,
                [{
                    name: '$node1',
                    path: '$node/../../node[@rel = "obj1" and ../node[@lemma = "eten" and @rel = "hd"]]',
                    location: location(40, 2)
                },
                { name: '$node2', path: '$node1/../node[@lemma = "eten" and @rel = "hd"]', location: location(64, 2) },
                { name: '$node3', path: '$node/../../node[@lemma = "eten"]', location: location(40, 3) }]);
        });

        it('Ignores metadata', () => {
            expectExtract(
                `//node
                [ancestor::alpino_ds/metadata[
                    meta[@name="session"] or
                    meta[@name="charencoding"] or
                    meta[@name="media"]]]`,
                [],
                false);
        });

        const location = (column: number, line: number = 1, length: number = 4) => {
            return new Location(line, column, column + length);
        };

        const expectExtract = (xpath: string, expectedPaths: PathVariable[], checkOrdered: boolean = true, hasRoot = true) => {
            try {
                const rootNode = { name: '$node', path: '*', location: location(2) };
                const actualPaths = extractinator.extract(xpath);
                const expectedPathsMapped = (hasRoot ? [rootNode].concat(expectedPaths) : expectedPaths).map(formatPathVariables);
                expect(actualPaths.map(formatPathVariables)).toEqual(expectedPathsMapped, xpath);
                const subPath = xpath.substring('//node['.length, xpath.length - 1);

                if (actualPaths.length) {
                    // check whether the annotation works
                    const annotated = extractinator.annotate(xpath, actualPaths);
                    expect(annotated.map(a => a.token.text).join('')).toEqual(xpath, 'Annotation should return the precise input.');
                    const missingPaths = actualPaths.concat([]);
                    for (const token of annotated) {
                        if (token.variable) {
                            const index = missingPaths.findIndex(t => t === token.variable);
                            if (index === -1) {
                                fail();
                            }
                            missingPaths.splice(index, 1);
                        }
                    }
                    expect(missingPaths).toEqual([], 'Paths missing!');
                }

                if (checkOrdered) {
                    // tslint:disable-next-line:max-line-length
                    xpath = `//node[@cat="smain" and not(.//node[position() < last()][number(@begin) > number(following-sibling::node/@begin)]) and ${subPath}]`;
                    const orderedResult = extractinator.extract(xpath);
                    expect(orderedResult.map(formatPathVariables)).toEqual(
                        (hasRoot ? [rootNode] : []).concat(expectedPaths.map(variable => {
                            return {
                                name: variable.name,
                                path: variable.path,
                                location: variable.location.line === 1
                                    ? location(variable.location.firstColumn + 112)
                                    : variable.location
                            };
                        })).map(formatPathVariables), xpath);
                }
            } catch (error) {
                fail(error);
            }
        };

        function formatPathVariables(path: PathVariable) {
            return `${path.name} := ${path.path} (${path.location.line}:${path.location.firstColumn}-${path.location.lastColumn})`;
        }
    });
