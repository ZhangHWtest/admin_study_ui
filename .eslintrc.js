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
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],
  plugins: ['vue'],
  rules: {
    //函数定义时括号前面要不要有空格
    'space-before-function-paren': 0,
    "no-console": 0,
    'prettier/prettier': [
      'error',
      {
        // tab缩进大小,默认为2
        tabWidth: 2,
        // 使用tab缩进，默认false
        useTabs: false,
        // 使用分号, 默认true
        semi: false,
        // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
        singleQuote: true
      }
    ]
  },
  // 取消eslint 对全局变量的校验  变量名require
  "globals":{
    "require": true
  }
}
