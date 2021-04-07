import { path } from './path';
import { IParsedPath } from '../models';
import { is, relative, RuleSet } from '../utils';

export function construction(
    constructor: (...args: any) => IParsedPath,
    tags: RuleSet[],
    options?: object
): (...args: any) => IParsedPath

export function construction(
    constructor: (...args: any) => IParsedPath,
    tags: RuleSet[],
    options?: object
): (arg: object | undefined, ...args: any) => string

export function construction (
    constructor: (...args: any) => any,
    tags: any,
    options: any={}
) {
    const templateFunction = (...args: any) => is.obj(args[0]) || is.und(args[0])
        ? constructor(path(...tags), options)(...args)
        : constructor(path(...tags), options, path(...args))

    templateFunction.toString = (...args: any) => templateFunction(...args)

    templateFunction.pure = (...args: any) =>
        constructor(path(...tags), {...options, pure: true}, path(...args))

    templateFunction.mount = (...mount: any) =>
        constructor(path(...mount), options, path(...tags))

    templateFunction.from = (...from: any) =>
        construction(constructor, relative(path(...from), path(...tags)), options)

    templateFunction.to = (...to: any) =>
        construction(constructor, relative(path(...tags), path(...to)), options)

    templateFunction.withConfig = (config: any) =>
        construction(constructor, path(...tags), {...options, ...config});

    templateFunction.attrs = (attrs: any) =>
        construction(constructor, path(...tags), {...options,
            attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean),
        });

    return templateFunction;
}
