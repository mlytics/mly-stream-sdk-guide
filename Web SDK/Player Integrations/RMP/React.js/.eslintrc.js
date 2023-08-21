module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        jest: true
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2021,
        ecmaFeatures: {
            'jsx': true
        }
    },
    plugins: [
        'react',
        'react-hooks'
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
    ],
    settings: {
        'react': {
            'version': 'detect'
        }
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
        ],
        'react/prop-types': [
            'off'
        ],
        'react/react-in-jsx-scope': [
            'off'
        ],
        'react-hooks/exhaustive-deps': [
            'off'
        ]
    }
};
