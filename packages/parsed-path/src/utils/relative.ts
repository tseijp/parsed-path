import { PathSet } from '../constructors'
const { min } = Math

export function relative (from: PathSet, to: PathSet): PathSet

export function relative (from: any, to: any) {
    let samePartsLength = length = min(from.length, to.length)
    for (let i = 0; i < length; i++)
        if (from[i] !== to[i])
            samePartsLength = i

    let output = []
    for (let i = samePartsLength; i < from.length; i++)
        output.push('..')

    return output.concat(to.slice(samePartsLength))
}
