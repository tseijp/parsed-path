import * as PATH from 'path'
import { compile } from 'stylis'
import { format } from '../utils'

const parse = require('path-parse')

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
        this.parsePath = (parse as any)[mode]
        this.joinPath = ((PATH as any)[mode] || PATH)[join] //
        this.pathform = pathform || undefined
        this.isStatic = !pathform || pathform.isStatic
        this.forms = pathform?.forms || forms || new Map<string, Set<string>>([])
    }

    hasFormForId(id: string, form: string): boolean {
        return this.forms.has(id) && Boolean(this.forms.get(id)?.has(form))//
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

    generate (id: string, names: string[]) {
        const {isStatic, forms, joinPath, joinForm, parsePath, parseForm} = this
        const filterNames = names.filter((name: string) => {
            if (name.match(FORM_REGEX) && !this.hasFormForId(id, name))
                this.insertForms(id, name)
            else return name
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
