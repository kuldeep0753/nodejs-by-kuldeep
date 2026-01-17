// Log a message to indicate that the sum module has been loaded successfully
console.log("Sum load successful.");

// Define a function that takes two parameters and returns their sum
function add(a, b) {
    return a + b;
}

// Declare a variable 'a' and assign it the value 10
var a = 10;

// Log the value of variable 'a' to the console
console.log(a)

// Export an object containing the variable 'a' and the 'add' function
// This makes them available for import in other modules using require()
module.exports = { a, add };