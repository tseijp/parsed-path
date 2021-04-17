import { parsedEntries, resetParsed } from '../src'

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
        const File = Back`ignore.ts``
          name: file;
          ext: ${(props: any) => props.xml && '.tsx'};
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