module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node":true,
        "mocha":true
    },
    "root":true,
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "script"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],

    }
};