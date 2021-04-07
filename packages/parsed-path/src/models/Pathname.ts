import { is, RuleSet, flatten } from '../utils'
import { join, resolve, parse } from 'path'

function isStaticRuleSets(ruleSets: RuleSet[]=[]): boolean {
    for (let i = 0; i < ruleSets.length; i += 1)
        if (is.fun(ruleSets[i]))
            return false;
    return true;
}

export interface Pathname {
    isStatic: boolean
    parsedId: string
    ruleSets: RuleSet[]
    pathname: Pathname
}

export class Pathname <Props extends object=any> {
    toString = (...args: any): string => this.join(...args)
    resolve = (...args: any): string => resolve(...this.generate(...args))
    join = (...args: any): string => join(...this.generate(...args))
    pure = (isOptionsPure=false) => isOptionsPure
        ? (...args: any) => this.resolve(...args)
        : (...args: any) => this.join(...args)

    constructor (parsedId: string, ruleSets: RuleSet[], pathname?: Pathname)

    constructor (parsedId: any, ruleSets: any, pathname?: any) {
        this.parsedId = parsedId
        this.ruleSets = ruleSets
        this.pathname = pathname
        this.isStatic = (is.und(pathname) || pathname.isStatic) && isStaticRuleSets(ruleSets)
    }

    generate (props?: Props, parseSheet?: any, parser?: any): string[]

    generate (props?: any, parseSheet?: any, parser: any=parse) {
        const {pathname, isStatic, ruleSets} = this
        let names: string[] = [];
        if (pathname)
            names.push(...pathname.generate(props, parseSheet, parser));

        if (isStatic)
            names.push(...ruleSets as string[])
        else {
            let name = ''
            ruleSets.forEach(rule => {
                if (is.str(rule))
                    return name += rule
                else {
                    const partChunk = flatten(rule, props)
                    name += Array.isArray(partChunk)
                        ? partChunk.join("")
                        : partChunk
                }
            })
            if (name)
                names.push(name)
        }
        return names
    }
}
