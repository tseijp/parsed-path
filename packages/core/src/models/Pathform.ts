import { compile } from 'stylis'
import { format } from '../utils'

const path = require('path-browserify')

type FormsMap = Map<string, Set<string>>

const FORM_REGEX = /;/ // TODO

const COMMENT_REGEX = /^\s*\/\/.*$/gm;

export interface Pathform {
    pathId: string
    pathform?: Pathform
    isStatic: boolean
    tag: any
    forms: FormsMap
    options: object
    formatPath (...args: any): any
    parsePath (...args: any): any
    joinPath (...args: any): any
}

export class Pathform implements Pathform {
    constructor (mode: string, join: string, pathform?: Pathform) {
        this.formatPath = format[mode]
        this.parsePath = path.parse
        this.joinPath = path[join]
        this.pathform = pathform || undefined
        this.isStatic = !pathform || pathform.isStatic
        this.forms = pathform.forms || new Map<string, Set<string>>([])
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
        const compiled = compile(form).map((form: any) => ({[form.props]: form.children}))
        return Object.assign({}, ...compiled)
    }

    generate (names: string[], options: any={}) {
        const {isStatic, forms, joinPath, joinForm, parsePath, parseForm} = this
        const {pathId: id} = options
        const informalNames = names.filter(name => {
            if (name.match?.(FORM_REGEX) && !this.hasFormForId(id, name))
                this.insertForms(id, name)
            else return true
        })

        if (isStatic && (forms.get(id)?.size || 0) ===0)
            return joinPath(...informalNames).replace(':/','://')

        const joinedPath = joinPath(...informalNames),
              joinedForm = joinForm(forms.get(id)),
              parsedPath = parsePath(joinedPath),
              parsedForm = parseForm(joinedForm),
              {dir, name, ext} = parsedPath

        return this.formatPath({dir, name, ext, ...parsedForm}).replace(':/','://')
    }
}
