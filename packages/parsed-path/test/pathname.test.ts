import { parsedEntries, resetParsed } from '../src'

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
        const Root = parsed.posix`/`
        const Path = Root`home``user``dir`;
        const Back = Path`
          ${(props: any) => props.back && '..'}
        `;
        const File = Back`file``
          name: file;
          ext: .ts${(props: any) => props.xml && 'x'};
        `;
        expect(Root()).toEqual('/')
        expect(Path()).toEqual('/home/user/dir')
        expect(Back({back: true})).toEqual('/home/user')
        expect(File({xml: false})).toEqual('/home/user/dir/file.ts')
    })

    it('should have all paths defined', () => {
        parsedEntries.forEach(([tag]) => {
            expect(parsed[tag]).toBeTruthy()
        })
    })

    // const targets = location.pathname.split('/').filter(Boolean)
    // it('ERROR: should have all tags defined', () => {
    //     targets.forEach(tag => {
    //         expect(parsed[tag]).toBeTruthy()
    //     })
    // })
})
