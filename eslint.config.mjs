// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  // Your custom configs here
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue' , '**/*.js', '**/*.jsx' , '**/*.mjs'],
    rules: {
      // 使用单引号
      quotes: ['warn', 'single'],
      // 禁止使用console
      'no-console': 'warn',
      // 强制使用分号
      'semi': ['warn', 'always'],
      // 强制使用 === 和 !== 而不是 == 和 !=
      'eqeqeq': ['warn', 'always'],
      // 强制箭头函数的箭头前后有空格
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      // 禁止多余的空行
      'no-multiple-empty-lines': ['error', { 'max': 1 }],
      'max-len': [
      'warn',
      {
        code: 90, // 设置最大行长度为80字符
        ignoreUrls: true, // 不检查URL长度
        ignoreStrings: true, // 不检查字符串长度
        ignoreRegExpLiterals: true, // 不检查正则表达式字面量长度
        ignoreTemplateLiterals: true // 不检查模板字面量长度
      }
      ],
      'comma-dangle': [
      'warn',
      'never' // 禁止尾随逗号
      ]
    }
  }
);
