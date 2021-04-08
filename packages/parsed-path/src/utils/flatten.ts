/**
 * https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/flatten.js
 */
import { is } from './helpers'

export function flatten (
    chunk: undefined | null | false | "",
    props?: any,
): string

export function flatten (
    chunk: any[],
    exection?: any
): any[]

export function flatten <FunChunk=(...args: any) => any> (
    chunk: FunChunk,
    exection?: any
): string[] | FunChunk

export function flatten (chunk: any, props?: any) {
    if (is.fls(chunk))
        return ''

    if (is.str(chunk))
        return chunk

    if (is.arr(chunk)) {
        const ruleSet = []
        for (let i = 0, len = chunk.length, result: any; i < len; i += 1) {
            result = flatten(chunk[i], props)
            if (result === '') continue;
            if (is.arr(result)) ruleSet.push(...result)
            else ruleSet.push(result)
        }
        return ruleSet
    }

    if (is.fun(chunk)) {
        if (props)
            return flatten(chunk(props), props)
        else return chunk
    }

    if (is.obj(chunk) && chunk.constructor === Object)
        return Object.keys(chunk).map(k => `${k}:${(chunk as any)[k]};`).join()

    return chunk.toString()
}
