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

export function path (rules?: URL, ...interpolations: RuleSet): PathSet

export function path (rules?: Rule, ...interpolations: RuleSet): PathSet

export function path (rules?: TemplateStringsArray, ...interpolations: RuleSet): PathSet

export function path (rules?: any, ...interpolations: any) {
    if (is.url(rules))
        return flatten(interleave([], [rules.pathname, ...interpolations]))

    if (is.fun(rules) || is.obj(rules))
        return flatten(interleave([], [rules, ...interpolations]))

    if (is.len(0, interpolations)) {
        if (is.str(rules))
            return flatten(rules)
        if (is.len(1, rules) && is.str((rules as any)[0]))
            return rules
    }

    return flatten(interleave(rules, interpolations))
}
