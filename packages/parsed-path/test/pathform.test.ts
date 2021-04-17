/*    ┌──────────────────────┬────────────┐
 *    │           dir        │    base    │
 *    ├──────┬               ├──────┬─────┤
 *    │ root │               │ name │ ext │
parsed`    /``home``user``dir``file``.txt `
parsed` C:\\``      path``dir``file``.txt `
 *    └──────┴───────────────┴──────┴─────┘
 * `base``name``ext` => foo      // two ignore
 * `root``dir``base` => bar/baz  // left ignore
 * `root``base``ext` => foobar   // right ignore
 * `root``name``ext` => foobarbaz
 */

import { resetParsed } from '../src'

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

describe('TODO: overwrite format static', () => {
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

describe('TODO: overwrite format with props', () => {
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
