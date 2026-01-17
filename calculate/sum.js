// Log a message to indicate that the sum module has been loaded successfully
// console.log("Sum load successful.");

// Define a function that takes two parameters and returns their sum
 function add(a, b) {
    return a + b;
}

// Declare a variable 'a' and assign it the value 10
//  var a = 10;

// Log the value of variable 'a' to the console
// console.log(a)

// Recent change: Switched from CommonJS (module.exports) to ES modules (export)
// Commented out: Previous CommonJS export using module.exports
// This made 'a' and 'add' available via require() in other modules
module.exports = {  add };

// Now using ES module exports: 'export' keyword makes them available for import in other modules