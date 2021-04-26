/**
 * https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/flatten.js
 */
import { is } from './helpers'
import { Path, PathSet, Rule } from '../constructors'

const replaceChunkRe = /\s/g

export function flatten (
    chunk: undefined | unknown | null | false | string,
    props?: any,
): string

export function flatten (
    chunk: Rule | Path,
    props?: any
): PathSet

export function flatten (chunk: any, props?: any) {
    if (is.fls(chunk))
        return ''

    if (is.arr(chunk)) {
        const ruleSet = []
        for (let i = 0, len = chunk.length, result: any; i < len; i += 1) {
            result = flatten(chunk[i], props)
            if (result === '') continue
            if (is.arr(result)) ruleSet.push(...result)
            else ruleSet.push(result)
        }
        return ruleSet
    }

    if (is.fun(chunk))
        if (props)
            return flatten(chunk(props), props)
        else return chunk

    if (is.obj(chunk) && chunk.constructor === Object)
        return Object.keys(chunk).map(k => `${k}:${(chunk as any)[k]};`).join()

    return chunk === '/' ? chunk  : chunk.toString().replace(replaceChunkRe, '').split('/')
}
