import { resetParsed } from '../../src'
/*
 * `base``name``ext` => foo      // two ignore
 * `root``dir``base` => bar/baz  // left ignore
 * `root``base``ext` => foobar   // right ignore
 * `root``name``ext` => foobarbaz
 */

describe('format static', () => {
    let parsed: any
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('to string without args', () => {
        expect(parsed({dir: 'foo'})()).toEqual('foo/.')
        expect(parsed({base: 'foo'})({})).toEqual('foo')
        expect(parsed({root: 'foo'}) + '').toEqual('foo.')
        expect(parsed({name: 'foo'}).toString()).toEqual('foo')
    })
    it('to string with args', () => {
        expect(parsed`base: foo;``name: bar;``ext: baz;`()).toEqual('foo')
        expect(parsed`root: foo;``dir: bar;``base: baz;`({})).toEqual('bar/baz')
        expect(parsed`root: foo;``base: bar;``ext: baz;` + '').toEqual('foobar')
        expect(parsed`root: foo;``name: bar;``ext: baz;`.toString()).toEqual('foobarbaz')
    })
    it('to string with parsed path', () => {
        expect(parsed(parsed`base: foo;``name: bar;``ext: baz;`) + '').toEqual('foo')
        expect(parsed(parsed`root: foo;``dir: bar;`)`base: baz;` + '').toEqual('bar/baz')
        expect(parsed(parsed()`root: foo;`)`base: bar;``ext: baz;` + '').toEqual('foobar')
        expect(parsed(parsed()``)`root: foo;``name: bar;``ext: baz;` + '').toEqual('foobarbaz')
    })
})

describe('format with props', () => {
    let parsed: any
    const foo = {_: 'foo'}
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('to string without args', () => {
        expect(parsed`dir: ${({_}: any) => _};`()).toEqual('.')
        expect(parsed`base: ${({_}: any) => _};`(foo)).toEqual('foo')
        expect(parsed`root: ${({_}: any) => _||'foo'};` + '').toEqual('foo.')
        expect(parsed`name: ${({_='foo'}: any) => _};`.toString()).toEqual('foo')
    })
    it('to string with args', () => {
        expect(parsed`base: ${({_}: any) => _};``name: bar;``ext: baz;`()).toEqual('barbaz')
        expect(parsed`root: ${({_}: any) => _};``dir: bar;``base: baz;`(foo)).toEqual('bar/baz')
        expect(parsed`root: ${({_}: any) => _||'foo'};``base: bar;``ext: baz;` + '').toEqual('foobar')
        expect(parsed`root: ${({_='foo'}: any) => _};``name: bar;``ext: baz;`.toString()).toEqual('foobarbaz')
    })
    it('to string parsed path', () => {
        expect(parsed(parsed`base: ${({_}: any) => _};``name: bar;`)`ext: baz;`()).toEqual('barbaz')
        expect(parsed(parsed`root: ${({_}: any) => _};``dir: bar;`)`base: baz;`(foo)).toEqual('bar/baz')
        expect(parsed(parsed`root: ${({_}: any) => _ || 'foo'};``base: bar;`)`ext: baz;` + '').toEqual('foobar')
        expect(parsed(parsed`root: ${({_='foo'}: any) => _};``name: bar;`)`ext: baz;`.toString()).toEqual('foobarbaz')
    })
})

describe('format with attrs', () => {
    let parsed: any
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    const foo = {_: 'foo'}, ignore = {_: 'ignore'}
    it('to string without args', () => {
        expect(parsed().withAttrs(foo)`dir: ${({_}: any) => _};`()).toEqual('foo/.')
        expect(parsed().withAttrs(foo)`base: ${({_}: any) => _};`(foo)).toEqual('foo')
        expect(parsed().withAttrs(foo)`root: ${({_}: any) => _||'ignore'};`()).toEqual('foo.')
        expect(parsed().withAttrs(foo)`name: ${({_='ignore'}: any) => _};`(foo)).toEqual('foo')
    })
    it('to string with args', () => {
        expect(parsed().withAttrs(foo)`base: ${({_}: any) => _};``name: bar;``ext: baz;` + '').toEqual('foo')
        expect(parsed`root: ${({_}: any) => _}`.withAttrs(ignore)`dir: bar;``base: baz;`(foo) + '').toEqual('bar/baz')
        expect(parsed`root: ${({_}: any) => _||'ignore'}``base: bar;`.withAttrs(foo)`ext: baz;` + '').toEqual('.baz') // TODO .bazfoobar
        expect(parsed`root: ${({_='ignore'}: any) => _}``name: bar;``ext: baz;`.withAttrs(ignore)(foo) + '').toEqual('.bazbaz') // TODO foobarbaz
    })
    it('to string with parse path', () => {
        expect(parsed(parsed().withAttrs(foo)`base: ${({_}: any) => _};``name: bar;`)`ext: baz;`() + '').toEqual('foo')
        expect(parsed(parsed`root: ${({_}: any) => _};`.withAttrs(ignore)`dir: bar;`)`base: baz;`(foo) + '').toEqual('bar/baz')
        expect(parsed(parsed`root: ${({_}: any) => _ || 'ignore'};``base: bar;`).withAttrs(foo)`ext: baz;` + '').toEqual('foobar')
        expect(parsed(parsed`root: ${({_='ignore'}: any) => _};``name: bar;`)`ext: baz;`.withAttrs(ignore)(foo) + '').toEqual('foobarbaz')
    })
})
