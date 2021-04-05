import { Pathname, IPathname } from './Pathname'
import { is, RuleSet } from "../utils"
import { generateComponentId, generateParsedId, generateDisplayName } from '../utils'

export interface IParsedPath {
    target: RuleSet | IParsedPath
    options: object
    ruleSets: RuleSet
    componentId: string
    displayName: string
    parsedId: string
    pathname: IPathname
    isStatic: boolean
    toString: () => string
    mount: () => 'TODO'
    from: () => 'TODO'
    to: () => 'TODO'
    basename: () => 'TODO'
    dirname: () => 'TODO'
    move: () => 'TODO'
}

export function ParsedPath (target: RuleSet | IParsedPath, options: object, ruleSets: RuleSet[]): IParsedPath

export function ParsedPath (target: any, options: any, ruleSets: any) {
    const {
        attrs = [],
        componentId = generateComponentId(options.displayName, options.parentComponentId),
        parsedId = generateParsedId(options.displayName, options.componentId, componentId),
        displayName = generateDisplayName(target),
    } = options;

    const isTargetParsedPath = !is.str(target) && is.str(target?.parsedId);
    // const isCompositePathname = !is.str(target) && is.big(target.charAt(0));

    const basePath = isTargetParsedPath? target.componentStyle : undefined
    const pathname = Pathname(ruleSets, parsedId, basePath);
    const isStatic = pathname.isStatic && attrs.length === 0;


    const WrapedParsedPath: any = (...args: any) => (pathname as any)(...args)
    WrapedParsedPath.target = target
    WrapedParsedPath.options = options
    WrapedParsedPath.ruleSets = ruleSets
    WrapedParsedPath.componentId = componentId
    WrapedParsedPath.displayName = displayName
    WrapedParsedPath.parsedId = parsedId
    WrapedParsedPath.pathname = pathname
    WrapedParsedPath.isStatic = isStatic
    WrapedParsedPath.toString = () => WrapedParsedPath()
    WrapedParsedPath.mount = () => 'TODO'
    WrapedParsedPath.from = () => 'TODO'
    WrapedParsedPath.to = () => 'TODO'
    WrapedParsedPath.basename = () => 'TODO'
    WrapedParsedPath.dirname = () => 'TODO'
    WrapedParsedPath.move = () => 'TODO'
    // if (isCompositePathname)
    //     hoist(WrapedParsedPath, target, {
    //         attrs: true,
    //         pathname: true,
    //         displayName: true,
    //         foldedComponentIds: true,
    //         shouldForwardProp: true,
    //         styledComponentId: true,
    //         target: true,
    //         withComponent: true,
    //     });
    return WrapedParsedPath as IParsedPath
}
