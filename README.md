# rollup-plugin-minify-cli

(a bit experimental) Rollup plugin to minify bundles through command line interface.

## Usage

Simple usage (don't forget to install [rollup-plugin-terser](https://github.com/TrySound/rollup-plugin-terser) first), ```rollup.config.js```:
```javascript
const minify = require('rollup-plugin-minify-cli');

module.exports = {
    input: 'main.js',
    output: {
        file: 'bundle.js',
        format: 'iife'
    },
    plugins: [
        minify()
    ]
};
```

Then you can minify projects through command line option ```minimize``` (you will get the warning from rollup, it's OK):
```cmd
rollup --config rollup.config.js --minimize
```

Additional options:
```javascript
minify({
    minimize: true, // wether to minify bundle or not, undefined by default (controlled through CLI option 'minimize')
    minifierPluginName: 'rollup-plugin-uglify', // minifier plugin to use, 'rollup-plugin-terser' by default
    minifierPluginImportName: 'uglify', // minifer plugin import name, 'terser' by default
    minifierOptions: { // options to pass to minifier, undefined by default
        mangle: {
            toplevel: true
        }
    },
    fileSuffix: '' // minified file suffix name, '.min' by default, to discard suffix adding pass '' or undefined
})
```
