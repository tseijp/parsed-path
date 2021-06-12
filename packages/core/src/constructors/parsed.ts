import { ParsedPath } from '../models'
import { construction } from './construction'

const parsed: any = (...tags: any) => construction(ParsedPath, {isWin: false}, ...tags)

parsed.win32 = (...tags: any) => construction(ParsedPath, {isWin: true}, ...tags)

parsed.posix = (...tags: any) => construction(ParsedPath, {isWin: false}, ...tags)

parsed.pure  = (...tags: any) => construction(ParsedPath, {isWin: false, pure: true}, ...tags)

parsed.pureWin32  = (...tags: any) => construction(ParsedPath, {isWin: true, pure: true}, ...tags)

parsed.purePosix  = (...tags: any) => construction(ParsedPath, {isWin: false, pure: true}, ...tags)

const parsedEntries = Object.entries({
    https: 'https://',
    http: 'http://',
    base: './',
    user: '~/',
    root: '/',
})

// Shorthands for all valid Location Pathname
parsedEntries.forEach(([tag, tags]: any) => {
    (parsed as any)[tag] = parsed(tags)
})

window?.location?.pathname?.split('/').reduce((tags, tag) => {
    (parsed as any)[tag || 'top'] = parsed(tags + '/' + tag)
    return tags + '/' + tag
})

export { parsed, parsedEntries }
