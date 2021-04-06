import { parsedTargets } from './parsed';
import { resetParsed } from '../utils';

let parsed: any;
const location = new URL("https://tsei.jp/note/api/user/100")
// const targets = location.pathname.split('/').filter(Boolean)

describe('parsed', () => {
    beforeEach(() => {
        parsed = resetParsed()
    })
    it('to string without target', () => {
        expect(parsed`/foo`()).toEqual('\\foo')
        expect(parsed`/foo`({})).toEqual('\\foo')
        expect(parsed`/foo` + "").toEqual('\\foo')
        expect(parsed`/foo`.toString()).toEqual('\\foo')

        expect(parsed`/foo``bar``baz`()).toEqual('\\foo\\bar\\baz')
        expect(parsed`/foo``bar``baz`({})).toEqual('\\foo\\bar\\baz')
        expect(parsed`/foo``bar``baz` + "").toEqual('\\foo\\bar\\baz')
        expect(parsed`/foo``bar``baz`.toString()).toEqual('\\foo\\bar\\baz')

        expect(parsed(parsed`/foo``bar``baz`) + "").toEqual('\\foo\\bar\\baz')
        expect(parsed(parsed`/foo``bar`)`baz` + "").toEqual('\\foo\\bar\\baz')
        expect(parsed(parsed`/foo```)`bar``baz` + "").toEqual('\\foo\\bar\\baz')
        expect(parsed(parsed`/```)`foo``bar``baz` + "").toEqual('\\foo\\bar\\baz')
    })

    // it('utils', () => {
    //    const path = parsed("src/utils")
    //    expect(path.mount`test` + "").toEqual("")
    //    expect(path.from`src` + "").toEqual("utils")
    //    expect(path.to`src` + "").toEqual("..")
    // })
})


describe('defined parse==d target', () => {
    // let windowSpy: any;
    // beforeEach(() => {
    //     const originalWindow = { ...window };
    //     parsed = resetParsed()
    //     windowSpy = jest.spyOn(global, "window", "get")
    //     windowSpy.mockImplementation(() => ({
    //         ...originalWindow,
    //         location
    //     }))
    // })
    //
    // afterEach(() => void windowSpy.mockRestore());

    // it('should have all paths defined', () => {
    //     Object.keys(parsedTargets).forEach(target => {
    //         expect(parsed[target]).toBeTruthy();
    //     });
    // });

    // it('ERROR: should have all targets defined', () => {
    //     targets.forEach(target => {
    //         expect(parsed[target]).toBeTruthy();
    //     });
    // });
});
