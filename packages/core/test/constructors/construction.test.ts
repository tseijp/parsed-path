import { resetParsed } from '../../src'

describe('mount', () => {
    let parsed: any
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('basic', () => {
        expect(parsed`foo``bar``baz`.mount`` + '').toEqual('foo/bar/baz')
        expect(parsed`foo``bar`.mount`baz` + '').toEqual('baz/foo/bar')
        expect(parsed`foo`.mount`bar``baz` + '').toEqual('bar/baz/foo')
        expect(parsed``.mount`foo``bar``baz` + '').toEqual('foo/bar/baz')
    })
})

describe('from util', () => {
    let parsed: any, target: any
    beforeEach(() => {
        parsed = resetParsed().posix
        target = parsed`foo``bar``baz`
    })
    it('basic', () => {
        expect(target.from`` + '').toEqual('foo/bar/baz')
        expect(target.from`foo` + '').toEqual('bar/baz')
        expect(target.from`bar` + '').toEqual('../foo/bar/baz')
        expect(target.from`baz` + '').toEqual('../foo/bar/baz')
        expect(target.from`foo``bar` + '').toEqual('baz')
        expect(target.from`foo``baz` + '').toEqual('../bar/baz')
        expect(target.from`bar``baz` + '').toEqual('../../foo/bar/baz')
        expect(target.from`foo``bar``baz` + '').toEqual('../../foo/bar/baz')
    })
})
describe('to util', () => {
    let parsed: any, target: any
    beforeEach(() => {
        parsed = resetParsed().posix
        target = parsed`foo``bar``baz`
    })
    it('basic', () => {
        expect(target.to`` + '').toEqual('../../..')
        expect(target.to`foo` + '').toEqual('../..')
        expect(target.to`bar` + '').toEqual('../../../bar')
        expect(target.to`baz` + '').toEqual('../../../baz')
        expect(target.to`foo``bar` + '').toEqual('..')
        expect(target.to`foo``baz` + '').toEqual('../../baz')
        expect(target.to`bar``baz` + '').toEqual('../../../bar/baz')
        expect(target.to`foo``bar``baz` + '').toEqual('../../../foo/bar/baz') // TODO ''
    })
})
// to be delete isWin
describe('TODO: with config', () => {
    let parsed: any
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('basic', () => {
        const isWin = true
        expect(parsed`foo``bar``baz`.withConfig({isWin}) + '').toEqual('foo/bar/baz')
        expect(parsed`foo``bar`.withConfig({isWin})`baz` + '').toEqual('foo/bar/baz')
        expect(parsed`foo`.withConfig({isWin})`bar``baz` + '').toEqual('foo/bar/baz')
        expect(parsed``.withConfig({isWin})`foo``bar``baz` + '').toEqual('foo/bar/baz')
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
        expect(parsed().withAttrs({})`foo``bar``baz` + '').toEqual('foo/bar/baz')
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
