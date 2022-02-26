import { ParsedPath } from '../models'
import type { RuleSet } from './path'
import type { Attrs, Construction, Config } from './re'
import { re } from './re'

export type PrimitiveKeys = 'https'|'http'|'base'|'user'|'root'

export const primitives = new Map<string, PrimitiveKeys>([
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
    withAttrs: (attrs: Attrs) => (...tags: RuleSet) => Construction
    withConfig: (config: Config) => (...tags: RuleSet) => Construction
}

const parsed: Parsed = (...tags) => re(ParsedPath, {isWin: false}, ...tags)
parsed.posix = (...tags) => re(ParsedPath, {isWin: false}, ...tags)
parsed.win32 = (...tags) => re(ParsedPath, {isWin: true}, ...tags)
parsed.pure = (...tags) => re(ParsedPath, {isWin: false, pure: true}, ...tags)
parsed.pureWin32 = (...tags) => re(ParsedPath, {isWin: true, pure: true}, ...tags)
parsed.purePosix = (...tags) => re(ParsedPath, {isWin: false, pure: true}, ...tags)
parsed.withAttrs = (attrs) => (...tags) => re(ParsedPath, {attrs}, ...tags)
parsed.withConfig = (config) => (...tags) => re(ParsedPath, config, ...tags)

/**
 *  @TODO COMMENT
 */
primitives.forEach((primitive, tags) => {
    // @ts-expect-error someday they'll handle imperative assignment properly
    parsed[primitive] = parsed(tags)
})

/**
 *  @TODO COMMENT
 */
if (typeof window !== 'undefined')
    window.location.pathname.split('/').reduce((tags, tag) => {
        // @ts-expect-error someday they'll handle imperative assignment properly
        parsed[tag || 'top'] = parsed(tags + '/' + tag)
        return tags + '/' + tag
    })

export { parsed }
