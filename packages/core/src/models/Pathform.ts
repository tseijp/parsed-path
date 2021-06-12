import { compile } from 'stylis'
import { format } from '../utils'

const path = require('path-browserify')

type FormsMap = Map<string, Set<string>>

const FORM_REGEX = /:/ // TODO

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
    constructor (mode: string, join: string, pathform?: Pathform, forms?: FormsMap) {
        this.formatPath = (format as any)[mode]
        this.parsePath = ((path as any)[mode] || path)?.parse//(parse as any)[mode]
        this.joinPath = ((path as any)[mode] || path)[join]

        this.pathform = pathform || undefined
        this.isStatic = !pathform || pathform.isStatic
        this.forms = pathform?.forms || forms || new Map<string, Set<string>>([])

        this.hasFormForId = this.hasFormForId.bind(this)
        this.insertForms = this.insertForms.bind(this)
        this.parseForm = this.parseForm.bind(this)
        this.joinForm = this.joinForm.bind(this)
        this.generate = this.generate.bind(this)
    }

    hasFormForId(id: string, form: string): boolean {
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
        const filterNames = names.filter(name => {
            if (name.match(FORM_REGEX) && !this.hasFormForId(id, name))
                this.insertForms(id, name)
            else return true
        })

        if (isStatic && (forms.get(id)?.size || 0) ===0)
            return joinPath(...filterNames)

        const joinedPath = joinPath(...filterNames)
        const joinedForm = joinForm(forms.get(id))
        const parsedPath = parsePath(joinedPath)
        const parsedForm = parseForm(joinedForm)
        const {dir, name, ext} = parsedPath

        return this.formatPath({dir, name, ext, ...parsedForm})
    }
}
