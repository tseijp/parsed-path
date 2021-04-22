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

describe('parsed with attrs', () => {
    let parsed: any
    const foo = {_: 'foo'}, bar = {_: 'bar'}
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('to string without args', () => {
        expect(parsed().withAttrs(foo)`${({_}: any) => _}` + '').toEqual('foo')
        expect(parsed`${({_}: any) => _}`.withAttrs(foo)(bar) + '').toEqual('bar')
        expect(parsed`${({_}: any) => _||'xxx'}`.withAttrs(foo) + '').toEqual('foo')
        expect(parsed`${({_='xxx'}: any) => _}`.withAttrs(foo)(bar) + '').toEqual('bar')
    })
    it('to string with args', () => {
        expect(parsed().withAttrs(foo)`${({_}: any) => _}``bar``baz` + '').toEqual('foo/bar/baz')
        expect(parsed`${({_}: any) => _}`.withAttrs(foo)`bar``baz`(bar) + '').toEqual('bar/bar/baz')
        expect(parsed`${({_}: any) => _||'xxx'}``bar`.withAttrs(foo)`baz` + '').toEqual('foo/bar/baz')
        expect(parsed`${({_='xxx'}: any) => _}``bar``baz`.withAttrs(foo)(bar) + '').toEqual('bar/bar/baz')
    })
    it('to string with parse path', () => {
        expect(parsed(parsed().withAttrs(foo)`${({_}: any) => _}``bar`)`baz`() + '').toEqual('foo/bar/baz')
        expect(parsed(parsed`${({_}: any) => _}`.withAttrs(foo))`bar``baz`(bar) + '').toEqual('bar/bar/baz')
        expect(parsed(parsed`${({_}: any) => _ || 'foo'}``bar`.withAttrs(foo))`baz` + '').toEqual('foo/bar/baz')
        expect(parsed(parsed`${({_='xxx'}: any) => _}``bar`)`baz`.withAttrs(foo)(bar) + '').toEqual('bar/bar/baz')
    })
})
