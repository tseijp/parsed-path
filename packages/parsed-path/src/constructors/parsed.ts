import { path } from './path';
// import { relative } from 'path';
import { ParsedPath, IParsedPath } from '../models';
import { is, RuleSet } from '../utils';

export function construction (
    constructor: (...args: any) => IParsedPath,
    targets: RuleSet[],
    options?: object
): (...args: any) => IParsedPath

export function construction (constructor: any, targets: any, options: any={}) {
    const templateFunction = (...args: any) => is.obj(args[0]) || is.und(args[0])
        ? constructor(targets, options, [])(...args)
        : constructor(targets, options, path(...args))

    templateFunction.toString = (...args: any) => templateFunction(...args)

    templateFunction.mount = (...mount: any) =>
        construction(constructor, path(mount, targets), options)

    templateFunction.from = (...from: any) =>
        construction(constructor, path(from, targets), options)

    templateFunction.to = (...to: any) =>
        construction(constructor, path(targets, to), options)

    templateFunction.withConfig = (config: any) =>
        construction(constructor, targets, {...options, ...config});

    templateFunction.attrs = (attrs: any) =>
        construction(constructor, targets, {...options,
            attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean),
        });

    return templateFunction;
}

const parsed: any = (...args: any) => construction(ParsedPath, path(...args))

const parsedTargets = {
    https: "https://",
    http: "http://",
    base: "./",
    root: "/"
}

/**
 * Shorthands for all valid Location Pathname
 * TODO

Object.entries(parsedTargets).forEach(([tag, paths]: any) => {
    parsed[tag] = parsed(paths)
})

window.location.pathname.split("/").reduce((paths, tag) => {
    if (tag)
        parsed[tag] = parsed(paths + '/' + tag)
    return paths + '/' + tag
})
 */

export { parsed, parsedTargets };
