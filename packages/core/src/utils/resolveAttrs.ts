import { is } from './helpers'

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
