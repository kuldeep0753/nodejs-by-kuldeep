const { add,mul,sub} = require("./calculate");

// Commented out: Previous require statement for the sum module (CommonJS)
// require("./sum");

// Commented out: Previous destructuring import using require (CommonJS)
// const { a, add } = require("./calculate/sum");

// Recent change: Switched to ES modules for modern JavaScript import/export syntax
// Using import to load specific exports (a and add) from sum.js
// import { a, add } from "./sum.js";
let a = 10, b = 2;

console.log("Sum of 5 and 10 is:", add(a,b));
console.log("Multiplication of 5 and 10 is:", mul(a, b));
console.log("Subtraction of 5 and 10 is:", sub(a, b));

// Demonstrating strict mode behavior in Node.js
// z = 19; //non strict mode in commonjs but in strict mode throw an error
// console.log(z)
