# Node.js Fundamentals – Solution

## What is Node.js?
Node.js is a runtime environment that allows you to run JavaScript code outside of a browser, built on Chrome's V8 JavaScript engine. It enables server-side scripting and is commonly used for building APIs, web servers, and command-line tools.

## How does Node.js differ from running JavaScript in the browser?
- Node.js runs on the server, not in the browser.
- Node provides access to the file system, network, and OS, while browsers restrict access for security.
- Node uses ES Modules (ESM), which is the same module system used in modern browsers.
- Node does not have browser-specific APIs like `window` or `document`.

## What is the V8 engine, and how does Node use it?
The V8 engine is Google's open-source JavaScript engine, used in Chrome. Node.js uses V8 to compile and execute JavaScript code on the server, providing fast performance and access to low-level system resources.

## What are some key use cases for Node.js?
- Building RESTful APIs
- Real-time applications (e.g., chat apps)
- Command-line tools
- Streaming applications
- Microservices

## Explain ES Modules and give a code example.

**ES Modules (used in this course):**
```js
// math.js
export function add(a, b) { return a + b; }

// app.js
import { add } from './math.js';
console.log(add(2, 3));
```

Note: To use ES Modules in Node.js, you need to either use files with the `.mjs` extension or set `"type": "module"` in your `package.json` file. 