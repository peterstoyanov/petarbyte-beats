const { createHash } = require('node:crypto');
const { readFileSync } = require('node:fs');

/** The extension of files the app imports as text. */
const TEXT_FILE_EXTENSION = 'cs';

const isTextFile = (filename) => filename.endsWith(`.${TEXT_FILE_EXTENSION}`);

/**
 * The source of a module whose default export is the file's text, so `import code from
 * './song.cs'` gives the code as a string.
 */
const textModule = (text) => `module.exports = ${JSON.stringify(text)};`;

/**
 * A hash of this file. Metro and Jest key their caches on the transformer file alone, not on what
 * it requires, so the transformers add this to their keys: a change here then rebuilds every song.
 */
const TEXT_MODULE_CACHE_KEY = createHash('sha256')
  .update(readFileSync(require.resolve('./textModule')))
  .digest('hex');

module.exports = { TEXT_FILE_EXTENSION, TEXT_MODULE_CACHE_KEY, isTextFile, textModule };
