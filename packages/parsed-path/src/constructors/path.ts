import { parse } from 'path'
import {interleave, flatten, is, Path, PathSet, RuleSet} from '../utils';

export function path (paths?: PathSet): RuleSet

export function path (paths: URL, ...interpolations: PathSet): RuleSet

export function path (paths: Path, ...interpolations: PathSet): RuleSet

export function path (paths: TemplateStringsArray, ...interpolations: PathSet): RuleSet

export function path (paths?: any, ...interpolations: any) {
    if (is.url(paths))
        return flatten(interleave([], [parse(paths.pathname), ...interpolations]))

    if (is.fun(paths) || is.obj(paths))
        return flatten(interleave([], [paths, ...interpolations]));

    if (is.len(0, interpolations) && is.len(1, paths) && is.str(paths[0]))
        return paths;

    return flatten(interleave(paths, interpolations));
}
