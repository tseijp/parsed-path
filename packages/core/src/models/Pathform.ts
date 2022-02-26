import { compile } from 'stylis'
import { Config } from '../constructors'
import { format } from '../utils'
const path = require('path-browserify')

type FormsMap = Map<string, Set<string>>

const FORM_REGEX = /;/ // TODO

const COMMENT_REGEX = /^\s*\/\/.*$/gm;

export interface Pathform {
    pathId: string
    pathform?: Pathform
    isStatic: boolean
    options: object
    forms: FormsMap
    mode: 'posix'|'win32'
    join: string
}

export class Pathform implements Pathform {
    constructor (mode: 'posix'|'win32', join: string, pathform?: Pathform|false) {
        this.mode = mode
        this.join = join
        this.pathform = pathform || undefined
        this.isStatic = !pathform || pathform.isStatic
        this.forms = this.pathform?.forms || new Map<string, Set<string>>([])
    }

    hasFormForId(id: string, form: string) {
        return this.forms.has(id) && Boolean(this.forms.get(id)?.has(form))
    }

    insertForms (id: string, name: string) {
        if(!this.forms.has(id))
            this.forms.set(id, new Set<string>().add(name))
        else
            this.forms.get(id)?.add(name)
    }

    joinForm (forms?: Set<string>) {
        if (!forms) return ''
        return Array.from(forms).join('').replace(COMMENT_REGEX, '')
    }

    parseForm(form: string) {
        if (!form) return {}
        const compiled = compile(form).map((form: any) => ({[form.props]: form.children})) // @TODO fix any
        return Object.assign({}, ...compiled)
    }

    generate (names: string[], config: Config={}) {
        const {isStatic, forms, mode, join, joinForm, parseForm} = this
        const { pathId: id } = config
        const informalNames = names.filter(name => {
            if (name.match?.(FORM_REGEX) && !this.hasFormForId(id, name))
                this.insertForms(id!, name)
            else return true
        })

        if (isStatic && (forms.get(id)?.size || 0) ===0)
            return cleanup(path[join](...informalNames))
        const joinedPath = path[join](...informalNames),
              joinedForm = joinForm(forms.get(id)),
              parsedPath = path.parse(joinedPath),
              parsedForm = parseForm(joinedForm),
              {dir, name, ext} = parsedPath

        return cleanup(format[mode]({dir, name, ext, ...parsedForm}))
    }
}

function cleanup (path: string) {
    return path.replace(':/','://').replace('/?','?')
}
