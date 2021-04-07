import { parsedEntries } from './parsed';
import { resetParsed } from '../utils';

let parsed: any;

describe('parsed isStatic', () => {
    beforeEach(() => {
        parsed = resetParsed()
    })
    it('to string without tags', () => {
        expect(parsed`foo`()).toEqual('foo')
        expect(parsed`foo`({})).toEqual('foo')
        expect(parsed`foo` + '').toEqual('foo')
        expect(parsed`foo`.toString()).toEqual('foo')
    })
    it('to string with tags', () => {
        expect(parsed`foo``bar``baz`()).toEqual('foo\\bar\\baz')
        expect(parsed`foo``bar``baz`({})).toEqual('foo\\bar\\baz')
        expect(parsed`foo``bar``baz` + '').toEqual('foo\\bar\\baz')
        expect(parsed`foo``bar``baz`.toString()).toEqual('foo\\bar\\baz')
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
    it('to string without tags', () => {
        // const obj = {foo: "foo"}
        // expect(parsed`${(props: any) => props.foo}`()).toEqual('.')
        // expect(parsed`${(props: any) => props.foo}`(obj)).toEqual('foo')
        // expect(parsed`${(props: any) => props.foo || 'bar'}` + '').toEqual('bar')
        // expect(parsed`${(props=obj) => props.foo}`.toString()).toEqual('bar')
    })
    // it('to string with tags', () => {
    //     expect(parsed`foo``bar``baz`()).toEqual('foo\\bar\\baz')
    //     expect(parsed`foo``bar``baz`({})).toEqual('foo\\bar\\baz')
    //     expect(parsed`foo``bar``baz` + '').toEqual('foo\\bar\\baz')
    //     expect(parsed`foo``bar``baz`.toString()).toEqual('foo\\bar\\baz')
    // })
    // it('tag as parsed path', () => {
    //     expect(parsed(parsed`foo``bar``baz`) + '').toEqual('foo\\bar\\baz')
    //     expect(parsed(parsed`foo``bar`)`baz` + '').toEqual('foo\\bar\\baz')
    //     expect(parsed(parsed()`foo`)`bar``baz` + '').toEqual('foo\\bar\\baz')
    //     expect(parsed(parsed()``)`foo``bar``baz` + '').toEqual('foo\\bar\\baz')
    // })
})



describe('defined parse==d tag', () => {
    let windowSpy: any;
    const location = new URL('https://tsei.jp/note/api/user/100')
    // const targets = location.pathname.split('/').filter(Boolean)

    beforeEach(() => {
        const originalWindow = { ...window };
        parsed = resetParsed()
        windowSpy = jest.spyOn(global, 'window', 'get')
        windowSpy.mockImplementation(() => ({
            ...originalWindow,
            location
        }))
    })

    afterEach(() => void windowSpy.mockRestore());

    it('should have all paths defined', () => {
        // parsedEntries.forEach(([tag]) => {
        //     expect(parsed[tag]).toBeTruthy();
        // });
    });

    // it('ERROR: should have all tags defined', () => {
    //     targets.forEach(tag => {
    //         expect(parsed[tag]).toBeTruthy();
    //     });
    // });
});
