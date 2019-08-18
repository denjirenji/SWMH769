const reader = require('../src/reader');
const parser = require('../src/parser');

test("parses sample", () => {
    const contents = reader.read('./samples/1.txt');
    const result = parser.parse(contents);

    expect(result).toBeDefined();
});

// test("parses sample and gets a key value pair", () => {
//     const contents = reader.read('./samples/1.txt');
//     const result = parser.parse(contents);

//     expect(result).toBe("first_key = first_answer");
// });

test("parses sample and returns an array", () => {
    const contents = reader.read('./samples/1.txt');
    const result = parser.parse(contents);

    expect(typeof result).toBe('object');

});

test("parses sample and returns an object with a correct key/values", () => {
    const contents = reader.read('./samples/1.txt');
    const result = parser.parse(contents);

    expect(result).toEqual({
        "first_key": "first_answer",
        "second_key": "second_answer"
    });
});