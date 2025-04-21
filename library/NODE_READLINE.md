# NODE_READLINE

## Crawl Summary
Extracted technical details include the core InterfaceConstructor class methods (close, pause, resume, prompt, set/getPrompt, write, async iterator, getCursorPos), extensive event support (close, line, history, pause, resume, SIGCONT, SIGINT, SIGTSTP), and both Promises and Callback APIs for handling user input. Additionally, detailed configuration options for `createInterface` and examples for using both APIs for implementing CLI input routines are provided along with TTY keybindings.

## Normalised Extract
## Table of Contents
1. InterfaceConstructor
2. Events
3. Promises API
4. Callback API
5. TTY Keybindings

## 1. InterfaceConstructor
- **Class:** InterfaceConstructor (extends EventEmitter)
- **Instantiation:** via `readline.createInterface(options)` or `readlinePromises.createInterface(options)`
- **Methods and Properties:**
  - `close()` / `[Symbol.dispose]()`
  - `pause()` / `resume()`
  - `prompt([preserveCursor: boolean])`
  - `setPrompt(prompt: string)` and `getPrompt(): string`
  - `write(data: string, key?: {ctrl: boolean, meta: boolean, shift: boolean, name: string})`
  - `[Symbol.asyncIterator]()` for async iteration
  - Properties: `line` (current input), `cursor` (position), `getCursorPos()` returns `{ rows: number, cols: number }`

## 2. Events
- `'close'`: Emitted upon interface closure (via `close()`, stream end, etc.)
- `'line'`: Emitted when an end-of-line character is received, passing the input line
- `'history'`: Emitted when the history array changes
- `'pause'`: Emitted when the input stream is paused
- `'resume'`: Emitted when the input stream resumes
- `'SIGCONT'`: Emitted when process resumes from background (not on Windows)
- `'SIGINT'`: Emitted on Ctrl+C if no listener is registered
- `'SIGTSTP'`: Emitted on Ctrl+Z (process suspension; not on Windows)

## 3. Promises API
- **Class:** readlinePromises.Interface
  - **Method:** `question(query: string, options?: {signal?: AbortSignal}): Promise<string>`
- **Class:** readlinePromises.Readline
  - **Constructor:** `new readlinePromises.Readline(stream: Writable, options?: { autoCommit?: boolean })`
  - **Methods:** 
    - `clearLine(dir: -1|0|1): this`
    - `clearScreenDown(): this`
    - `commit(): Promise<void>`
    - `cursorTo(x: number, y?: number): this`
    - `moveCursor(dx: number, dy: number): this`
    - `rollback(): this`

## 4. Callback API
- **Class:** readline.Interface
  - **Method:** `question(query: string, options: {signal?: AbortSignal}, callback: (answer: string) => void): void`
- **Utility Functions:**
  - `readline.clearLine(stream, dir[, callback])`
  - `readline.clearScreenDown(stream[, callback])`
  - `readline.createInterface(options)` with detailed configuration properties
  - `readline.cursorTo(stream, x[, y][, callback])`
  - `readline.moveCursor(stream, dx, dy[, callback])`
  - `readline.emitKeypressEvents(stream[, interface])`

## 5. TTY Keybindings
- Defined key sequences include:
  - Ctrl+U: Delete from cursor to start
  - Ctrl+K: Delete from cursor to end
  - Ctrl+C: Emit SIGINT or close interface
  - Ctrl+L: Clear screen
  - Additional key combinations for navigation (e.g. Arrow keys, Meta+Key)

**Code Examples Included:**
- Promises API example with async/await
- Callback API example with traditional callback


## Supplementary Details
### Detailed Implementation Specifications

1. **Interface Creation Options (for `createInterface`):**
   - `input`: Readable stream (required)
   - `output`: Writable stream (required)
   - `completer`: Function used for tab auto-completion. Signature: `(line: string) => [string[], string]` or asynchronous returning a Promise.
   - `terminal`: Boolean. Default determined by `output.isTTY`.
   - `history`: Array of strings. Default: `[]` if terminal is enabled.
   - `historySize`: Number. Default: `30` (set to 0 to disable history).
   - `removeHistoryDuplicates`: Boolean. Default: `false`.
   - `prompt`: String. Default: `'> '`.
   - `crlfDelay`: Number. Default: `100` ms (minimum enforced; can be Infinity).
   - `escapeCodeTimeout`: Number. Default: `500` ms.
   - `tabSize`: Number. Default: `8`.
   - `signal`: AbortSignal for operation cancellation.

2. **Method Parameter Details:**
   - `rl.write(data, key)`: When `key` is provided, `data` is ignored. Key object properties: `ctrl`, `meta`, `shift`, `name`.
   - `rl.prompt([preserveCursor])`: If `preserveCursor` is true, the cursor remains at the same column.
   - `rl.getCursorPos()`: Calculates the actual cursor position considering wrapped lines and multiple line prompts.

3. **Promises API Specifics:**
   - `rl.question` returns a Promise that resolves with the user input. Optionally supports cancellation with an AbortSignal.
   - Methods in `readlinePromises.Readline` (such as `clearLine`, `cursorTo`) add actions to an internal list; `commit()` sends these to the stream, and `rollback()` cancels them.

4. **Callback API Specifics:**
   - `rl.question` in Callback API accepts a callback that receives the input answer directly.
   - Utility functions mimic the behavior of their Promises API counterparts but use callbacks for completion notification.

5. **Best Practices and Troubleshooting:**
   - Always close the interface with `rl.close()` to properly release the input and output streams.
   - Use the provided `AbortSignal` in `rl.question` to handle potential timeouts in user input.
   - Ensure TTY streams are correctly identified (`output.isTTY`) and use `process.stdin.setRawMode(true)` if necessary for keypress events.
   - Check parameter types and option values to avoid ERR_INVALID_ARG_TYPE errors.
   - For debugging, attach event listeners to key events (e.g., `'line'`, `'error'`) for better visibility on input processing.

Command-line troubleshooting may include verifying stream status with:

    console.log(process.stdin.isTTY);

and monitoring event triggers via logging.


## Reference Details
### Complete API Specifications and Code Examples

#### Promises API

**Method:** `rl.question(query: string, options?: { signal?: AbortSignal }): Promise<string>`
- **Parameters:**
  - `query`: A string to prompt the user (e.g., 'What is your favorite food? ')
  - `options` (optional): An object with a possible `signal` property (`AbortSignal`) for cancellation.
- **Returns:** A Promise that resolves to the user's input (string).

**Example Usage:**
```js
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

async function ask() {
  try {
    const answer = await rl.question('What is your favorite food? ', { signal: AbortSignal.timeout(10000) });
    console.log(`Favorite food: ${answer}`);
  } catch (err) {
    console.error('Operation timed out or encountered an error:', err);
  } finally {
    rl.close();
  }
}

ask();
```

**readlinePromises.Readline Class:**
- **Constructor:** `new readlinePromises.Readline(stream: Writable, options?: { autoCommit?: boolean })`

- **Methods:**
  - `clearLine(dir: -1|0|1): this` (Clears part or all of the current line)
  - `clearScreenDown(): this` (Clears screen from cursor down)
  - `commit(): Promise<void>` (Sends pending actions to the stream)
  - `cursorTo(x: number, y?: number): this` (Moves cursor to specified coordinates)
  - `moveCursor(dx: number, dy: number): this` (Moves cursor relative to current position)
  - `rollback(): this` (Clears pending actions without sending them)

#### Callback API

**Method:** `rl.question(query: string, options: { signal?: AbortSignal }, callback: (answer: string) => void): void`
- **Parameters:**
  - `query`: Prompt string.
  - `options`: Optional object with a `signal` property for an AbortSignal.
  - `callback`: Function to be called with the user's input.

**Example Usage:**
```js
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output, prompt: '> ' });

rl.question('What is your favorite food? ', { signal: new (require('abort-controller'))().signal }, (answer) => {
  console.log(`Favorite food: ${answer}`);
  rl.close();
});
```

**Utility Functions:**
- `readline.clearLine(stream: Writable, dir: number, callback?: Function): boolean`
  - **Parameter:** `dir` (-1 to clear left, 0 for entire line, 1 for right).
  - **Returns:** Boolean indicating if stream is ready for further writing.

- `readline.clearScreenDown(stream: Writable, callback?: Function): boolean`

- `readline.createInterface(options: {
    input: Readable,
    output: Writable,
    completer?: (line: string) => [string[], string] | Promise<[string[], string]>,
    terminal?: boolean,
    history?: string[],
    historySize?: number,
    removeHistoryDuplicates?: boolean,
    prompt?: string,
    crlfDelay?: number,
    escapeCodeTimeout?: number,
    tabSize?: number,
    signal?: AbortSignal
  }): readline.Interface`

- `readline.cursorTo(stream: Writable, x: number, y?: number, callback?: Function): boolean`

- `readline.moveCursor(stream: Writable, dx: number, dy: number, callback?: Function): boolean`

- `readline.emitKeypressEvents(stream: Readable, interface?: readline.Interface): void`

#### Best Practices & Troubleshooting

**Best Practices:**
- Always invoke `rl.close()` after reading input to release streams.
- For asynchronous operations, handle potential timeouts using an AbortSignal with `rl.question`.
- Verify that parameters passed to functions match expected types to avoid ERR_INVALID_ARG_TYPE.
- For TTY interactions, ensure `process.stdout.isTTY` is true and set raw mode if necessary using `process.stdin.setRawMode(true)`.

**Troubleshooting:**
- Use event listeners to debug issues:
  ```js
  rl.on('line', (line) => console.log('Received:', line));
  rl.on('error', (err) => console.error('Error:', err));
  ```
- Check terminal capabilities:
  ```js
  console.log(process.stdout.columns, process.stdout.rows);
  ```
- If async iteration skips lines, ensure that no asynchronous delay occurs between interface creation and iteration.
- Validate configuration options (e.g., `crlfDelay`, `historySize`) if history or line events do not behave as expected.

This complete specification provides developers with full, immediately applicable API details, method signatures, configuration options, concrete examples, and troubleshooting guidelines for the Node.js `readline` module.


## Original Source
Node.js Readline Module
https://nodejs.org/api/readline.html

## Digest of NODE_READLINE

# Node.js Readline Module Documentation Digest

**Retrieved:** 2023-10-31

## Overview
The Node.js `readline` module provides an interface for reading data from a Readable stream (e.g. process.stdin) one line at a time. This documentation covers both the Promises API and the Callback API.

## InterfaceConstructor
- **Class:** InterfaceConstructor (extends EventEmitter)
- **Instantiation:**
  - `readline.createInterface(options)`
  - `readlinePromises.createInterface(options)`

### Key Methods
- `rl.close()`
  - Closes the readline interface. Emits the `'close'` event.
- `rl[Symbol.dispose]()`
  - Alias for `rl.close()` (added in v23.10.0).
- `rl.pause()`
  - Pauses the input stream. Does not stop events immediately.
- `rl.resume()`
  - Resumes the input stream.
- `rl.prompt([preserveCursor])`
  - Writes the prompt to output. Parameter: `preserveCursor` (boolean) - if true, the cursor remains in place.
- `rl.setPrompt(prompt)`
  - Sets the prompt string. Parameter: `prompt` (string).
- `rl.getPrompt()`
  - Returns the current prompt string. Return type: `<string>` (added in v15.3.0, v14.17.0).
- `rl.write(data[, key])`
  - Writes data or a key sequence. Parameters:
    - `data` (string)
    - `key` (optional object) with properties: { ctrl: boolean, meta: boolean, shift: boolean, name: string }.
- `rl[Symbol.asyncIterator]()`
  - Provides an asynchronous iterator over each line. Return type: `<AsyncIterator>`.
- **Properties:**
  - `rl.line` - Current input being processed (string).
  - `rl.cursor` - Current cursor position (number | undefined).
- `rl.getCursorPos()`
  - Returns an object with `{ rows: number, cols: number }` representing the cursor's real position.

## Events
- `'close'`
  - Emitted when the interface is closed (via `rl.close()`, input stream `'end'`, Ctrl+D, or SIGINT with no listener).
- `'line'`
  - Emitted when the input stream receives an end-of-line marker. Provides the received line as a string.
- `'history'`
  - Emitted when the history array changes. Introduced in v15.8.0 / v14.18.0.
- `'pause'`
  - Emitted when the input stream is paused.
- `'resume'`
  - Emitted when the input stream resumes.
- `'SIGCONT'`
  - Emitted when a process is brought back to the foreground. (Not supported on Windows)
- `'SIGINT'`
  - Emitted on receipt of a Ctrl+C if no listener is registered, causing the `'pause'` event.
- `'SIGTSTP'`
  - Emitted on receipt of a Ctrl+Z (not supported on Windows).

## Promises API
### Class: readlinePromises.Interface
- **Method:** `rl.question(query[, options])`
  - **Parameters:**
    - `query` (string): The question prompt to display.
    - `options` (optional object): May include `{ signal: AbortSignal }` to allow cancellation.
  - **Returns:** `Promise<string>` resolving with the user's input.

### Class: readlinePromises.Readline
- **Constructor:** `new readlinePromises.Readline(stream[, options])`
  - **Parameters:**
    - `stream` (Writable): TTY stream for output.
    - `options` (optional): e.g. `{ autoCommit?: boolean }`.
- **Methods:**
  - `rl.clearLine(dir)`
    - **Parameter:** `dir` (-1: left, 0: entire line, 1: right). Returns `this`.
  - `rl.clearScreenDown()`
    - Clears the screen below the cursor. Returns `this`.
  - `rl.commit()`
    - Sends all pending actions. Returns: `Promise<void>`.
  - `rl.cursorTo(x[, y])`
    - Moves the cursor to specified coordinates. Returns `this`.
  - `rl.moveCursor(dx, dy)`
    - Moves the cursor relative to its current position. Returns `this`.
  - `rl.rollback()`
    - Clears pending actions without applying them. Returns `this`.

## Callback API
### Class: readline.Interface
- **Method:** `rl.question(query[, options], callback)`
  - **Parameters:**
    - `query` (string): The question prompt.
    - `options` (optional object): e.g. `{ signal: AbortSignal }`.
    - `callback` (function): Called with the answer (string).

### Utility Functions
- `readline.clearLine(stream, dir[, callback])`
  - Clears the current line in the given TTY stream. Returns a boolean indicating write readiness.
- `readline.clearScreenDown(stream[, callback])`
  - Clears downwards from the cursor on the TTY stream. Returns a boolean.
- `readline.createInterface(options)`
  - **Options Object Includes:**
    - `input` (Readable): Required input stream.
    - `output` (Writable): Required output stream.
    - `completer` (Function): For tab autocompletion. Signature: `(line: string) => [string[], string]` (can be async).
    - `terminal` (boolean): Determines if ANSI/VT100 codes are written (default: based on `output.isTTY`).
    - `history` (string[]): Initial history, default `[]` if terminal present.
    - `historySize` (number): Maximum history length (`default: 30`, 0 to disable).
    - `removeHistoryDuplicates` (boolean): Default: `false`.
    - `prompt` (string): Default prompt is `'> '`.
    - `crlfDelay` (number): Delay in ms between \r and \n, default 100 (minimum enforced) or `Infinity`.
    - `escapeCodeTimeout` (number): Time waited for ambiguous key sequence (default: 500 ms).
    - `tabSize` (number): Default: 8.
    - `signal` (AbortSignal): For cancellation.
- `readline.cursorTo(stream, x[, y][, callback])`
  - Moves the cursor to the specified position in the stream. Returns a boolean.
- `readline.moveCursor(stream, dx, dy[, callback])`
  - Moves the cursor relative to its current location. Returns a boolean.
- `readline.emitKeypressEvents(stream[, interface])`
  - Configures the stream to emit `'keypress'` events (requires TTY raw mode).

## TTY Keybindings
Typical keybindings include:
- Ctrl+U: Clear from cursor to start of line.
- Ctrl+K: Clear from cursor to end of line.
- Ctrl+C: Emit SIGINT / close the interface.
- Ctrl+L: Clear the screen.
- Arrow keys and Meta combinations for word navigation and deletion.

## Code Examples

```js
// Promises API Example
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

async function askQuestion() {
  const answer = await rl.question('What do you think of Node.js? ', { signal: AbortSignal.timeout(10000) });
  console.log(`Thank you for your valuable feedback: ${answer}`);
  rl.close();
}

askQuestion();
```

```js
// Callback API Example
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

rl.question('What do you think of Node.js? ', { signal: new (require('abort-controller'))().signal }, (answer) => {
  console.log(`Thank you for your valuable feedback: ${answer}`);
  rl.close();
});
```

## Attribution
- **Data Size:** 4172404 bytes
- **Source URL:** https://nodejs.org/api/readline.html


## Attribution
- Source: Node.js Readline Module
- URL: https://nodejs.org/api/readline.html
- License: MIT
- Crawl Date: 2025-04-21T08:50:53.662Z
- Data Size: 4172404 bytes
- Links Found: 3221

## Retrieved
2025-04-21
