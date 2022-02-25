import type { RuleSet } from '../constructors'

export function interleave(
    strings: string[]=[],
    interpolations: RuleSet=[]
): RuleSet {
    const result: RuleSet = [strings[0]]
    for (let i = 0, len = interpolations.length; i < len; i += 1)
        result.push(interpolations[i], strings[i + 1])
    return result
}
