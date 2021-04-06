import { is, RuleSet, flatten } from '../utils'
import { join, parse } from 'path'

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
    const isStatic = (is.und(pathname) || pathname.isStatic) && isStaticRuleSets(ruleSets)

    const WrapedPathname = (execution?: any, parseSheet?: any, parser: any=parse) => {
        let i, names = [];

        if (pathname)
            names.push(pathname(execution, parseSheet, parser));

        if (isStatic)
            names.push(...ruleSets)
        else {
            let name = '';
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
            // TODO format by parseSheet
            // if (!parseSheet?.hasNameForId(parsedId, name)) {
            //     const formated = parser(name, `.${name}`, undefined, parsedId);
            //     parseSheet.insertRuleSets(parsedId, name, formated);
            // }
            if (name)
                names.push(name);
        }
        return join(...names)
    }

    WrapedPathname.ruleSets = ruleSets
    WrapedPathname.parsedId = parsedId
    WrapedPathname.pathname = pathname
    WrapedPathname.isStatic = isStatic
    WrapedPathname.toString = () => WrapedPathname()

    return WrapedPathname as IPathname
}
