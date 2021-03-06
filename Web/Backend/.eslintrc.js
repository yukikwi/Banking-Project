module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    "rules":{
      "indent": [2, "tab"],
      "no-tabs": 0,
      "trailing-comma": [true, {
        "singleline": "never",
        "multiline": {
          "objects": "never", 
          "arrays": "always",
          "functions": "never",
          "typeLiterals": "ignore"
        }
      }],
      'no-console': 'off',
      'eqeqeq': false,
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
    }
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {}
}
