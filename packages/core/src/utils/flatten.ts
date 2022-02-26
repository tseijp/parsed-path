/**
 * https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/flatten.js
 */
import { is } from './helpers'
import { Path, PathSet, Rule, primitives } from '../constructors'

const replaceChunkRe = /\s/g

export function flatten <P=unknown>(chunk: Rule | Path, props?: P): PathSet {
    if (is.fls(chunk))
        return []

    if (is.arr(chunk)) {
        const ruleSet = []
        for (let i = 0, path: Path; i < chunk.length; i++) {
            path = flatten(chunk[i], props)
            ruleSet.push(...Array.prototype.concat(path))
        }
        return ruleSet
    }

    if (is.fun(chunk))
        return props? flatten(chunk(props), props): [chunk as Path]

    if (is.str(chunk) && primitives.has(chunk))
        return [chunk]

    return (chunk + "").replace(replaceChunkRe, '').split('/')
}
