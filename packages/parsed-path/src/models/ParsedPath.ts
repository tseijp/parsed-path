import { parsed } from '../constructors';
import { is, RuleSet } from '../utils';
import { Pathname } from './Pathname';
import { generatePathId, generateParsedId, generateDisplayName } from '../utils';

export interface IParsedPath {
    pathId: string
    parsedId: string
    displayId: string

    isPathParsedPath: boolean
    isTagParsedPath: boolean
    isPathRuleSets: boolean
    isTagRuleSets: boolean

    pathname: Pathname
    isStatic: boolean
    toString: () => string
}

function joinStrings (a: any, b: any) {
    return a && b ? `${a} ${b}` : a || b
}

function resolveAttrs (props: any, attrs: any[]) {
    const context = { ...props };
    const resolvedAttrs: any = {};

    attrs.forEach(inputAttr => {
        let key, attr = inputAttr;
        if (is.fun(attr))
            attr = attr(context);
        for (key in attr)
            context[key] = resolvedAttrs[key] =
                key === 'className'
                    ? joinStrings(resolvedAttrs[key], attr[key])
                    : attr[key];
        });
    return context
}

export function ParsedPath (tags: RuleSet[], options: object, paths?: RuleSet[]): IParsedPath

export function ParsedPath (tags: [IParsedPath], options: object, paths?: RuleSet[]): IParsedPath

export function ParsedPath (tags: any, options: any, paths: any=[]) {
    const [tag] = tags, [path] = paths;
    const {
        attrs = [],
        pathId = generatePathId(options.displayId, options.parentComponentId),
        parsedId = generateParsedId(options.displayId, options.pathId, pathId),
        displayId = generateDisplayName(tag),
    } = options;
    const isPathParsedPath = !is.str(path) && is.str(path?.parsedId)
    const isTagParsedPath = !is.str(tag) && is.str(tag?.parsedId)
    const isPathRuleSets = !isPathParsedPath && is.str(path)
    const isTagRuleSets = !isTagParsedPath && is.str(tag)
    const finalAttrs = isTagParsedPath && tag.attrs
        ? tag.attrs.concat(attrs).filter(Boolean)
        : attrs

    const pathname = new Pathname(
        parsedId,
        [...(isTagRuleSets && tags),
         ...(isPathRuleSets && paths),
         ...(isPathParsedPath && path.pathname?.ruleSets)
        ],  (isTagParsedPath && tag.pathname) || undefined
    );

    const WrappedParsedPath = (props?: any, ...args: any) =>
        is.obj(props) || is.und(props)
            ? pathname.pure(options.pure)(resolveAttrs(props, finalAttrs), ...args)
            : parsed(WrappedParsedPath)(props, ...args)

    WrappedParsedPath.pathId = pathId
    WrappedParsedPath.parsedId = parsedId
    WrappedParsedPath.displayId = displayId

    WrappedParsedPath.isPathParsedPath = isPathParsedPath
    WrappedParsedPath.isTagParsedPath = isTagParsedPath
    WrappedParsedPath.isPathRuleSets = isPathRuleSets
    WrappedParsedPath.isTagRuleSets = isTagRuleSets

    WrappedParsedPath.pathname = pathname
    WrappedParsedPath.isStatic = pathname.isStatic && attrs.length === 0;
    WrappedParsedPath.toString = () => WrappedParsedPath()

    WrappedParsedPath.mount = (...args: any) => parsed(WrappedParsedPath).mount(...args)
    WrappedParsedPath.from = (...args: any) => parsed(WrappedParsedPath).from(...args)
    WrappedParsedPath.to = (...args: any) => parsed(WrappedParsedPath).to(...args)


    return WrappedParsedPath as IParsedPath
}
