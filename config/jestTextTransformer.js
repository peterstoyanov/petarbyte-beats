const { createHash } = require('node:crypto');

const { TEXT_MODULE_CACHE_KEY, textModule } = require('./textModule');

/** Gives Jest the same string modules for text files that the Metro transformer gives the app. */
const process = (src) => ({ code: textModule(src) });

const getCacheKey = (src, path, options) =>
  createHash('sha256')
    .update([src, path, options.configString, TEXT_MODULE_CACHE_KEY].join('\0'))
    .digest('hex');

module.exports = { getCacheKey, process };
