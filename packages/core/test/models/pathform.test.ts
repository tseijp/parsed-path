import { resetParsed, Parsed } from '../../src'
/*
 * `base``name``ext` => foo      // two ignore
 * `root``dir``base` => bar/baz  // left ignore
 * `root``base``ext` => foobar   // right ignore
 * `root``name``ext` => foobarbaz
 */

describe('format static', () => {
    let parsed: Parsed['posix']
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
    let parsed: Parsed['posix']
    const foo = {$: 'foo'}, $foo = <T>($: {$: T}) => $.$ || 'foo', $ = <T>($: {$: T}) => $.$
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('to string without args', () => {
        expect(parsed`dir: ${$};`()).toEqual('.')
        expect(parsed`base: ${$};`(foo)).toEqual('foo')
        expect(parsed`root: ${$foo};` + '').toEqual('foo.')
        expect(parsed`name: ${$foo};`.toString()).toEqual('foo')
    })
    it('to string with args', () => {
        expect(parsed`base: ${$};``name: bar;``ext: baz;`()).toEqual('barbaz')
        expect(parsed`root: ${$};``dir: bar;``base: baz;`(foo)).toEqual('bar/baz')
        expect(parsed`root: ${$foo};``base: bar;``ext: baz;` + '').toEqual('foobar')
        expect(parsed`root: ${$foo};``name: bar;``ext: baz;`.toString()).toEqual('foobarbaz')
    })
    it('to string parsed path', () => {
        expect(parsed(parsed`base: ${$};``name: bar;`)`ext: baz;`()).toEqual('barbaz')
        expect(parsed(parsed`root: ${$};``dir: bar;`)`base: baz;`(foo)).toEqual('bar/baz')
        expect(parsed(parsed`root: ${$foo};``base: bar;`)`ext: baz;` + '').toEqual('foobar')
        expect(parsed(parsed`root: ${$foo};``name: bar;`)`ext: baz;`.toString()).toEqual('foobarbaz')
    })
})

describe('format with attrs', () => {
    let parsed: Parsed['posix']
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    const foo = {$: 'foo'}, ignore = {$: 'ignore'}, $ = <T>($: {$: T}) => $.$
    it('to string without args', () => {
        expect(parsed().withAttrs(foo)`dir: ${$};`()).toEqual('foo/.')
        expect(parsed().withAttrs(foo)`base: ${$};`(foo)).toEqual('foo')
        expect(parsed().withAttrs(foo)`root: ${$};`()).toEqual('foo.')
        expect(parsed().withAttrs(foo)`name: ${$};`(foo)).toEqual('foo')
    })
    it('to string with args', () => {
        expect(parsed().withAttrs(foo)`base: ${$};``name: bar;``ext: baz;` + '').toEqual('foo')
        expect(parsed`root: ${$};`.withAttrs(ignore)`dir: bar;``base: baz;`(foo) + '').toEqual('bar/baz')
        expect(parsed`root: ${$};``base: bar;`.withAttrs(foo)`ext: baz;` + '').toEqual('foobar') // TODO .bazfoobar
        expect(parsed`root: ${$};``name: bar;``ext: baz;`.withAttrs(ignore)(foo) + '').toEqual('foobarbaz')
    })
    it('to string with parse path', () => {
        expect(parsed(parsed().withAttrs(foo)`base: ${$};``name: bar;`)`ext: baz;`() + '').toEqual('foo')
        expect(parsed(parsed`root: ${$};`.withAttrs(ignore)`dir: bar;`)`base: baz;`(foo) + '').toEqual('bar/baz')
        expect(parsed(parsed`root: ${$};``base: bar;`).withAttrs(foo)`ext: baz;` + '').toEqual('foobar')
        expect(parsed(parsed`root: ${$};``name: bar;`)`ext: baz;`.withAttrs(ignore)(foo) + '').toEqual('foobarbaz')
    })
})
