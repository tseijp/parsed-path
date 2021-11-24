import { resetParsed } from '../../src'
/*
 * `base``name``ext` => foo      // two ignore
 * `root``dir``base` => bar/baz  // left ignore
 * `root``base``ext` => foobar   // right ignore
 * `root``name``ext` => foobarbaz
 */

describe('override format static', () => {
    let parsed: any, target: any
    beforeEach(() => {
        parsed = resetParsed().posix
        target = parsed`Foo``Bar``Baz`
    })
    it('to string without args', () => {
        expect(target`dir: foo;`()).toEqual('foo/Baz')
        expect(target`base: foo;`({})).toEqual('Foo/Bar/foo')
        expect(target`root: foo;` + '').toEqual('Foo/Bar/Baz')
        expect(target`name: foo;`.toString()).toEqual('Foo/Bar/foo')
    })
    it('to string with args', () => {
        expect(target`base: foo;``name: bar;``ext: baz;`()).toEqual('Foo/Bar/foo')
        expect(target`root: foo;``dir: bar;``base: baz;`({})).toEqual('bar/baz')
        expect(target`root: foo;``base: bar;``ext: baz;` + '').toEqual('Foo/Bar/bar')
        expect(target`root: foo;``name: bar;``ext: baz;`.toString()).toEqual('Foo/Bar/barbaz')
    })
    it('to string with parsed path', () => {
        expect(parsed(target`base: foo;``name: bar;``ext: baz;`) + '').toEqual('Foo/Bar/foo')
        expect(parsed(target`root: foo;``dir: bar;`)`base: baz;` + '').toEqual('bar/baz')
        expect(parsed(target`root: foo;`)`base: bar;``ext: baz;` + '').toEqual('Foo/Bar/bar')
        expect(parsed(target)`root: foo;``name: bar;``ext: baz;` + '').toEqual('Foo/Bar/barbaz')
    })
})

describe('override with props', () => {
    let parsed: any, target: any
    const foo = {$: 'foo'}, $ = ($: any) => $.$, $foo = ($: any) => $.$ || 'foo'
    beforeEach(() => {
        parsed = resetParsed().posix
        target = parsed`Foo``Bar``Baz`
    })
    it('to string without args', () => {
        expect(target`dir: ${$};`()).toEqual('Foo/Bar/Baz')
        expect(target`base: ${$};`(foo)).toEqual('Foo/Bar/foo')
        expect(target`root: ${$foo};` + '').toEqual('Foo/Bar/Baz')
        expect(target`name: ${({$='foo'}: any) => $};`.toString()).toEqual('Foo/Bar/foo')
    })
    it('to string with args', () => {
        expect(target`base: ${$};``name: bar;``ext: baz;`()).toEqual('Foo/Bar/barbaz')
        expect(target`root: ${$};``dir: bar;``base: baz;`(foo)).toEqual('bar/baz')
        expect(target`root: ${$foo};``base: bar;``ext: baz;` + '').toEqual('Foo/Bar/bar')
        expect(target`root: ${$foo};``name: bar;``ext: baz;`.toString()).toEqual('Foo/Bar/barbaz')
    })
    it('to string parsed path', () => {
        expect(parsed(target`base: ${$};``name: bar;`)`ext: baz;`()).toEqual('Foo/Bar/barbaz')
        expect(parsed(target`root: ${$};``dir: bar;`)`base: baz;`(foo)).toEqual('bar/baz')
        expect(parsed(target`root: ${$foo};``base: bar;`)`ext: baz;` + '').toEqual('Foo/Bar/bar')
        expect(parsed(target`root: ${$foo};``name: bar;`)`ext: baz;`.toString()).toEqual('Foo/Bar/barbaz')
    })
})

describe('override with attrs', () => {
    let parsed: any, target: any;
    beforeEach(() => {
        parsed = resetParsed().posix
        target = parsed`Foo``Bar``Baz`
    })
    const foo = {$: 'foo'}, ignore = {$: 'ignore'}, $ = ($: any) => $.$
    it('to string without args', () => {
        expect(target.withAttrs(foo)`dir: ${$};`()).toEqual('foo/Baz')
        expect(target.withAttrs(foo)`base: ${$};`(foo)).toEqual('Foo/Bar/foo')
        expect(target.withAttrs(foo)`root: ${$};`()).toEqual('Foo/Bar/Baz')
        expect(target.withAttrs(foo)`name: ${$};`(foo)).toEqual('Foo/Bar/foo')
    })
    it('to string with args', () => {
        expect(target.withAttrs(foo)`base: ${$};``name: bar;``ext: baz;` + '').toEqual('Foo/Bar/foo')
        expect(target`root: ${$};`.withAttrs(ignore)`dir: bar;``base: baz;`(foo) + '').toEqual('bar/baz')
        expect(target`root: ${$};``base: bar;`.withAttrs(foo)`ext: baz;` + '').toEqual('Foo/Bar/bar')
        expect(target`root: ${$};``name: bar;``ext: baz;`.withAttrs(ignore)(foo) + '').toEqual('Foo/Bar/barbaz')
    })
    it('to string with parse path', () => {
        expect(parsed(target.withAttrs(foo)`base: ${$};``name: bar;`)`ext: baz;`() + '').toEqual('Foo/Bar/foo')
        expect(parsed(target`root: ${$};`.withAttrs(ignore)`dir: bar;`)`base: baz;`(foo) + '').toEqual('bar/baz')
        expect(parsed(target`root: ${$};``base: bar;`).withAttrs(foo)`ext: baz;` + '').toEqual('Foo/Bar/bar')
        expect(parsed(target`root: ${$};``name: bar;`)`ext: baz;`.withAttrs(ignore)(foo) + '').toEqual('Foo/Bar/barbaz')
    })
})

describe('override from args', () => {
    let parsed: any, target: any
    beforeEach(() => {
        parsed = resetParsed().posix
        target = parsed`Foo``Bar``Baz`
    })
    it('format static', () => {
        expect(parsed(target`base: foo;``name: bar;``ext: baz;`) + '').toEqual('Foo/Bar/foo')
        expect(parsed(target`root: foo;``dir: bar;`)`base: baz;` + '').toEqual('bar/baz')
        expect(parsed(target`root: foo;`)`base: bar;``ext: baz;` + '').toEqual('Foo/Bar/bar')
        expect(parsed(target)`root: foo;``name: bar;``ext: baz;` + '').toEqual('Foo/Bar/barbaz')
    })
})
