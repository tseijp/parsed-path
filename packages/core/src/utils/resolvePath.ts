import{ is } from './helpers'

export function resolvePath (pathSet: any, ...args: any) {
    return !is.str(pathSet[0]) && is.str(pathSet[0]?.parsedId)
        ? pathSet[0](...args)
        : pathSet
}
