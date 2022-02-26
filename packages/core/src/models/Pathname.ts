import { createElement as el } from 'react'
import { is, isStaticPathSet, flatten, relative } from '../utils'
import { PathSet, Props, Config, Attrs } from '../constructors'
import { Pathform } from './Pathform'

export interface Pathname {
    pathname?: Pathname
    pathSets: PathSet[]
    isStatic: boolean
}

export class Pathname {
    constructor (pathname?: Pathname|false, ...pathSets: PathSet[]) {
        this.pathname = pathname || undefined
        this.pathSets = pathSets.filter(Boolean)
        this.isStatic = (is.fls(pathname) || pathname?.isStatic) && isStaticPathSet(pathSets)
        this.generate = this.generate.bind(this)
    }

    generate <P extends Props=Props>(pathform: Pathform, props: P, config: Config) {
        const { attrs, mount, from, to, q, key='href', ...other } = config
        const { pathname, isStatic, pathSets } = this
        const args = [pathform, props, config]
        let names: any[] = []

        if (is.arr(attrs)) props = resolveAttrs(props, attrs)
        if (pathname) names = [pathname.generate(pathform, {...props, as: false}, other)]
        if (isStatic) names = names.concat(flatten(pathSets))
        else names = names.concat(pathSets.map(pathSet =>
            pathSet.reduce((n, c) => n + flatten<P>(c, props).join(''), '')
        ))

        /**
         *  @TODO COMMENT UTILS
         */
        if (mount)
            names = names.concat(resolvePath(mount, ...args))
        if (from || to)
            names = relative(
                to? resolvePath(to, ...args): names,
                from? resolvePath(from, ...args): names,
            )
        if (q || config.isQuery)
            names = [].concat(resolvePath(q, ...args), (q? '?': '') + names.join('&'))

        /**
         *  @TODO COMMENT generate
         */
        const path = pathform.generate(names, config)
        const as = (props as any).as || config.as
        if (as) return el(as, {[key]: path, ...props})
        else return path
    }
}

export function resolveAttrs <P>(props: P, attrs: Attrs[]=[]) {
    const context: any = {} // @TODO fix any
    attrs.forEach(attr => {
        if (is.fun(attr))
            attr = attr(context)
        for (let key in attr)
            context[key] = attr[key]
    })
    return {...context, ...props}
}

export function resolvePath (pathSet: any=[], ...args: any[]) { // TODO fix any
    const isParsedPath = !is.str(pathSet[0]) && is.str(pathSet[0]?.parsedId)
    return isParsedPath ? pathSet[0](...args) : pathSet
}

export function resolveQuery () {

}
