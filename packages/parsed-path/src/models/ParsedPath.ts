import { Pathname } from './Pathname'
import { parsed, PathSet, Construction } from '../constructors'
import { is, resolveAttrs, generatePathId, generateParsedId, generateDisplayName } from '../utils'

export interface ParsedPath extends Construction {
    pathId: string
    parsedId: string
    displayId: string
    attrs: object | ((arg: object) => object)
    pathname: Pathname
    isStatic: boolean
    toString: () => string
    normalize: () => string
}

export function ParsedPath (tags: PathSet, options: object, args?: PathSet): ParsedPath

export function ParsedPath (tags: [ParsedPath, ...any], options: object, args?: PathSet): ParsedPath

export function ParsedPath (tags: any, options: any, args: any=[]) {
    const [tag] = tags,
          [arg] = args,
        isTagParsedPath = !is.str(tag) && is.str(tag?.parsedId),
        isArgParsedPath = !is.str(arg) && is.str(arg?.parsedId),
        isCompositePath = !is.str(tag) || is.big(tag.charAt(0))

    const {
        attrs = [],
        pathId = generatePathId(options.displayId, options.parentPathId),
        parsedId = generateParsedId(options.displayId, options.pathId, pathId),
        displayId = generateDisplayName(tag, isCompositePath)
    } = options

    const finalAttrs = isTagParsedPath && tag.attrs
        ? Array.prototype.concat(tag.attrs, attrs).filter(Boolean)
        : attrs

    const pathname = new Pathname(
        pathId,
        isTagParsedPath && tag.pathname,
       !isTagParsedPath && tags,
       !isArgParsedPath && args,
        isArgParsedPath && arg.pathname?.pathSets,
    )

    const WrappedParsedPath = (props: any={}, ...next: any) => is.obj(props)
        ? pathname.pure(options.pure, resolveAttrs(props, finalAttrs), ...next)
        : parsed(WrappedParsedPath)(props, ...next)

    WrappedParsedPath.attrs = finalAttrs
    WrappedParsedPath.pathId = pathId
    WrappedParsedPath.parsedId = parsedId
    WrappedParsedPath.displayId = displayId

    WrappedParsedPath.pathname = pathname
    WrappedParsedPath.isStatic = pathname.isStatic && attrs.length === 0
    WrappedParsedPath.toString = () => WrappedParsedPath()
    WrappedParsedPath.normalize = () => pathname.normalize()

    WrappedParsedPath.mount = (...next: any) => parsed(WrappedParsedPath).mount(...next)
    WrappedParsedPath.pure = (...next: any) => parsed(WrappedParsedPath).pure(...next)
    WrappedParsedPath.from = (...next: any) => parsed(WrappedParsedPath).from(...next)
    WrappedParsedPath.to = (...next: any) => parsed(WrappedParsedPath).to(...next)

    WrappedParsedPath.withAttrs = (...next: any) => parsed(WrappedParsedPath).withAttrs(...next)
    WrappedParsedPath.withConfig = (next: any) => parsed(WrappedParsedPath).withCinfig(next)

    return WrappedParsedPath as ParsedPath
}
