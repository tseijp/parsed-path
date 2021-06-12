import { is, isStaticPathSet, flatten, relative, resolvePath, resolveAttrs } from '../utils'
import { PathSet } from '../constructors'
import { Pathform } from './Pathform'

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
        this.generate = this.generate.bind(this)
    }

    generate (props: object, pathform?: Pathform, options?: any): string

    generate (props: any, pathform: any, options: any) {
        const {attrs, mount, from, to, ...other} = options
        const {pathname, isStatic, pathSets} = this
        let names: any[] = []
        if (attrs) props = resolveAttrs(props, attrs)
        if (pathname) names.push(pathname.generate(props, pathform, other))
        if (isStatic) names = names.concat(flatten(pathSets))
        else
            pathSets.forEach(pathSet => {
                let name = ''
                pathSet.forEach(chunk => {
                    name += Array.prototype.concat([], flatten(chunk, props)).join('')
                })
                names.push(name)
            })
        if (mount)
            names = names.concat(resolvePath(mount, props, pathform, other))
        if (from || to)
            names = relative(
                to? resolvePath(to, props, pathform, other): names,
                from? resolvePath(from, props, pathform, other): names,
            )
        const link = pathform.generate(names, other)
        return is.fun(props.as)? props.as({...props, link}): link
    }
}
