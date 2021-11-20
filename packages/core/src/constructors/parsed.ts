import { ParsedPath } from '../models'
import { construction } from './re'

export const primitives = new Map([
    ['https://', 'https'],
    ['http://', 'http'],
    ['./', 'base'],
    ['~/', 'user'],
    ['/', 'root']
])

/**
 * define parsed
 */
const parsed: any = (...tags: any) => construction(ParsedPath, {isWin: false}, ...tags)
parsed.posix = (...tags: any) => construction(ParsedPath, {isWin: false}, ...tags)
parsed.win32 = (...tags: any) => construction(ParsedPath, {isWin: true}, ...tags)
parsed.pure  = (...tags: any) => construction(ParsedPath, {isWin: false, pure: true}, ...tags)
parsed.pureWin32  = (...tags: any) => construction(ParsedPath, {isWin: true, pure: true}, ...tags)
parsed.purePosix  = (...tags: any) => construction(ParsedPath, {isWin: false, pure: true}, ...tags)
parsed.withAttrs  = (props: any) => (...tags: any) => construction(ParsedPath, props, ...tags)
parsed.withConfig = (props: any) => (...tags: any) => construction(ParsedPath, props, ...tags)


/**
 *  @TODO COMMENT
 */
primitives.forEach((primitive, tags) => {
    (parsed as any)[primitive] = parsed(tags)
})


/**
 *  @TODO COMMENT
 */
if (typeof window !== 'undefined')
    window.location.pathname.split('/').reduce((tags, tag) => {
        (parsed as any)[tag || 'top'] = parsed(tags + '/' + tag)
        return tags + '/' + tag
    })

export { parsed }
