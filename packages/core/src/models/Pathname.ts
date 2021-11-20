import { createElement as el } from 'react'
import { is, isStaticPathSet, flatten, relative } from '../utils'
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
        const { attrs, mount, from, to, q, key='href', ...other } = options
        const { pathname, isStatic, pathSets } = this
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


        /**
         *  @TODO COMMENT UTILS
         */
        if (mount)
            names = names.concat(resolvePath(mount, props, pathform, other))
        if (from || to)
            names = relative(
                to? resolvePath(to, props, pathform, other): names,
                from? resolvePath(from, props, pathform, other): names,
            )
        if (q) console.log('TODO')

        /**
         *  @TODO COMMENT generate
         */
        const as = props.as || options.as
        const path = pathform.generate(names, other)
        if (as) return el(as, {[key]: path, ...props})
        else return path
    }
}

export function resolveAttrs (props: any, attrs: any[]=[]) {
    const context: any = {}
    attrs.forEach(attr => {
        if (is.fun(attr))
            attr = attr(context)
        for (let key in attr)
            context[key] = attr[key]
    })
    return {...context, ...props}
}

export function resolvePath (pathSet: any, ...args: any) {
    return !is.str(pathSet[0]) && is.str(pathSet[0]?.parsedId)
        ? pathSet[0](...args)
        : pathSet
}
