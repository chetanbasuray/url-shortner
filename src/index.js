const tinyUrl = require('./Recipes/tinyurl');
const bitly = require('./Recipes/bitly');

/**
 *
 * @param url
 * @param source
 * @returns {String}
 */
async function handleRequest(url, source) {
    if(source.includes('tinyurl')) {
        return await tinyUrl.convert(url);
    } else if(source.includes('bitly')) {
        return await bitly.convert(url);
    }
}

/**
 *
 * @type {{handleRequest: handleRequest}}
 */
module.exports = {
    handleRequest
};