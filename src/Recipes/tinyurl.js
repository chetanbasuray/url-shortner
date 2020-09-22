const fetch = require('node-fetch');

/**
 *
 * @param url
 * @returns {String}
 */
function convert(url) {
    return fetch(`http://tinyurl.com/api-create.php?url=${url}`)
        .then(res => res.text());
}

/**
 *
 * @type {{convert: (function(*): *)}}
 */
module.exports = {
    convert
};