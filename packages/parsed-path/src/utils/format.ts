const splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/
const splitTailRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/
const splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
const win32: any = {sep: '\\'},
      posix: any = {sep: '/'}

win32.parse = (filename: any) => {
    const [, device='', _root='', tail=''] = splitDeviceRe.exec(filename),
          [,   _dir='',  base='',  ext=''] = splitTailRe.exec(tail),
        root = device + _root,
         dir = root + _dir.slice(0, -1),
        name = base.slice(0, base.length - ext.length)
    return { root, base, ext, dir, name }
}

posix.parse = (filename: string) => {
    const [root='', _dir='', base='', ext=''] = splitPathRe.exec(filename).slice(1),
         dir = _dir.slice(0, -1),
        name = base.slice(0, base.length - ext.length)
    return { root, base, ext, dir, name }
}

win32.format = (pathObject: any) => {
    const dir = pathObject.dir;
    const base = pathObject.base || '';
    if (!dir)
        return base;
    if (dir[dir.length - 1] === win32.sep)
        return dir + base;
    return dir + win32.sep + base
}

posix.format = (pathObject: any) => {
    const dir = pathObject.dir ? pathObject.dir + posix.sep : '';
    const base = pathObject.base || '';
    return dir + base;
};

export { win32, posix }
