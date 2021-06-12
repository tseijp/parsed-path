import { resolveAttrs } from '../../src'

describe('resolveAttrs', () => {
    const foo = 'foo',
          bar = 'bar',
          baz = 'baz'
    it('resolve attrs', () => {
        expect(resolveAttrs({foo, bar, baz})).toEqual({foo, bar, baz})
        expect(resolveAttrs({foo, bar}, [{baz}])).toEqual({foo, bar, baz})
        expect(resolveAttrs({foo}, [{bar}, {baz}])).toEqual({foo, bar, baz})
        expect(resolveAttrs({}, [{foo}, {bar}, {baz}])).toEqual({foo, bar, baz})
    })

    it('resolve functional attrs', () => {
        expect(resolveAttrs({foo, bar, baz}, [()=>{}])).toEqual({foo, bar, baz})
        expect(resolveAttrs({foo, bar}, [()=>({baz})])).toEqual({foo, bar, baz})
        expect(resolveAttrs({foo}, [()=>({bar}), ()=>({baz})])).toEqual({foo, bar, baz})
        expect(resolveAttrs({}, [()=>({foo}), ()=>({bar}), ()=>({baz})])).toEqual({foo, bar, baz})
    })
})
