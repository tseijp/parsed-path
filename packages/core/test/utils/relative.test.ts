import { relative } from '../../src'
describe('relative static', () => {
    it('from', () => {
        expect(relative('', 'foo/bar/baz')).toEqual(['foo', 'bar', 'baz'])
        expect(relative('foo', 'foo/bar/baz')).toEqual(['bar', 'baz'])
        expect(relative('bar', 'foo/bar/baz')).toEqual(['..', 'foo', 'bar', 'baz'])
        expect(relative('baz', 'foo/bar/baz')).toEqual(['..', 'foo', 'bar', 'baz'])
        expect(relative('foo/bar', 'foo/bar/baz')).toEqual(['baz'])
        expect(relative('foo/baz', 'foo/bar/baz')).toEqual(['..', 'bar', 'baz'])
        expect(relative('bar/baz', 'foo/bar/baz')).toEqual(['..', '..', 'foo', 'bar', 'baz'])
        expect(relative('foo/bar/baz', 'foo/bar/baz')).toEqual([])
    })

    it('to', () => {
        expect(relative('foo/bar/baz')).toEqual(['..', '..', '..'])
        expect(relative('foo/bar/baz', 'foo')).toEqual(['..', '..'])
        expect(relative('foo/bar/baz', 'bar')).toEqual(['..', '..', '..', 'bar'])
        expect(relative('foo/bar/baz', 'baz')).toEqual(['..', '..', '..', 'baz'])
        expect(relative('foo/bar/baz', 'foo/bar')).toEqual(['..'])
        expect(relative('foo/bar/baz', 'foo/baz')).toEqual(['..', '..', 'baz'])
        expect(relative('foo/bar/baz', 'bar/baz')).toEqual(['..', '..', '..', 'bar', 'baz'])
        expect(relative('foo/bar/baz', 'foo/bar/baz')).toEqual([])
    })
})
