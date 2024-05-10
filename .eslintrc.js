module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    extends: [
      "eslint:recommended",
      "plugin:vue/vue3-essential",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended" //放最后面 eslint-config-prettier插件用来禁止eslint中所有格式规则
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
      parser: "@typescript-eslint/parser",
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: ["vue", "@typescript-eslint"],
    rules: {}
  };