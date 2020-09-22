const index = require('../src/index')

test('Returns known result when google.com is sent to tinyurl', () => {
    const url = 'https://www.google.com';
    const recipe = 'tinyurl';
    const expectedResult = 'http://tinyurl.com/bjnwp7u';
    index.handleRequest(url, recipe)
        .then(response => {
            console.log(response);
            expect(response).toBe(expectedResult);
        });
});