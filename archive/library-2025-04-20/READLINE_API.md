# READLINE_API

## Crawl Summary
Node.js Readline API provides both callback and promise based methods for line-by-line input from a Readable stream. Key constructs include the InterfaceConstructor with methods like close(), pause(), prompt(), resume(), and properties such as line and cursor. It supports events ('close', 'line', 'history', 'pause', 'resume', 'SIGCONT', 'SIGINT', 'SIGTSTP') with precise triggering conditions. The promises API (via node:readline/promises) and callback API allow usage with methods such as rl.question() and read operations, with configuration options controlling history, prompt, input/output streams and key sequence handling. Detailed method signatures, parameter types, return types, code examples and configuration defaults (e.g., crlfDelay: 100, escapeCodeTimeout: 500, tabSize: 8) are provided.

## Normalised Extract
## Table of Contents
1. InterfaceConstructor & Methods
   - rl.close(): Closes interface, emits 'close'.
   - rl[Symbol.dispose](): Alias for rl.close().
   - rl.pause(): Pauses input stream.
   - rl.prompt([preserveCursor]): Writes prompt, resumes input.
   - rl.resume(): Resumes input stream.
   - rl.setPrompt(prompt): Sets prompt string.
   - rl.getPrompt(): Returns current prompt string.
   - rl.write(data[, key]): Writes data or key sequence to output.
   - rl[Symbol.asyncIterator](): Returns AsyncIterator for input lines.
   - Properties: rl.line (current input), rl.cursor, rl.getCursorPos() → { rows, cols }.

2. Events
   - 'close': Emitted when interface is closed.
   - 'line': Emitted when an end-of-line is detected; listener receives the input string.
   - 'history': Emitted when history changes; listener receives history array.
   - 'pause': Emitted upon pausing the input stream.
   - 'resume': Emitted upon resuming the input stream.
   - 'SIGCONT': Emitted when process resumes from background (not on Windows).
   - 'SIGINT': Emitted on Ctrl+C (if unhandled, triggers 'pause').
   - 'SIGTSTP': Emitted on Ctrl+Z, can override default backgrounding.

3. Promises API (node:readline/promises)
   - Class: readlinePromises.Interface
     - Method: rl.question(query[, options]) → Promise<string>
     - Example usage provided with async/await.
   - Class: readlinePromises.Readline
     - Constructor: new readlinePromises.Readline(stream[, options])
     - Additional methods: clearLine(dir), clearScreenDown(), commit(), cursorTo(x[, y]), moveCursor(dx, dy), rollback().
   - Factory method: readlinePromises.createInterface(options) with options { input, output, completer, terminal, history, historySize, removeHistoryDuplicates, prompt, crlfDelay, escapeCodeTimeout, tabSize }.

4. Callback API
   - Class: readline.Interface
     - Method: rl.question(query[, options], callback) where callback receives the answer.
     - Static methods: readline.clearLine(stream, dir[, callback]), clearScreenDown, cursorTo, moveCursor, emitKeypressEvents.

5. Code Examples
   - Promise based example showing import, creation of interface, asking a question, logging answer, and closing.
   - Callback based example with similar structure.
   - File stream processing using async iteration and 'line' event.

6. Configuration Options & Defaults
   - input (stream.Readable) and output (stream.Writable): required.
   - completer: Function for tab autocompletion.
   - terminal: boolean; default derived from isTTY check on output.
   - history: array string, default [].
   - historySize: number, default 30.
   - removeHistoryDuplicates: boolean, default false.
   - prompt: string, default '> '.
   - crlfDelay: number, minimum 100, default 100.
   - escapeCodeTimeout: number, default 500.
   - tabSize: integer, default 8.

7. Troubleshooting & Best Practices
   - Always call rl.close() to prevent hanging processes.
   - Use process.stdin.unref() if needed to exit without waiting.
   - Combine async iteration with event listeners carefully to avoid missed lines.
   - Use AbortSignal with rl.question() to cancel long waits.
   - Ensure TTY-specific configurations are correctly set (output.columns, resize events).


## Supplementary Details
### Detailed Configuration Options
- input: Must be a Readable stream (e.g., process.stdin).
- output: Must be a Writable stream (e.g., process.stdout).
- completer: Function defined as: 
  ```js
  function completer(line) {
    const completions = '.help .error .exit .quit .q'.split(' ');
    const hits = completions.filter(c => c.startsWith(line));
    return [hits.length ? hits : completions, line];
  }
  ```
- terminal: Boolean, determined by checking if output.isTTY; enables ANSI escape codes.
- history: Initial array; default [].
- historySize: Maximum history lines; default 30. Set to 0 to disable history caching.
- removeHistoryDuplicates: Boolean flag, default false. If true, duplicate lines are removed.
- prompt: Default string '> '. Can be changed using rl.setPrompt(prompt).
- crlfDelay: Number; minimum is 100 ms, default 100, used to detect CR+LF sequences as single newline.
- escapeCodeTimeout: Number, default 500 ms, for ambiguous key sequences.
- tabSize: Integer, default 8; defines how many spaces equivalent to a tab.

### Implementation Steps
1. Import the module using either ES Modules or CommonJS.
2. Create the interface via `createInterface(options)` providing input and output.
3. Set the prompt using `rl.setPrompt()` if desired.
4. Use appropriate method (`rl.question()`, event listeners or async iteration) to process input.
5. Always close the interface with `rl.close()` upon completion.

### Version and Stability Notes
- InterfaceConstructor added in v0.1.104.
- rl[Symbol.dispose]() added in v23.10.0.
- 'history' event available since v15.8.0/v14.18.0.
- Promise API available from v17.0.0, marked experimental with stability 1.

### Troubleshooting Procedures
- If the input stream appears to hang, verify that `rl.close()` is being called.
- For issues with autocompletion, ensure the completer function correctly returns an array of matches and the original substring.
- Use `process.stdin.isTTY` to check terminal mode if ANSI escape codes are not working.
- For key sequence troubleshooting, verify that your terminal supports the TTY keybindings listed and that raw mode is enabled (e.g., `process.stdin.setRawMode(true)`).


## Reference Details
## Complete API Specifications and Code Examples

### InterfaceConstructor Methods

- **rl.close()**
  - **Signature**: `void rl.close()`
  - **Description**: Closes the readline interface and emits the 'close' event.

- **rl[Symbol.dispose]()**
  - **Signature**: `void rl[Symbol.dispose]()`
  - **Alias**: Same as rl.close().

- **rl.pause()**
  - **Signature**: `void rl.pause()`
  - **Description**: Pauses the input stream.

- **rl.prompt([preserveCursor])**
  - **Signature**: `void rl.prompt([preserveCursor: boolean])`
  - **Parameters**:
    - `preserveCursor` (optional boolean): If true, the cursor is not reset.
  - **Description**: Writes the prompt to output and resumes the stream.

- **rl.resume()**
  - **Signature**: `void rl.resume()`
  - **Description**: Resumes the input stream.

- **rl.setPrompt(prompt)**
  - **Signature**: `void rl.setPrompt(prompt: string)`
  - **Description**: Sets the prompt string.

- **rl.getPrompt()**
  - **Signature**: `string rl.getPrompt()`
  - **Description**: Returns the current prompt.

- **rl.write(data[, key])**
  - **Signature**: `void rl.write(data: string, key?: { ctrl?: boolean, meta?: boolean, shift?: boolean, name: string })`
  - **Description**: Writes provided data or simulates a key sequence.

- **rl[Symbol.asyncIterator]()**
  - **Signature**: `AsyncIterator<string> rl[Symbol.asyncIterator]()`
  - **Description**: Returns an async iterator to iterate over each line.

- **rl.getCursorPos()**
  - **Signature**: `Object rl.getCursorPos()`
  - **Return**: `{ rows: number, cols: number }`

### Promises API Methods (node:readline/promises)

- **rl.question(query[, options])**
  - **Signature**: `Promise<string> rl.question(query: string, options?: { signal?: AbortSignal })`
  - **Example**:
    ```js
    import * as readline from 'node:readline/promises';
    import { stdin as input, stdout as output } from 'node:process';
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question('What is your favorite food? ');
    console.log(`Favorite food: ${answer}`);
    rl.close();
    ```

- **Constructor: new readlinePromises.Readline(stream, options)**
  - **Signature**: `new readlinePromises.Readline(stream: stream.Writable, options?: { autoCommit?: boolean })`

- **rl.clearLine(dir)**
  - **Signature**: `rl.clearLine(dir: number): this`
  - **Parameter**: `dir` where `-1` clears left, `0` clears entire line, `1` clears right.

- **rl.clearScreenDown()**
  - **Signature**: `rl.clearScreenDown(): this`

- **rl.commit()**
  - **Signature**: `Promise<void> rl.commit()`
  - **Description**: Applies pending actions and clears them.

- **rl.cursorTo(x[, y])**
  - **Signature**: `rl.cursorTo(x: number, y?: number): this`

- **rl.moveCursor(dx, dy)**
  - **Signature**: `rl.moveCursor(dx: number, dy: number): this`

- **rl.rollback()**
  - **Signature**: `rl.rollback(): this`

- **readlinePromises.createInterface(options)**
  - **Signature**: `readlinePromises.createInterface(options: {
      input: stream.Readable,
      output: stream.Writable,
      completer?: Function,
      terminal?: boolean,
      history?: string[],
      historySize?: number,
      removeHistoryDuplicates?: boolean,
      prompt?: string,
      crlfDelay?: number,
      escapeCodeTimeout?: number,
      tabSize?: number
    }): readlinePromises.Interface`

### Callback API Methods

- **rl.question(query[, options], callback)**
  - **Signature**: `void rl.question(query: string, options: { signal?: AbortSignal } | undefined, callback: (answer: string) => void)`
  - **Example**:
    ```js
    const readline = require('node:readline');
    const { stdin, stdout } = require('node:process');
    const rl = readline.createInterface({ input: stdin, output: stdout });
    rl.question('Your input: ', (answer) => {
      console.log(`Received: ${answer}`);
      rl.close();
    });
    ```

- **Static Methods**:
  - `readline.clearLine(stream, dir[, callback])`: Clears line in specified direction.
  - `readline.clearScreenDown(stream[, callback])`: Clears screen downwards.
  - `readline.cursorTo(stream, x[, y][, callback])`: Moves cursor to a given position.
  - `readline.moveCursor(stream, dx, dy[, callback])`: Moves cursor relative to current position.
  - `readline.emitKeypressEvents(stream, [interface])`: Causes stream to emit 'keypress' events (requires TTY and raw mode).

### Detailed Keybindings (TTY)
For example:
- Ctrl+U: Delete from the current position to the start
- Ctrl+K: Delete from the current position to end of line
- Ctrl+A/Ctrl+E: Go to start/end of line
- Meta+Y: Cycle through deleted texts
- And others as documented.

### Best Practices & Troubleshooting Commands
- Ensure proper configuration of options when creating the interface to match your terminal's capabilities.
- If using asynchronous iteration, anticipate that the stream is fully consumed once iteration starts.
- Use explicit `rl.close()` calls to clean-up the interface and allow process exit.
- In case of long delays in key sequence recognition, adjust `escapeCodeTimeout` accordingly.
- To test keypress events, enable raw mode with:
  ```js
  if (process.stdin.isTTY) process.stdin.setRawMode(true);
  ```
- To verify successful clearance of the screen or line, observe the returned boolean from static methods to see if the stream emitted a 'drain' event.

This documentation provides the full set of method signatures, parameters, defaults, and usage examples for immediate implementation by developers without external reference.


## Original Source
Node.js Readline Documentation
https://nodejs.org/api/readline.html

## Digest of READLINE_API

# Node.js Readline API Documentation

*Retrieved on: 2023-10-05*

## Overview
The Node.js `readline` module provides an interface to read data from a Readable stream (e.g. `process.stdin`) one line at a time, supporting both callback and Promise based APIs.

## Table of Contents
1. InterfaceConstructor and Instance Methods
2. Events
3. Promises API
4. Callback API
5. Configuration Options
6. Code Examples
7. Troubleshooting and Best Practices

## 1. InterfaceConstructor and Instance Methods

### Class: InterfaceConstructor
- **Creation**: Instances are created via `readline.createInterface(options)` or `readlinePromises.createInterface(options)`.
- **Inheritance**: Extends `EventEmitter`.
- **Key Methods**:
  - `rl.close()`: Closes the interface and relinquishes control over input/output streams. Emits the `'close'` event.
  - `rl[Symbol.dispose]()` (v23.10.0): Alias for `rl.close()`.
  - `rl.pause()`: Pauses the input stream.
  - `rl.prompt([preserveCursor])`: Writes the configured prompt to a new line. Optionally preserves cursor position if `preserveCursor` is `true`.
  - `rl.resume()`: Resumes the input stream.
  - `rl.setPrompt(prompt)`: Sets the prompt string. *Parameter*: `prompt` (string)
  - `rl.getPrompt()`: Returns the current prompt string. *Return*: `<string>`
  - `rl.write(data[, key])`: Writes data or key sequence to the output. 
      - **Parameters**: 
         - `data` (string)
         - `key` (object) where key may contain booleans for `ctrl`, `meta`, `shift` and a string `name`.
  - `rl[Symbol.asyncIterator]()`: Returns an `AsyncIterator` for iterating over each line of input.
  - Properties:
      - `rl.line`: The current input line (always string).
      - `rl.cursor`: The current cursor position in the line.
      - `rl.getCursorPos()`: Returns an object with `{ rows: number, cols: number }` representing the actual cursor position.

## 2. Events

The readline Interface emits various events:

- **'close'**: Emitted when:
  - `rl.close()` is called;
  - The input stream ends (via `'end'` event, Ctrl+D, or SIGINT without handler).
  - **Listener**: Called without arguments.

- **'line'**: Emitted when an end-of-line input is received (\n, \r, or \r\n). 
  - **Listener**: Receives a single argument – the string line.
  - *Example*:
    ```js
    rl.on('line', (input) => {
      console.log(`Received: ${input}`);
    });
    ```

- **'history'**: Emitted whenever the history array changes. 
  - **Listener**: Receives the updated history array.

- **'pause'**: Emitted when the input stream is paused.
  - **Example**:
    ```js
    rl.on('pause', () => {
      console.log('Readline paused.');
    });
    ```

- **'resume'**: Emitted when the input stream is resumed.

- **'SIGCONT'**: Emitted when the process returns from background. (Not on Windows)
  - **Example**:
    ```js
    rl.on('SIGCONT', () => {
      rl.prompt();
    });
    ```

- **'SIGINT'**: Emitted on Ctrl+C, unless a `'SIGINT'` handler is registered. 
  - **Example**:
    ```js
    rl.on('SIGINT', () => {
      rl.question('Are you sure you want to exit? ', (answer) => {
        if (/^y(es)?$/i.test(answer)) rl.pause();
      });
    });
    ```

- **'SIGTSTP'**: Emitted on Ctrl+Z in terminals supporting it. 
  - **Example**:
    ```js
    rl.on('SIGTSTP', () => {
      console.log('Caught SIGTSTP.');
    });
    ```

## 3. Promises API

This API is available via `node:readline/promises` and provides Promise-based methods.

### Class: readlinePromises.Interface
- **Method**: `rl.question(query[, options])`
  - **Parameters**:
    - `query` (string): Prompt text.
    - `options` (object): Optional; may include an `AbortSignal` as `signal`.
  - **Returns**: `<Promise<string>>` which resolves with the user input.
  - *Example*:
    ```js
    import * as readline from 'node:readline/promises';
    import { stdin as input, stdout as output } from 'node:process';
    
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question('What do you think of Node.js? ');
    console.log(`Thank you for your valuable feedback: ${answer}`);
    rl.close();
    ```

### Class: readlinePromises.Readline
- **Constructor**: `new readlinePromises.Readline(stream[, options])`
  - **Parameters**:
    - `stream` (stream.Writable): TTY stream.
    - `options` (object): May include `autoCommit` (boolean).
- **Additional Methods**:
  - `rl.clearLine(dir)` where `dir` is integer (-1, 0, 1).
  - `rl.clearScreenDown()`
  - `rl.commit()` returns `<Promise>`
  - `rl.cursorTo(x[, y])`
  - `rl.moveCursor(dx, dy)`
  - `rl.rollback()`

- **Factory Method**: `readlinePromises.createInterface(options)` creates a new Promise-based interface.
  - **Options**:
    - `input` (stream.Readable) - required.
    - `output` (stream.Writable) - required.
    - `completer`, `terminal`, `history`, `historySize`, `removeHistoryDuplicates`, `prompt`, `crlfDelay`, `escapeCodeTimeout`, `tabSize`.
  - *Example*:
    ```js
    import { createInterface } from 'node:readline/promises';
    import { stdin, stdout } from 'node:process';
    const rl = createInterface({ input: stdin, output: stdout });
    ```

## 4. Callback API

### Class: readline.Interface (Callback based)

- **Method**: `rl.question(query[, options], callback)`
  - **Parameters**:
    - `query` (string): The prompt text.
    - `options` (object): May include `signal` for cancellation.
    - `callback` (Function): Invoked with the answer as its sole argument.
  - *Example*:
    ```js
    const readline = require('node:readline');
    const { stdin: input, stdout: output } = require('node:process');
    const rl = readline.createInterface({ input, output });
    rl.question('What do you think of Node.js? ', (answer) => {
      console.log(`Thank you for your valuable feedback: ${answer}`);
      rl.close();
    });
    ```

- **Static Methods**:
  - `readline.clearLine(stream, dir[, callback])`
  - `readline.clearScreenDown(stream[, callback])`
  - `readline.cursorTo(stream, x[, y][, callback])`
  - `readline.moveCursor(stream, dx, dy[, callback])`
  - `readline.emitKeypressEvents(stream[, interface])`

## 5. Configuration Options

When creating an interface (either using Promise or Callback APIs), the options object may include:

- `input`: (stream.Readable) **Required**.
- `output`: (stream.Writable) **Required**.
- `completer`: (Function) Used for Tab autocompletion. Returns `[arrayOfMatches, originalSubstring]`.
- `terminal`: (boolean) Defaults to checking `output.isTTY`.
- `history`: (Array<string>) Initial history lines. Defaults to `[]`.
- `historySize`: (number) Maximum number of history lines. Default `30`.
- `removeHistoryDuplicates`: (boolean) Default `false`.
- `prompt`: (string) Default `'> '`.
- `crlfDelay`: (number) Coerced to a number no less than `100`. Default is `100`.
- `escapeCodeTimeout`: (number) Default `500` ms.
- `tabSize`: (integer) Default `8`.
- `signal`: (AbortSignal) Allows canceling a question.

## 6. Code Examples

### Basic Readline Example (Promises API)
```js
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

async function askQuestion() {
  const answer = await rl.question('What do you think of Node.js? ');
  console.log(`Thank you for your valuable feedback: ${answer}`);
  rl.close();
}
askQuestion();
```

### Basic Readline Example (Callback API)
```js
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

rl.question('What do you think of Node.js? ', (answer) => {
  console.log(`Thank you for your valuable feedback: ${answer}`);
  rl.close();
});
```

### File Stream Line-by-Line Example
```js
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

async function processLineByLine() {
  const rl = createInterface({
    input: createReadStream('input.txt'),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    console.log(`Line from file: ${line}`);
  }
}
processLineByLine();
```

## 7. Troubleshooting and Best Practices

- **Preventing Process Hang**: Ensure that if using `stdin` as input, call `process.stdin.unref()` after closing the interface if you want the process to exit without waiting for user input.

- **Handling Asynchronous Iteration**: Note that iterating using `for await...of` consumes the entire input stream. If a break occurs, `rl.close()` is automatically called.

- **AbortSignal Usage**: When using `rl.question()` with an AbortSignal, attach an event listener to handle the timeout:

```js
const signal = AbortSignal.timeout(10000);
signal.addEventListener('abort', () => {
  console.log('The question timed out');
}, { once: true });
const answer = await rl.question('Your input? ', { signal });
```

- **TTY Compatibility**: When using options with terminal-specific features, ensure that the output stream has properties like `columns` and listens for resize events.

- **Best Practice**: Always close the interface to free resources and allow the process to end.

---

*Attribution: Data size during crawl was 4176540 bytes; links found: 3171.*


## Attribution
- Source: Node.js Readline Documentation
- URL: https://nodejs.org/api/readline.html
- License: Public Domain (Node.js Documentation Terms)
- Crawl Date: 2025-04-17T14:26:18.365Z
- Data Size: 4176540 bytes
- Links Found: 3171

## Retrieved
2025-04-17
