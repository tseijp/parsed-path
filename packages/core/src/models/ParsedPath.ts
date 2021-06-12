import { Pathform } from './Pathform'
import { Pathname } from './Pathname'
import { construction as re, Attrs, Config, PathSet, Construction } from '../constructors'
import { is, generatePathId, generateParsedId, generateDisplayName } from '../utils'

export interface ParsedPath extends Construction {
    pathId: string
    parsedId: string
    displayId: string
    attrs: Attrs
    pathname: Pathname
    pathform: Pathform
    isStatic: boolean
    toString (): string
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

    const WrappedParsedPath = (prop: any={}, ...props: any) => is.obj(prop)
        ? pathname.generate(prop, pathform, {...config, pathId, attrs})
        : ParsedPath([WrappedParsedPath], config, [prop, ...props])

    WrappedParsedPath.attrs = attrs
    WrappedParsedPath.config = config
    WrappedParsedPath.pathId = pathId
    WrappedParsedPath.parsedId = parsedId
    WrappedParsedPath.displayId = displayId

    WrappedParsedPath.pathname = pathname
    WrappedParsedPath.pathform = pathform
    WrappedParsedPath.isStatic = pathname.isStatic && is.len(0, attrs)
    WrappedParsedPath.toString = () => WrappedParsedPath()

    WrappedParsedPath.mount = (...props: any) =>
        re(ParsedPath, config, WrappedParsedPath).mount(...props)
    WrappedParsedPath.from = (...props: any) =>
        re(ParsedPath, config, WrappedParsedPath).from(...props)
    WrappedParsedPath.to = (...props: any) =>
        re(ParsedPath, config, WrappedParsedPath).to(...props)
    WrappedParsedPath.withConfig = (props: any) =>
        re(ParsedPath, config, WrappedParsedPath).withConfig(props) //
    WrappedParsedPath.withAttrs = (props: any) =>
        re(ParsedPath, config, WrappedParsedPath).withAttrs(props)

    return WrappedParsedPath as ParsedPath
}
