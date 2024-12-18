import eslint from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsparser from "@typescript-eslint/parser"
import reactPlugin from "eslint-plugin-react"

export default [
	eslint.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
		ignores: ["dist/**/*", "node_modules/**/*"],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true
				}
			}
		},
		plugins: {
			"@typescript-eslint": tseslint,
			react: reactPlugin
		},
		rules: {
			"react/prop-types": "off",
			"react/react-in-jsx-scope": "off",
			"no-unused-vars": "off"
		},
		settings: {
			react: {
				version: "detect"
			}
		}
	}
]
