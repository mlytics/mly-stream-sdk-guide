module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
    ],
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
