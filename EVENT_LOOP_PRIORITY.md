# Node.js Event Loop - Priority Order Explained

## 🎯 Question Framework

**Question:** How does Node.js decide which callback to execute first when multiple operations complete simultaneously?

**Answer:** Node.js uses an **Event Loop** with a specific priority hierarchy. Callbacks are executed in this order:

---

## 🥇 **Highest Priority: Microtasks**

### What are Microtasks?

Microtasks are small tasks that must be completed **before** moving to the next phase of the event loop.

### **1. `process.nextTick()`**

```javascript
console.log('1. Start');

process.nextTick(() => {
  console.log('2. process.nextTick()');
});

console.log('3. End');

// Output:
// 1. Start
// 3. End
// 2. process.nextTick()
```

**Characteristics:**
- Executes **at the end of the current phase**, before any I/O events
- Has **highest priority** among all async operations
- Not technically part of the event loop phases, but executed between phases
- Use case: Deferring execution, error handling

---

### **2. `Promise.then()` (Microtask Queue)**

```javascript
console.log('1. Start');

Promise.resolve().then(() => {
  console.log('2. Promise.then()');
});

process.nextTick(() => {
  console.log('3. process.nextTick()');
});

console.log('4. End');

// Output:
// 1. Start
// 4. End
// 3. process.nextTick()
// 2. Promise.then()
```

**Characteristics:**
- Executes after `process.nextTick()` but still in the **microtask phase**
- Includes `.then()`, `.catch()`, `.finally()` on Promises
- Also includes `async/await` (which is syntactic sugar for Promises)
- Use case: Handling promise-based asynchronous operations

---

## Complete Microtask Priority Order

| Priority | Operation |
|----------|-----------|
| 1st | `process.nextTick()` |
| 2nd | `Promise.then()`, `.catch()`, `.finally()` |
| 3rd | `async/await` |
| 4th | `queueMicrotask()` |

---

## 🥈 **Medium Priority: Macrotasks (I/O & API Requests)**

### What are Macrotasks?

Macrotasks are longer-running operations. **All microtasks complete before the next macrotask begins.**

### **1. HTTP Requests**

```javascript
const http = require('http');

console.log('1. Start');

http.get('https://jsonplaceholder.typicode.com/posts/1', (res) => {
  console.log('2. HTTP Response received');
});

console.log('3. End');

// Output:
// 1. Start
// 3. End
// [After network delay]
// 2. HTTP Response received
```

---

### **2. Database Calls**

```javascript
const mongoose = require('mongoose');

console.log('1. Start');

User.findById(1).then((user) => {
  console.log('2. DB Result:', user);
});

console.log('3. End');

// Output:
// 1. Start
// 3. End
// [After DB query delay]
// 2. DB Result: { id: 1, name: 'John' }
```

---

### **3. `fs.readFile()` (File System)**

```javascript
const fs = require('fs');

console.log('1. Start');

fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log('2. File Read:', data);
});

console.log('3. End');

// Output:
// 1. Start
// 3. End
// [After file I/O delay]
// 2. File Read: [file contents]
```

---

## 🥉 **Lower Priority: Timers**

### **1. `setTimeout()` & `setInterval()`**

```javascript
console.log('1. Start');

setTimeout(() => {
  console.log('2. setTimeout (0ms)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise.then()');
});

console.log('4. End');

// Output:
// 1. Start
// 4. End
// 3. Promise.then()
// 2. setTimeout (0ms)
```

**Characteristics:**
- Executes **after all microtasks** are complete
- Even `setTimeout(..., 0)` waits for microtasks
- Has a minimum delay of ~4ms in browsers, ~1ms in Node.js
- Lowest priority in the event loop

---

## 📊 **Complete Event Loop Priority Hierarchy**

```
Synchronous Code (Highest Priority)
    ↓
Microtasks:
  1. process.nextTick()
  2. Promise.then() / .catch() / .finally()
  3. async/await
  4. queueMicrotask()
    ↓
Macrotasks:
  1. setTimeout / setInterval
  2. setImmediate (Node.js specific)
  3. I/O operations (fs, HTTP, DB)
  4. UI rendering (in browsers)
    ↓
[Back to Microtasks if any are queued]
```

---

## 🔄 **Complete Event Loop Cycle Example**

```javascript
console.log('Synchronous: 1');

setTimeout(() => {
  console.log('Timer: 2');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise: 3');
  });

process.nextTick(() => {
  console.log('nextTick: 4');
});

fs.readFile('file.txt', () => {
  console.log('I/O: 5');
  
  Promise.resolve().then(() => {
    console.log('Promise in I/O: 6');
  });
});

console.log('Synchronous: 7');

// Output:
// Synchronous: 1
// Synchronous: 7
// nextTick: 4
// Promise: 3
// Timer: 2
// I/O: 5
// Promise in I/O: 6
```

---

## 🎓 **Key Takeaways**

| Concept | Priority | When to Use |
|---------|----------|------------|
| **process.nextTick()** | ⭐⭐⭐ Highest | Deferring critical operations, error handling |
| **Promise.then()** | ⭐⭐ High | Async operations, chaining promises |
| **setTimeout()** | ⭐ Low | Scheduling tasks, animation frames |
| **I/O Operations** | ⭐⭐ Medium | File/network operations (actual execution happens in system layer) |

---

## ⚠️ **Common Pitfalls**

### ❌ **Mistake: Expecting setTimeout(0) to execute first**

```javascript
// WRONG assumption: setTimeout executes immediately
setTimeout(() => console.log('A'), 0);
Promise.resolve().then(() => console.log('B'));

// Actual output: B, A (Promise executes first!)
```

### ❌ **Mistake: Blocking I/O operations**

```javascript
// BLOCKING - Never do this!
const data = fs.readFileSync('file.txt');
console.log(data);

// ✅ CORRECT - Use async
fs.readFile('file.txt', (err, data) => {
  console.log(data);
});
```

### ✅ **Best Practice: Understanding the queue**

```javascript
// Use process.nextTick() for deferred execution
process.nextTick(() => {
  // This runs after current phase completes
  console.log('Deferred operation');
});

// Use Promise.then() for promise-based async
Promise.resolve().then(() => {
  console.log('Promise resolution');
});

// Use setTimeout for scheduling tasks
setTimeout(() => {
  console.log('Scheduled task');
}, 1000);
```

---

## 📚 **Event Loop Phases (Node.js specific)**

```
   ┌───────────────┐
┌─>│   timers      │  Execute setTimeout / setInterval
│  └─────────────┬┘
│  ┌─────────────┴┐
│  │ pending      │  Execute deferred I/O callbacks
│  │ callbacks    │
│  └─────────────┬┘
│  ┌─────────────┴┐
│  │   idle,      │  Internal use
│  │   prepare    │
│  └─────────────┬┘
│  ┌─────────────┴┐
│  │   poll       │  Retrieve new I/O events
│  │              │  Execute almost all callbacks
│  └─────────────┬┘
│  ┌─────────────┴┐
│  │   check      │  Execute setImmediate
│  └─────────────┬┘
│  ┌─────────────┴┐
│  │ close        │  Execute close callbacks
│  │ callbacks    │
│  └─────────────┬┘
└──────────────┘
```

---

## 🧪 **Interactive Test**

Run this in your Node.js application to see the priority order:

```javascript
console.log('=== Event Loop Priority Test ===\n');

console.log('[Sync] Code block start');

setTimeout(() => {
  console.log('[setTimeout] 1st macro task');
  Promise.resolve().then(() => {
    console.log('[Promise] Inside setTimeout (Microtask)');
  });
}, 0);

setImmediate(() => {
  console.log('[setImmediate] Check phase');
});

Promise.resolve()
  .then(() => {
    console.log('[Promise.then()] 1st microtask');
  })
  .then(() => {
    console.log('[Promise.then()] 2nd microtask');
  });

process.nextTick(() => {
  console.log('[process.nextTick()] Highest priority');
});

console.log('[Sync] Code block end');

// Expected Output:
// [Sync] Code block start
// [Sync] Code block end
// [process.nextTick()] Highest priority
// [Promise.then()] 1st microtask
// [Promise.then()] 2nd microtask
// [setTimeout] 1st macro task
// [Promise] Inside setTimeout (Microtask)
// [setImmediate] Check phase
```

