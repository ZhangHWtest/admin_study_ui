module.exports = {
  root:true,
  env: {
    node:true
  },
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "prettier/vue"
  ],
    rules: {
      "no-console": process.env.NODE_ENV ==="production"?"error":"off",
      "no-debugger": process.env.NODE_ENV ==="production"?"error":"off",
      "no-unused-vars":"off",
      // "no-extra-semi": "error",
      // "semi": ["error", "never"],
      "no-redeclare":"off",
      "no-empty":"off",
      "no-undef":"off",
      "no-case-declarations":"off",
      "vue/no-use-v-if-with-v-for":"off",
      "vue/no-unused-components":"off",  
    },
    parserOptions: {
      parser:"babel-eslint"
    }
  };