import { flatten, primitives } from '../../src'

describe('flatten', () => {
    it('defers functions', () => {
        const str = ({bool=true}) => (bool ? 'bar' : 'baz')
        const arr = () => ['static', ({bool=true}) => (bool ? 'bar' : 'baz')]
        expect(flatten(['foo', str, 'baz'])).toEqual(['foo', str, 'baz'])
        expect(flatten(['foo', arr, 'baz'])).toEqual(['foo', arr, 'baz'])
        expect(flatten(['foo', str], {bool: true})).toEqual(['foo', 'bar'])
        expect(flatten(['foo', str], {bool: false})).toEqual(['foo', 'baz'])
        expect(flatten(['foo', arr], {bool: true})).toEqual(['foo', 'static', 'bar'])
        expect(flatten(['foo', arr], {bool: false})).toEqual(['foo', 'static', 'baz'])
        expect(flatten(['foo', str, 'baz'], {bool: true})).toEqual(['foo', 'bar', 'baz'])
        expect(flatten(['foo', str, 'baz'], {bool: false})).toEqual(['foo', 'baz', 'baz'])
    })

    it('defer primitives string', () => {
        primitives.forEach((_key, tags) => {
            expect(flatten(tags)).toEqual([tags])
        })
    })
    it('toStrings class instances', () => {
        class SomeClass { toString() {return 'some'} }
        expect(flatten([new SomeClass()])).toEqual(['some'])
    })
    it('merge strings', () => {
        expect(flatten([1, 2, [3, 4, 5]])).toEqual(['1', '2', '3', '4', '5'])
        expect(flatten(['foo', 0, 'bar', NaN, 'baz', -1])).toEqual(['foo', '0', 'bar', 'NaN', 'baz', '-1'])
        expect(flatten(['foo', false, 'bar', undefined, 'baz', null])).toEqual(['foo', 'bar', 'baz'])
        expect(flatten([' f o o ', '\tb\ta\tr\t', '\nb\na\nz\n'])).toEqual(['foo', 'bar', 'baz'])
    })
})
