import { Pathform } from './Pathform'
import { Pathname } from './Pathname'
import { re, Attrs, Config, PathSet, Construction } from '../constructors'
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
        isCompositePath = !is.str(tag) || is.big(tag.charAt(0)),
        attrs = isTagParsedPath && tag.attrs
            ? Array.prototype.concat(tag.attrs, config.attrs).filter(Boolean)
            : config.attrs || []

    const {
        pathId = generatePathId(config.displayId, config.parentPathId),
        parsedId = generateParsedId(config.displayId, config.pathId, pathId),
        displayId = generateDisplayName(tag, isCompositePath)
    } = config

    /**
     *  @TODO COMMENT
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
     *  @TODO COMMENT
     */
    const _: ParsedPath = (props={}, ...other: any[]) => is.obj(props)
        ? pathname.generate(props, pathform, {...config, pathId, attrs})
        : ParsedPath([_], config, [props, ...other])

    _.attrs = attrs
    _.config = config
    _.pathId = pathId
    _.parsedId = parsedId
    _.displayId = displayId

    _.pathname = pathname
    _.pathform = pathform
    _.isStatic = pathname.isStatic && is.len(0, attrs)

    _.withConfig = (to, from={}) => re(ParsedPath, config, _).withConfig(to, from)
    _.withAttrs = (to, from={}) => re(ParsedPath, config, _).withAttrs(to, from)
    _.toString = (...args) => (_ as any)(...args)
    _.mount = (...args) => re(ParsedPath, config, _).mount(...args)
    _.from = (...args) => re(ParsedPath, config, _).from(...args)
    _.to = (...args) => re(ParsedPath, config, _).to(...args)
    _.q = (...args) => re(ParsedPath, config, _).q(...args)


    return _ as ParsedPath
}
