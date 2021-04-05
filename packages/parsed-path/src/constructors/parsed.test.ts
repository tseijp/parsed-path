import { parsedTargets } from './parsed'
import { resetParsed } from '../utils'

let parsed: any;
const location = new URL("https://tsei.jp/note/api/user/100")
// const targets = location.pathname.split('/').filter(Boolean)

describe('parsed', () => {
    beforeEach(() => {
        parsed = resetParsed()
    })
    it('to string', () => {
        const path = parsed('src/utils')
        expect(path()()).toEqual('src/utils')
        expect(path + "").toEqual('src/utils')
        expect(path.toString()).toEqual('src/utils')
        expect(path({ext: 'js'})).toEqual('src/utils')

        // const file = path`index.${({ext='ts'}) => ext}`
        // expect(file()).  toEqual('src/utils/index.ts')
        // expect(file + "").toEqual('src/utils/index.ts')
        // expect(file.toString()).toEqual('src/utils/index.ts')
        // expect(file({ext: 'js'})).toEqual('src/utils/index.js')
    })
})

describe('defined parsed target', () => {
    let windowSpy: any;
    beforeEach(() => {
        parsed = resetParsed()
        const originalWindow = { ...window };
        windowSpy = jest.spyOn(global, "window", "get")
        windowSpy.mockImplementation(() => ({
            ...originalWindow,
            location
        }))
    })
    afterEach(() => void windowSpy.mockRestore());

    it('should have all paths defined', () => {
        parsedTargets.forEach(target => {
            expect(parsed[target]).toBeTruthy();
        });
    });

    it('should have all targets defined', () => {
        // ERROR
        // targets.forEach(target => {
        //     expect(parsed[target]).toBeTruthy();
        // });
    });
});
