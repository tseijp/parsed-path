/**
 * https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/flatten.js
 */
import { is } from './helpers'

export function flatten (
    chunk: undefined | null | false | "",
    execution?: any,
): string

export function flatten (
    chunk: any[],
    exection?: any
): any[]

export function flatten <FunChunk=(...args: any) => any> (
    chunk: FunChunk,
    exection?: any
): string[] | FunChunk

export function flatten (chunk: any, execution?: any) {
    if (is.fls(chunk))
        return ''

    if (is.arr(chunk)) {
        const ruleSet = []
        for (let i = 0, len = chunk.length, result: any; i < len; i += 1) {
            result = flatten(chunk[i], execution)
            if (result === '') continue;
            else if (is.arr(result)) ruleSet.push(...result)
            else ruleSet.push(result)
        }
        return ruleSet
    }

    if (is.fun(chunk)) {
        if (execution)
            return flatten(chunk(execution), execution)
        else return chunk
    }

    if (is.obj(chunk) && chunk.constructor === Object)
        return Object.keys(chunk).map(k => `${k}:${chunk[k]};`).join()

    return chunk.toString()
}
