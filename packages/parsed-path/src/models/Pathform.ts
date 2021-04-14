import * as PATH from 'path'
import { compile } from 'stylis'

type FormsMap = Map<string, Set<string>>

const FORM_REGEX = /:/ // todo
const COMMENT_REGEX = /^\s*\/\/.*$/gm;
const COMPLEX_SELECTOR_PREFIX = [':', '[', '.', '#'];

export interface Pathform {
    pathId: string
    pathform: Pathform
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
        this.formatPath = PATH[mode].format
        this.parsePath = PATH[mode].parse
        this.joinPath = PATH[mode][join]
        this.pathform = pathform || undefined
        this.isStatic = pathform?.isStatic
        this.forms = pathform.forms || forms || new Map<string, Set<string>>([])
    }

    insertForms (id: string, name: string) {
        if (!this.forms.has(id))
            this.forms.set(id, new Set<string>().add(name))
        else
            this.forms.get(id).add(name)
    }

    joinForm (forms: Set<string>) {
        if (!forms)
            return ''
        return Array.from(forms).join('').replace(COMMENT_REGEX, '')
    }

    parseForm(form: string) {
        if (!form)
            return {}
        const compiled = compile(form)
        return Object.assign({}, ...compiled.map((form: any) => ({[form.props]: form.children})))
    }

    generate (id: string, names: string[]) {
        const {isStatic, forms, joinPath, joinForm, parsePath, parseForm} = this
        const filterNames = names.filter((name: string) => {
            if (!name.match(FORM_REGEX))
                return name
            this.insertForms(id, name)
        })
        if (isStatic && forms.get(id).size < 1)
            return joinPath(...filterNames)

        const joinedPath = joinPath(...filterNames)
        const joinedForm = joinForm(forms.get(id))
        const parsedPath = parsePath(joinedPath)
        const parsedForm = parseForm(joinedForm)

        return this.formatPath({...parsedPath, ...parsedForm})
    }
}
