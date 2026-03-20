NORMALISED EXTRACT

Table of Contents
1. Overview
2. Creating contexts and sandboxing primitives
3. Running code: runInNewContext, runInContext, runInThisContext
4. vm.Script and Script instances
5. vm.compileFunction and compile-time creation of functions
6. Options: timeout, filename, displayErrors, microtask handling
7. Security considerations and best practices

1. Overview
- The Node.js vm module provides APIs to compile and run JavaScript code within V8 contexts separate from the current global context. It is a building block for controlled execution of dynamic code.
- Key objects and functions: vm.createContext, vm.runInNewContext, vm.Script, vm.compileFunction.

2. Creating contexts and sandboxing primitives
- vm.createContext(sandbox[, options]) -> contextifiedObject
  - sandbox: a plain object whose properties become globals inside the created context.
  - options: optional object for context creation flags (e.g., code generation control) depending on Node version.
  - Returns a contextified object that can be passed to vm.runInContext or script.runInContext.

3. Running code
- vm.runInNewContext(code[, sandbox][, options]) -> any
  - code: string or Buffer containing JavaScript source
  - sandbox: optional object to be used as the global object inside the new context
  - options: optional object with properties such as filename (string) and timeout (number, milliseconds) to limit synchronous execution time
  - Returns the result of evaluating the code in the provided sandbox.

- vm.runInContext(code, contextifiedSandbox[, options]) -> any
  - Runs code in an existing contextified sandbox returned by vm.createContext.

- vm.runInThisContext(code[, options]) -> any
  - Compiles and runs code in the current global context while bypassing wrappers that would normally provide module scoping; useful for evaluating code with V8 optimizations while avoiding module evaluation semantics.

4. vm.Script
- new vm.Script(code[, options]) -> Script
  - Script instances compile code once and can be executed multiple times in different contexts.
  - Methods on Script: script.runInContext(context[, options]), script.runInNewContext(sandbox[, options]), script.runInThisContext([options])

5. vm.compileFunction
- vm.compileFunction(code, paramNames, options) -> Function
  - code: string source for function body
  - paramNames: Array of strings naming parameters for the compiled function
  - options: object with fields such as parsing parameters and filename. The function executes in a new context unless explicitly bound.
  - Returns a callable function object whose invocation is faster than constructing a Function via the global Function constructor because compilation can be done ahead of time with context isolation.

6. Options (common fields)
- timeout: number (milliseconds) — maximum synchronous execution time for runIn* and Script.runIn* calls. When the script exceeds the timeout a TimeoutError is thrown.
- filename: string — used for stack traces and debugging to identify the origin of code.
- displayErrors: boolean — whether errors should include full display information.
- microtaskMode / promise handling: newer Node versions expose microtask handling options that affect promises and microtasks executed during script execution.

7. Security considerations and best practices
- The vm module is not a complete security boundary by itself. Code running in a vm context can still interact with host objects if references are intentionally or accidentally provided through the sandbox object.
- For untrusted code, avoid exposing host-side functions, objects or prototypes in the sandbox. Freeze or copy-only the minimal data needed into the sandbox.
- Use timeouts to prevent infinite loops and restrict synchronous CPU usage.
- Consider using OS-level isolation or worker threads with strict message-passing if untrusted code must be executed at scale.

SUPPLEMENTARY DETAILS
- Contextification: Objects passed as the sandbox are contextified; subsequent modifications on the host-side object are visible in the sandbox and vice versa unless deep-copied.
- For repeated execution of the same code, use vm.Script to compile once and run multiple times to reduce compilation overhead.

REFERENCE DETAILS (exact signatures and behaviors)
- vm.createContext(sandbox[, options]) -> Object (contextified)
- vm.runInNewContext(code[, sandbox][, options]) -> any
- vm.runInContext(code, contextifiedSandbox[, options]) -> any
- vm.runInThisContext(code[, options]) -> any
- new vm.Script(code[, options]) -> Script with runInContext/runInNewContext/runInThisContext methods
- vm.compileFunction(code, paramNamesArray[, options]) -> Function
- Common options fields: timeout (ms), filename (string), displayErrors (boolean), microtaskMode (string)

Concrete implementation patterns
- To evaluate a mathematical expression safely when input is restricted to numeric operations and Math: create a fresh context with vm.createContext({Math}) and run the expression with vm.runInContext('return ' + expr, context, {timeout: 1000, filename:'user-expression'}) or compile a function with vm.compileFunction.
- Example pattern (no code block): create a compact sandbox object containing only Math and a Number coercion helper, compile the expression into a function using compileFunction or vm.Script, and execute with a timeout. Validate the expression text against an allowlist before compilation.

DETAILED DIGEST
- Source: Node.js vm API documentation
- Retrieved: 2026-03-20
- Source URL: https://nodejs.org/api/vm.html
- Bytes fetched: 431360

ATTRIBUTION
- Content extracted and condensed from the Node.js vm module documentation (see URL). The above captures the vm API primitives, typical options and security considerations relevant when executing user-supplied expressions.