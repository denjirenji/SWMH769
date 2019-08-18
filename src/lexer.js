const Lexer = require('lex');

const parseSimpleLexeme = lexeme => {
    const parts = lexeme
        .split("=")
        .map(part => part.trim());
    const simpleLexeme = {};
    console.log({lexeme, parts});

    simpleLexeme[parts[0]] = parts[1];

    return {
        type: "simple",
        text: lexeme,
        value: simpleLexeme
    };
};

const parseComplexLexeme = lexeme => {
    const parts = lexeme.split("{").map(part => part.trim());
    const complexLexeme = {};

    complexLexeme[parts[0]] = parts[1];
    console.log({lexeme, parts, complexLexeme});

    return {
        type: "complex",
        text: lexeme,
        value: {}
    };
};

const inert = () => { };

const createLexer = (onMatch) => {

    const lexer = new Lexer();

    //check for whitespace
    lexer.addRule(/\s+/, inert);

    //check for comments
    lexer.addRule(/#(.+|)/, inert);

    lexer.addRule(/\w*\s?=\s?\w*/, (lexeme) => onMatch(parseSimpleLexeme(lexeme)));

    lexer.addRule(/\w*\s?=\s?{(\n\s?(.+|.+\n?)+(\n?\s+?|)((.+|.+\n?)+|)|\s?(.+|.+\n?))}/, (lexeme) => onMatch(parseComplexLexeme(lexeme)));

    return lexer;
};

module.exports = {
    createLexer
};