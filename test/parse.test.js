const reader = require('../src/reader');
const parser = require('../src/parser');

test("parses_sample", () => {
    const contents = reader.read('./samples/1.txt');
    const result = parser.parse(contents);

    expect(result).toBeDefined();
})