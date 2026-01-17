console.log("App file loaded successfully.");

// Commented out: Previous require statement for the sum module (CommonJS)
// require("./sum");

// Commented out: Previous destructuring import using require (CommonJS)
const { a, add } = require("./sum");

// Recent change: Switched to ES modules for modern JavaScript import/export syntax
// Using import to load specific exports (a and add) from sum.js
// import { a, add } from "./sum.js";

const sum = add(5, 10);
console.log("Sum of 5 and 10 is:", sum);
console.log(a);

z = 19; //non strict mode in commonjs but in strict mode throw an error
console.log(z)
