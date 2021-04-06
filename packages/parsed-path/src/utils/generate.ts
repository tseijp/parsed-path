import { is } from './helpers'
const {abs} = Math
const charsLength = 52;

export function hash (str: string, seed?: number): number

export function hash (str: any, seed=5381) {
    let i = str.length;
    while (i)
        seed = (seed * 33) ^ str.charCodeAt(--i);
    return seed;
};

export function getAlphabeticChar (code: number): string

export function getAlphabeticChar (code: any) {
    return String.fromCharCode(code + (code > 25 ? 39 : 97));
}
export function generateAlphabeticName (code: number): string

export function generateAlphabeticName (code: any) {
    let x, name = '';
    for (x = abs(code); x > charsLength; x = (x / charsLength) | 0)
        name = getAlphabeticChar(x % charsLength) + name;
    return (getAlphabeticChar(x % charsLength) + name).replace(/(a)(d)/gi, '$1-$2');
}

const identifiers: any = {};

export function generateParsedId (displayName?: string, Id?: string, current?: string): string

export function generateParsedId (displayName: any, pathId: any, current: any) {
    return displayName && pathId
        ? `${escape(displayName)}-${pathId}`
        : pathId || current;
}

export function generatePathId (displayName?: string, parentComponentId?: string): string

export function generatePathId (displayName?: any, parentComponentId?: any) {
    const name = is.str(displayName)? 'pp' : escape(displayName);
    const str = hash(name + identifiers[name]) >>> 0
    const pathId = `${name}-${generateAlphabeticName(str)}`;
    identifiers[name] = (identifiers[name] || 0) + 1;
    return parentComponentId ? `${parentComponentId}-${pathId}` : pathId;
}

export function getDisplayName (target: any) {
    return (is.str(target) && target) || target?.displayName || target?.name || 'Pathname'
}

export function generateDisplayName (target: any) {
    return is.str(target) && !is.big(target.chartAt?.call(0))
        ? `parsed.${target}`
        : `Parsed(${getDisplayName(target)})`;
}
