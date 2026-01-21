# nodejs-by-kuldeep

A structured Node.js learning repository covering core concepts, practical examples, and small projects.

## What I've Learned So Far

This repository documents my journey learning Node.js fundamentals. Here's a summary of key concepts covered:

### 1. **Module System in Node.js**

- Understanding how Node.js treats each file as a separate module
- Using `module.exports` to share functions, variables, and objects between modules
- Importing modules with `require()` and destructuring syntax (`const { a, add } = require("./sum")`)

### 2. **Basic Application Structure**

- Creating and organizing code across multiple files (e.g., `app.js` as the main entry point, `sum.js` as a utility module)
- Writing and calling functions to perform calculations
- Using `console.log()` for debugging and output

### 3. **Code Documentation and Revision**

- Adding meaningful comments to explain code logic and changes
- Documenting why certain code is commented out or modified for future reference

### 4. **Running Node.js Applications**

- Executing scripts with `node app.js`
- Understanding the terminal output and exit codes

### 5. **Switching to ES Modules**

- Transitioned from CommonJS (`require`/`module.exports`) to modern ES modules (`import`/`export`)
- Enabled by setting `"type": "module"` in `package.json`
- Benefits: Better static analysis, tree-shaking, and alignment with modern JavaScript standards

### 6. **Basics of REPL (Read-Eval-Print Loop)**

- REPL is an interactive command-line interface for running JavaScript code in real-time.
- Access it by typing `node` in the terminal without specifying a file.
- It reads your input, evaluates it, prints the result, and loops back for more input.
- Useful for quick testing and experimentation, but code entered here is temporary and not saved to files.

### 7. **Entry Point Code Execution in Terminal**

- The entry point is the main file where your application starts (e.g., `app.js`).
- Execute it by running `node app.js` in the terminal, which processes the code from top to bottom.
- Node.js runs synchronously by default, but can handle asynchronous operations for non-blocking I/O.

### 8. **Why Node.js is Called a Runtime Environment**

- Node.js provides a runtime environment that allows JavaScript to run outside web browsers, on servers or desktops.
- It includes the V8 JavaScript engine plus APIs for interacting with the operating system (file system, network, etc.), making JS suitable for backend development.

### 9. **Why We Write Code in Files Rather Than in Terminal**

- Writing code in files (like `.js` files) allows it to be saved, version-controlled, and reused across sessions.
- Terminal REPL is ideal for quick tests or one-off commands, but files are necessary for building persistent, shareable applications.

### 10. **What is 'this' and What Does It Point To**

- `this` is a keyword that refers to the context (object) in which a function is executed.
- In the global scope, `this` points to the global object (in Node.js, it's the module's `exports`).
- In object methods, `this` points to the object owning the method; in constructors, to the new instance.

### 11. **What is the V8 Engine and Why We Need It**

- V8 is Google's open-source JavaScript engine that compiles JavaScript code into efficient machine code for fast execution.
- Node.js uses V8 to run JavaScript on the server-side, enabling high-performance backend applications without needing a browser.

### 12. **What is a Server**

- A server is a computer program or hardware that provides services to other computers (clients) over a network.
- In Node.js, you can build servers using built-in modules like `http` to handle web requests, serve files, or create APIs.

### 13. **Timeline of Node.js**

- **2009**: Created by Ryan Dahl as an experiment to run JavaScript outside browsers.
- **2011**: First stable release (v0.10.x).
- **2015**: v4.0 LTS (Long-Term Support) released.
- **2016**: v6.0 LTS.
- **2017**: v8.0 LTS.
- **2018**: v10.0 LTS.
- **2019**: v12.0 LTS.
- **2020**: v14.0 LTS.
- **2021**: v16.0 LTS.
- **2022**: v18.0 LTS.
- **2023**: v20.0 LTS.
- Ongoing: Regular updates with new features, security fixes, and performance improvements.

### 14. **Why Should I Still Learn Node.js**

- **Versatility**: Enables full-stack development with a single language (JavaScript) for both frontend and backend.
- **Performance**: Non-blocking I/O and V8 engine make it fast for scalable applications.
- **Ecosystem**: Massive npm registry with millions of packages for rapid development.
- **Popularity**: Used by companies like Netflix, LinkedIn, and Uber; strong job market.
- **Modern Features**: Supports async/await, ES6+, and is evolving with new runtime capabilities.
- **Community**: Large, active community for support, tutorials, and tools.

### 15. **Creating Index Files for Module Aggregation**

- **Purpose**: Organize related modules into folders and use an `index.js` file to combine and re-export them as a single module for easier importing.
- **How It Works**: In a folder (e.g., `calculate/`), create individual modules (e.g., `sum.js`, `mul.js`, `sub.js`) that export their functions. Then, in `index.js`, import from these modules and export them together (e.g., `module.exports = { add, mul, sub }`).
- **Usage**: Import the grouped exports in another file using `const { add, mul, sub } = require("./calculate")`, allowing access to multiple utilities from one import.
- **Benefits**: Simplifies imports, improves code organization, and makes it easier to manage related functionalities as a cohesive unit.

### 16. **Node.js Event Loop - Priority Order**

The Event Loop determines the order in which callbacks are executed. Understanding this priority hierarchy is crucial for writing efficient asynchronous code.

#### **🥇 Highest Priority: Microtasks**

- **`process.nextTick()`**: Executes at the end of the current phase, before any I/O events. Has the absolute highest priority.
  ```javascript
  process.nextTick(() => {
    console.log('Executes first among async operations');
  });
  ```

- **`Promise.then()` / `.catch()` / `.finally()`**: Executes after `process.nextTick()` but before timers. Includes `async/await`.
  ```javascript
  Promise.resolve().then(() => {
    console.log('Executes after nextTick');
  });
  ```

#### **🥈 Medium Priority: Macrotasks (I/O & API Requests)**

- **HTTP Requests**: Network operations via `http.get()`, `fetch()`, etc.
- **Database Calls**: Operations like `User.findById()`, database queries.
- **File System**: `fs.readFile()`, `fs.readdir()`, and other file operations.

These operations have actual I/O delays but execute before timers.

#### **🥉 Lower Priority: Timers**

- **`setTimeout()` / `setInterval()`**: Executes after all microtasks complete. Even `setTimeout(..., 0)` waits for Promises.
  ```javascript
  setTimeout(() => {
    console.log('Executes last');
  }, 0);
  ```

#### **Key Example**

```javascript
console.log('1. Sync code');

setTimeout(() => {
  console.log('2. setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise');
});

process.nextTick(() => {
  console.log('4. nextTick');
});

// Output:
// 1. Sync code
// 4. nextTick
// 3. Promise
// 2. setTimeout
```

#### **Complete Priority Hierarchy**

1. **Synchronous code** (highest)
2. **Microtasks**: `process.nextTick()` → `Promise.then()`
3. **Macrotasks**: I/O operations → `setTimeout/setInterval`
4. **Repeat microtasks** if any are queued after each macrotask

This ensures predictable async behavior and prevents blocking operations from starving the event loop.
