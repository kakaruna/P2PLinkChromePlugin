import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";
import scss from "rollup-plugin-scss";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default [
    {
        entry: "./src/background/index.ts",
        output: {
            name: "background",
            file: "dist/background.js",
            format: "umd", // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [typescript()]
    },
    {
        entry: "./src/contentscript/index.ts",
        output: {
            name: "content",
            file: "dist/contentscript.js",
            format: "umd", // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [typescript()]
    },
    {
        entry: "./src/popup/index.tsx",
        output: {
            name: "popup",
            file: "dist/popup.js",
            format: "umd", // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            scss({
                output: "dist/popup.css"
            }),
            resolve({
                jsnext: true,
                main: true,
                browser: true,
                module: true
            }),
            commonjs(),
            typescript(),
            copy({
                "./src/popup/index.html": "dist/popup.html",
                verbose: true
            })
        ]
    }
];
