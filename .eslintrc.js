module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                ObjectExpression: 1,
                flatTernaryExpressions: false,
                ignoredNodes: ['ConditionalExpression *'],
            },
        ],
        'no-undef': 0,
        'comma-dangle': ['error', 'always-multiline'],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    },
}
