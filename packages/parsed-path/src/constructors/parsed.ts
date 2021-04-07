import { ParsedPath } from '../models';
import { construction } from './construction';

const parsed: any = (...tags: any) =>
    construction(ParsedPath, tags)

const parsedEntries = Object.entries({
    https: 'https://',
    http: 'http://',
    base: './',
    user: '~/',
    root: '/',
})

// Shorthands for all valid Location Pathname
parsedEntries.forEach(([tag, tags]: any) => {
    parsed[tag] = parsed(tags)
})

window.location.pathname.split('/').reduce((paths, tag) => {
    if (tag)
        parsed[tag] = parsed(paths + '/' + tag)
    return paths + '/' + tag
})

export { parsed, parsedEntries };
