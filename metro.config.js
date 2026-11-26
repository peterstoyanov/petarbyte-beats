// https://docs.expo.dev/guides/customizing-metro/
const { getDefaultConfig } = require('expo/metro-config');

const { TEXT_FILE_EXTENSION } = require('./config/textModule');

const config = getDefaultConfig(__dirname);

// Built-in songs are .cs files imported as text; see config/textModule.js.
config.resolver.sourceExts.push(TEXT_FILE_EXTENSION);
config.transformer.babelTransformerPath = require.resolve('./config/metroTransformer.js');

module.exports = config;
