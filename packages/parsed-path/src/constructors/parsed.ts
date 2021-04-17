import { ParsedPath } from '../models'
import { construction } from './construction'

const isWin = process?.platform === 'win32';

const parsed = (...tags: any) => construction(ParsedPath, tags, {isWin})

parsed.win32 = (...tags: any) => construction(ParsedPath, tags, {isWin: true})

parsed.posix = (...tags: any) => construction(ParsedPath, tags, {isWin: false})

parsed.pure  = (...tags: any) => construction(ParsedPath, tags, {isWin, pure: true})

parsed.pureWin32  = (...tags: any) => construction(ParsedPath, tags, {isWin: true, pure: true})

parsed.purePosix  = (...tags: any) => construction(ParsedPath, tags, {isWin: false, pure: true})

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

window.location.pathname.split('/').reduce((tags, tag) => {
    (parsed as any)[tag || 'top'] = parsed(tags + '/' + tag)
    return tags + '/' + tag
})

export { parsed, parsedEntries }
