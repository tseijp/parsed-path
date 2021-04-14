import { is, flatten } from '../utils'
import { PathSet } from '../constructors'
import { Pathform } from './Pathform'

function isStaticPathSet(pathSet: any=[]): boolean {
    return !pathSet.some((rule: any) => {
        if (is.fun(rule))
            return true
        if (is.arr(rule))
            return !isStaticPathSet(rule)
    })
}

export interface Pathname {
    pathname: Pathname
    pathSets: PathSet[]
    isStatic: boolean
}

export class Pathname {
    constructor (pathname?: Pathname, ...pathSets: PathSet[])

    constructor (pathname?: any, ...pathSets: any) {
        this.pathname = pathname || undefined
        this.pathSets = pathSets.filter(Boolean)
        this.isStatic = (is.fls(pathname) || pathname.isStatic) && isStaticPathSet(pathSets)
    }

    generate (props: object, id: string, pathform?: Pathform): string

    generate (props: any, id: any, pathform: any) {
        const {pathname, isStatic, pathSets} = this
        let names: string[] = []
        if (pathname) names.push(pathname.generate(props, id, pathform))
        if (isStatic)
            return pathform.generate(id, names.concat(flatten(pathSets)))

        pathSets.forEach(pathSet => {
            let name = ''
            pathSet.forEach(chunk => {
                name += [].concat([], flatten(chunk, props)).join('')
            })
            names.push(name)
        })
        return pathform.generate(id, names)
    }
}
