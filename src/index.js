const read = require('./reader');
const parse = require('./parser');

const contents = read('./samples/1.txt');
const result = parse(contents);