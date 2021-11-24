import { Pathform } from './Pathform'
import { Pathname } from './Pathname'
import { re, path, Attrs, Config, PathSet, Construction } from '../constructors'
import { is, generatePathId, generateParsedId, generateDisplayName } from '../utils'

export interface ParsedPath extends Construction {
    pathId: string
    parsedId: string
    displayId: string
    attrs: Attrs
    config: Config
    pathname: Pathname
    pathform: Pathform
    isStatic: boolean
}

export function ParsedPath (tags: PathSet, config: Config, args?: PathSet): ParsedPath

export function ParsedPath (tags: [ParsedPath, ...any[]], config: Config, args?: PathSet): ParsedPath

export function ParsedPath (tags: any, config: any, args: any=[]) {
    const [tag] = tags,
          [arg] = args,
        isTagParsedPath = !is.str(tag) && is.str(tag?.parsedId),
        isArgParsedPath = !is.str(arg) && is.str(arg?.parsedId),
        isCompositePath = !is.str(tag) || is.big(tag.charAt(0))

    /**
     * attach and resolve config. todo delete
     */
    config.pathId = generatePathId(config.displayId, config.parentPathId)
    config.parsedId = generateParsedId(config.displayId, config.pathId, config.pathId)
    config.displayId = generateDisplayName(tag, isCompositePath)
    config.attrs = isTagParsedPath && tag.attrs
        ? Array.prototype.concat(tag.attrs, config.attrs).filter(Boolean)
        : config.attrs || []

    /**
     *  construct pathname and pathform
     */
    const pathname = new Pathname (
        isTagParsedPath && tag.pathname,
       !isTagParsedPath && tags,
       !isArgParsedPath && args,
        isArgParsedPath && arg.pathname?.pathSets
    )

    const pathform = new Pathform (
        config.isWin? 'win32': 'posix',
        config.pure? 'resolve': 'join',
        isTagParsedPath && tag.pathform,
    )

    /**
     * return ParsedPath
     */
    const _: ParsedPath = (props={}, ...other: any[]): any => is.obj(props)
        ? pathname.generate(pathform, props, config)
        : ParsedPath(path(_), config, path(props, ...other))

    _.attrs = config.attrs
    _.config = config
    _.pathId = config.pathId
    _.parsedId = config.parsedId
    _.displayId = config.displayId

    _.pathname = pathname
    _.pathform = pathform
    _.isStatic = pathname.isStatic && is.len(0, config.attrs)

    _.withConfig = (to, from={}) => re(ParsedPath, config, _).withConfig(to, from)
    _.withAttrs = (to, from={}) => re(ParsedPath, config, _).withAttrs(to, from)
    _.toString = (...args) => _(...args)
    _.mount = (...args) => re(ParsedPath, config, _).mount(...args)
    _.from = (...args) => re(ParsedPath, config, _).from(...args)
    _.to = (...args) => re(ParsedPath, config, _).to(...args)
    _.q = (...args) => re(ParsedPath, config, _).q(...args)

    return _
}
