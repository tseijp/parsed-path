import { primitives, resetParsed, Parsed } from '../../src'
import styled from 'styled-components'
import renderer from 'react-test-renderer';
// const LOCATION = new URL('https://tsei.jp/note/api/user/100')

describe('multi generate', () => {
    let parsed: Parsed['posix'];
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('without pathform', () => {
        const Root = parsed`/${(_: any) => _.number}`
        let i = 0
        for (;;)
            if (i >= 10) break
            else expect(Root({number: ++i}) + "").toEqual(`/${i}`)
    })
    it('with pathform', () => {
        const Root = parsed`name: ${(_: any) => _.number};ext: js;`
        let i = 0
        for (;;)
            if (i >= 0) break
            else expect(Root({number: ++i}) + "").toEqual(`${i}.js`)
    })
})

describe('defined parsed tag', () => {
    let parsed: Parsed
    beforeEach(() => {
        parsed = resetParsed()
    })
    it('ERROR: should have all tags defined', () => {
        if (typeof window !== 'undefined')
            window.location.pathname.split('/').forEach(tag => {
                expect(parsed[tag || 'top']).toBeTruthy()
            })
    })
    it('should have all paths defined', () => {
        primitives.forEach((key) => {
            expect(parsed[key]).toBeTruthy()
        })
    })
})

describe('examles', () => {
    let parsed: Parsed
    beforeEach(() => {
        parsed = resetParsed()
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
        // @ts-expect-error someday they'll handle imperative assignment properly
        const GITHUB = parsed.https`github.com`
        const TSEIJP = GITHUB`tseijp`
        expect(GITHUB + "").toEqual('https://github.com')
        expect(TSEIJP + "").toEqual('https://github.com/tseijp')
    })
    it('as props', () => {
        const Root = parsed.posix`/`
        const as = styled.button``
        const el = renderer.create(Root({as}));
        expect(el).toBeTruthy();
    })
})
