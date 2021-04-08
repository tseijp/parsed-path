import { parsed } from '../constructors'

export const resetParsed = (isServer: boolean = false) => {
    if (!isServer)
        if (!window.location)
            throw Error("no window.location")

    return parsed
}
