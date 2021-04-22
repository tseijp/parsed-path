import { resetParsed } from '../src'

describe('override format static', () => {
    let parsed: any, target: any
    beforeEach(() => {
        parsed = resetParsed().posix
        target = parsed`Foo``Bar``Baz`
    })
    it('to string without args', () => {
        expect(target`dir: foo;`()).toEqual('foo/Baz')
        expect(target`base: foo`({})).toEqual('Foo/Bar/foo')
        expect(target`root: foo` + '').toEqual('Foo/Bar/Baz')
        expect(target`name: foo`.toString()).toEqual('Foo/Bar/foo')
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

describe('reformat with props', () => {
    let parsed: any, target: any
    const foo = {_: 'foo'}
    beforeEach(() => {
        parsed = resetParsed().posix
        target = parsed`Foo``Bar``Baz`
    })
    it('to string without args', () => {
        expect(target`dir: ${({_}: any) => _};`()).toEqual('Foo/Bar/Baz')
        expect(target`base: ${({_}: any) => _};`(foo)).toEqual('Foo/Bar/Baz')
        expect(target`root: ${({_}: any) => _||'foo'};` + '').toEqual('Foo/Bar/Baz')
        expect(target`name: ${({_='foo'}: any) => _};`.toString()).toEqual('Foo/Bar/Baz')
    })
    it('to string with args', () => {
        expect(target`base: ${({_}: any) => _};``name: bar;``ext: baz;`()).toEqual('Foo/Bar/barbaz')
        expect(target`root: ${({_}: any) => _};``dir: bar;``base: baz;`(foo)).toEqual('Foo/Bar/baz')
        expect(target`root: ${({_}: any) => _||'foo'};``base: bar;``ext: baz;` + '').toEqual('Foo/Bar/Bazbaz')
        expect(target`root: ${({_='foo'}: any) => _};``name: bar;``ext: baz;`.toString()).toEqual('Foo/Bar/Bazbaz')
    })
    it('to string parsed path', () => {
        expect(parsed(target`base: ${({_}: any) => _};``name: bar;`)`ext: baz;`()).toEqual('Foo/Bar/barbaz')
        expect(parsed(target`root: ${({_}: any) => _};``dir: bar;`)`base: baz;`(foo)).toEqual('Foo/Bar/baz')
        expect(parsed(target`root: ${({_}: any) => _ || 'foo'};``base: bar;`)`ext: baz;` + '').toEqual('Foo/Bar/Bazbaz')
        expect(parsed(target`root: ${({_='foo'}: any) => _};``name: bar;`)`ext: baz;`.toString()).toEqual('Foo/Bar/Bazbaz')
    })
})
