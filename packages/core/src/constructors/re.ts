import { path, PathSet, RuleSet } from './path'
import { ParsedPath } from '../models'
import { is } from '../utils'

export type Attrs =
    | object
    | ((props: object) => object)

export type Config = Partial<{
    /**
     *  Inherited config.
     */
    as: (props: any) => null | JSX.Element
    key: string
    pure: boolean
    attrs: Attr[]
    isWin: boolean
    isQuery: boolean

    /**
     *  Temporary Config.
     */
    mount: PathSet
    from: PathSet
    to: PathSet
    q: PathSet
}>

export interface Construction<Model=ParsedPath> {
    (...args: RuleSet): string | Model
    toString (arg?: object, ...args: any[]): string | Model
    withConfig (next: any, prev?: Config): Construction
    withAttrs (next: any, prev?: Config): Construction
    mount (...args: any):  ParsedPath
    from (...args: any):  ParsedPath
    to (...args: any):  ParsedPath
    q (...args: any): ParsedPath
}

export function re (
    constructor: (...args: any[]) => ParsedPath,
    config: Config,
    ...tags: RuleSet
): Construction

export function re (constructor: any, config: any, ...tags: any) {
    const _: Construction = (...args) => constructor(path(...tags), config)(...args)

    _.withConfig = (to, from={}) => re(constructor, {...from, ...config, ...to}, ...tags)
    _.withAttrs = (to, from={}) => re(constructor, {...from, ...config, attrs:
        Array.prototype.concat(config.attrs, from.attrs, to).filter(Boolean),
    }, ...tags)
    _.toString = (...args) => _(...args)
    _.mount = (...args) => constructor(path(...args), {...config, mount: path(...tags)})
    _.from = (...args) => constructor(path(...args), {...config, from: path(...tags)})
    _.to = (...args) => constructor(path(...args), {...config, to: path(...tags)})
    _.q = (...args) => constructor(path(...args), {...config, q: path(...tags), isQuery: true})

    return _
}
