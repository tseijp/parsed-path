import { parsedEntries } from '../parsed'
import { resetParsed } from '../../utils'

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

describe('defined parsed tag', () => {
    let parsed: any
    let windowSpy: any
    const location = new URL('https://tsei.jp/note/api/user/100')
    const targets = location.pathname.split('/').filter(Boolean)

    beforeEach(() => {
        const originalWindow = { ...window }
        parsed = resetParsed()
        windowSpy = jest.spyOn(global, 'window', 'get')
        windowSpy.mockImplementation(() => ({
            ...originalWindow,
            location
        }))
    })

    afterEach(() => void windowSpy.mockRestore())

    it('basic example', () => {
        const Root = parsed.posix`/`;
        const Path = Root`home``user``dir`;
        const Back = Path`
          ${(props: any) => props.back && '.'}.
        `;
        const File = Back`
          name: file;
          ext: ${(props: any) => props.ext};
        `;
        expect(File({ext: '.js'})).toEqual('/home/user/dir/file.js')
        expect(File({back: true})).toEqual('/home/user/file.txt')
    })

    it('should have all paths defined', () => {
        parsedEntries.forEach(([tag]) => {
            expect(parsed[tag]).toBeTruthy()
        })
    })

    // it('ERROR: should have all tags defined', () => {
    //     targets.forEach(tag => {
    //         expect(parsed[tag]).toBeTruthy()
    //     })
    // })
})
