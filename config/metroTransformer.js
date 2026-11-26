const { isTextFile, TEXT_MODULE_CACHE_KEY, textModule } = require('./textModule');

// @expo/metro-config comes with expo, so it is resolved through expo rather than installed
// directly: expo doctor warns when an app depends on it on its own.
const expoBabelTransformer = require(
  require.resolve('@expo/metro-config/babel-transformer', {
    paths: [require.resolve('expo/package.json')],
  }),
);

/** Turns text files into string modules, then hands every file to Expo's own transformer. */
const transform = ({ filename, src, ...rest }) =>
  expoBabelTransformer.transform({
    ...rest,
    filename,
    src: isTextFile(filename) ? textModule(src) : src,
  });

const getCacheKey = (options) =>
  [expoBabelTransformer.getCacheKey?.(options) ?? '', TEXT_MODULE_CACHE_KEY].join('$');

module.exports = { getCacheKey, transform };
