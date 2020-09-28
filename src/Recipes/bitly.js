const fetch = require('node-fetch');


const BITLY_API_KEY = 'ENTER API KEY HERE';
/**
 *
 * @param url
 * @returns {String}
 */
function convert(url) {
    const body = {
        "long_url":url,
        "domain":"bit.ly"
    };

    const headers = {
        'Authorization': BITLY_API_KEY,
        'Content-Type': 'application/json'
    };

    return fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'post',
        body:    JSON.stringify(body),
        headers
    })
        .then(res => res.text())
        .then(result => JSON.parse(result).link);
}

/**
 *
 * @type {{convert: (function(*): *)}}
 */
module.exports = {
    convert
};