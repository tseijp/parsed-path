/*    ┌──────────────────────┬────────────┐
 *    │           dir        │    base    │
 *    ├──────┬               ├──────┬─────┤
 *    │ root │               │ name │ ext │
parsed`    /``home``user``dir``file``.txt `
parsed` C:\\``      path``dir``file``.txt `
 *    └──────┴───────────────┴──────┴─────┘
 * t: `dir``base``ext`  => foo\\bar.baz
 * l: `base``name``ext` => bar.baz
 * b: `root``name``ext` => foo\\bar.baz
 * r: `root``dir``name` => foo\\bar\\baz
 */
import { resetParsed } from '../../utils'

describe('format static', () => {
    let parsed: any
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('to string without args', () => {
        expect(parsed`dir: foo;`()).toEqual('foo/.') // not ('foo/bar.baz')
        expect(parsed`base: foo;`({})).toEqual('foo')
        expect(parsed`root: foo;` + '').toEqual('foo.') //not ('foo')
        expect(parsed`name: foo;`.toString()).toEqual('.') //not ('foo')
    })
    it('to string with args', () => {
        expect(parsed`dir: foo;``name: bar;``ext: baz;`()).toEqual('foo/foo')// ('foo/bar.baz')
        expect(parsed`base: foo;``name: bar;``ext: baz;`({})).toEqual('foo') // ('bar.baz')
        expect(parsed`root: foo;``name: bar;``ext: baz;` + '').toEqual('foofoo.') // ('foo/bar.baz')
        expect(parsed`root: foo;``dir: bar;``name: baz;`.toString()).toEqual('bar/bar')//('foo/bar/baz')
    })
    it('to string with parsed path', () => {
        expect(parsed(parsed`dir: foo;``name: bar;``ext: baz;`) + '').toEqual('foo/foo') // ('foo/bar.baz')
        expect(parsed(parsed`base: foo;``name: bar;`)`ext: baz;` + '').toEqual('foo') // ('bar.baz')
        expect(parsed(parsed()`root: foo;`)`name: bar;``ext: baz;` + '').toEqual('foofoofoo.') // ('foo/bar.baz')
        expect(parsed(parsed()``)`root: foo;``dir: bar;``name: baz;` + '').toEqual('bar/foo.')// ('foo/bar/baz')
    })
})

describe('TODO: format with props', () => {
    let parsed: any
    const foo = {_: 'foo'}
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('to string without args', () => {
    //     expect(parsed`dir: ${({_}: any) => _};`()).toEqual('.')
    //     expect(parsed`base: ${({_}: any) => _};`(foo)).toEqual('foo')
    //     expect(parsed`root: ${({_}: any) => _||'foo'};` + '').toEqual('foo')
    //     expect(parsed`name: ${({_='foo'}: any) => _};`.toString()).toEqual('foo')
    // })
    // it('to string with args', () => {
    //     expect(parsed`dir: ${({_}: any) => _};``base: bar;``ext: baz;`()).toEqual('bar.baz')
    //     expect(parsed`base: ${({_}: any) => _};``name: bar;``ext: baz;`(foo)).toEqual('bar.baz')
    //     expect(parsed`root: ${({_}: any) => _||'foo'};``name: bar;``ext: baz;` + '').toEqual('foo/bar.baz')
    //     expect(parsed`root: ${({_='foo'}: any) => _};``dir: bar;``name: baz;`.toString()).toEqual('foo/bar/baz')
    // })
    // it('to string parsed path', () => {
    //     expect(parsed(parsed`dir: ${({_}: any) => _};``base: bar;`)`ext: baz;`()).toEqual('bar.baz')
    //     expect(parsed(parsed`base: ${({_}: any) => _};``name: bar;`)`ext: baz;`(foo)).toEqual('bar.baz')
    //     expect(parsed(parsed`root: ${({_}: any) => _ || 'foo'};``name: bar;`)`ext: baz;` + '').toEqual('foo/bar.baz')
    //     expect(parsed(parsed`root: ${({_='foo'}: any) => _};``dir: bar;`)`name: baz;`.toString()).toEqual('foo/bar/baz')
    })
})

describe('TODO: format with attrs', () => {
    let parsed: any
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    const foo = {_: 'foo'}, bar = {_: 'bar'}
    it('to string without args', () => {
    //     expect(parsed().withAttr(foo)`dir: ${({_}: any) => _};` + '').toEqual('foo')
    //     expect(parsed().withAttr(foo)`base: ${({_}: any) => _};`(bar) + '').toEqual('bar')
    //     expect(parsed().withAttr(foo)`root: ${({_}: any) => _||'xxx'};` + '').toEqual('foo')
    //     expect(parsed().withAttr(foo)`name: ${({_='xxx'}: any) => _};`(bar) + '').toEqual('bar')
    // })
    // it('to string with args', () => {
    //     expect(parsed().withAttrs(foo)`dir: ${({_}: any) => _};``base: bar;``ext: baz;` + '').toEqual('foo/bar.baz')
    //     expect(parsed`base: ${({_}: any) => _}`.withAttrs(foo)`name: bar;``ext: baz;`(bar) + '').toEqual('bar.baz')
    //     expect(parsed`root: ${({_}: any) => _||'xxx'}``name: bar;`.withAttrs(foo)`ext: baz;` + '').toEqual('foo/bar.baz')
    //     expect(parsed`root: ${({_='xxx'}: any) => _}``dir: bar;``name: baz;`.withAttrs(foo)(bar) + '').toEqual('bar/bar/baz')
    // })
    // it('to string with parse path', () => {
    //     expect(parsed(parsed().withAttrs(foo)`dir: ${({_}: any) => _};``base: bar;`)`ext: baz;`() + '').toEqual('bar.baz')
    //     expect(parsed(parsed`base: ${({_}: any) => _};`.withAttrs(foo)`name: bar;`)`ext: baz;`(bar) + '').toEqual('bar.baz')
    //     expect(parsed(parsed`root: ${({_}: any) => _ || 'foo'};``name: bar;`).withAttrs(foo)`ext: baz;` + '').toEqual('foo/bar.baz')
    //     expect(parsed(parsed`root: ${({_='xxx'}: any) => _};``dir: bar;`)`name: baz;`.withAttrs(foo)(bar) + '').toEqual('bar/bar/baz')
    })
})
