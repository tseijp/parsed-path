import { createElement as el } from 'react'
import { is, isStaticPathSet, flatten, relative, resolvePath, resolveAttrs } from '../utils'
import { PathSet, Config } from '../constructors'
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

    generate (props: object, pathform: Pathform, options: Config): string

    generate (props: any, pathform: any, options: any) {
        const {attrs, mount, from, to, key='href', ...other} = options,
              {pathname, isStatic, pathSets} = this
        let names: any[] = []

        if (attrs?.length) props = resolveAttrs(props, attrs)
        if (pathname) names.push(pathname.generate({...props, as: false}, pathform, other))
        if (isStatic) names = names.concat(flatten(pathSets))
        else pathSets.forEach(pathSet => {
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

        const as = props.as || options.as,
            link = pathform.generate(names, other)
        return as? el(as, {[key]: link, ...props}): link
    }
}
