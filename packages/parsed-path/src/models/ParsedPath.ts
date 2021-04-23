import { Pathform } from './Pathform'
import { Pathname } from './Pathname'
import { parsed, path, Attrs, Options, PathSet, Construction } from '../constructors'
import { is, resolveAttrs, generatePathId, generateParsedId, generateDisplayName } from '../utils'

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
        {attrs} = options,
        isTagParsedPath = !is.str(tag) && is.str(tag?.parsedId),
        isArgParsedPath = !is.str(arg) && is.str(arg?.parsedId),
        isCompositePath = !is.str(tag) || is.big(tag.charAt(0)),
        finalAttrs = isTagParsedPath && tag.attrs
            ? Array.prototype.concat(tag.attrs, attrs).filter(Boolean)
            : attrs || []

    const {
        pathId = generatePathId(options.displayId, options.parentPathId),
        parsedId = generateParsedId(options.displayId, options.pathId, pathId),
        displayId = generateDisplayName(tag, isCompositePath)
    } = options

    const pathname = new Pathname (
        isTagParsedPath && tag.pathname,
       !isTagParsedPath && tags,
       !isArgParsedPath && args,
        isArgParsedPath && arg.pathname?.pathSets // TODO TEST
    )

    const pathform = new Pathform (
        options.isWin? 'win32': 'posix',
        options.pure? 'resolve': 'join', // TODO TEST
        isTagParsedPath && tag.pathform,
    )

    const WrappedParsedPath = (props: any={}, ...next: any) => is.obj(props)
        ? pathname.generate(resolveAttrs(props, finalAttrs), pathId, pathform)
        : ParsedPath([WrappedParsedPath], options, [props, ...next])

    WrappedParsedPath.attrs = finalAttrs
    WrappedParsedPath.pathId = pathId
    WrappedParsedPath.parsedId = parsedId
    WrappedParsedPath.displayId = displayId

    WrappedParsedPath.pathname = pathname
    WrappedParsedPath.pathform = pathform
    WrappedParsedPath.isStatic = pathname.isStatic && is.len(0, attrs)
    WrappedParsedPath.toString = () => WrappedParsedPath()

    WrappedParsedPath.mount = (...next: any) => ParsedPath(path(...next), options, [WrappedParsedPath])
    WrappedParsedPath.from = (...next: any) => ParsedPath([WrappedParsedPath], options, path(...next))
    WrappedParsedPath.to = (...next: any) => ParsedPath([WrappedParsedPath], options, path(...next))

    WrappedParsedPath.withConfig = (next: any) => parsed(WrappedParsedPath).withConfig(next, options)
    WrappedParsedPath.withAttrs = (next: any) => parsed(WrappedParsedPath).withAttrs(next, options)

    return WrappedParsedPath as ParsedPath
}
