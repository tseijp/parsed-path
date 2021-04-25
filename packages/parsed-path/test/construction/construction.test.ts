import { resetParsed } from '../../src'

describe('mount', () => {
    let parsed: any, target: any
    beforeEach(() => {
        parsed = resetParsed().posix
        target = parsed`foo``bar``baz`
    })
    it('basic', () => {
        expect(target.mount`` + '').toEqual('baz') // TODO
        expect(parsed`foo``bar`.mount`baz` + '').toEqual('baz/foo/bar')
        expect(parsed`foo`.mount`bar``baz` + '').toEqual('bar/foo/baz')
        expect(parsed``.mount`foo``bar``baz` + '').toEqual('foo/bar/baz')
    })
})

describe('from util', () => {
    let parsed: any, target: any
    beforeEach(() => {
        parsed = resetParsed()
        target = parsed`foo``bar``baz`
    })
    it('basic', () => {
        expect(target.from(['']) + '').toEqual('.')
        expect(target.from(['foo']) + '').toEqual('.')
        expect(target.from(['foo', 'bar']) + '').toEqual('.')
        expect(target.from(['foo', 'bar', 'baz']) + '').toEqual('.')
    })
})
describe('to util', () => {
    let parsed: any, target: any
    beforeEach(() => {
        parsed = resetParsed()
        target = parsed`foo``bar``baz`
    })
    it('basic', () => {
        expect(target.to(['foo']) + '').toEqual('.')
        expect(target.to(['foo', 'bar']) + '').toEqual('.')
        expect(target.to(['foo', 'bar', 'baz']) + '').toEqual('.')
    })
})

describe('with config', () => {
    let parsed: any
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('basic', () => {
        const isWin = true
        expect(parsed`foo``bar``baz`.withConfig({isWin}) + '').toEqual('foo\\bar\\baz')
        expect(parsed`foo``bar`.withConfig({isWin})`baz` + '').toEqual('foo\\bar\\baz')
        expect(parsed`foo`.withConfig({isWin})`bar``baz` + '').toEqual('foo\\bar\\baz')
        expect(parsed``.withConfig({isWin})`foo``bar``baz` + '').toEqual('foo\\bar\\baz')
    })
})

describe('with attrs', () => {
    let parsed: any
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('basic', () => {
        expect(parsed`foo``bar``baz`.withAttrs({}) + '').toEqual('foo/bar/baz')
        expect(parsed`foo``bar`.withAttrs({})`baz` + '').toEqual('foo/bar/baz')
        expect(parsed`foo`.withAttrs({})`bar``baz` + '').toEqual('foo/bar/baz')
        expect(parsed``.withAttrs({})`foo``bar``baz` + '').toEqual('foo/bar/baz')
    })
})

// describe('TODO utils', () => {
//     let parsed: any, target: any
//     beforeEach(() => {
//         parsed = resetParsed().posix
//         target = parsed`foo``bar``baz`
//     })
//     it('TODO: move util', () => {
//         expect(target.move`foo` + '').toEqual('foo/baz')
//         expect(target.move`bar` + '').toEqual('foo/bar/baz')
//         expect(target.move`baz` + '').toEqual('.')
//     })
//     it('TODO: name util', () => {
//         expect(target.name`foo` + '').toEqual('foo/bar/foo')
//         expect(target.name`bar` + '').toEqual('foo/bar/bar')
//         expect(target.name`baz` + '').toEqual('foo/bar/baz')
//     })
// })
