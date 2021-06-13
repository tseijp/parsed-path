import { primitives } from './path'
import { ParsedPath } from '../models'
import { construction } from './construction'

const parsed: any = (...tags: any) => construction(ParsedPath, {isWin: false}, ...tags)

parsed.win32 = (...tags: any) => construction(ParsedPath, {isWin: true}, ...tags)

parsed.posix = (...tags: any) => construction(ParsedPath, {isWin: false}, ...tags)

parsed.pure  = (...tags: any) => construction(ParsedPath, {isWin: false, pure: true}, ...tags)

parsed.pureWin32  = (...tags: any) => construction(ParsedPath, {isWin: true, pure: true}, ...tags)

parsed.purePosix  = (...tags: any) => construction(ParsedPath, {isWin: false, pure: true}, ...tags)

primitives.forEach((primitive, tags) => {
    (parsed as any)[primitive] = parsed(tags)
})

if (typeof window !== 'undefined')
    window.location.pathname.split('/').reduce((tags, tag) => {
        (parsed as any)[tag || 'top'] = parsed(tags + '/' + tag)
        return tags + '/' + tag
    })

export { parsed }
