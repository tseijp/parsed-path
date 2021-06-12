import { path, primitives } from '../../src'

describe('path', () => {
    it('rules is url', () => {
        const url = new URL('https://tsei.jp/foo/bar/baz')
        expect(path(url)).toEqual(['', 'foo', 'bar', 'baz'])
    })
    it('rules is function or object', () => {
        const str = ({bool=true}) => (bool ? 'bar' : 'baz')
        const obj = {foo: 'bar'}
        expect(path(str)).toEqual([str])
        expect(path(obj)).toEqual(['foo:bar;'])
    })
    it('get string without interpolations', () => {
        expect(path(`foo, bar, baz`)).toEqual(['foo,bar,baz'])
        expect(path`foo, bar, baz`).toEqual(['foo,bar,baz'])
        expect(path(`foo, bar, baz`)).toEqual(['foo,bar,baz'])
    })
    it('defers toStrings class instances', () => {
        class SomeClass { toString() {return 'some'} }
        expect(path`${new SomeClass()}`).toEqual(['some'])
    })
    it('defers function or object', () => {
        const str = ({bool=true}={}) => (bool ? 'bar' : 'baz')
        const arr = () => ['static', ({bool=true}) => (bool ? 'bar' : 'baz')]
        expect(path`foo${str}baz`).toEqual(['foo', str, 'baz'])
        expect(path`foo${arr}baz`).toEqual(['foo', arr, 'baz'])
    })
    it('defer primitives string', () => {
        primitives.forEach((_key, tags) => {
            expect(path(tags)).toEqual([tags])
        })
    })
    it('merge strings', () => {
        expect(path`${1}${2}${[3, 4, 5]}`).toEqual(['1', '2', '3', '4', '5'])
        expect(path`foo${0}bar${NaN}baz${-1}`).toEqual(['foo', '0', 'bar', 'NaN', 'baz', '-1'])
        expect(path`foo${false}bar${undefined}baz${null}`).toEqual(['foo', 'bar', 'baz'])
        expect(path`${' f o o '}${'\tb\ta\tr\t'}${'\nb\na\nz\n'}`).toEqual(['foo', 'bar', 'baz'])
    })
})
