const Lexer = require("./lexer");

/**
 * parses the tokens
 * @param {{ type: string, value: string }[]} tokens
 * @param {number} current
 */
const parseToken = (tokens, current) => {
  return tokens[current];
};

/**
 * Parses the input data
 * @param {string} data
 */
const parse = data => {
  try {
    // Create a new lexer
    const tokens = Lexer.getTokens(data);

    // This will become the AST
    const parsed = [];

    // Iterate over the tokens
    let i = 0;

    // Keep iterating until we have reached 
    // the end of file token
    while (tokens[i].type != "EOF") {
      // Parse the token
      const res = parseToken(tokens, i);

      // Add the result to the AST
      parsed.push(res);

      // increment counter
      i++;
    }

    return parsed;
  } catch (err) {
    // Something went wrong when parsing the file
    throw new Error("Could not parse file");
  }
};

module.exports = {
  parse
};
