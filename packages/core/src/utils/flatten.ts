/**
 * https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/flatten.js
 */
import { is } from './helpers'
import { Path, PathSet, Rule, primitives } from '../constructors'

const replaceChunkRe = /\s/g

export function flatten (
    chunk: Rule | Path,
    props?: any
): PathSet

export function flatten (chunk: any, props?: any) {
    if (is.fls(chunk))
        return []

    if (is.arr(chunk)) {
        const ruleSet = []
        for (let i = 0, result: any; i < chunk.length; i++) {
            result = flatten(chunk[i], props)
            ruleSet.push(...Array.prototype.concat(result))
        }
        return ruleSet
    }

    if (is.fun(chunk))
        if (props)
            return flatten(chunk(props), props)
        else return [chunk]

    if (is.str(chunk) && primitives.has(chunk))
        return [chunk]

    return chunk.toString().replace(replaceChunkRe, '').split('/')
}
