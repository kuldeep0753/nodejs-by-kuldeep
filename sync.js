console.log("Hello World");

function multiply(a, b) {
    return a * b;
}

let c= multiply(2,5);
console.log(c);
module.exports = { multiply };

console.log(this);