import { interleave, resolveAttrs, is } from '../../src'


describe('path', () => {
    it('merge strings', () => {
        const tsa: any = ['foo', 'bar', 'baz', '']
        expect(interleave(tsa, [false, undefined, null])).toEqual(['foo', false, 'bar', undefined, 'baz', null, ''])
        expect(interleave(tsa, [0, NaN, -1])).toEqual(['foo', 0, 'bar', NaN, 'baz', -1, ''])
        expect(interleave(['foo, bar, baz'], [])).toEqual(['foo, bar, baz'])
    })

    it('defers', () => {
        const tsa = ['foo', 'baz'],
              str = ({bool=true}) => (bool ? 'bar' : 'baz'),
              arr = () => ['static', ({bool=true}) => (bool ? 'bar' : 'baz')],
              obj = {foo: 'bar'}
        expect(interleave(tsa, [str])).toEqual(['foo', str, 'baz'])
        expect(interleave(tsa, [arr])).toEqual(['foo', arr, 'baz'])
        expect(interleave(tsa, [obj])).toEqual(['foo', obj, 'baz'])
    })
})

describe('resolveAttrs', () => {
    const foo = 'foo',
          bar = 'bar',
          baz = 'baz'
    it('resolve attrs', () => {
        expect(resolveAttrs({foo, bar}, [{baz}])).toEqual({foo, bar, baz})
        expect(resolveAttrs({foo}, [{bar}, {baz}])).toEqual({foo, bar, baz})
        expect(resolveAttrs({}, [{foo}, {bar}, {baz}])).toEqual({foo, bar, baz})
    })

    it('resolve functional attrs', () => {
        expect(resolveAttrs({foo, bar}, [()=>({baz})])).toEqual({foo, bar, baz})
        expect(resolveAttrs({foo}, [()=>({bar}), ()=>({baz})])).toEqual({foo, bar, baz})
        expect(resolveAttrs({}, [()=>({foo}), ()=>({bar}), ()=>({baz})])).toEqual({foo, bar, baz})
    })
})

describe('is', () => {
    it('is.equ', () => {
        const foo = 'foo',
              bar = 'bar'
        expect(is(10, 10, 10, 10) !== is(0, 10, 10, 10)).toBeTruthy()
        expect(is('10', '10', '10') !== is('0', '10', '10')).toBeTruthy()
        expect(is({foo}, {foo}) !== is({foo}, {foo, bar})).toBeTruthy()
        expect(is([foo], [foo]) !== is([foo], [foo, bar])).toBeTruthy()
    })
    it('is.len', () => {
        expect(is.len(0, [])).toBeTruthy()
        expect(is.len(0, {})).toBeTruthy()
    })
    it('is.xxx', () => {
        const url = 'https://tsei.jp'
        expect(is.arr([])).toBeTruthy()
        expect(is.fls('')).toBeTruthy()
        expect(is.nul(null)).toBeTruthy()
        expect(is.und(undefined)).toBeTruthy()
        expect(is.num(0)).toBeTruthy()
        expect(is.str("")).toBeTruthy()
        expect(is.fun(() => {})).toBeTruthy()
        expect(is.obj({})).toBeTruthy()
        expect(is.url(new URL(url))).toBeTruthy()
        expect(is.set(new Set([]))).toBeTruthy()
        expect(is.map(new Map([]))).toBeTruthy()
        expect(is.big("F")).toBeTruthy()
    })
})
