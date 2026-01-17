console.log("App file loaded successfully.");

// Commented out: Previous require statement for the sum module
// require("./sum");

// Now using destructuring to import specific exports (a and add) from sum.js
const { a, add } = require("./sum");

const sum = add(5, 10);
console.log("Sum of 5 and 10 is:", sum);
console.log(a);
