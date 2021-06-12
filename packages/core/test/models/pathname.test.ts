import { resetParsed } from '../../src'
/*
 * `base``name``ext` => foo      // two ignore
 * `root``dir``base` => bar/baz  // left ignore
 * `root``base``ext` => foobar   // right ignore
 * `root``name``ext` => foobarbaz
 */

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
    let parsed: any, foo= {$: 'foo'}, $foo = ($: any) => $.$||'foo', $ = ($: any) => $.$
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('to string without args', () => {
        expect(parsed`${$}`()).toEqual('.')
        expect(parsed`${$}`(foo)).toEqual('foo')
        expect(parsed`${$foo}` + '').toEqual('foo')
        expect(parsed`${$foo}`.toString()).toEqual('foo')
    })
    it('to string with args', () => {
        expect(parsed`${$}``bar``baz`()).toEqual('bar/baz')
        expect(parsed`${$}``bar``baz`(foo)).toEqual('foo/bar/baz')
        expect(parsed`${$foo}``bar``baz` + '').toEqual('foo/bar/baz')
        expect(parsed`${$foo}``bar``baz`.toString()).toEqual('foo/bar/baz')
    })
    it('to string with parsed path', () => {
        expect(parsed(parsed`${$}``bar`)`baz`()).toEqual('bar/baz')
        expect(parsed(parsed`${$}``bar`)`baz`(foo)).toEqual('foo/bar/baz')
        expect(parsed(parsed`${$foo}``bar`)`baz` + '').toEqual('foo/bar/baz')
        expect(parsed(parsed`${$foo}``bar`)`baz`.toString()).toEqual('foo/bar/baz')
    })
})

describe('parsed with attrs', () => {
    let parsed: any
    const foo = {$: 'foo'}, bar = {$: 'bar'}, $ = ($: any) => $.$
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('to string without args', () => {
        expect(parsed().withAttrs(foo)`${$}` + '').toEqual('foo')
        expect(parsed`${$}`.withAttrs(foo)(bar) + '').toEqual('bar')
        expect(parsed`${$}`.withAttrs(foo) + '').toEqual('foo')
        expect(parsed`${$}`.withAttrs(foo)(bar) + '').toEqual('bar')
    })
    it('to string with args', () => {
        expect(parsed().withAttrs(foo)`${$}``bar``baz` + '').toEqual('foo/bar/baz')
        expect(parsed`${$}`.withAttrs(foo)`bar``baz`(bar) + '').toEqual('bar/bar/baz')
        expect(parsed`${$}``bar`.withAttrs(foo)`baz` + '').toEqual('foo/bar/baz')
        expect(parsed`${$}``bar``baz`.withAttrs(foo)(bar) + '').toEqual('bar/bar/baz')
    })
    it('to string with parse path', () => {
        expect(parsed(parsed().withAttrs(foo)`${$}``bar`)`baz`() + '').toEqual('foo/bar/baz')
        expect(parsed(parsed`${$}`.withAttrs(foo))`bar``baz`(bar) + '').toEqual('bar/bar/baz')
        expect(parsed(parsed`${$}``bar`.withAttrs(foo))`baz` + '').toEqual('foobar/baz') // TODO
        expect(parsed(parsed`${$}``bar`)`baz`.withAttrs(foo)(bar) + '').toEqual('bar/bar/baz')
    })
})
