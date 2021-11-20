/**
 * forked: https://github.com/nodejs/node/blob/master/lib/path.js
 */

function _format (pathObject: any, sep: any) {
    const dir = pathObject.dir || pathObject.root
    const base = pathObject.base || `${pathObject.name || ''}${pathObject.ext || ''}`
    if (!dir)
        return base
    return dir === pathObject.root ? `${dir}${base}` : `${dir}${sep}${base}`
}

const posix = (pathObject: any) => _format(pathObject, '/')
const win32 = (pathObject: any) => _format(pathObject, '\\')

export const format = { win32, posix }
