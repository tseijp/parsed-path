import { is } from './helpers'
import { path, Path } from '../constructors'
const { min } = Math

export function relative (from: Path, to?: Path): Path[]

export function relative (from: any, to: any=[]) {
    if (from === to) return []
    if (is.str(to)) to = path(to)
    if (is.str(from)) from = path(from)
    let i = 0, length = min(from.length, to.length)
    for (; ; i++) if (length <= i || from[i] !== to[i]) break
    return Array(from.length - i).fill('..').concat(to.slice(i))
}
