import { resetParsed, resolvePath } from '../../src'

describe('resolvePath', () => {
    let parsed: any
    beforeEach(() => {
        parsed = resetParsed().posix
    })
    it('basic', () => {
        expect(resolvePath('foo')).toEqual('foo')
        expect(resolvePath(['foo'])).toEqual(['foo'])
    })
    it('props', () => {
        expect(resolvePath([parsed`foo``bar``baz`])).toEqual('foo/bar/baz')
        expect(resolvePath([parsed`${() => 'foo'}``${() => 'bar'}``${() => 'baz'}`])).toEqual('foo/bar/baz')
    })
})
