import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginNext from "@next/eslint-plugin-next";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
    {
        plugins: {
            "@next/next": pluginNext,
            "@stylistic": stylistic
        }
    },
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,css}"] },
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,css}"],
        settings: { react: { version: "detect" } },
        languageOptions: { globals: { ...globals.browser, ...globals.node } }
    },
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,css}"], plugins: { js }, extends: ["js/recommended"] },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,css}"],
        rules: {
            "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
            "@stylistic/padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
                { blankLine: "never", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
                { blankLine: "always", prev: "*", next: "export" }
            ],
            "@stylistic/lines-between-class-members": ["error", "never"]
        }
    }
]);
