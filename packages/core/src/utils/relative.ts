import { is } from './helpers'
import { flatten } from './flatten'
import type { Path, PathSet } from '../constructors'

const { min } = Math

export function relative (from: Path, to: PathSet=[]): PathSet {
    if (from === to) return []
    if (is.str(to)) to = flatten(to)
    if (is.str(from)) from = flatten(from)
    let i = 0, length = min(from.length, to.length)
    for (; ; i++) if (length <= i || from[i] !== to[i]) break
    return Array(from.length - i).fill('..').concat(to.slice(i))
}
