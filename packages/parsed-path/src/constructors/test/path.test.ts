import { path } from '../path'

describe('path', () => {
    it('merge strings', () => {
        expect(path`foo${false}bar${undefined}baz${null}`).toEqual(['foo', 'bar', 'baz'])
        expect(path`foo${0}bar${NaN}baz${-1}`).toEqual(['foo', '0', 'bar', 'NaN', 'baz', '-1'])
        expect(path`foo, bar, baz`).toEqual(['foo, bar, baz'])
        expect(path`${1}${true}`).toEqual(['1', 'true'])
        expect(path`${1}${2}${[3, 4, 5]}${{come:'on'}}${{lets: 'ride'}}`)
            .toEqual(['1', '2', '3', '4', '5', 'come:on;', 'lets:ride;'])
    })

    it('defers functions', () => {
        const str = ({bool=true}) => (bool ? 'bar' : 'baz')
        const arr = () => ['static', ({bool=true}) => (bool ? 'bar' : 'baz')]
        expect(path`foo${str}baz`).toEqual(['foo', str, 'baz'])
        expect(path`foo${arr}baz`).toEqual(['foo', arr, 'baz'])
    })

    it('toStrings class instances', () => {
        class SomeClass { toString() {return 'some'} }
        expect(path`${new SomeClass()}`).toEqual(['some'])
    })

    it('without interpolations', () => {
        const str = ({bool=true}) => (bool ? 'bar' : 'baz')
        const obj = {foo: 'bar'}
        expect(path()).toEqual([])
        expect(path(str)).toEqual([str])
        expect(path(obj)).toEqual(['foo:bar;'])
    })
})
