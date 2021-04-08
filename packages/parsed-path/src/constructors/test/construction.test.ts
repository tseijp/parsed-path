import { resetParsed } from '../../utils';

describe('parsed utils', () => {
    let parsed: any;
    beforeEach(() => {
        parsed = resetParsed()
    })
    it('mount util', () => {
        expect(parsed`foo``bar``baz`.mount`` + '').toEqual('baz')
        expect(parsed`foo``bar``baz`.mount`.` + '').toEqual('baz')
        expect(parsed`foo``bar`.mount`baz` + '').toEqual('baz\\foo\\bar')
        expect(parsed()`foo`.mount`bar``baz` + '').toEqual('bar\\foo\\baz')
        expect(parsed()``.mount`foo``bar``baz` + '').toEqual('foo\\bar\\baz')
    })
    // it('TODO: from util', () => {
    //     expect(parsed(parsed`foo``bar``baz`).from`foo` + '').toEqual('bar\\baz')
    //     expect(parsed(parsed`foo``bar``baz`).from`bar` + '').toEqual('bar')
    //     expect(parsed(parsed`foo``bar``baz`).from`baz` + '').toEqual('.')
    // })
    // it('TODO: to util', () => {
    //     expect(parsed(parsed`foo``bar``baz`).to`foo` + '').toEqual('..\\..')
    //     expect(parsed(parsed`foo``bar``baz`).to`bar` + '').toEqual('..')
    //     expect(parsed(parsed`foo``bar``baz`).to`baz` + '').toEqual('.')
    // })
    // it('TODO: move util', () => {
    //     expect(parsed(parsed`foo``bar``baz``index.ts`).move`foo` + '').toEqual('foo\\index.ts')
    //     expect(parsed(parsed`foo``bar``baz``index.ts`).move`bar` + '').toEqual('foo\\bar\\index.ts')
    //     expect(parsed(parsed`foo``bar``baz``index.ts`).move`baz` + '').toEqual('foo\\bar\\baz\\index.ts')
    // })
    // it('TODO: name util', () => {
    //     expect(parsed(parsed`foo.ts`).name`foo` + 'foo').toEqual('foo.ts')
    //     expect(parsed(parsed`foo``bar.ts`).name`bar` + 'bar').toEqual('foo\\bar.bar')
    //     expect(parsed(parsed`foo``bar``baz.ts`).name`baz` + 'baz').toEqual('foo\\bar\\baz.baz')
    // })
    // it('TODO: all utils', () => {
    //     const path = parsed`src``utils`
    //     expect(parsed(path).mount`test` + '').toEqual('test\\src\\utils')
    //     expect(parsed(path).from`src` + '').toEqual('utils')
    //     expect(parsed(path).to`src` + '').toEqual('..')
    //
    //     const file = path`..``index.js`
    //     expect(parsed(file).move`test`).toEqual('src\\test\\index.ts')
    //     expect(parsed(file).name`.tsx`).toEqual('index.tsx')
    // })
})
