import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import postcss from "rollup-plugin-postcss";
import postcssPresetEnv from "postcss-preset-env";
import clean from "postcss-clean";
// import { terser } from "rollup-plugin-terser";

export default [
    {
        entry: "./src/background/index.ts",
        output: {
            name: "background",
            file: "dist/background.js",
            format: "umd", // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            del({
                targets: ["dist/background.js.map", "dist/background.js"]
            }),
            typescript()
        ]
    },
    {
        entry: "./src/contentscript/index.ts",
        output: {
            name: "content",
            file: "dist/contentscript.js",
            format: "umd", // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            del({
                targets: ["dist/contentscript.js.map", "dist/contentscript.js"]
            }),
            typescript()
        ]
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
            del({
                targets: ["dist/popup.js.map", "dist/popup.js", "dist/popup.css"]
            }),
            replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
            postcss({
                extract: true,
                parser: "postcss-scss",
                plugins: [postcssPresetEnv(), clean()]
            }),
            resolve(),
            commonjs({
                // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
                include: "node_modules/**",
                namedExports: {
                    "node_modules/react/index.js": ["Component", "PropTypes", "createElement", "Children", "PureComponent"],
                    "node_modules/react-dom/index.js": ["render", "findDOMNode"]
                }
            }),
            typescript(),
            copy({
                "./src/popup/index.html": "dist/popup.html",
                verbose: true
            })
        ]
    }
];
