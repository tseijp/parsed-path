import { parsedEntries } from '../parsed'
import { resetParsed } from '../../utils'

let parsed: any

describe('parsed static', () => {
    beforeEach(() => {
        parsed = resetParsed()
    })
    it('to string without args', () => {
        expect(parsed`foo`()).toEqual('foo')
        expect(parsed`foo`({})).toEqual('foo')
        expect(parsed`foo` + '').toEqual('foo')
        expect(parsed`foo`.toString()).toEqual('foo')
    })
    it('to string with args', () => {
        expect(parsed`foo``bar``baz`()).toEqual('foo\\bar\\baz')
        expect(parsed`foo``bar``baz`({})).toEqual('foo\\bar\\baz')
        expect(parsed`foo``bar``baz` + '').toEqual('foo\\bar\\baz')
    })
    it('tag as parsed path', () => {
        expect(parsed(parsed`foo``bar``baz`) + '').toEqual('foo\\bar\\baz')
        expect(parsed(parsed`foo``bar`)`baz` + '').toEqual('foo\\bar\\baz')
        expect(parsed(parsed()`foo`)`bar``baz` + '').toEqual('foo\\bar\\baz')
        expect(parsed(parsed()``)`foo``bar``baz` + '').toEqual('foo\\bar\\baz')
    })
})

describe('parsed with props', () => {
    beforeEach(() => {
        parsed = resetParsed()
    })
    it('to string without args', () => {
        expect(parsed`${({foo}: any) => foo}`()).toEqual('.')
        expect(parsed`${({foo}: any) => foo}`({foo: "foo"})).toEqual('foo')
        expect(parsed`${({foo}: any) => foo || 'foo'}` + '').toEqual('foo')
        expect(parsed`${({foo='foo'}: any) => foo}`.toString()).toEqual('foo')
    })
    it('to string with args', () => {
        expect(parsed`f${({o}: any) => [o, o]}``bar``baz`()).toEqual('f\\bar\\baz')
        expect(parsed`f${({o}: any) => [o, o]}``bar``baz`({o: "o"})).toEqual('foo\\bar\\baz')
        expect(parsed`f${({o}: any) => o? [o, o]: 'oo'}``bar``baz` + '').toEqual('foo\\bar\\baz')
        expect(parsed`f${({o = 'o'}: any) => [o, o]}``bar``baz`.toString()).toEqual('foo\\bar\\baz')
    })
    it('to string with args', () => {
        expect(parsed(parsed`f${({o}: any) => o}o``bar`)`baz`()).toEqual('fo\\bar\\baz')
        expect(parsed(parsed`f${({o}: any) => o}o``bar`)`baz`({o: "o"})).toEqual('foo\\bar\\baz')
        expect(parsed(parsed`f${({o}: any) => o || 'o'}o``bar`)`baz` + '').toEqual('foo\\bar\\baz')
        expect(parsed(parsed`f${({o = 'o'}: any) => o}o``bar`)`baz`.toString()).toEqual('foo\\bar\\baz')
    })
})

describe('defined parsed tag', () => {
    let windowSpy: any
    const location = new URL('https://tsei.jp/note/api/user/100')
    // const targets = location.pathname.split('/').filter(Boolean)

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
    //     targets.forEach(tag => {
    //         expect(parsed[tag]).toBeTruthy()
    //     })
    // })
})
