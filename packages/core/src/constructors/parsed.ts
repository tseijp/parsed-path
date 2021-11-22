import { ParsedPath } from '../models'
import type { RuleSet } from './path'
import type { Construction, Config } from './re'
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
export interface Parsed {
    (...tags: RuleSet): Construction
    posix: (...tags: RuleSet) => Construction
    win32: (...tags: RuleSet) => Construction
    pure: (...tags: RuleSet) => Construction
    pureWin32: (...tags: RuleSet) => Construction
    purePosix: (...tags: RuleSet) => Construction
    withAttrs: (props: Config) => (...tags: RuleSet) => Construction
    withConfig: (props: Config) => (...tags: RuleSet) => Construction
}

const parsed: Parsed = (...tags) => construction(ParsedPath, {isWin: false}, ...tags)
parsed.posix = (...tags) => construction(ParsedPath, {isWin: false}, ...tags)
parsed.win32 = (...tags) => construction(ParsedPath, {isWin: true}, ...tags)
parsed.pure = (...tags) => construction(ParsedPath, {isWin: false, pure: true}, ...tags)
parsed.pureWin32 = (...tags) => construction(ParsedPath, {isWin: true, pure: true}, ...tags)
parsed.purePosix = (...tags) => construction(ParsedPath, {isWin: false, pure: true}, ...tags)
parsed.withAttrs = (config) => (...tags) => construction(ParsedPath, config, ...tags)
parsed.withConfig = (config) => (...tags) => construction(ParsedPath, config, ...tags)


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
