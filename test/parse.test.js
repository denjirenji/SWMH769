const reader = require('../src/reader');
const parser = require('../src/parser');

describe('parser', () => {
    
    test("parses an empty string", () => {
        const contents = '';
        const result = parser.parse(contents);
        expect(result).toBeDefined();
    });

    test("parses whitespace", () => {
        const contents = '\t \n';
        const result = parser.parse(contents);
        expect(result).toBeDefined();
    });

    test("parses a comment", () => {
        const contents = '# comment';
        const result = parser.parse(contents);
        expect(result).toBeDefined();
    });

})
