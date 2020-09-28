const index = require('../src/index')

test('Returns known result when google.com is sent to tinyurl', () => {
    const url = 'https://www.google.com';
    const recipe = 'tinyurl';
    const expectedResult = 'http://tinyurl.com/bjnwp7u';
    index.handleRequest(url, recipe)
        .then(response => {
            expect(response).toBe(expectedResult);
        });
});

// this test will only work once you
// input the apikey in the file bitly.js line 4
test('Returns known result when google.com is sent to tinyurl', () => {
    const url = 'https://www.google.com';
    const recipe = 'bitly';
    const expectedResult = 'https://bit.ly/3jg1sM8';
    index.handleRequest(url, recipe)
        .then(response => {
            expect(response).toBe(expectedResult);
        });
});