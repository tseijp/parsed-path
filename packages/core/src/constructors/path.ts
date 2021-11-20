import {interleave, flatten, is} from '../utils'

export type Path =
    | string
    | ((props: any) => PathSet)
    | Path[]

export type Rule =
    | null
    | unknown
    | boolean
    | number
    | object
    | Path
    | Rule[]

export type RuleSet = Rule[]

export type PathSet = Path[]

/**
 *  @TODO COMMENT
 */
export function path (rules?: URL, ...interpolations: RuleSet): PathSet

export function path (rules?: Rule, ...interpolations: RuleSet): PathSet

export function path (rules?: TemplateStringsArray, ...interpolations: RuleSet): PathSet

export function path (rules?: any, ...interpolations: any) {
    if (is.len(1, rules))
        rules = rules[0]

    if (is.url(rules))
        return flatten(interleave([], [rules.pathname, ...interpolations]))

    if (is.fun(rules))
        return flatten(interleave([], [rules, ...interpolations]))

    if (is.obj(rules) && rules.constructor === Object)
        return flatten(interleave([], [
            Object.keys(rules).map(k => `${k}:${(rules as any)[k]};`).join(),
            ...interpolations
        ]))

    if (is.str(rules) && is.len(0, interpolations))
        return flatten(rules)

    return flatten(interleave(rules, interpolations))
}
