import { interleave } from '../../src'

describe('interleave', () => {
    it('merge strings', () => {
        const tsa: any = ['foo', 'bar', 'baz', '']
        expect(interleave(tsa, [false, undefined, null])).toEqual(['foo', false, 'bar', undefined, 'baz', null, ''])
        expect(interleave(tsa, [0, NaN, -1])).toEqual(['foo', 0, 'bar', NaN, 'baz', -1, ''])
        expect(interleave(['foo, bar, baz'])).toEqual(['foo, bar, baz'])
    })

    it('defers', () => {
        const tsa = ['foo', 'baz'],
              str = ({bool=true}) => (bool ? 'bar' : 'baz'),
              arr = () => ['static', ({bool=true}) => (bool ? 'bar' : 'baz')],
              obj = {foo: 'bar'}
        expect(interleave(tsa, [str])).toEqual(['foo', str, 'baz'])
        expect(interleave(tsa, [arr])).toEqual(['foo', arr, 'baz'])
        expect(interleave(tsa, [obj])).toEqual(['foo', obj, 'baz'])
    })
})
