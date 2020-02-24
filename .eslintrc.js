module.exports = {
    root: true,
    parserOptions: {
      parser: 'babel-eslint'
    },
    env: {
      browser: true,
      es6: true
    },
    extends: [
      'plugin:vue/essential',
      'eslint:recommended',
      'plugin:prettier/recommended'
    ],
    plugins: [
      'vue', 'prettier'
    ],
    rules: {"no-console": 0,
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "none",
        "bracketSpacing": true,
        "jsxBracketSameLine": true
      }
    ]
  }
}
