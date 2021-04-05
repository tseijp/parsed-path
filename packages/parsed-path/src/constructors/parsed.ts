import { path } from './path';
import { ParsedPath } from '../models';

function construction(constructor: any, target: any, options: any={}) {
    const templateFunction = (...args: any) => constructor(target, options, path(...args))

    templateFunction.withConfig = (config: any) =>
        construction(constructor, target, { ...options, ...config });
    templateFunction.attrs = (attrs: any) =>
        construction(constructor, target, {...options,
            attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean),
        });

    return templateFunction;
}
const parsed: any = (target: any) => construction(ParsedPath, target);

// Shorthands for all valid Location Pathname
const parsedTargets = ['root', 'dir'].map(target => `${target}:${(ex: any) => ex[target]};`)

parsedTargets.forEach(target => {
    parsed[target] = parsed(target)
})

window.location.pathname.split("/").reduce((paths, target) => {
    if (target)
        parsed[target] = parsed(paths + '/' + target)
    return paths + '/' + target
})


export { parsed, parsedTargets };
