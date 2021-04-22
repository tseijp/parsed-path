import { is } from './helpers'
const {abs} = Math
const charsLength = 52

export function hash (str: string, seed?: number): number

export function hash (str: any, seed=5381) {
    let i = str.length
    while (i) seed = (seed * 33) ^ str.charCodeAt(--i)
    return seed
}

export function getAlphabeticChar (code: number): string

export function getAlphabeticChar (code: any) {
    return String.fromCharCode(code + (code > 25 ? 39 : 97))
}
export function generateAlphabeticName (code: number): string

export function generateAlphabeticName (code: any) {
    let x: any, name = ''
    for (x = abs(code); x > charsLength; x = (x / charsLength) | 0)
        name = getAlphabeticChar(x % charsLength) + name
    return (getAlphabeticChar(x % charsLength) + name).replace(/(a)(d)/gi, '$1-$2')
}

const identifiers: any = {}

export function generatePathId (displayId?: string, parentPathId?: string): string

export function generatePathId (displayId?: any, parentPathId?: any) {
    const name = is.str(displayId)? 'pp' : escape(displayId)
    const str = hash(name + identifiers[name]) >>> 0
    const pathId = `${name}-${generateAlphabeticName(str)}`
    identifiers[name] = (identifiers[name] || 0) + 1
    return parentPathId ? `${parentPathId}-${pathId}` : pathId
}

export function generateParsedId (displayId?: string, Id?: string, current?: string): string

export function generateParsedId (displayId: any, pathId: any, current: any) {
    return displayId && pathId
        ? `${escape(displayId)}-${pathId}`
        : pathId || current
}

export function getDisplayName (tag: any) {
    return (is.str(tag) && tag) || tag?.displayId || tag?.name || 'Pathname'
}

export function generateDisplayName (tag: any, isCompositePath=false) {
    return !isCompositePath
        ? `parsed.${tag}`
        : `Parsed(${getDisplayName(tag)})`
}
