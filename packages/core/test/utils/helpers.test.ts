import { is, isStaticPathSet } from '../../src'

describe('is', () => {
    it('is to be truthy', () => {
        const foo = 'foo',
              bar = 'bar'
        expect(is(0, 0, 0)).toBeTruthy()
        expect(is('0', '0', '0')).toBeTruthy()
        expect(is({foo}, {foo})).toBeTruthy()
        expect(is([foo], [foo])).toBeTruthy()
        expect(is({}, {}, {})).toBeTruthy()
    })
    it('is to be falsy', () => {
        const foo = 'foo',
              bar = 'bar'
        expect(is(0, 0, 1)).toBeFalsy()
        expect(is('0', '0', 0)).toBeFalsy()
        expect(is('0', '0', '1')).toBeFalsy()
        expect(is({foo}, {bar})).toBeFalsy()
        expect(is([foo], [bar])).toBeFalsy()
        expect(is({}, {}, {bar})).toBeFalsy()
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
        expect(is.len(0, [])).toBeTruthy()
        expect(is.len(0, {})).toBeTruthy()
    })
})

describe('isStaticPathSet', () => {
    it('static', () => {
        expect(isStaticPathSet(['foo', 'bar', ['baz']])).toBeTruthy()
        expect(isStaticPathSet(['foo', ['bar', 'baz']])).toBeTruthy()
        expect(isStaticPathSet([['foo', 'bar', 'baz']])).toBeTruthy()
    })
    it('not static', () => {
        expect(isStaticPathSet(['foo', 'bar', () => ['baz']])).toBeFalsy()
        expect(isStaticPathSet(['foo', () => ['bar', 'baz']])).toBeFalsy()
        expect(isStaticPathSet([() => ['foo', 'bar', 'baz']])).toBeFalsy()
    })
})
