import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import tailwindcss from "eslint-plugin-tailwindcss";
import pluginReact from "eslint-plugin-react";
import pluginNext from "@next/eslint-plugin-next";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
    {
        plugins: {
            "@next/next": pluginNext,
            "@stylistic": stylistic,
            tailwindcss: tailwindcss
        }
    },
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        settings: { react: { version: "detect" } },
        languageOptions: { globals: { ...globals.browser, ...globals.node } }
    },
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
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
