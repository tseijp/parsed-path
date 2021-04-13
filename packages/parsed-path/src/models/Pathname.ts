import { is, flatten } from '../utils'
import { PathSet } from '../constructors'
import { Pathform } from './Pathform'
import * as PATH from 'path'

function isStaticPathSet(pathSet: any=[]): boolean {
    return !pathSet.some((rule: any) => {
        if (is.fun(rule))
            return true
        if (is.arr(rule))
            return !isStaticPathSet(rule)
    })
}

export interface Pathname <Props extends object=any> {
    pathId: string
    isStatic: boolean
    pathSets: PathSet[]
    pathname: Pathname
    toString (...args: any): string
    joinPath (...args: any): string
    generate (props?: Props, pathform?: Pathform, parser?: any): string[]
}

export class Pathname {
    toString = (...args: any) => this.joinPath(...this.generate(...args))

    constructor (pathId: any, mode: any, join: any, pathname?: Pathname, ...pathSets: PathSet[]) {
        this.pathId = pathId
        this.joinPath = PATH[mode][join]
        this.pathname = pathname || undefined
        this.pathSets = pathSets.filter(Boolean)
        this.isStatic = (is.fls(pathname) || pathname.isStatic) && isStaticPathSet(pathSets)
    }

    generate (props?: any, pathform?: any, parser?: any) {
        const {pathId, pathname, isStatic, pathSets} = this
        let names: string[] = []
        if (pathname) names.push(...pathname.generate(props, pathform, parser))
        if (isStatic) names.push(...flatten(pathSets) as any)
        else {
            pathSets.forEach(pathSet => {
                let name = ''
                pathSet.forEach(chunk => {
                    const partChunk = flatten(chunk, props)
                    name += Array.isArray(partChunk)
                        ? partChunk.join("")
                        : partChunk
                })
                names.push(name)
            })
        }
        return names.filter(name => {
            // if (pathform.hasFormForId(pathId, form))
                return name
            // pathform.insertForms(pathId, form, path);
        })
    }
}
