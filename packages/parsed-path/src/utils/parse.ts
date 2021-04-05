// forked from https://github.com/jbgutierrez/path-parse

const splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;

export function parse (pathString: string) {

    var allParts = splitPathRe.exec(pathString)?.slice(1);
    if (!allParts || allParts.length !== 4)
        throw new TypeError("Invalid path '" + pathString + "'");

    allParts[1] = allParts[1] || '';
    allParts[2] = allParts[2] || '';
    allParts[3] = allParts[3] || '';

    return {
        root: allParts[0],
        dir: allParts[0] + allParts[1].slice(0, -1),
        base: allParts[2],
        ext: allParts[3],
        name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
    };
};
