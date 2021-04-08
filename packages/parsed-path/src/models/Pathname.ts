import { is, RuleSet, flatten } from '../utils'
import {
    join,
    resolve,
    parse,
    normalize
 } from 'path'

function isStaticRuleSet(ruleSet: any=[]): boolean {
    return !ruleSet.some((rule: any) => {
        if (is.fun(rule))
            return true
        if (is.arr(rule))
            return !isStaticRuleSet(rule)
    })
}

export interface Pathname {
    isStatic: boolean
    pathId: string
    ruleSets: RuleSet[]
    pathname: Pathname
}

export class Pathname <Props extends object=any> {
    normalize = (): string => normalize(this.join())
    toString = (...args: any): string => this.join(...args)
    resolve = (...args: any): string => resolve(...this.generate(...args))
    join = (...args: any): string => join(...this.generate(...args))
    pure = (isOptionsPure=false, ...args: any) => {
        return isOptionsPure
            ? this.resolve(...args)
            : this.join(...args)
    }

    constructor (pathId: string, pathname?: Pathname, ...ruleSets: RuleSet[])

    constructor (pathId: any, pathname?: any, ...ruleSets: any) {
        this.pathId = pathId
        this.pathname = pathname || false
        this.ruleSets = ruleSets.filter(Boolean)
        this.isStatic = (is.fls(pathname) || pathname.isStatic) && isStaticRuleSet(ruleSets)
    }

    generate (props?: Props, parseSheet?: any, parser?: any): string[]

    generate (props?: any, parseSheet?: any, parser: any=parse) {
        const {pathname, isStatic, ruleSets} = this
        let paths: any[] = [];
        if (pathname)
            paths.push(...pathname.generate(props, parseSheet, parser));

        if (isStatic)
            paths.push(...flatten(ruleSets))
        else {
            ruleSets.forEach(ruleSet => {
                let path = ''
                ruleSet.forEach(rule => {
                    const partChunk = flatten(rule, props)
                    path += Array.isArray(partChunk)
                        ? partChunk.join("")
                        : partChunk
                })
                if (path)
                    paths.push(path)
            })
        }
        return paths
    }
}
