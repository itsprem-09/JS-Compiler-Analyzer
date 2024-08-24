const keywords = [
  "abstract",
  "arguments",
  "await",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "double",
  "else",
  "enum",
  "eval",
  "export",
  "extends",
  "false",
  "final",
  "finally",
  "float",
  "for",
  "function",
  "goto",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "int",
  "interface",
  "let",
  "long",
  "native",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "volatile",
  "while",
  "with",
  "yield",
];

const identifierRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*/;
const numberRegex = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/;
const stringRegex = /^(["'])(?:(?=(\\?))\2.)*?\1/;
const commentRegex = /^\/\/.*|\/\*[\s\S]*?\*\//;
const whitespaceRegex = /^\s+/;
const operatorRegex =
  /^(?:(?:\+\+|--|\*\*|\+=|-=|\*=|\/=|===(?!==)|==(?!>)|<=|>=|=>|!|&|\||&&|\?|:|(?<![.\d])\.(?![.\d]))|[-+*/%=&|!<>^])/;
const otherRegex = /^[(){};,[\]]/;
const functionRegex =
  /^function\s*([A-z0-9]+)?\s*\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)\s*\{(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}/;

function tokenize(sourceCode) {
  let tokens = [];
  console.log(sourceCode);

  let remainingCode = sourceCode;
  while (remainingCode.length > 0) {
    let match;
    if (remainingCode.match(commentRegex) !== null) {
      match = remainingCode.match(commentRegex);
      //tokens.push({ type: 'comment', value: match[0] });
    } else if (remainingCode.match(stringRegex) !== null) {
      match = remainingCode.match(stringRegex);
      tokens.push({ type: "string", value: match[0] });
    } else if (remainingCode.match(functionRegex) !== null) {
      match = remainingCode.match(functionRegex);
      tokens.push({ type: "function", value: match[0] });
    } else if (remainingCode.match(identifierRegex) !== null) {
      match = remainingCode.match(identifierRegex);
      const token = match[0];
      const isKeyword = keywords.includes(token);
      tokens.push({ type: isKeyword ? "keyword" : "identifier", value: token });
    } else if (remainingCode.match(numberRegex) !== null) {
      match = remainingCode.match(numberRegex);
      tokens.push({ type: "number", value: match[0] });
    } else if (remainingCode.match(operatorRegex) !== null) {
      match = remainingCode.match(operatorRegex);
      tokens.push({ type: "operator", value: match[0] });
    } else if (remainingCode.match(otherRegex) !== null) {
      match = remainingCode.match(otherRegex);
      tokens.push({ type: "other", value: match[0] });
    }

    if (match) {
      remainingCode = remainingCode.replace(match[0], "");
    } else {
      remainingCode = remainingCode.slice(1);
    }
  }
  return tokens;
}

function run() {
  let inputValue = document.getElementById("inputText").value;
  const sourceCode = [`${inputValue}`];
  let ans = document.getElementById("resultText");

  const tokens = tokenize(sourceCode[0]);
  var jsonString = JSON.stringify(tokens);
  var jsonPretty = JSON.stringify(JSON.parse(jsonString), null, 2);
  ans.value = jsonPretty;
}

function copyText() {
  let text = document.getElementById("resultText");
  text.select();
  document.execCommand("copy");
}
