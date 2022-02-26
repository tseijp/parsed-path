import { path, PathSet, RuleSet } from './path'
import { ParsedPath } from '../models'

export type Attrs =
    | object
    | (<P extends Props=Props>(props: P) => P)

export type Props = Partial<{
    as: any // @TODO fix any
}>

export type Config = Partial<{
    /**
     *  Inherited config.
     */
    as: any // @TODO fix any
    key: string
    pure: boolean
    attrs: Attrs
    isWin: boolean
    isQuery: boolean

    /**
     *  Temporary Config.
     */
    mount: PathSet
    from: PathSet
    to: PathSet
    q: PathSet
    /**
     * Cofig
     */
    pathId: string
    parsedId: string
    displayId: string
    parentPathId: string
}>

export interface Construction<T=ParsedPath> {
    (...args: RuleSet): T // | string
    (arg?: object, ...args: RuleSet): string | T
    toString (arg?: object, ...args: RuleSet): string | T
    withConfig (next: Config, prev?: Config): Construction
    withAttrs (next: Attrs, prev?: Config): Construction
    mount (...args: RuleSet):  ParsedPath
    from (...args: RuleSet):  ParsedPath
    to (...args: RuleSet):  ParsedPath
    q (...args: RuleSet): ParsedPath
}

export function re (
    constructor: (...args: any[]) => ParsedPath, // @TODO fix any
    config: Config,
    ...tags: RuleSet
): Construction {
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
