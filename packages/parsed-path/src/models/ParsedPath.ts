import { parsed } from '../constructors';
import { is, RuleSet } from '../utils';
import { Pathname, IPathname } from './Pathname';
import { generatePathId, generateParsedId, generateDisplayName } from '../utils';

export interface IParsedPath {
    attrs: any[]
    pathId: string
    parsedId: string
    displayName: string
    pathname: IPathname
    isStatic: boolean
    toString: () => string
}

export function ParsedPath (targets: RuleSet[], options: object, paths: RuleSet[]): IParsedPath

export function ParsedPath (targets: [IParsedPath], options: object, paths: RuleSet[]): IParsedPath

export function ParsedPath (targets: any, options: any, paths: any) {
    const [target] = targets;
    const {
        attrs = [],
        pathId = generatePathId(options.displayName, options.parentComponentId),
        parsedId = generateParsedId(options.displayName, options.pathId, pathId),
        displayName = generateDisplayName(target),
    } = options;

    const isCompositePathname = !is.str(target) || !is.big(target.charAt(0));
    const isTargetParsedPath = !is.str(target) && is.str(target?.parsedId);
    const isTargetRuleSets = !isTargetParsedPath && is.str(target)
    const finalAttrs = isTargetParsedPath && target.attrs
        ? target.attrs.concat(attrs).filter(Boolean)
        : attrs

    const ruleSets = isTargetRuleSets? [...targets, ...paths]: paths;
    const basePath = isTargetParsedPath? target.pathname: undefined;
    const pathname = Pathname(ruleSets, parsedId, basePath);
    const isStatic = pathname.isStatic && attrs.length === 0;

    const WrappedParsedPath = (...args: any) => is.obj(args[0]) || is.und(args[0])
        ? (pathname as any)(...args)
        : parsed(WrappedParsedPath)(...args)

    WrappedParsedPath.attrs = finalAttrs
    WrappedParsedPath.pathId = pathId
    WrappedParsedPath.parsedId = parsedId
    WrappedParsedPath.displayName = displayName

    WrappedParsedPath.isCompositePathname = isCompositePathname
    WrappedParsedPath.isTargetParsedPath = isTargetParsedPath
    WrappedParsedPath.isTargetRuleSets = isTargetRuleSets

    WrappedParsedPath.pathname = pathname
    WrappedParsedPath.isStatic = isStatic
    WrappedParsedPath.toString = () => WrappedParsedPath()

    return WrappedParsedPath as IParsedPath
}
