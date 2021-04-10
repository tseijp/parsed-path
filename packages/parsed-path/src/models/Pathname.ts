import { is, flatten } from '../utils'
import { PathSet } from '../constructors'
import { ParseSheet } from './ParseSheet'
import * as PATH from 'path'

function isStaticPathSet(pathSet: any=[]): boolean {
    return !pathSet.some((rule: any) => {
        if (is.fun(rule))
            return true
        if (is.arr(rule))
            return !isStaticPathSet(rule)
    })
}

export interface Pathname {
    isStatic: boolean
    mode: "win32" | "posix"
    pathId: string
    pathSets: PathSet[]
    pathname: Pathname
    parseSheet: ParseSheet
}

export class Pathname <Props extends object=any> {
    normalize = (): string => PATH[this.mode].normalize(this.join())
    toString = (...args: any): string => this.join(...args)
    resolve = (...args: any): string => PATH[this.mode].resolve(...this.generate(...args))
    join = (...args: any): string => PATH[this.mode].join(...this.generate(...args))
    pure = (isOptionsPure=false, ...args: any) => isOptionsPure
        ? this.resolve(...args)
        : this.join(...args)

    constructor (mode: string, pathId: string, pathname?: Pathname, ...pathSets: PathSet[])

    constructor (mode: any, pathId: any, pathname?: any, ...pathSets: any) {
        this.mode = mode
        this.pathId = pathId
        this.pathname = pathname || false
        this.pathSets = pathSets.filter(Boolean)
        this.isStatic = (is.fls(pathname) || pathname.isStatic) && isStaticPathSet(pathSets)
        this.parseSheet = new ParseSheet()
    }

    format () {
        return
    }

    generate (props?: Props, parseSheet?: any, parser?: any): string[]

    generate (props?: any, parseSheet?: any, parser: any=PATH[this.mode].parse) {
        const {pathname, isStatic, pathSets} = this
        let paths: any[] = []
        if (pathname) paths.push(...pathname.generate(props, parseSheet, parser))
        if (isStatic) paths = paths.concat(flatten(pathSets))
        else
            pathSets.forEach(pathSet => {
                let path = ''
                pathSet.forEach(chunk => {
                    const partChunk = flatten(chunk, props)
                    path += Array.isArray(partChunk)
                        ? partChunk.join("")
                        : partChunk
                })
                if (path)
                    paths.push(path)
            })
        return paths
    }
}
