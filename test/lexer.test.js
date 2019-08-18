const lexer = require("../src/lexer");

describe("lexer", () => {
  test("does not tokenize an empty string", () => {
    const emptyString = "";
    const tokens = lexer.getTokens(emptyString);
    const expected = [
      {
        type: "EOF"
      }
    ];
    expect(tokens).toEqual(expected);
  });

  test("tokenizes an identifier", () => {
    const emptyString = "first_key";
    const tokens = lexer.getTokens(emptyString);
    const expected = [
      {
        type: "identifier",
        value: "first_key"
      },
      {
        type: "EOF"
      }
    ];
    expect(tokens).toEqual(expected);
  });

  test("tokenizes an a key value expression", () => {
    const emptyString = "first_key = first_value";
    const tokens = lexer.getTokens(emptyString);
    const expected = [
      {
        type: "identifier",
        value: "first_key"
      },
      {
        type: "equals",
        value: "="
      },
      {
        type: "identifier",
        value: "first_value"
      },
      {
        type: "EOF"
      }
    ];
    expect(tokens).toEqual(expected);
  });

  test("tokenizes a braced key value expression", () => {
    const emptyString = "first_key = { first_value }";
    const tokens = lexer.getTokens(emptyString);
    const expected = [
      {
        type: "identifier",
        value: "first_key"
      },
      {
        type: "equals",
        value: "="
      },
      {
        type: "brace",
        value: "{"
      },
      {
        type: "identifier",
        value: "first_value"
      },
      {
        type: "brace",
        value: "}"
      },
      {
        type: "EOF"
      }
    ];
    expect(tokens).toEqual(expected);
  });

  test("tokenizes a braced key value expression", () => {
    const emptyString = "first_key = { first_inner_key = first_inner_value }";
    const tokens = lexer.getTokens(emptyString);
    const expected = [
      {
        type: "identifier",
        value: "first_key"
      },
      {
        type: "equals",
        value: "="
      },
      {
        type: "brace",
        value: "{"
      },
      {
        type: "identifier",
        value: "first_inner_key"
      },
      {
        type: "equals",
        value: "="
      },
      {
        type: "identifier",
        value: "first_inner_value"
      },
      {
        type: "brace",
        value: "}"
      },
      {
        type: "EOF"
      }
    ];
    expect(tokens).toEqual(expected);
  });
});
