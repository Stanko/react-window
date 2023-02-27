const React = require("react");
const ReactDOMServer = require("react-dom/server");
const ReactWindow = require("./dist/cjs").default;
const ReactBody = require("./dist/cjs/body").default;

const example = React.createElement("div", null, [
  React.createElement(ReactWindow, { key: "1", onClick: () => console.log("Hello Window!") }),
  React.createElement(ReactBody, { key: "1", onClick: () => console.log("Hello Body!") }),
]);

const renderedString = ReactDOMServer.renderToString(example);

const expectedString = "<div></div>";

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";

if (renderedString === expectedString) {
  console.log(green + "\nTest passed\n" + reset);
} else {
  console.log("\nRendered:");
  console.log(red + renderedString + reset);
  console.log("\nExpected:");
  console.log(green + expectedString + reset);
  console.log("\n", red);
  throw new Error("Test failed");
}
