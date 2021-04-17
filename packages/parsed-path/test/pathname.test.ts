import { resetParsed } from '../src'

describe('parsed static', () => {
    let parsed: any
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('to string without args', () => {
        expect(parsed`foo`()).toEqual('foo')
        expect(parsed`foo`({})).toEqual('foo')
        expect(parsed`foo` + '').toEqual('foo')
        expect(parsed`foo`.toString()).toEqual('foo')
    })
    it('to string with args', () => {
        expect(parsed`foo``bar``baz`()).toEqual('foo/bar/baz')
        expect(parsed`foo``bar``baz`({})).toEqual('foo/bar/baz')
        expect(parsed`foo``bar``baz` + '').toEqual('foo/bar/baz')
    })
    it('tag as parsed path', () => {
        expect(parsed(parsed`foo``bar``baz`) + '').toEqual('foo/bar/baz')
        expect(parsed(parsed`foo``bar`)`baz` + '').toEqual('foo/bar/baz')
        expect(parsed(parsed()`foo`)`bar``baz` + '').toEqual('foo/bar/baz')
        expect(parsed(parsed()``)`foo``bar``baz` + '').toEqual('foo/bar/baz')
    })
})

describe('parsed with props', () => {
    let parsed: any
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('to string without args', () => {
        expect(parsed`${({foo}: any) => foo}`()).toEqual('.')
        expect(parsed`${({foo}: any) => foo}`({foo: 'foo'})).toEqual('foo')
        expect(parsed`${({foo}: any) => foo || 'foo'}` + '').toEqual('foo')
        expect(parsed`${({foo='foo'}: any) => foo}`.toString()).toEqual('foo')
    })
    it('to string with args', () => {
        expect(parsed`${({foo}: any) => foo}``bar``baz`()).toEqual('bar/baz')
        expect(parsed`${({foo}: any) => foo}``bar``baz`({foo: 'foo'})).toEqual('foo/bar/baz')
        expect(parsed`${({foo}: any) => foo || 'foo'}``bar``baz` + '').toEqual('foo/bar/baz')
        expect(parsed`${({foo='foo'}: any) => foo}``bar``baz`.toString()).toEqual('foo/bar/baz')
    })
    it('to string with parsed path', () => {
        expect(parsed(parsed`${({foo}: any) => foo}``bar`)`baz`()).toEqual('bar/baz')
        expect(parsed(parsed`${({foo}: any) => foo}``bar`)`baz`({foo: 'foo'})).toEqual('foo/bar/baz')
        expect(parsed(parsed`${({foo}: any) => foo || 'foo'}``bar`)`baz` + '').toEqual('foo/bar/baz')
        expect(parsed(parsed`${({foo='foo'}: any) => foo}``bar`)`baz`.toString()).toEqual('foo/bar/baz')
    })
})
