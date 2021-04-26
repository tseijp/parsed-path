import { parsedEntries, resetParsed } from '../../src'

const location = new URL('https://tsei.jp/note/api/user/100')

describe('defined parsed tag', () => {
    let parsed: any,
     windowSpy: any
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

    it('should have all paths defined', () => {
        parsedEntries.forEach(([tag]) => {
            expect(parsed[tag]).toBeTruthy()
        })
    })
    // it('ERROR: should have all tags defined', () => {
    //     const targets = location.pathname.split('/').filter(Boolean)
    //     targets.forEach(tag => {
    //         expect(parsed[tag]).toBeTruthy()
    //     })
    // })
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
    // it('basic utils', () => {
    //     const path = parsed`src``utils`
    //     const file = path`..``index.js`
    //     expect(path.mount`test` + '').toEqual('test/src/utils')
    //     expect(path.from`src` + '').toEqual('utils')
    //     expect(path.to`src` + '').toEqual('..')
    //     expect(file.move`test`).toEqual('src/test/index.ts')
    //     expect(file.name`.tsx`).toEqual('index.tsx')
    // })
})
