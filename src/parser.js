const Lexer = require("./lexer");

/**
 * 
 * @param {string} data 
 */
const parse = (data) => {
    try {
        const matches = [];

        const lexer = Lexer.createLexer(match => {
            matches.push(match);
        })
        lexer.setInput(data).lex();

        const parsed = {};

        matches.forEach(match => {
            Object.keys(match.value).forEach(key => {
                parsed[key] = match.value[key];

            });
        });
        return parsed;
    }
    catch (err) {
        throw new Error("Could not parse file");
    };
};

module.exports = {
    parse
};