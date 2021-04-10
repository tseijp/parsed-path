import { promises as fs } from 'fs';
import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser'

const input = 'src/index'
const external = Object.keys({...pkg.dependencies, ...pkg.devDependencies})
const extensions = ['.js', '.jsx', '.ts', '.tsx']

const getBabelOptions = ({ useESModules }) => ({
    babelrc: false,
    babelHelpers: 'runtime',
    extensions,
    exclude: '**/node_modules/**',
    plugins: [
        ['@babel/transform-runtime', {regenerator:false, useESModules}],
        ['@babel/proposal-class-properties'         , {loose:true}],
        ['@babel/plugin-proposal-object-rest-spread', {loose:true}],
        ['transform-react-remove-prop-types', {removeImport:true}],
    ],
    presets: [
        ['@babel/env', {loose:true, modules:false}],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
})

const targetTypings = (out) => ({
    writeBundle () {
        const text = `export * from "./${input}";\nexport {default as default} from "./${input}"`
        return fs.lstat(pkg.types).catch(() => {
            return fs.writeFile(pkg.types, text)
        })
    }
})

export default [
    { input, output: {file: pkg.main, format: 'cjs'}, external, plugins: [
        babel( getBabelOptions({useESModules: false}) ),
        commonjs({extensions}),
        resolve ({extensions}),
        targetTypings(),
        terser()
    ]},
    { input, output: {file: pkg.module, format: 'esm'}, external, plugins: [
        babel( getBabelOptions({useESModules: true}) ),
        commonjs({extensions}),
        resolve ({extensions}),
        targetTypings(),
        terser()
    ] },
]
