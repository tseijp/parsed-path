/**
 * https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/interleave.js
 */

import { PathSet, RuleSet } from '../constructors'
import { parsed } from '../constructors'

export function interleave (
    strings: TemplateStringsArray[],
    interpolations: RuleSet
): RuleSet

export function interleave(strings: any=[], interpolations: any=[]){
    const result = [strings[0]]
    for (let i = 0, len = interpolations.length; i < len; i += 1)
        result.push(interpolations[i], strings[i + 1])
    return result
}

export function resolveAttrs (props: any, attrs: any[]) {
    const context: any = {}
    attrs.forEach(attr => {
        if (is.fun(attr))
            attr = attr(context)
        for (let key in attr)
            context[key] = attr[key]
    })
    return { ...context, ...props }
}

export const resetParsed = (isServer = false) => {
    if (!isServer)
        if (!window.location)
            throw Error("no window.location")
    return parsed
}

const is = (a: any, b?: any, ...other: any): boolean => {
    if (other.length > 0) return is(a, b) && is(b, ...other)
    if (typeof a !== typeof b) return false
    if (is.str(a) || is.num(a)) return a === b
    if (is.obj(a) && is.obj(b) && is.len(0, a) && is.len(0, b)) return true
    let i
    for (i in a) if (!(i in b)) return false
    for (i in b) if (a[i] !== b[i]) return false
    return is.und(i) ? a === b : true
}

is.arr = Array.isArray
is.fls = (a: unknown): a is false => is.und(a) || is.nul(a) || a === false || a === ''
is.nul = (a: unknown): a is null => a === null
is.und = (a: unknown): a is undefined => a === void 0
is.num = (a: unknown): a is number => typeof a === "number"
is.str = (a: unknown): a is string => typeof a === "string"
is.fun = (a: unknown): a is Function => typeof a === "function"
is.obj = (a: unknown): a is object => Object.prototype.toString.call(a) === "[object Object]"
is.url = (a: unknown): a is URL => a instanceof URL
is.set = (a: unknown): a is Set<any> => a instanceof Set
is.map = (a: unknown): a is Map<any, any> => a instanceof Map
is.big = (a: unknown): a is string => is.str(a) && a === a.toUpperCase()
is.len = (l: number, a: unknown): a is object => a && (is.arr(a)? a: Object.keys(a)).length === l

export  { is }

/**
 * TODO: ralative paths without resolve
 * forked from https://github.com/nodejs/node/blob/master/lib/path.js
 */
export function relative (from: PathSet, to: PathSet): PathSet

export function relative(from: any, to: any) {
    const length = from.length > to.length? from.length: to.length

    let i = 0, lastCommonSep = -1
    for (; i < length; i++) {
        const fromCode = from.charCodeAt(1 + i)
        if (fromCode !== to.charCodeAt(1 + i))
            break
        else if (fromCode === 47)
            lastCommonSep = i
    }
    if (i === length)
        if (to.length > length) {
            if (to.charCodeAt(1 + i) === 47)
                return to.charCodeAt(1 + i + 1)
            if (i === 0)
                return to.charCodeAt(1 + i)
        } else if (from.length > length) {
            if (from.charCodeAt(1 + i) === 47)
                lastCommonSep = i
            else if (i === 0)
                lastCommonSep = 0
        }
    let out = ''
    for (i = 1 + lastCommonSep + 1; i <= from.length; ++i)
        if (i === from.length || from.charCodeAt(i) === 47)
            out += out.length === 0 ? '..' : '/..'

    return out
}
