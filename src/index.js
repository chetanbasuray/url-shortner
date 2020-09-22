const tinyUrl = require('./Recipes/tinyurl');

/**
 *
 * @param url
 * @param source
 * @returns {String}
 */
async function handleRequest(url, source) {
    if(source.includes('tinyurl')) {
        return await tinyUrl.convert(url);
    }
}

/**
 *
 * @type {{handleRequest: handleRequest}}
 */
module.exports = {
    handleRequest
};