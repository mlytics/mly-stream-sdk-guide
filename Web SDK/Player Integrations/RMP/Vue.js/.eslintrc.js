module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'semi': [
            'error', 'always'
        ],
        'indent': [
            'error', 4, {
                'SwitchCase': 1
            }
        ],
        'object-curly-spacing': [
            'error', 'never'
        ]
    }
};
