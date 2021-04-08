import { parsed, IConstruction } from '../constructors';
import { is, RuleSet } from '../utils';
import { Pathname } from './Pathname';
import { generatePathId, generateParsedId, generateDisplayName } from '../utils';

export interface IParsedPath extends IConstruction{
    pathId: string
    parsedId: string
    displayId: string
    attrs: object | ((arg: object) => object)
    pathname: Pathname
    isStatic: boolean
    toString: () => string
    normalize: () => string
}

function resolveAttrs (props: any, attrs: any[]) {
    const context = { ...props };

    attrs.forEach(attrImpl => {
        let key, attr = attrImpl;
        if (is.fun(attr))
            attr = attr(context);
        for (key in attr)
            context[key] = attr[key];
        });
    return context
}

export function ParsedPath (tags: RuleSet, options: object, paths?: RuleSet): IParsedPath

export function ParsedPath (tags: [IParsedPath, ...any], options: object, paths?: RuleSet): IParsedPath

export function ParsedPath (tags: any, options: any, paths: any=[]) {
    const [tag] = tags, [path] = paths;
    const {
        isPathParsedPath = !is.str(path) && is.str(path?.parsedId),
        isTagParsedPath = !is.str(tag) && is.str(tag?.parsedId),
        isCompositePath = !is.str(tag) || is.big(tag.charAt(0)),
        attrs = [],
        pathId = generatePathId(options.displayId, options.parentPathId),
        parsedId = generateParsedId(options.displayId, options.pathId, pathId),
        displayId = generateDisplayName(tag, isCompositePath)
    } = options;

    const finalAttrs = isTagParsedPath && tag.attrs
        ? tag.attrs.concat(attrs).filter(Boolean)
        : attrs

    const pathname = new Pathname(
        pathId,
        isTagParsedPath && tag.pathname,
        !isTagParsedPath && tags,
        !isPathParsedPath && paths,
        isPathParsedPath && path.pathname?.ruleSets,
    );

    const WrappedParsedPath = (props?: any, ...args: any) =>
        is.obj(props) || is.und(props)
            ? pathname.pure(options.pure, resolveAttrs(props, finalAttrs), ...args)
            : parsed(WrappedParsedPath)(props, ...args)

    WrappedParsedPath.attrs = finalAttrs
    WrappedParsedPath.pathId = pathId
    WrappedParsedPath.parsedId = parsedId
    WrappedParsedPath.displayId = displayId

    WrappedParsedPath.pathname = pathname
    WrappedParsedPath.isStatic = pathname.isStatic && attrs.length === 0;
    WrappedParsedPath.normalize = () => pathname.normalize()
    WrappedParsedPath.toString = () => WrappedParsedPath()

    WrappedParsedPath.pure = (...args: any) => parsed(WrappedParsedPath).pure(...args)
    WrappedParsedPath.mount = (...args: any) => parsed(WrappedParsedPath).mount(...args)
    WrappedParsedPath.from = (...args: any) => parsed(WrappedParsedPath).from(...args)
    WrappedParsedPath.to = (...args: any) => parsed(WrappedParsedPath).to(...args)
    WrappedParsedPath.withAttrs = (args: any) => parsed(WrappedParsedPath).attrs(args)
    WrappedParsedPath.withConfig = (args: any) => parsed(WrappedParsedPath).withCinfig(args)

    return WrappedParsedPath as IParsedPath
}
