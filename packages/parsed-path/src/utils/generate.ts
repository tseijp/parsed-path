import { is } from './helpers'
const {abs} = Math
const charsLength = 52;


export const hash = (str: string, seed: number=5381): number => {
    let i = str.length;
    while (i)
        seed = (seed * 33) ^ str.charCodeAt(--i);
    return seed;
};

export function getAlphabeticChar (code: number): string

export function getAlphabeticChar (code: any) {
    return String.fromCharCode(code + (code > 25 ? 39 : 97));
}
export function generateAlphabeticName(code: number): string

export function generateAlphabeticName(code: any) {
    let x, name = '';
    for (x = abs(code); x > charsLength; x = (x / charsLength) | 0)
        name = getAlphabeticChar(x % charsLength) + name;

    return (getAlphabeticChar(x % charsLength) + name).replace(/(a)(d)/gi, '$1-$2');
}

const identifiers: any = {};

export function generateParsedId (displayName?: string, componentId?: string, current?: string): string

export function generateParsedId (displayName: any, componentId: any, current: any) {
    return displayName && componentId
        ? `${escape(displayName)}-${componentId}`
        : componentId || current;
}

export function generateComponentId(displayName?: string, parentComponentId?: string): string

export function generateComponentId(displayName?: any, parentComponentId?: any) {
    const name = is.str(displayName)? 'pp' : escape(displayName);
    const str = hash(name + identifiers[name]) >>> 0
    identifiers[name] = (identifiers[name] || 0) + 1;

    const componentId = `${name}-${generateAlphabeticName(str)}`;
    return parentComponentId ? `${parentComponentId}-${componentId}` : componentId;
}

export function getComponentName(target: any) {
  return (is.str(target) && target) || target.displayName || target.name || 'Component'
}

export function generateDisplayName(target: any) {
  return is.str(target) && target.charAt(0) === target.charAt(0).toLowerCase()
    ? `parsed.${target}`
    : `Parsed(${getComponentName(target)})`;
}
