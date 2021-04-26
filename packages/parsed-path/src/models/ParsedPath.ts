import { Pathform } from './Pathform'
import { Pathname } from './Pathname'
import { construction as re, Attrs, Options, PathSet, Construction } from '../constructors'
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

export function ParsedPath (tags: PathSet, options: Options, args?: PathSet): ParsedPath

export function ParsedPath (tags: [ParsedPath, ...any[]], options: Options, args?: PathSet): ParsedPath

export function ParsedPath (tags: any, options: any, args: any=[]) {
    const [tag] = tags,
          [arg] = args,
        isTagParsedPath = !is.str(tag) && is.str(tag?.parsedId),
        isArgParsedPath = !is.str(arg) && is.str(arg?.parsedId),
        isCompositePath = !is.str(tag) || is.big(tag.charAt(0)),
        attrs = isTagParsedPath && tag.attrs
            ? Array.prototype.concat(tag.attrs, options.attrs).filter(Boolean)
            : options.attrs || []

    const {
        pathId = generatePathId(options.displayId, options.parentPathId),
        parsedId = generateParsedId(options.displayId, options.pathId, pathId),
        displayId = generateDisplayName(tag, isCompositePath)
    } = options

    const pathname = new Pathname (
        isTagParsedPath && tag.pathname,
       !isTagParsedPath && tags,
       !isArgParsedPath && args,
        isArgParsedPath && arg.pathname?.pathSets
    )

    const pathform = new Pathform (
        options.isWin? 'win32': 'posix',
        options.pure? 'resolve': 'join',
        isTagParsedPath && tag.pathform,
    )

    const WrappedParsedPath = (props: any={}, ...next: any) => is.obj(props)
        ? pathname.generate(props, pathform, {...options, pathId, attrs})
        : ParsedPath([WrappedParsedPath], options, [props, ...next])

    WrappedParsedPath.attrs = attrs
    WrappedParsedPath.pathId = pathId
    WrappedParsedPath.parsedId = parsedId
    WrappedParsedPath.displayId = displayId

    WrappedParsedPath.pathname = pathname
    WrappedParsedPath.pathform = pathform
    WrappedParsedPath.isStatic = pathname.isStatic && is.len(0, attrs)
    WrappedParsedPath.toString = () => WrappedParsedPath()

    WrappedParsedPath.mount = (...next: any) =>
        re(ParsedPath, [WrappedParsedPath], options).mount(...next)
    WrappedParsedPath.from = (...next: any) =>
        re(ParsedPath, [WrappedParsedPath], options).from(...next)
    WrappedParsedPath.to = (...next: any) =>
        re(ParsedPath, [WrappedParsedPath], options).to(...next)

    WrappedParsedPath.withConfig = (next: any) =>
        re(ParsedPath, [WrappedParsedPath], options).withConfig(next)
    WrappedParsedPath.withAttrs = (next: any) =>
        re(ParsedPath, [WrappedParsedPath], options).withAttrs(next)

    return WrappedParsedPath as ParsedPath
}
