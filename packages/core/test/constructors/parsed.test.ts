import { primitives, resetParsed } from '../../src'
import {Pathname, Pathform} from '../../src'
const location = new URL('https://tsei.jp/note/api/user/100')

describe('multi generate', () => {
    let parsed: any;
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('basic', () => {
        const Root = parsed`/${(_: any) => _.number}`
        let i = 0
        for (;;)
            if (i < 10)
                expect(Root({number: ++i}) + "").toBe(`/${i}`)
            else break
    })
})

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
    // it('ERROR: should have all tags defined', () => {
    //     const targets = location.pathname.split('/').filter(Boolean)
    //     targets.forEach(tag => {
    //         expect(parsed[tag]).toBeTruthy()
    //     })
    // })

    it('test', () => {
        const pathname = new Pathname(undefined, ['https://', 'github.com'])
        const pathform = new Pathform('posix', 'join')
        expect(
            // ["https://", "github.com"]
            // pathname.generate({}, {generate: (names, other) => [names, other]} as any)
            pathname.generate({}, pathform)
        ).toEqual('https://github.com')
    })

    it('should have all paths defined', () => {
        primitives.forEach((key) => {
            expect(parsed[key]).toBeTruthy()
        })
    })
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
    it('using primitives', () => {
        const GITHUB = parsed.https`github.com`
        const TSEIJP = GITHUB`tseijp`
        expect(GITHUB + "").toEqual('https://github.com')
        expect(TSEIJP + "").toEqual('https://github.com/tseijp')
    })
    it('as props', () => {
        const Root = parsed.posix`/`
        const as = () => 'foo'
        expect(Root({as})).toEqual('foo')
    })
})
