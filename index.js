const { parse, join } = require('path');
const parseArgs = require('minimist');

function suffixFile(file, suffix) {
    const { dir, name, ext } = parse(file);
    return join(dir, `${name}${suffix}${ext}`);
}

function parseBoolean(value) {
    return Boolean(typeof value === 'string' ? JSON.parse(value) : value);
}

function minify(options) {
    const { fileSuffix, minifierPluginName, minifierPluginImportName, minifierOptions, ...restOptions } = { ...minify.defaultOptions, ...options };
    const minimize = typeof restOptions.minimize === 'boolean' ? restOptions.minimize :
        parseBoolean(process.env.ROLLUP_MINIMIZE) ||
        parseBoolean(parseArgs(process.argv.slice(2)).minimize);
    return {
        name: 'minify',
        options(input) {
            if (minimize) {
                const minifier = require(minifierPluginName);
                input.plugins.push((minifierPluginImportName ? minifier[minifierPluginImportName] : minifier)(minifierOptions));
                return input;
            }
        },
        outputOptions(output) {
            if (minimize
                && typeof fileSuffix === 'string'
                && fileSuffix !== '') {
                output.file = suffixFile(output.file, fileSuffix);
                return output;
            }
        }
    };
}

minify.defaultOptions = {
    fileSuffix: '.min',
    minifierPluginName: 'rollup-plugin-terser',
    minifierPluginImportName: 'terser'
};

module.exports = minify;
