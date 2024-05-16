module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:react/recommended",
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  plugins: ['react-refresh',"prettier"],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        tabWidth: 2,
        singleQuote: true,
        semi: true,
        trailingComma: 'all',
        endOfLine: 'auto',
      },
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope':'off',
    "react/prop-types": "off",
    'react-refresh/only-export-components':'off'
    
  },
}
