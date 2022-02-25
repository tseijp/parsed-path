/**
 * forked: https://github.com/nodejs/node/blob/master/lib/path.js
 */

export type PathObject = Partial<{
  dir: string
  base: string
  root: string
  name: string
  ext: string
}>

function _format (pathObject: PathObject, sep: '/'|'\\') {
    const dir = pathObject.dir || pathObject.root
    const base = pathObject.base || `${pathObject.name || ''}${pathObject.ext || ''}`
    if (!dir)
        return base
    return dir === pathObject.root ? `${dir}${base}` : `${dir}${sep}${base}`
}

const posix = (pathObject: object) => _format(pathObject, '/')
const win32 = (pathObject: object) => _format(pathObject, '\\')

export const format = { win32, posix }
