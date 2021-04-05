import {interleave, flatten, is, RuleSet} from '../utils';

export function path(paths?: RuleSet): RuleSet

export function path(paths: RuleSet, ...interpolations: RuleSet[]): RuleSet

export function path(paths: any, ...interpolations: any) {
    if (is.fls(paths))
        return []

    if (is.fun(paths) || is.obj(paths))
        return flatten(interleave([], [paths, ...interpolations]));

    if (is.len(0, interpolations) && is.len(1, paths) && is.str(paths[0]))
        return paths;

    return flatten(interleave(paths, interpolations));
}
