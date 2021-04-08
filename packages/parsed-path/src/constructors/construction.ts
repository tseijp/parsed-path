import { path } from './path';
import { IParsedPath } from '../models';
import { is, relative, PathSet } from '../utils';

export interface IConstruction {
    toString: (...args: any) => string
    pure: (...args: any) => IParsedPath
    mount: (...args: any) => IParsedPath
    from: (...args: any) => IConstruction
    to: (...args: any) => IConstruction
    withAttrs: (args: any) => IConstruction
    withConfig: (args: any) => IConstruction
}

export function construction (
    constructor: (...args: any) => IParsedPath,
    tags: PathSet,
    options?: object
): IConstruction

export function construction (constructor: any, tags: any, options: any={}) {
    const templateFunction = (props?: any, ...args: any) =>
        is.obj(props) || is.und(props)
            ? constructor(path(...tags), options)(props, ...args)
            : constructor(path(...tags), options, path(props, ...args))

    templateFunction.toString = (...args: any) => templateFunction(...args)

    templateFunction.pure = (...args: any) =>
        constructor(path(...tags), {...options, pure: true}, path(...args))

    templateFunction.mount = (...mount: any) =>
        constructor(path(...mount), options, path(...tags))

    templateFunction.from = (...from: any) =>
        construction(constructor, relative(path(...from), path(...tags)), options)

    templateFunction.to = (...to: any) =>
        construction(constructor, relative(path(...tags), path(...to)), options)

    templateFunction.withAttrs = (attrs: any) =>
        construction(constructor, path(...tags), {...options,
            attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean),
        });

    templateFunction.withConfig = (config: any) =>
        construction(constructor, path(...tags), {...options, ...config});

    return templateFunction as IConstruction;
}
