import { ParsedPath } from '../models'
import { construction } from './construction'

const parsed: any = (...tags: any) => construction(ParsedPath, tags)

parsed.win32 = (...tags: any) => construction(ParsedPath, tags, {posix: false})

parsed.posix = (...tags: any) => construction(ParsedPath, tags, {posix: true})

parsed.pure = (...tags: any) => construction(ParsedPath, tags, {pure: true})

const parsedEntries = Object.entries({
    https: 'https://',
    http: 'http://',
    base: './',
    user: '~/',
    root: '/',
})

// Shorthands for all valid Location Pathname
parsedEntries.forEach(([tag, tags]: any) => {
    parsed[tag] = parsed(tags)
})

window.location.pathname.split('/').reduce((tags, tag) => {
    parsed[tag || "top"] = parsed(tags + '/' + tag)
    return tags + '/' + tag
})

export { parsed, parsedEntries }
