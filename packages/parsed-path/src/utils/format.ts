// forked: https://github.com/nodejs/node/blob/master/lib/path.js
const CHAR_DOT = 46, /* . */
      CHAR_COLON = 58, /* : */
      CHAR_FORWARD_SLASH= 47, /* / */
      CHAR_BACKWARD_SLASH= 92, /* \ */
      CHAR_UPPERCASE_A= 65, /* A */
      CHAR_UPPERCASE_Z= 90, /* Z */
      CHAR_LOWERCASE_A= 97, /* a */
      CHAR_LOWERCASE_Z= 122 /* z */

const win32: any = {sep: '\\'},
      posix: any = {sep: '/'}

function isPathSeparator(code: number) {
    return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH
}

function isWindowsDeviceRoot(code: number) {
    return (code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z) ||
           (code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z)
}

function _format (sep: any, pathObject: any) {
    const dir = pathObject.dir || pathObject.root
    const base = pathObject.base || `${pathObject.name || ''}${pathObject.ext || ''}`
    if (!dir)
        return base
    return dir === pathObject.root ? `${dir}${base}` : `${dir}${sep}${base}`
}

posix.format = (pathObject: any) => _format('/', pathObject)
win32.format = (pathObject: any) => _format('\\', pathObject)

posix.parse = (path: string) => {
    const ret = { root: '', dir: '', base: '', ext: '', name: '' }
    if (path.length === 0)
        return ret
    const cca = (n=0) => path.charCodeAt(n)
    const isAbsolute = cca(0) === CHAR_FORWARD_SLASH
    let start: any
    if (isAbsolute) {
        ret.root = '/'
        start = 1
    } else
        start = 0
    let startDot =-1,
       startPart = 0,
             end =-1,
     preDotState = 0,
    matchedSlash = true
    for (let i = path.length - 1; i >= start; --i) {
        const code = cca(i)
        if (code === CHAR_FORWARD_SLASH) {
            if (!matchedSlash) {
                startPart = i + 1
                break
            }
            continue
        }
        if (end === -1) {
            matchedSlash = false
            end = i + 1
        }

        if (code === CHAR_DOT) {
            if (startDot === -1)
                startDot = i
            else if (preDotState !== 1)
                preDotState = 1
        } else if (startDot !== -1)
            preDotState = -1
    }
    if (end !== -1) {
        const start = startPart === 0 && isAbsolute ? 1 : startPart
        const isX = preDotState === 1 && startDot === end - 1 && startDot === startPart + 1
        if (startDot === -1 || preDotState === 0 || isX)
            ret.base = ret.name = path.slice(start, end)
        else {
            ret.name = path.slice(start, startDot)
            ret.base = path.slice(start, end)
            ret.ext  = path.slice(startDot, end)
        }
    }
    if (startPart > 0)
        ret.dir = path.slice(0, startPart - 1)
    else if (isAbsolute)
        ret.dir = '/'

    return ret
}

win32.parse = (path: string) => {
    const ret = { root: '', dir: '', base: '', ext: '', name: '' }
    if (path.length === 0) return ret
    const len = path.length
    const cca = (...args: [any]) => path.charCodeAt(...args)
    const slc = (...args: any[]) => path.slice(...args)
    let rootEnd = 0
    let code = cca(0)

    if (len === 1) {
        if (isPathSeparator(code)) {
            ret.root = ret.dir = path
            return ret
        }
        ret.base = ret.name = path
        return ret
    }
    if (isPathSeparator(code)) {
       rootEnd = 1
        if (isPathSeparator(cca(1))) {
            let j = 2
            let last = j
            while (j < len && !isPathSeparator(cca(j))) {j++}
            if (j < len && j !== last) {
                last = j
                while (j < len && isPathSeparator(cca(j))) {j++}
                if (j < len && j !== last) {
                    last = j
                    while (j < len && !isPathSeparator(cca(j))) {j++}
                    if (j === len)
                        rootEnd = j
                    else if (j !== last)
                        rootEnd = j + 1
                }
            }
        }
    } else if (isWindowsDeviceRoot(code) && cca(1) === CHAR_COLON) {
        if (len <= 2) {
            ret.root = ret.dir = path
            return ret
        }
        rootEnd = 2
        if (isPathSeparator(cca(2))) {
            if (len === 3) {
              ret.root = ret.dir = path
              return ret
            }
            rootEnd = 3
        }
    }
    if (rootEnd > 0)
        ret.root = path.slice(0, rootEnd)

    let startDot = -1,
       startPart = rootEnd,
    matchedSlash = true,
     preDotState = 0,
             end = -1,
               i = path.length - 1
    for (; i >= rootEnd; --i) {
        code = cca(i)
        if (isPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1
                break
            }
            continue
        }
        if (end === -1) {
            matchedSlash = false
            end = i + 1
        }
        if (code === CHAR_DOT) {
            if (startDot === -1)
              startDot = i
            else if (preDotState !== 1)
              preDotState = 1
        } else if (startDot !== -1)
            preDotState = -1
    }
    if (end !== -1) {
        const isX = preDotState === 1 && startDot === end - 1 && startDot === startPart + 1
        if (startDot === -1 || preDotState === 0 || isX)
            ret.base = ret.name = slc(startPart, end)
        else {
            ret.name = slc(startPart, startDot)
            ret.base = slc(startPart, end)
            ret.ext = slc(startDot, end)
        }
    }
    if (startPart > 0 && startPart !== rootEnd)
        ret.dir = slc(0, startPart - 1)
    else
        ret.dir = ret.root
    return ret
}

export const format = { win32, posix }
