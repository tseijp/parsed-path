import { is, RuleSet, flatten } from '../utils'


function isStaticRuleSets(ruleSets: RuleSet[]=[]): boolean {
    for (let i = 0; i < ruleSets.length; i += 1)
        if (is.fun(ruleSets[i]))
            return false;
    return true;
}

export interface IPathname {
    isStatic: boolean
    toString: () => string,
    ruleSets: RuleSet[]
    parsedId: string,
    pathname: IPathname,
}

export function Pathname (ruleSets?: RuleSet[], parsedId?: string, pathname?: IPathname): IPathname

export function Pathname (ruleSets?: any, parsedId?: any, pathname?: any) {
    const isStatic = Boolean(pathname?.isStatic) && isStaticRuleSets(ruleSets)

    function WrapedPathname (execution?: any, parseSheet?: any, parser?: any) {
        let i, name = '', names = [];

        if (!isStatic)
            for (i = 0; i < ruleSets.length; i++) {
                const rule = ruleSets[i]
                if (is.str(rule))
                    name += rule
                else {
                    const partChunk = flatten(rule, execution)
                    name += Array.isArray(partChunk)
                        ? partChunk.join("")
                        : partChunk
                }
            }
        if (name) {
            // TODO format by parseSheet
            // if (!parseSheet?.hasNameForId(parsedId, name)) {
            //     const formated = parser(name, `.${name}`, undefined, parsedId);
            //     parseSheet.insertRuleSets(parsedId, name, formated);
            // }
            names.push(name);
        }
        return names.join('/')
    }

    WrapedPathname.ruleSets = ruleSets
    WrapedPathname.parsedId = parsedId
    WrapedPathname.pathname = pathname
    WrapedPathname.isStatic = isStatic
    WrapedPathname.toString = () => WrapedPathname()

    return WrapedPathname as IPathname
}
