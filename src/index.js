const reader = require('./reader');
const parser = require('./parser');

const contents = reader.read('./samples/1.txt');
const result = parser.parse(contents);