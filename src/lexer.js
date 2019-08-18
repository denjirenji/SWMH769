const Lexer = require("lex");

/**
 * An inert function called when a match
 * should be ignored.
 */
const inert = () => {};

/**
 * A node with information about the matched
 * lexeme.
 *
 * @param {string} type
 * @param {string} lexeme
 */
const createNode = (type, lexeme) => {
  return {
    type,
    value: lexeme
  };
};

/**
 * Creates a new lexer. A callback is executed
 * on each match found.
 *
 * @param {(lexeme) => void)} onMatch
 */
const createLexer = onMatch => {
  const lexer = new Lexer();

  // Check for whitespace
  lexer.addRule(/\s+/, inert);

  // Check for comments
  lexer.addRule(/#(.+|)/, inert);

  // identifiers
  lexer.addRule(/[a-zA-Z_]+/, lexeme =>
    onMatch(createNode("identifier", lexeme))
  );

  // date indentifiers
  lexer.addRule(/\d{1,4}\.\d{1,2}\.\d{1,2}/, lexeme =>
    onMatch(createNode("identifier", lexeme))
  );

  // number
  lexer.addRule(/\d+/, lexeme => onMatch(createNode("number", lexeme)));

  // equals
  lexer.addRule(/=/, lexeme => onMatch(createNode("equals", lexeme)));

  // opening brace
  lexer.addRule(/{/, lexeme => onMatch(createNode("brace", lexeme)));

  // closing brace
  lexer.addRule(/}/, lexeme => onMatch(createNode("brace", lexeme)));

  return lexer;
};

/**
 * Tokenizes the input string
 * 
 * @param {string} data 
 */
const getTokens = data => {
  const tokens = [];
  const lexer = createLexer(token => {
    tokens.push(token);
  });
  lexer.setInput(data).lex();

  // Add and end of file node
  tokens.push({ type: "EOF" });
  return tokens;
};

module.exports = {
  getTokens
};
