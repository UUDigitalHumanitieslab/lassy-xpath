import { Location } from './extractinator';
import { Reconstructor } from './reconstructor';

describe('XPath Reconstruction',
    () => {
        let reconstructor: Reconstructor;

        beforeEach(() => {
            reconstructor = new Reconstructor();
        });

        it('Ignores empty input', () => {
            expectReconstruct('', []);
        });

        it('Get parent\'s attributes (if set)', () => {
            expectReconstruct(`<node varName="$node" pt="vnw">
</node>`, [{ name: '$node', path: '*' }], '//node[@pt="vnw"]');
        });

        it('Constructs root', () => {
            expectReconstruct(`<node varName="$node">
</node>`,
                [{ name: '$node', path: '*' }]);
        });

        it('Constructs child', () => {
            expectReconstruct(`<node varName="$node">
    <node varName="$node1">
    </node>
</node>`,
                [{ name: '$node', path: '*' },
                { name: '$node1', path: '$node/node' }]);
        });

        it('Constructs child with attributes', () => {
            expectReconstruct(`<node varName="$node">
    <node varName="$node1" pt="vnw" rel="su">
    </node>
</node>`,
                [{ name: '$node', path: '*' },
                { name: '$node1', path: '$node/node[@pt = "vnw" and @rel = "su"]' }]);
        });

        it('Constructs child with duplicate attributes', () => {
            expectReconstruct(`<node varName="$node">
    <node varName="$node1" rel="det|su">
    </node>
</node>`,
                [{ name: '$node', path: '*' },
                { name: '$node1', path: '$node/node[@rel = "det" or @rel = "su"]' }]);
        });

        it('Constructs multiple children', () => {
            expectReconstruct(
                `<node varName="$node">
    <node varName="$node1">
    </node>
    <node varName="$node2" cat="np">
    </node>
</node>`,
                [{ name: '$node', path: '*' },
                { name: '$node1', path: '$node/node' },
                { name: '$node2', path: '$node/node[@cat = "np"]' }]);
        });

        it('Constructs sub-children', () => {
            expectReconstruct(
                `<node varName="$node">
    <node varName="$node1">
        <node varName="$node2">
        </node>
        <node varName="$node3" pt="lid">
        </node>
    </node>
</node>`,
                [{ name: '$node', path: '*' },
                { name: '$node1', path: '$node/node[node and node[@pt = "lid"]]' },
                { name: '$node2', path: '$node1/node' },
                { name: '$node3', path: '$node1/node[@pt = "lid"]' }]);
        });

        it('Constructs union', () => {
            expectReconstruct(
                `<node varName="$node">
    <node varName="$node1" pt="lid">
    </node>
    <node varName="$node2" pt="vnw">
    </node>
</node>`,
                [{ name: '$node', path: '*' },
                { name: '$node1', path: '$node/node[@pt = "lid"]' },
                { name: '$node2', path: '$node/node[@pt = "vnw" and number(@begin) > 5]' }]);
        });

        it('Constructs descendant and self', () => {
            expectReconstruct(
                `<node varName="$node">
    <node varName="$node1" rel="hd">
    </node>
    <node>
        <node varName="$node2" word="beetje">
        </node>
    </node>
</node>`,
                [{ name: '$node', path: '*' },
                { name: '$node1', path: '$node/node[@rel = "hd"]' },
                { name: '$node2', path: '$node//node[@word = "beetje"]' }]);
        });

        it('Constructs descendant and self with children', () => {
            expectReconstruct(
                `<node varName="$node">
    <node varName="$node1" rel="hd">
    </node>
    <node>
        <node varName="$node2" rel="mod">
            <node varName="$node3" word="beetje">
            </node>
        </node>
    </node>
</node>`,
                [{ name: '$node', path: '*' },
                { name: '$node1', path: '$node/node[@rel = "hd"]' },
                { name: '$node2', path: '$node//node[@rel = "mod" and node[@word = "beetje"]]' },
                { name: '$node3', path: '$node2/node[@word = "beetje"]' }]);
        });

        const location = (column: number, line: number = 1, length: number = 4) => {
            return new Location(line, column, column + length);
        };

        const expectReconstruct = (expectedXml: string, inputPaths: { name: string, path: string }[], query?: string) => {
            const actualXml = reconstructor.construct(inputPaths.map(path => {
                // location is ignored
                return Object.assign({ location: location(0) }, path);
            }), query);

            expect(actualXml).toEqual('<node cat="top">' + expectedXml + '</node>');
        };
    });
