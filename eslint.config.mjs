import pluginJs from "@eslint/js";
import eslintImport from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintReact from "eslint-plugin-react";
import eslintReactHooks from "eslint-plugin-react-hooks";
import eslintReactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        project: ["tsconfig.json"],
        ecmaFeatures: {
          jsx: true,
        },
      },
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": eslintReactHooks,
      react: eslintReact,
      "react-refresh": eslintReactRefresh,
      prettier: eslintPluginPrettier,
      import: eslintImport,
    },
    rules: {
      "react/jsx-filename-extension": [
        "error",
        { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["sibling", "parent"],
            "index",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintReact.configs.flat.recommended,
  eslintReact.configs.flat["jsx-runtime"]
);
