type FormsMap = Map<string, Set<string>>;

export interface Pathform {
    pathId: string
    pathform: Pathform
    isStatic: boolean

    tag: any
    forms: FormsMap
    options: object
}

export class Pathform implements Pathform {
    constructor (pathId: string, pathform: Pathform, forms?: FormsMap) {
        this.pathId = pathId
        this.pathform = pathform
        this.isStatic = pathform?.isStatic || false
        this.forms = pathform.forms || new Map(forms)
    }

    hasFormForId (id: string, name: string): boolean {
        return this.forms.has(id) && this.forms.get(id).has(name);
    }

    insertForms (id: string, name: string) {
        if (!this.forms.has(id))
            this.forms.set(id, new Set<string>().add(name));
        else
            this.forms.get(id).add(name);
    }
}
