import { format } from '../../src'

describe('format with posix', () => {
    let _: any
    beforeEach(() => {
        _ = format.posix
    })
    it('simple', () => {
        expect(_({dir: 'foo'})).toEqual('foo/')
        expect(_({base: 'foo'})).toEqual('foo')
        expect(_({root: 'foo'})).toEqual('foo')
        expect(_({name: 'foo'})).toEqual('foo')
    })
    it('multi', () => {
        expect(_({base: 'foo', name: 'bar', ext: 'baz'})).toEqual('foo')
        expect(_({root: 'foo', dir: 'bar', base: 'baz'})).toEqual('bar/baz')
        expect(_({root: 'foo', base: 'bar', ext: 'baz'})).toEqual('foobar')
        expect(_({root: 'foo', name: 'bar', ext: 'baz'})).toEqual('foobarbaz')
    })
})

describe('format with win32', () => {
    let _: any
    beforeEach(() => {
        _ = format.win32
    })
    it('simple', () => {
        expect(_({dir: 'foo'})).toEqual('foo\\')
        expect(_({base: 'foo'})).toEqual('foo')
        expect(_({root: 'foo'})).toEqual('foo')
        expect(_({name: 'foo'})).toEqual('foo')
    })
    it('multi', () => {
        expect(_({base: 'foo', name: 'bar', ext: 'baz'})).toEqual('foo')
        expect(_({root: 'foo', dir: 'bar', base: 'baz'})).toEqual('bar\\baz')
        expect(_({root: 'foo', base: 'bar', ext: 'baz'})).toEqual('foobar')
        expect(_({root: 'foo', name: 'bar', ext: 'baz'})).toEqual('foobarbaz')
    })
})
