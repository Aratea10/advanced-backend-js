// const tsPlugin = require("@typescript-eslint/eslint-plugin");
// const prettierConfig = require("eslint-config-prettier");
// const importPlugin = require("eslint-plugin-import");
// const globals = require("globals");
// const tsParser = require("@typescript-eslint/parser");

import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default [
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: {
                ...globals.node,
                ...globals.es2021,
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            import: importPlugin,
        },
        settings: {
            "import/resolver": {
                typescript: {
                    project: "./tsconfig.json",
                },
            },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": ["error"],
            "@typescript-eslint/no-use-before-define": "error",
            "@typescript-eslint/explicit-function-return-type": "off",

            "import/no-unresolved": "error",
            "import/named": "error",
            "import/default": "error",
            "import/export": "error",

            quotes: ["error", "single", { avoidEscape: true }],
            semi: ["error", "always"],
            "no-unused-vars": "off",
            "no-use-before-define": "off",
        },
    },
    prettierConfig,
];
