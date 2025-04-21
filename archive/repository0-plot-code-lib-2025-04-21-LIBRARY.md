library/OPENAI_API.md
# library/OPENAI_API.md
# OPENAI_API

## Crawl Summary
Authentication via Bearer tokens; POST endpoints (e.g., /v1/completions) requiring specific parameters (model, prompt, max_tokens, temperature, etc.); detailed response objects with id, model, created timestamp, and choices array. Includes exact HTTP header and cURL examples for direct implementation.

## Normalised Extract
Table of Contents:
1. Authentication
   - Header format: Authorization: Bearer <API_KEY>
2. API Endpoints and Methods
   - Completions endpoint details:
     * Endpoint: POST https://api.openai.com/v1/completions
     * Method signature: async function createCompletion(model: string, prompt: string, options?: { max_tokens?: number, temperature?: number, top_p?: number, n?: number, stream?: boolean, stop?: string | string[] }): Promise<CompletionResponse>
     * Parameters:
       - model (string, required)
       - prompt (string, required)
       - max_tokens (number, optional, default: 16)
       - temperature (number, optional, default: 1)
       - top_p (number, optional, default: 1)
       - n (number, optional, default: 1)
       - stream (boolean, optional, default: false)
       - stop (string or array, optional)
   - Additional endpoints: Chat completions, Edits, Embeddings, Files
3. Example Code Usage
   - Node.js example with fetch
   - cURL usage example
4. Configuration Options and Best Practices
   - Timeout settings, error handling (HTTP 400, 401), rate limiting information.
5. Troubleshooting Procedures
   - Detailed steps to diagnose common issues using HTTP status codes and sample validation commands.

Complete technical details include explicit method signatures, parameter type definitions, sample code implementations, and configuration parameters with defaults.

## Supplementary Details
Detailed Specifications:
- Parameter Values:
  * max_tokens: number (default 16), must be integer.
  * temperature: float (default 1.0), range 0-2.
  * top_p: float (default 1.0), range 0-1.
- Configuration Options:
  * HTTP Timeout: Recommended 30 seconds.
  * Retries: Implement exponential backoff starting from 1 second doubling up to 16 seconds.
- Implementation Steps:
  1. Validate API key and permission scopes.
  2. Structure request JSON with required fields.
  3. Use secure HTTPS request to endpoint.
  4. Parse JSON response and check for error codes.
  5. Log and handle exceptions using try/catch blocks.
- Example Detailed Code (Node.js):
```js
const https = require('https');

function callOpenAICompletion(apiKey, model, prompt) {
  const data = JSON.stringify({
    model: model,
    prompt: prompt,
    max_tokens: 50,
    temperature: 0.7
  });

  const options = {
    hostname: 'api.openai.com',
    path: '/v1/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Content-Length': data.length
    },
    timeout: 30000
  };

  const req = https.request(options, (res) => {
    let chunks = '';
    res.on('data', (chunk) => { chunks += chunk; });
    res.on('end', () => { console.log(JSON.parse(chunks)); });
  });

  req.on('error', (e) => { console.error(`Problem with request: ${e.message}`); });
  req.write(data);
  req.end();
}

callOpenAICompletion('YOUR_API_KEY', 'text-davinci-003', 'Once upon a time');
```


## Reference Details
Complete API Specifications:

1. Completions Endpoint:
   - Method: POST
   - URL: https://api.openai.com/v1/completions
   - Request Headers:
     * Content-Type: application/json
     * Authorization: Bearer <API_KEY>
   - Request Body Example:
     {
       "model": "text-davinci-003",
       "prompt": "Once upon a time",
       "max_tokens": 50,
       "temperature": 0.7,
       "top_p": 1,
       "n": 1,
       "stream": false,
       "stop": null
     }
   - SDK Method Signature (TypeScript):
     ```ts
     interface CompletionRequest {
       model: string;
       prompt: string;
       max_tokens?: number;
       temperature?: number;
       top_p?: number;
       n?: number;
       stream?: boolean;
       stop?: string | string[] | null;
     }

     interface CompletionChoice {
       text: string;
       index: number;
       logprobs?: any;
       finish_reason: string;
     }

     interface CompletionResponse {
       id: string;
       object: string;
       created: number;
       model: string;
       choices: CompletionChoice[];
     }

     async function createCompletion(request: CompletionRequest): Promise<CompletionResponse> {
       // Implementation using fetch or axios
     }
     ```
   - Example cURL Command:
     ```bash
     curl https://api.openai.com/v1/completions \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer YOUR_API_KEY" \
       -d '{
         "model": "text-davinci-003",
         "prompt": "Once upon a time",
         "max_tokens": 50,
         "temperature": 0.7
       }'
     ```

2. Error Handling and Troubleshooting:
   - Common HTTP status codes: 400 (Bad Request), 401 (Unauthorized), 429 (Too Many Requests).
   - Retry Procedure: On status 429 or network errors, implement exponential backoff: initial delay of 1s, doubling each retry, with a maximum of 16 seconds.
   - Logging: Log request and response bodies for diagnostic purposes.
   - Debugging: Use verbose mode with cURL (`curl -v ...`) to inspect header details.

3. Best Practices Implementation Code Sample:
   ```js
   async function safeCreateCompletion(apiKey, model, prompt) {
     let attempt = 0;
     const maxAttempts = 5;
     let delay = 1000; // 1 second
     while (attempt < maxAttempts) {
       try {
         const response = await createCompletion({ model, prompt, max_tokens: 50, temperature: 0.7 });
         return response;
       } catch (error) {
         if (attempt === maxAttempts - 1) throw error;
         await new Promise(resolve => setTimeout(resolve, delay));
         delay *= 2;
         attempt++;
       }
     }
   }
   ```

This documentation provides developers with precise API endpoints, method signatures, configuration values, full code examples, and troubleshooting steps necessary for direct integration and use of OpenAI's API.

## Original Source
OpenAI API Documentation
https://platform.openai.com/docs/api-reference

## Digest of OPENAI_API

# OPENAI API DOCUMENTATION

**Retrieved Date:** 2023-10-06

## 1. Authentication
- All API requests require an HTTP header: 
  - `Authorization: Bearer <API_KEY>`

## 2. Endpoints and Methods

### 2.1 Completions Endpoint
- **Endpoint:** `POST https://api.openai.com/v1/completions`
- **Description:** Generate text completions based on a provided prompt.
- **Method Signature (SDK Example):**
  ```js
  async function createCompletion(model: string, prompt: string, options?: {
    max_tokens?: number,
    temperature?: number,
    top_p?: number,
    n?: number,
    stream?: boolean,
    stop?: string | string[]
  }): Promise<CompletionResponse>;
  ```
- **Parameters:**
  - `model` (string, required): Identifier of the model (e.g., "text-davinci-003").
  - `prompt` (string, required): The input text for the model to complete.
  - `max_tokens` (number, optional, default: 16): Maximum number of tokens to generate.
  - `temperature` (number, optional, default: 1): Sampling temperature.
  - `top_p` (number, optional, default: 1): Nucleus sampling parameter.
  - `n` (number, optional, default: 1): Number of completions to generate.
  - `stream` (boolean, optional, default: false): Whether to stream partial progress.
  - `stop` (string or array, optional): Up to 4 sequences where the API will stop generating further tokens.
- **Response:**
  - `id` (string): Unique identifier for the completion.
  - `object` (string): Type of object returned, e.g., "text_completion".
  - `created` (number): Unix timestamp of creation.
  - `model` (string): The model used for generation.
  - `choices` (array): Array of completion choices, each containing:
    - `text` (string): The generated text.
    - `index` (number): The index of the completion.
    - `logprobs` (nullable): Log probability details.
    - `finish_reason` (string): Reason the generation stopped.

### 2.2 Other Endpoints
- **Chat Completions:** `POST https://api.openai.com/v1/chat/completions`
  - Uses a similar parameter structure with messages array; refer to SDK docs for detailed method signature.
- **Edits, Embeddings, and Files Endpoints:** Follow analogous patterns with required model, prompt, and additional parameters as per API requirements.

## 3. Example Code Usage

### 3.1 Node.js Example using fetch:
```js
const fetch = require('node-fetch');

async function createCompletion() {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: 'Once upon a time',
      max_tokens: 50,
      temperature: 0.7
    })
  });
  const data = await response.json();
  console.log(data);
}

createCompletion();
```

### 3.2 cURL Example:
```bash
curl https://api.openai.com/v1/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "text-davinci-003",
    "prompt": "Once upon a time",
    "max_tokens": 50,
    "temperature": 0.7
  }'
```

## 4. Configuration Options and Best Practices
- **Timeouts:** Set appropriate timeouts for HTTP requests; e.g., 30 seconds.
- **Error Handling:** Catch HTTP errors and inspect response status codes; typical errors include 400 (Bad Request) and 401 (Unauthorized).
- **Rate Limiting:** Monitor headers for rate limit info (e.g., `X-RateLimit-Remaining`).
- **Best Practices:**
  - Always validate input parameters before calling the API.
  - Retry logic in case of transient errors.
  - Securely store and manage API keys.

## 5. Troubleshooting Procedures
- **Common Errors and Commands:**
  - *401 Unauthorized:* Ensure your API key is active and correctly placed in the header.
  - *400 Bad Request:* Verify JSON payload; use a JSON linter to validate your request.
  - Re-run a sample query using cURL to isolate potential code issues.

**Data Size:** 0 bytes

**Attribution:** Extracted from OpenAI API Documentation via https://platform.openai.com/docs/api-reference

## Attribution
- Source: OpenAI API Documentation
- URL: https://platform.openai.com/docs/api-reference
- License: N/A
- Crawl Date: 2025-04-21T02:21:14.180Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-21
library/NODE_READLINE.md
# library/NODE_READLINE.md
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
library/NPM_DOCS.md
# library/NPM_DOCS.md
# NPM_DOCS

## Crawl Summary
The npm documentation details the three main components (website, CLI, registry) along with explicit CLI commands for user authentication, account management, and two-factor authentication. It includes precise details on account creation, password requirements, 2FA configuration methods (using security keys or TOTP), billing procedures, and troubleshooting commands such as generating npm-debug.log files.

## Normalised Extract
## Table of Contents

1. CLI Usage and Commands
   - npm login, npm whoami, npm publish, npm unpublish
2. Account Management
   - Creating an account (username, email, password requirements)
   - Testing account with `npm login` and verifying with `npm whoami`
3. Two-Factor Authentication (2FA)
   - Enabling 2FA (auth-and-writes vs auth-only)
   - Disabling 2FA
   - Configuring 2FA from the command line using commands like `npm profile enable-2fa auth-and-writes` and the use of OTP with `--otp=<code>`
4. Billing and Receipts
   - Upgrading, viewing billing history, editing payment information
5. Troubleshooting
   - Generating npm-debug.log with commands: `npm install --timing`, `npm publish --timing`
   - Common issues such as broken installations, permissions errors, and ENOENT errors

### Detailed Technical Sections

**1. CLI Usage and Commands**
- Login: `npm login` (prompts for username, password, email, and OTP if needed).
- WhoAMI: `npm whoami` returns the current logged in username.
- Publish: `npm publish [<tarball>|<folder>] [--tag <tag>]` with optional OTP appended as `--otp=123456`.
- Profile Management: `npm profile get` to retrieve settings, and `npm profile set <prop> <value>` to update.

**2. Account Management**
- Account creation requires a lowercase username (with hyphens/numerals allowed), a public email, and a password that is >10 characters and not similar to the username.
- Verification step: After signup, verify via the account verification email.

**3. Two-Factor Authentication (2FA)**
- Enabling 2FA:
  - Command (auth-and-writes): `npm profile enable-2fa auth-and-writes`
  - Command (auth-only): `npm profile enable-2fa auth-only`
- Disabling 2FA: `npm profile disable-2fa`
- Use OTP with commands by appending `--otp=<code>` as in: `npm publish --otp=123456`.

**4. Billing and Receipts**
- Upgrade Plan: Initiated via the Billing Info page by selecting "Upgrade Plan ($7/User)".
- Enter required billing fields: Email, Name, Address, Credit Card details (card number, expiry, CVC), with an option to "Remember me".
- Viewing receipts: Access via "View Billing History" and options to view, download (PDF), or email receipts.

**5. Troubleshooting**
- Generating debug logs: Use `npm install --timing` or `npm publish --timing` to create `npm-debug.log`.
- Common troubleshooting commands:
  - Clean cache: `npm cache clean`
  - Verify cache location: `npm config get cache`
  - Address permissions errors by ensuring correct directory permissions (e.g., on Windows, ensure `C:\Users\<user>\AppData\Roaming\npm` exists and is writable).


## Supplementary Details
### Technical Specifications and Implementation Details

- **npm CLI Commands**:
  - `npm login`: Prompts for credentials; if 2FA is enabled, also requires OTP input.
  - `npm whoami`: Returns the authenticated username.
  - `npm profile set <prop> <value>`: Updates user profile; properties include `email`, `fullname`, `password`, etc.
  - `npm profile enable-2fa auth-and-writes`: Enables 2FA for both authorization and destructive actions (publishing, token creation, etc.).
  - `npm profile enable-2fa auth-only`: Enables 2FA for sensitive commands only.
  - `npm profile disable-2fa`: Disables 2FA after confirming with the user password and OTP.

- **Configuration Options**:
  - **Password Requirements**: Must be >10 characters, not include username, and not be compromised.
  - **OTP Use**: Example usage is appending `--otp=123456` to commands that require secondary authentication.
  - **Billing**: Critical fields include credit card number, expiration date (MM/YY), and CVC; defaults typically require manual entry unless "Remember me" is selected.

- **Implementation Steps**:
  1. Create account via the npm website by filling out the form.
  2. Verify the account through email confirmation.
  3. Log in using `npm login` from the command line.
  4. For enhanced security, enable 2FA using `npm profile enable-2fa auth-and-writes` or `npm profile enable-2fa auth-only`.
  5. Use OTP values with commands that require them (e.g., `npm publish --otp=123456`).
  6. For troubleshooting, generate debug logs via `npm install --timing` and check the `.npm` cache directory.


## Reference Details
### Complete API Specifications and Command Signatures

#### npm login

- **Signature:** `npm login`
- **Parameters:**
  - Prompts for: username (string), password (string), email (string).
  - Optional: OTP (string) if 2FA is enabled.
- **Return Type:** Outputs login status to stdout and logs errors to stderr.

#### npm whoami

- **Signature:** `npm whoami`
- **Parameters:** None
- **Return Type:** String (username) printed to stdout.

#### npm profile get

- **Signature:** `npm profile get`
- **Parameters:** None
- **Return Type:** JSON or plain text representation of user profile settings.

#### npm profile set

- **Signature:** `npm profile set <prop> <value>`
- **Parameters:**
  - `<prop>` (string): Name of the property (e.g., email, fullname, password).
  - `<value>` (string): New value for the property.
- **Return Type:** Confirmation message; prompts for current password and OTP if 2FA is enabled.

#### npm profile enable-2fa

- **Signature:** `npm profile enable-2fa <mode>`
- **Parameters:**
  - `<mode>` (string): Must be either `auth-and-writes` or `auth-only`.
- **Return Type:** Success message confirming 2FA activation; returns instructions for scanning QR code or entering OTP.

#### npm profile disable-2fa

- **Signature:** `npm profile disable-2fa`
- **Parameters:** None (prompts for password and current OTP if applicable).
- **Return Type:** Confirmation of 2FA deactivation.

#### Example Code Snippets

```bash
# Login with npm
npm login

# Enable 2FA for both authorization and writes
npm profile enable-2fa auth-and-writes

# Publish a package with OTP parameter
npm publish ./my-package --tag latest --otp=123456

# Update user email
npm profile set email newemail@example.com
```

#### Troubleshooting Commands

```bash
# Generate debug log during installation
npm install --timing

# Get the npm cache directory (where debug log might be located)
npm config get cache

# Clean npm cache if experiencing random errors
npm cache clean
```

### Detailed Instructional Material

- **Best Practices**:
  - Always verify your npm user account after creation by using `npm login` followed by `npm whoami`.
  - Use a strong, unique password and enable 2FA immediately after account creation.
  - When publishing, ensure you append the OTP parameter to avoid authentication errors.

- **Step-by-Step Guide for Enabling 2FA from CLI**:
  1. Log in via `npm login`.
  2. Run `npm profile enable-2fa auth-and-writes` for full protection.
  3. Follow the on-screen instructions to scan the QR code using a TOTP app.
  4. Enter the OTP generated by your authenticator in the CLI prompt.
  5. Test the setup by publishing a test package using `npm publish --otp=123456`.

- **Detailed Troubleshooting Procedure**:
  - If encountering a "cb() never called!" error, first run `npm cache clean` and then retry the command with `--verbose` flag to obtain detailed logs.
  - For permission errors, ensure that the npm directory (e.g., `C:\Users\<user>\AppData\Roaming\npm` on Windows) exists and has proper write permissions.
  - If the npm installation appears broken, reinstall npm via `npm install -g npm@latest` (or reinstall Node.js on Windows using the official installer).


## Original Source
NPM Documentation
https://docs.npmjs.com/

## Digest of NPM_DOCS

# NPM Documentation Digest

**Retrieved:** 2023-10-27

## npm Components

- **Website**: Discover packages, set up profiles, manage organizations.
- **CLI**: Command line interface to interact with npm (e.g., npm login, npm whoami, npm publish).
- **Registry**: Public database of JavaScript packages and metadata.

## Getting Started

### Creating an Account

1. Navigate to the signup page (http://www.npmjs.com/~yourusername).
2. Fill in the user signup form:
   - **Username**: Lowercase, may include hyphens and numerals.
   - **Email address**: Public email, used for metadata and notifications.
   - **Password**: Must be longer than 10 characters, unique (avoid using username or compromised passwords).
3. Agree to the End User License Agreement and Privacy Policy and click "Create An Account".
4. Verify your email using the verification email sent by npm.

### Testing Your Account

- Command: `npm login`
- Enter username, password, and email when prompted. For 2FA, provide the one-time password (OTP).
- Verify login by running: `npm whoami`.

## CLI Commands and Options

### Basic Commands

- **Login**: `npm login`
- **WhoAMI**: `npm whoami`
- **Publish**: `npm publish [<tarball>|<folder>] [--tag <tag>]`
- **Unpublish**: `npm unpublish [<@scope>/]<pkg>[@<version>]`

### Profile and Account Settings

- **View Profile**: `npm profile get`
- **Update Profile**: `npm profile set <prop> <value>`
- **Set Password**: `npm profile set password` (prompts for current and new password)

### Two-Factor Authentication (2FA)

- **Enable 2FA (auth-and-writes)**: `npm profile enable-2fa auth-and-writes`
- **Enable 2FA (auth-only)**: `npm profile enable-2fa auth-only`
- **Disable 2FA**: `npm profile disable-2fa`
- **Using OTP with commands**: Append `--otp=123456` to commands (e.g., `npm publish --otp=123456`)

## Security and Best Practices

- **Password Guidelines**:
  - Password > 10 characters
  - Avoid using parts of the username
  - Use a password manager (e.g., 1Password)
  - Check against breach databases

- **Two-Factor Authentication**:
  - Use security keys (Yubikey, Apple Touch ID, Face ID) or TOTP via Google Authenticator, Authy, etc.
  - Recovery codes must be stored securely; regenerate them if compromised.

## Billing and Account Management

- **Upgrading Account**:
  - Navigate to "Billing Info" from profile menu and click "Upgrade Plan ($7/User)".
  - Enter billing details including email, name, address, and credit card information.
  - Command line and web interfaces available for billing management.

- **Viewing and Downloading Receipts**:
  - From Billing Info page, select "View Billing History".
  - Options to view, download (PDF), or email receipts.

## Troubleshooting

### Generating npm-debug.log

- For installs: `npm install --timing`
- For publishing: `npm publish --timing`
- Logs are located in the `.npm` directory. Use `npm config get cache` to locate the directory.

### Common Errors and Remedies

- **Broken npm installation**: Reinstall npm (Mac/Linux) or reinstall Node.js (Windows).
- **Random Errors**: Run `npm cache clean` and retry.
- **Permissions Errors**: Follow guidelines for resolving EACCES errors when installing packages globally.
- **ENOENT Errors on Windows**: Ensure the folder `C:\Users\<user>\AppData\Roaming\npm` exists and is writable.

## CLI Reference Examples

```bash
# Logging into npm
npm login

# Enabling 2FA for both authorization and writes
npm profile enable-2fa auth-and-writes

# Publishing a package with OTP
npm publish --otp=123456

# Changing user profile property
npm profile set email newemail@example.com
```

---

*Attribution: Data size 155699 bytes, extracted from npm Docs crawl on 2023-10-27*

## Attribution
- Source: NPM Documentation
- URL: https://docs.npmjs.com/
- License: N/A
- Crawl Date: 2025-04-21T03:07:44.892Z
- Data Size: 155699 bytes
- Links Found: 10951

## Retrieved
2025-04-21
library/DOTENV.md
# library/DOTENV.md
# DOTENV

## Crawl Summary
Installation commands (npm, yarn, bun), usage examples (CommonJS and ES6 import), support for multiline and commented variables, parsing via dotenv.parse, preload with command-line flags, configuration options (path, encoding, debug, override, processEnv), variable expansion using dotenv-expand and command substitution via dotenvx, syncing and managing multiple environment files, deployment encryption steps, integration examples for various frameworks and tools, and detailed troubleshooting procedures for common pitfalls (e.g., React and Webpack polyfills).

## Normalised Extract
# Table of Contents

1. Installation
2. Usage
3. Multiline Values
4. Comments
5. Parsing
6. Preload & Command Line Options
7. Variable Expansion
8. Command Substitution
9. Syncing & Multiple Environments
10. Deploying (Encryption)
11. Examples & Framework Integrations
12. Documentation Functions
13. FAQ & Troubleshooting

---

## 1. Installation

- npm: `npm install dotenv --save`
- yarn: `yarn add dotenv`
- bun: `bun add dotenv`

## 2. Usage

- Create a `.env` file:

```
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

- Load it early in your app:

CommonJS:

```
require('dotenv').config()
```

ES6:

```
import 'dotenv/config'
```

## 3. Multiline Values

- Direct newline support:

```
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----"
```

- Escaped newlines:

```
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"
```

## 4. Comments

- Full-line and inline comments:

```
# This is a comment
SECRET_KEY=YOURSECRETKEYGOESHERE # inline comment
```

## 5. Parsing

- Parsing with `dotenv.parse`:

```
const buf = Buffer.from('BASIC=basic')
const config = require('dotenv').parse(buf)
console.log(config) // Output: { BASIC: 'basic' }
```

## 6. Preload & Command Line Options

- Preload via CLI:

```
node -r dotenv/config your_script.js
```

- Custom configuration via CLI:

```
node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env dotenv_config_debug=true
```

## 7. Variable Expansion

- Using dotenv-expand:

```
const dotenv = require('dotenv')
const expand = require('dotenv-expand')
const env = dotenv.config()
expand(env)
```

## 8. Command Substitution

- With dotenvx, substitute command outputs:

```
DATABASE_URL="postgres://$(whoami)@localhost/my_database"
```

Run:

```
dotenvx run --debug -- node index.js
```

## 9. Syncing & Multiple Environments

- Sync files using dotenvx encryption.
- Use multiple files:

```
dotenvx run --env-file=.env.production -- node index.js
```

Chaining:

```
dotenvx run --env-file=.env.local --env-file=.env -- node index.js
```

## 10. Deploying (Encryption)

- Encrypt a file:

```
dotenvx set HELLO Production --encrypt -f .env.production
```

- Run with private key:

```
DOTENV_PRIVATE_KEY_PRODUCTION="<private key>" dotenvx run -- node index.js
```

## 11. Examples & Framework Integrations

- Node.js debugging and override examples
- ES6 module preload: `import 'dotenv/config'`
- Framework integration: react (prefix with REACT_APP_), express, nestjs, fastify, webpack plugin usage

## 12. Documentation Functions

### config(options)

```js
const result = require('dotenv').config({
  path: '/custom/path/to/.env',  // default: path.resolve(process.cwd(), '.env')
  encoding: 'utf8',               // default: 'utf8'
  debug: false,                   // default: false
  override: false,                // default: false
  processEnv: process.env         // default: process.env
})
```

### parse(src, options)

```js
const config = require('dotenv').parse(Buffer.from('BASIC=basic'), { debug: true })
```

### populate(target, parsed, options)

```js
const parsed = { HELLO: 'world' };
require('dotenv').populate(process.env, parsed, { override: true, debug: true });
```

### decrypt

- Used with dotenvx to decrypt encrypted .env files.

## 13. FAQ & Troubleshooting

- **File not loading?** Check file location and use `debug: true`:

```js
require('dotenv').config({ debug: true })
```

- **React issues:** Ensure variables are prefixed with `REACT_APP_` and configured in webpack.

- **Webpack polyfill error:** Install `node-polyfill-webpack-plugin` and add to webpack config:

```js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// In plugins:
new NodePolyfillPlugin()
```

- **Prevention of .env commit:** Use git pre-commit hook:

```
dotenvx precommit --install
```


## Supplementary Details
## Config Function Options

- path: Default is `path.resolve(process.cwd(), '.env')`. Can be a string or an array of paths.
- encoding: Default is `'utf8'`. Specify e.g. `'latin1'` if needed.
- debug: Boolean flag (default false) to log debug messages during parsing.
- override: Boolean flag (default false). If true, later values override existing env variables.
- processEnv: Target object (default is `process.env`).

## Implementation Steps

1. Install package via npm/yarn/bun.
2. Create a `.env` file with key-value pairs using proper syntax. Use quotes for values with spaces or `#` characters.
3. Load environment variables as early as possible in your application via `require('dotenv').config()` or `import 'dotenv/config'` for ES6.
4. For advanced usage, use `dotenv.parse()` to manually process strings or buffers.
5. For encryption and synchronization across environments, use `dotenvx` commands such as `dotenvx set` and `dotenvx precommit`.
6. In deployment, ensure environment variables are injected securely using preloaded keys or command line options.

## Detailed Troubleshooting Commands

- Debug loading issues:

```
require('dotenv').config({ debug: true })
```

- Preload dotenv using Node CLI:

```
node -r dotenv/config your_script.js
```

- Webpack configuration troubleshooting with NodePolyfillPlugin:

```
npm install node-polyfill-webpack-plugin
```

Then in webpack.config.js:

```
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = {
  plugins: [
    new NodePolyfillPlugin()
  ]
};
```


## Reference Details
## Complete API Specifications

### config(options?: ConfigOptions): { parsed?: { [key: string]: string }, error?: Error }

- **Parameters:**
  - options: {
      path?: string | string[];  // Default: path.resolve(process.cwd(), '.env')
      encoding?: string;           // Default: 'utf8'
      debug?: boolean;             // Default: false
      override?: boolean;          // Default: false
      processEnv?: { [key: string]: any } // Default: process.env
    }

- **Return:** An object with either a `parsed` key containing the env variables or an `error` key if loading fails.

**Example:**

```js
const result = require('dotenv').config({
  path: '/custom/path/to/.env',
  encoding: 'utf8',
  debug: true,
  override: true
});
if (result.error) {
  throw result.error;
}
console.log(result.parsed);
```

### parse(src: string | Buffer, options?: { debug?: boolean }): { [key: string]: string }

- **Parameters:**
  - src: A string or Buffer containing environment file data.
  - options: { debug?: boolean } where debug logs warnings/errors.

- **Return:** An object mapping keys to values.

**Example:**

```js
const dotenv = require('dotenv');
const buf = Buffer.from('BASIC=basic');
const config = dotenv.parse(buf, { debug: true });
console.log(config); // { BASIC: 'basic' }
```

### populate(target: { [key: string]: any }, parsed: { [key: string]: string }, options?: { override?: boolean, debug?: boolean }): void

- **Parameters:**
  - target: The target object (commonly process.env) to populate.
  - parsed: The object returned by parse.
  - options: { override?: boolean, debug?: boolean } 

- **Usage Example:**

```js
const dotenv = require('dotenv');
const parsed = { HELLO: 'world' };
const target = {};
dotenv.populate(target, parsed, { override: true, debug: true });
console.log(target); // { HELLO: 'world' }
```

### decrypt(encryptedData: string, key: string): string

- **Usage:** Provided by dotenvx for decrypting encrypted .env files. (Exact method signature may vary in dotenvx implementations.)

## Full Code Example (Using dotenv with ES6):

```js
// index.mjs
import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send(`Environment Variable: ${process.env.S3_BUCKET}`);
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
```

## Best Practices

- Always load environment variables at the very start of your application.
- Use quotes for any values that might contain special characters or spaces.
- Enable `debug` mode during development to diagnose any issues with environment variable parsing.
- Do not commit your `.env` file to version control; use pre-commit hooks or encryption for secure environments.
- In a multi-environment setup, maintain separate `.env` files for each deployment context and use the override option judiciously.

## Detailed Troubleshooting Procedures

1. **Environment Not Loading:**
   - Confirm the `.env` file is in the correct location relative to the working directory.
   - Run with `debug: true`:
     ```js
     require('dotenv').config({ debug: true });
     ```
   - Expected output: Debug logs indicating if any keys are skipped due to pre-existing values.

2. **React Environment Variables Not Showing:**
   - Ensure using the `REACT_APP_` prefix in `.env` and verify configuration in Webpack.

3. **Module Not Found Errors in Webpack:**
   - Install missing polyfills:
     ```bash
     npm install node-polyfill-webpack-plugin
     ```
   - Update webpack.config.js as shown in the supplementary details.

4. **Variable Override Issues:**
   - Use the `override: true` option in the config call if process.env already has values.

5. **Encrypted .env Handling:**
   - Use dotenvx commands to encrypt and decrypt your .env files consistently.

6. **Command Substitution Failures:**
   - Verify that the command used in the .env file (e.g., `$(whoami)`) returns the expected output in your shell.


## Original Source
dotenv Documentation
https://github.com/motdotla/dotenv

## Digest of DOTENV

# DOTENV Technical Digest

**Date Retrieved:** 2023-10-24

## Installation

- Install via npm: `npm install dotenv --save`
- Alternatively using yarn: `yarn add dotenv`
- Or bun: `bun add dotenv`

## Usage (.env file)

1. Create a `.env` file in the root of your project. Example contents:

```
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

2. Early in your application, load the contents:

CommonJS:

```
require('dotenv').config()
console.log(process.env) // verify the loaded variables
```

ES6 Modules:

```
import 'dotenv/config'
```

Example with AWS S3 usage:

```
s3.getBucketCors({Bucket: process.env.S3_BUCKET}, function(err, data) {})
```

## Multiline Values

- To support line breaks in variables (v15.0.0+):

```
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
Kh9NV...
...
-----END RSA PRIVATE KEY-----"
```

- Alternatively, with escaped newlines:

```
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nKh9NV...\n-----END RSA PRIVATE KEY-----\n"
```

## Comments

- Comments can be on their own line or inline:

```
# This is a comment
SECRET_KEY=YOURSECRETKEYGOESHERE # comment
SECRET_HASH="something-with-a-#-hash"
```

*Note:* When a value contains a `#`, wrap it in quotes.

## Parsing

- The `dotenv.parse` function accepts a String or Buffer and returns an object with keys and values.

Example:

```
const dotenv = require('dotenv')
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf)
console.log(typeof config, config) // { BASIC: 'basic' }
```

## Preload

- Preload using command line option (-r):

```
$ node -r dotenv/config your_script.js
```

- Command line configuration options:

```
$ node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env dotenv_config_debug=true
```

- Can also set via environment variables:

```
$ DOTENV_CONFIG_ENCODING=latin1 DOTENV_CONFIG_DEBUG=true node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env
```

## Variable Expansion

- Use `dotenv-expand` to expand environment variables:

```
const dotenv = require('dotenv')
const variableExpansion = require('dotenv-expand')
const myEnv = dotenv.config()
variableExpansion(myEnv)
```

## Command Substitution

- With `dotenvx`, you can run command substitution in the .env file:

Example .env:

```
DATABASE_URL="postgres://$(whoami)@localhost/my_database"
```

And usage:

```
console.log('DATABASE_URL', process.env.DATABASE_URL)
```

Run with debugging:

```
$ dotenvx run --debug -- node index.js
```

## Syncing and Multiple Environments

- **Syncing:** Use `dotenvx` to encrypt and synchronize environment files. 
- **Multiple Environments:** Create files like `.env.production`, `.env.local` and load with:

```
$ dotenvx run --env-file=.env.production -- node index.js
```

Or chain multiple:

```
$ dotenvx run --env-file=.env.local --env-file=.env -- node index.js
```

## Deploying (Encryption)

- Encrypt .env files with `dotenvx` using the `--encrypt` flag:

```
$ dotenvx set HELLO Production --encrypt -f .env.production
```

- Running with a private key:

```
$ DOTENV_PRIVATE_KEY_PRODUCTION="<.env.production private key>" dotenvx run -- node index.js
```

## Examples & Framework Integration

Supports examples for nodejs (debug, override, processEnv), esm (preload), typescript (parse, config), webpack (plugin), react, express, nestjs, fastify.

## Documentation Functions

Dotenv exposes four primary functions:

1. `config([options])`
   - Reads the .env file, sets process.env, and returns an object with a `parsed` key or an `error` key.

   **Example:**
   
   ```js
   const result = require('dotenv').config()
   if (result.error) {
     throw result.error
   }
   console.log(result.parsed)
   ```

   **Options:**
   - `path` (default: `path.resolve(process.cwd(), '.env')`): Custom file path or array of file paths. 
   - `encoding` (default: `'utf8'`): File encoding.
   - `debug` (default: `false`): Enable logging.
   - `override` (default: `false`): Override existing values in process.env.
   - `processEnv` (default: `process.env`): Target object for assignment.

2. `parse(src, [options])`
   - Parses a string or buffer to return an object with keys and values.
   
   **Example:**
   
   ```js
   const dotenv = require('dotenv')
   const buf = Buffer.from('BASIC=basic')
   const config = dotenv.parse(buf)
   console.log(config) // { BASIC: 'basic' }
   ```

   **Options:**
   - `debug`: Enable debug logging if parsing fails.

3. `populate(target, parsed, [options])`
   - Populates the target object with parsed environment variables.
   
   **Example:**
   
   ```js
   const dotenv = require('dotenv')
   const parsed = { HELLO: 'world' }
   dotenv.populate(process.env, parsed)
   console.log(process.env.HELLO) // world
   ```

   **Options:**
   - `override` (default: `false`): Override existing keys.
   - `debug` (default: `false`): Enable logging.

4. `decrypt` (available with dotenvx): For decrypting encrypted environment files.

## FAQ & Troubleshooting

- **.env File Placement:** Ensure the .env file is at the correct location. Use `debug: true` to troubleshoot:

```
require('dotenv').config({ debug: true })
```

- **React Environment Variables:** For React, ensure variables are prefixed with `REACT_APP_` and configured via Webpack.

- **Webpack Polyfill Issues:** If you see "Module not found: Error: Can't resolve 'crypto|os|path'", install and configure polyfills:

```
npm install node-polyfill-webpack-plugin
```

Webpack configuration example:

```
const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        HELLO: JSON.stringify(process.env.HELLO)
      }
    }),
  ]
};
```

- **Avoid Committing .env:** Do not commit your .env file to version control. Use pre-commit hooks like:

```
dotenvx precommit --install
```

- **Docker Build Issues:** Prevent your .env file from being committed by using Docker prebuild hooks.

## Attribution

- Data Size: 599712 bytes
- Crawled from: https://github.com/motdotla/dotenv
- Retrieved on: 2023-10-24

## Attribution
- Source: dotenv Documentation
- URL: https://github.com/motdotla/dotenv
- License: MIT
- Crawl Date: 2025-04-20T22:47:12.928Z
- Data Size: 599712 bytes
- Links Found: 4768

## Retrieved
2025-04-20
library/PLOTLY_JS.md
# library/PLOTLY_JS.md
# PLOTLY_JS

## Crawl Summary
Plotly.js uses d3.js and stack.gl for high-performance, declarative charting with a JSON configuration. The technical examples include a contour plot with explicit trace parameters (x, y, z, colorscale, zmin, zmax) and layout settings (title, axis properties, margins, annotations) as well as a scatter plot example reading CSV data with custom error bars and axis formatting. The main API function, Plotly.newPlot, accepts an HTML element, a data array, a layout object, and a configuration object.

## Normalised Extract
TABLE OF CONTENTS:
1. Overview
   - High-level charting library built on d3.js and stack.gl.
2. Code Examples
   - Contour Plot Example:
     * Data retrieval using d3.json
     * Trace configuration: x, y, z arrays; type 'contour'; fixed colorscale and reversescale settings; zmin and zmax values.
     * Layout configuration: title, xaxis and yaxis with showline, mirror, ticks inside; margin settings; annotation for credit.
   - Scatter Plot Example:
     * Data retrieval using d3.csv
     * Trace configuration: type 'scatter', mode 'lines', mapping CSV columns to x and y, line width, error_y setup with array, thickness, and width.
     * Layout configuration: yaxis title, xaxis settings (no grid, tickformat), margin adjustments.
3. Configuration Options
   - API method `Plotly.newPlot` signature and parameters: container element, data, layout, config with values like { showLink: false }.

DETAILED INFORMATION:
1. Contour Plot Example (Direct Usage):
   • d3.json callback fetches a JSON structure and uses figure.data[0] for data arrays.
   • Colorscale defined as an array of pairs: [0, "rgb(0, 0, 0)"], [0.3, "rgb(230, 0, 0)"], etc.
   • Layout includes detailed axis definitions and margin: {l:40, b:40, t:60}.

2. Scatter Plot Example (CSV-based):
   • Uses d3.csv to load data, mapping CSV keys to chart data arrays.
   • Sets line properties and error bars with exact numeric values (line width 1, error_thickness 0.5, width 0).
   • Xaxis formatted with tickformat '%B, %Y' and no grid in xaxis.

3. API & Configuration Options:
   • Plotly.newPlot element signature: container (HTMLElement), data (array of trace objects), layout (object with axis and margin configurations), and config (standard config options like showLink).


## Supplementary Details
SUPPLEMENTARY TECHNICAL SPECIFICATIONS:
- Contour Plot Technical Details:
  • Trace Object:
    - x: Array (obtained from figure.data[0].x)
    - y: Array (obtained from figure.data[0].y)
    - z: Array (obtained from figure.data[0].z)
    - type: 'contour'
    - autocolorscale: false
    - colorscale: [[0, "rgb(0, 0, 0)"], [0.3, "rgb(230, 0, 0)"], [0.6, "rgb(255,210, 0)"], [1, "rgb(255,255,255)"]]
    - reversescale: true
    - zmin: -2.5
    - zmax: 2.5
  • Layout Object:
    - title: { text: 'turbulence simulation' }
    - xaxis: { title: { text: 'radial direction' }, showline: true, mirror: 'allticks', ticks: 'inside' }
    - yaxis: { title: { text: 'vertical direction' }, showline: true, mirror: 'allticks', ticks: 'inside' }
    - margin: { l: 40, b: 40, t: 60 }
    - annotations: [{ showarrow: false, text: 'Credit: Daniel Carrera', x: 0, y: 0, xref: 'paper', yref: 'paper' }]
- Scatter Plot Technical Details:
  • Trace Object:
    - type: 'scatter'
    - mode: 'lines'
    - x: Mapped from CSV column 'Time'
    - y: Mapped from CSV column '10 Min Sampled Avg'
    - line: { width: 1 }
    - error_y: { array: Mapped from '10 Min Std Dev', thickness: 0.5, width: 0 }
  • Layout Object:
    - yaxis: { title: { text: 'Wind Speed' } }
    - xaxis: { showgrid: false, tickformat: '%B, %Y' }
    - margin: { l: 40, b: 10, r: 10, t: 20 }
- API Configuration Option for Interactivity:
  • Config Object passed to Plotly.newPlot: { showLink: false } to disable additional Plotly link rendering.
- Data Retrieval Methods:
  • Using d3.json for JSON data and d3.csv for CSV data, with callbacks processing the returned data directly into trace objects.


## Reference Details
API SPECIFICATIONS AND IMPLEMENTATION DETAILS:

1. Plotly.newPlot
   - Signature:
     Plotly.newPlot(container: HTMLElement, data: Array<Object>, layout: Object, config?: Object): Promise
   - Parameters:
     • container: The HTML element (e.g., document.getElementById('chart-container')) where the chart is rendered.
     • data: An array of trace objects. Each trace object must specify at least the 'type' and data arrays (e.g., x, y, z for contour charts).
     • layout: An object representing chart layout. Common attributes include:
         - title: { text: string }
         - xaxis and yaxis: {
             title: { text: string },
             showline: boolean,
             mirror: string (e.g., 'allticks'),
             ticks: string (e.g., 'inside'),
             showgrid: boolean (optional)
           }
         - margin: { l: number, b: number, t: number, r?: number }
         - annotations: Array<Object> with properties such as showarrow, text, x, y, xref, yref
     • config: Optional configuration object. Example configuration: { showLink: false } disables the display of a Plotly logo/link.
   - Return: A Promise that resolves when the plot is rendered.

2. d3.json and d3.csv Usage Example with Plotly:

// Contour Plot Example
 d3.json('https://plotly.com/~DanielCarrera/13.json', function(figure) {
   // Define trace using data from the JSON figure
   var trace = {
     x: figure.data[0].x,
     y: figure.data[0].y,
     z: figure.data[0].z,
     type: 'contour',
     autocolorscale: false,
     colorscale: [
       [0, "rgb(0, 0, 0)"],
       [0.3, "rgb(230, 0, 0)"],
       [0.6, "rgb(255,210, 0)"],
       [1, "rgb(255,255,255)"]
     ],
     reversescale: true,
     zmin: -2.5,
     zmax: 2.5
   };
   var layout = {
     title: { text: 'turbulence simulation' },
     xaxis: {
       title: { text: 'radial direction' },
       showline: true,
       mirror: 'allticks',
       ticks: 'inside'
     },
     yaxis: {
       title: { text: 'vertical direction' },
       showline: true,
       mirror: 'allticks',
       ticks: 'inside'
     },
     margin: { l: 40, b: 40, t: 60 },
     annotations: [{
       showarrow: false,
       text: 'Credit: Daniel Carrera',
       x: 0, y: 0, xref: 'paper', yref: 'paper'
     }]
   };
   Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, { showLink: false });
 });

// Scatter Plot Example
 d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/wind_speed_laurel_nebraska.csv', function(rows) {
   var trace = {
     type: 'scatter',
     mode: 'lines',
     x: rows.map(function(row) { return row['Time']; }),
     y: rows.map(function(row) { return row['10 Min Sampled Avg']; }),
     line: { width: 1 },
     error_y: {
       array: rows.map(function(row) { return row['10 Min Std Dev']; }),
       thickness: 0.5,
       width: 0
     }
   };
   var layout = {
     yaxis: { title: { text: 'Wind Speed' } },
     xaxis: {
       showgrid: false,
       tickformat: '%B, %Y'
     },
     margin: { l: 40, b: 10, r: 10, t: 20 }
   };
   Plotly.newPlot(document.getElementById('wind-speed'), [trace], layout, { showLink: false });
 });

3. Best Practices & Troubleshooting:
   - Always validate the JSON/CSV input data structure before rendering.
   - Ensure that the HTML container exists and is correctly referenced by using document.getElementById or similar queries.
   - Check the browser console for errors related to configuration options or data types; mismatches in expected trace properties can cause rendering failures.
   - For performance optimization, consider using WebGL-based plots (e.g., scattergl) when dealing with large datasets.
   - Example command to check Plotly.js version:
       console.log(Plotly.version);
   - If encountering issues with rendering, try isolating the layout configuration in a separate JSON object and validate each property incrementally.


## Original Source
Plotly.js Documentation
https://plotly.com/javascript/

## Digest of PLOTLY_JS

# PLOTLY.JS DOCUMENTATION DIGEST (Retrieved: 2023-10-25)

## Overview
Plotly.js is a high-level, declarative charting library built on top of d3.js and stack.gl. It supports over 40 chart types including 3D charts, statistical graphs, and SVG maps. It is free and open source with a complete set of JSON-based configuration options.

## Code Examples
### Contour Plot Example
```javascript
// Fetch JSON data and render a contour plot
 d3.json('https://plotly.com/~DanielCarrera/13.json', function(figure){
   var trace = {
     x: figure.data[0].x,
     y: figure.data[0].y,
     z: figure.data[0].z,
     type: 'contour',
     autocolorscale: false,
     colorscale: [
       [0, "rgb(  0,  0,  0)"],
       [0.3, "rgb(230,  0,  0)"],
       [0.6, "rgb(255,210,  0)"],
       [1, "rgb(255,255,255)"]
     ],
     reversescale: true,
     zmax: 2.5,
     zmin: -2.5
   };
   var layout = {
     title: { text: 'turbulence simulation' },
     xaxis: {
       title: { text: 'radial direction' },
       showline: true,
       mirror: 'allticks',
       ticks: 'inside'
     },
     yaxis: {
       title: { text: 'vertical direction' },
       showline: true,
       mirror: 'allticks',
       ticks: 'inside'
     },
     margin: { l: 40, b: 40, t: 60 },
     annotations: [{
       showarrow: false,
       text: 'Credit: Daniel Carrera',
       x: 0, y: 0, xref: 'paper', yref: 'paper'
     }]
   };
   Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, { showLink: false });
 });
```

### Scatter Plot Example
```javascript
// Load CSV data to render a scatter plot with error bars
 d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/wind_speed_laurel_nebraska.csv', function(rows){
   var trace = {
     type: 'scatter',           // Chart type
     mode: 'lines',             // Connect data points with lines
     x: rows.map(function(row){ return row['Time']; }),
     y: rows.map(function(row){ return row['10 Min Sampled Avg']; }),
     line: { width: 1 },        // Line width setting
     error_y: {
       array: rows.map(function(row){ return row['10 Min Std Dev']; }),
       thickness: 0.5,          // Error bar thickness
       width: 0                 // Error bar cross width
     }
   };
   var layout = {
     yaxis: { title: { text: 'Wind Speed' } },
     xaxis: {
       showgrid: false,         // Disable grid lines
       tickformat: '%B, %Y'      // Date format e.g., "Month, Year"
     },
     margin: { l: 40, b: 10, r: 10, t: 20 }
   };
   Plotly.newPlot(document.getElementById('wind-speed'), [trace], layout, { showLink: false });
 });
```

## Configuration Options
- Chart rendering function: `Plotly.newPlot`
  - Signature: `Plotly.newPlot(container: HTMLElement, data: Array, layout: Object, config: Object): Promise`
  - Parameters include configurations such as margin settings (`{l: 40, b: 40, t: 60}`), axis configurations (titles, gridlines, tick formatting), and interactivity options (e.g. `{ showLink: false }`).

## Attribution
© 2025 Plotly. All rights reserved.

## Attribution
- Source: Plotly.js Documentation
- URL: https://plotly.com/javascript/
- License: MIT
- Crawl Date: 2025-04-21T09:47:48.248Z
- Data Size: 4254550 bytes
- Links Found: 13521

## Retrieved
2025-04-21
library/VEGA_DOC.md
# library/VEGA_DOC.md
# VEGA_DOC

## Crawl Summary
The crawled content details the Vega visualization grammar including its JSON specification structure, interactive API, web deployment practices, command line utilities with specific flags and options, and tutorials. Key sections cover the Specification Reference (detailed JSON properties), API Reference (parser, view, and embed modules with method signatures and code examples), Web Deployment (including CDN, bundler, and integration with D3), Command Line Utilities (vg2pdf, vg2png, vg2svg with options and usage examples), and Vega-Lite API (JavaScript API for generating Vega-Lite JSON with full code examples).

## Normalised Extract
## Table of Contents
1. Specification Reference
2. API Reference
3. Web Deployment
4. Command Line Utilities
5. Vega-Lite API
6. Tutorials

---

### 1. Specification Reference
- Vega JSON spec structure:
  - Basic properties: width, height
  - Data definitions
  - Scales: mapping data (numbers/strings) to visual properties
  - Axes & Legends: Visualization of scales
  - Marks: Graphical elements (rectangles, lines, symbols)
  - Projections: Cartographic mapping (longitude, latitude)
  - Transforms: Data filtering, aggregation, sorting, layout transformations
  - Signals: Interactive reactive variables
  - Event Streams: Input event definitions
  - Expressions: Custom calculations
  - Layout: Grid layouts
  - Types: Parameter type definitions

### 2. API Reference
- **Parser**: `vega.parse(spec: Object): DataflowDescription`
- **View**:
  - Constructor: `new vega.View(vega.parse(spec), { renderer: 'canvas' | 'svg', container: '#view', hover: true })`
  - Method: `runAsync(): Promise<View>`
- **Vega-Embed**: Function `vegaEmbed(selector: string, specUrl: string)` for embedding visualizations

### 3. Web Deployment
- Importing via CDN:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
```
- Using D3 and topojson with smaller bundle:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script src="https://cdn.jsdelivr.net/npm/topojson-client@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega@5/build/vega-core.min.js"></script>
</head>
```
- Module import via bundler:

```javascript
import * as vega from "vega";
```

### 4. Command Line Utilities
- Commands: `vg2pdf`, `vg2png`, `vg2svg`
- Usage:

```bash
vg2png [options] [input_vega_json_file] [output_png_file]
```

- Options with exact flags:
  - `-b, --base`: Base directory (e.g., `-b http://host/data/`)
  - `-s, --scale`: Numeric value (default: 1)
  - `-c, --config`: Path to config file
  - `-f, --format`: Number format locale file
  - `-t, --timeFormat`: Time format locale file
  - `-l, --loglevel`: Log level (error, warn, info, debug)
  - `--header`: Flag for SVG header inclusion (vg2svg only)
  - `-seed`: Seed for random number generation

Example Command:

```bash
vg2png test/specs-valid/bar.vg.json bar.png 2> vg2png.log
```

### 5. Vega-Lite API
- Example Code:

```javascript
vl.markBar().data('data/movies.json').encode(
  vl.x().fieldQ('IMDB_Rating').bin(true),
  vl.y().count()
);
```

- Resulting Vega-Lite JSON:

```json
{
  "mark": "bar",
  "data": {"url": "data/movies.json"},
  "encoding": {
    "x": {
      "bin": true,
      "field": "IMDB_Rating",
      "type": "quantitative"
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative"
    }
  }
}
```

### 6. Tutorials
- Tutorials provided cover:
  - Beginner: "Let’s Make a Bar Chart"
  - Intermediate: "Axes & Legends", "Mapping Airport Connections"
  - Advanced: "How Vega Works"


## Supplementary Details
### Technical Specifications & Implementation Details

1. **Vega JSON Specification**:
   - Structure: {
       "width": <Number>,
       "height": <Number>,
       "data": [{ "name": "<dataName>", "url": "<dataURL>", "format": {...} }],
       "scales": [{ "name": "<scaleName>", "type": "linear|ordinal|...", "domain": <Array>, "range": <Array> }],
       "axes": [{ "scale": "<scaleName>", "orient": "bottom|left|..." }],
       "marks": [ { "type": "rect|line|symbol|...", "encode": {...} } ],
       "signals": [{ "name": "<signalName>", "value": <initialValue> }]
     }

2. **Vega View API**:
   - Constructor Options:
     - renderer: 'canvas' (default) or 'svg'
     - container: CSS selector string (e.g., '#view') or DOM element
     - hover: boolean to enable interactive hover
   - Example:

   ```javascript
   var view = new vega.View(vega.parse(spec), {
     renderer: 'canvas',
     container: '#view',
     hover: true
   });
   view.runAsync();
   ```

3. **CLI Configuration Options**:
   - `-s, --scale`: Default 1; scales output resolution
   - `-b, --base`: Specifies base directory path, effecting data and image loading
   - `-c, --config`: Absolute/relative path to a JSON/JS config file
   - `-f, --format`: Specifies number formatting locale file
   - `-t, --timeFormat`: Specifies data/time formatting locale file
   - `-l, --loglevel`: Set log output level; valid values: error, warn, info, debug
   - `--header` (for vg2svg): Includes XML header and DOCTYPE
   - `-seed`: Seed value for reproducible randomness

4. **Recommended Implementation Pattern**:
   - Parse specification with `vega.parse(spec)`
   - Instantiate the view with required options
   - Use asynchronous methods (e.g., `runAsync()`) to render
   - For interactive usage, use `vega-embed` to simplify loading and embedding visualizations.

5. **Best Practices**:
   - Serve local copies or use a stable CDN for production deployment
   - When using bundlers, import only necessary modules to reduce bundle size
   - For high-resolution outputs, adjust the `-s` scale factor accordingly
   - Use CLI flags to ensure logs and errors are captured for troubleshooting

6. **Troubleshooting Procedures**:
   - If rendering fails, verify the validity of the JSON spec with a linter or by running a minimal example
   - Use `console.error` and check stderr logs when using CLI utilities:
   ```bash
   vg2png spec.vg.json output.png 2> error.log
   ```
   - For CSP issues, switch to alternative expression evaluators that are CSP-compliant as documented.


## Reference Details
### Complete API Specifications & SDK Method Signatures

#### Vega Parser
- Method: `vega.parse(spec: Object): DataflowDescription`
  - Input: A complete Vega JSON specification object
  - Output: An internal dataflow description object
  - Exceptions: Throws error if spec is invalid JSON structure

#### Vega View
- Constructor: `new vega.View(runtime: DataflowDescription, options: { renderer: 'canvas' | 'svg', container: string | HTMLElement, hover: boolean })`
  - Parameters:
    - runtime: The parsed dataflow from `vega.parse(spec)`
    - options:
      - renderer (String): 'canvas' or 'svg' (default 'canvas')
      - container (String/HTMLElement): CSS selector or DOM element where the view is rendered
      - hover (Boolean): Enable or disable hover interactions (default false)
  - Methods:
    - `runAsync(): Promise<View>`: Renders the view asynchronously.
    - Additional methods (not fully listed here) include `signal()`, `width()`, `height()`, and export functions such as `toCanvas()`.

#### Vega-Embed Module
- Function: `vegaEmbed(element: string, specUrl: string, opt?: Object): Promise<EmbedResult>`
  - Parameters:
    - element (String): CSS selector for target container
    - specUrl (String): URL to the Vega or Vega-Lite JSON specification
    - opt (Object): Optional configuration object for embedding (e.g., default actions, renderer, theme)
  - Returns: A Promise that resolves to an object containing the view and embed options

##### Example Code:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
</head>
<body>
  <div id="view"></div>
  <script>
    vegaEmbed('#view', 'https://vega.github.io/vega/examples/bar-chart.vg.json')
      .then(result => {
        console.log('View successfully rendered.');
      })
      .catch(error => console.error(error));
  </script>
</body>
```

#### Vega-Lite API
- SDK Method Chaining:

```javascript
// Creating a bar chart specification using Vega-Lite API
vl.markBar()
  .data('data/movies.json')
  .encode(
    vl.x().fieldQ('IMDB_Rating').bin(true),
    vl.y().count()
  );
```

- Resulting JSON Structure:

```json
{
  "mark": "bar",
  "data": {"url": "data/movies.json"},
  "encoding": {
    "x": {
      "bin": true,
      "field": "IMDB_Rating",
      "type": "quantitative"
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative"
    }
  }
}
```

#### Command Line Interface (CLI) Tools
- Utilities: `vg2pdf`, `vg2png`, `vg2svg`
- Typical Syntax:
  - `vg2png [options] input_spec.json output.png`
  - Options include:
    - `-b, --base <String>`: Base directory path
    - `-s, --scale <Number>`: Scale factor (default: 1)
    - `-c, --config <String>`: Path to config file
    - `-f, --format <String>`: Number format locale file
    - `-t, --timeFormat <String>`: Time format locale file
    - `-l, --loglevel <String>`: Log level ('error', 'warn', 'info', 'debug')
    - `--header`: Include XML header in SVG output (vg2svg only)
    - `-seed <Number>`: Seed for random number generation

##### Example CLI Command:

```bash
vg2png test/specs-valid/bar.vg.json bar.png 2> vg2png.log
```

This command renders a Vega specification to PNG, with error logs redirected to vg2png.log.

### Detailed Troubleshooting Procedures
- Validate JSON spec using online validators or built-in Vega error messages.
- Verify CDN availability if using remote script imports.
- For CLI tools, run with increased loglevel to debug:

```bash
vg2png -l debug test/specs-valid/bar.vg.json bar.png
```

- If encountering CSP issues, consult the alternative expression evaluator documentation to switch from the Function constructor.

---
All specifications, method signatures, configurations, and examples provided here are direct extracts from the Vega documentation as crawled on 2023-10-04. Developers can use these complete details directly without further modification.

## Original Source
Vega Documentation
https://vega.github.io/vega/docs/

## Digest of VEGA_DOC

# SPECIFICATION REFERENCE

A Vega specification is a JSON object defining an interactive visualization. It includes basic properties (e.g., width, height) and detailed definitions for:
- Data: Load, parse and define data sources.
- Scales: Mapping numeric or string data to visual properties such as coordinates, colors, sizes.
- Axes & Legends: Visualization components for the defined scales.
- Marks: Graphical elements like rectangles, lines, symbols, etc.
- Projections: Cartographic projections for geospatial data.
- Transforms: Data transformations including filter, sort, aggregate, and layout.
- Signals: Dynamic reactive variables for interaction and updates.
- Event Streams: Definitions for interactive input events.
- Expressions: Custom calculations over data and signals.
- Layout: Grid layout for grouped marks.
- Types: Reusable parameter type definitions.

Retrieval Date: 2023-10-04

# API REFERENCE

Vega provides a JavaScript runtime API to parse JSON specs into a reactive dataflow graph. Key components include:

## Parser
- Exact Method: `vega.parse(spec: Object): DataflowDescription`
- Transforms a Vega JSON specification into an internal dataflow representation.

## View
- Constructor: `new vega.View(runtime: DataflowDescription, options: {
    renderer: 'canvas' | 'svg',
    container: string | HTMLElement,
    hover: boolean
  })`
- Methods:
  - `runAsync(): Promise<View>`: Renders the view asynchronously.
  - Supports data streaming, exporting images, and debugging access.

## Vega-Embed Module
- Usage Example:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
</head>
<body>
  <div id="view"></div>
  <script>
    vegaEmbed('#view', 'https://vega.github.io/vega/examples/bar-chart.vg.json');
  </script>
</body>
```

## Vega-Lite API
- Provides a concise JavaScript API wrapper for creating Vega-Lite JSON specs:

```javascript
vl.markBar().data('data/movies.json').encode(
  vl.x().fieldQ('IMDB_Rating').bin(true),
  vl.y().count()
);
```

Produces a Vega-Lite JSON specification:

```json
{
  "mark": "bar",
  "data": {"url": "data/movies.json"},
  "encoding": {
    "x": {
      "bin": true,
      "field": "IMDB_Rating",
      "type": "quantitative"
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative"
    }
  }
}
```

# WEB DEPLOYMENT

## Importing Vega

Include Vega via CDN:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
```

For production, serve your own files or use jsDelivr:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
```

## Using Vega with D3 (Optimized Bundle)

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script src="https://cdn.jsdelivr.net/npm/topojson-client@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega@5/build/vega-core.min.js"></script>
</head>
```

## Using with a Bundler

```javascript
import * as vega from "vega";
```

# COMMAND LINE UTILITIES

Vega CLI includes:
- `vg2pdf [options] [input_vega_json_file] [output_pdf_file]`
- `vg2png [options] [input_vega_json_file] [output_png_file]`
- `vg2svg [options] [input_vega_json_file] [output_svg_file]`

Optional parameters:
- `-b, --base [String]`: Set base directory (e.g., `-b http://host/data/`).
- `-s, --scale [Number]`: Resolution scale factor (default: 1).
- `-c, --config [String]`: Path to a Vega config JSON or JS file.
- `-f, --format [String]`: Number format locale file path.
- `-t, --timeFormat [String]`: Data/time format locale file path.
- `-l, --loglevel [String]`: Log level (`error`, `warn`, `info`, or `debug`).
- Additional flags: `--header` (SVG only), `-seed` for RNG, and `--help`.

Example:

```bash
vg2png test/specs-valid/bar.vg.json bar.png 2> vg2png.log
```

# TUTORIALS

Tutorials include:
- "Let’s Make a Bar Chart": A beginner tutorial with interactive tooltips.
- "A Guide to Guides: Axes & Legends": Intermediate tutorial on customizing axes and legends.
- "Mapping Airport Connections": Advanced tutorial on mapping and data transformation.
- "How Vega Works": Advanced tutorial detailing the rendering pipeline.


## Attribution
- Source: Vega Documentation
- URL: https://vega.github.io/vega/docs/
- License: BSD-3-Clause
- Crawl Date: 2025-04-20T21:46:32.621Z
- Data Size: 2404416 bytes
- Links Found: 3940

## Retrieved
2025-04-20
library/EXPRESS.md
# library/EXPRESS.md
# EXPRESS

## Crawl Summary
Express 5.1.0, the default version on npm, includes detailed installation instructions using npm with automatic dependency registration (with npm 5.0+). It provides a minimalist example app that listens on port 3000 and responds to '/' with 'Hello World!'. The documentation covers usage of express-generator for scaffolding full applications, defines routing patterns including basic get/post routes, dynamic route parameters, regular expressions, chained route handling, and using middleware. Details about serving static files via express.static with options for virtual path prefixes and absolute directory paths are also provided along with various troubleshooting and best practices for handling 404 responses and errors.

## Normalised Extract
## Table of Contents
1. Installation
2. Hello World App
3. Express Generator
4. Routing
   - Basic Routes
   - Advanced Routes
   - Chained Routes
   - Route Parameters
5. Serving Static Files
6. Examples
7. FAQ

---

### 1. Installation
- Use `npm install express --save` to add Express to your project.
- Requirements:
  - Express 4.x: Node.js 0.10+
  - Express 5.x: Node.js 18+

### 2. Hello World App

Code Example:
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

### 3. Express Generator

- Use the command:
  ```bash
  npx express-generator
  ```
- To generate app with Pug:
  ```bash
  express --view=pug myapp
  cd myapp
  npm install
  ```
- Run the app using:
  ```bash
  DEBUG=myapp:* npm start
  ```
  or Windows equivalents.

### 4. Routing

#### Basic Routes
```javascript
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Got a POST request');
});
```

#### Advanced Routes & Multiple Handlers
```javascript
const cb0 = (req, res, next) => { console.log('CB0'); next(); };
const cb1 = (req, res, next) => { console.log('CB1'); next(); };
const cb2 = (req, res) => { res.send('Hello from C!'); };

app.get('/example/c', [cb0, cb1, cb2]);
```

#### Chained Routes using app.route()
```javascript
app.route('/book')
  .get((req, res) => res.send('Get a random book'))
  .post((req, res) => res.send('Add a book'))
  .put((req, res) => res.send('Update the book'));
```

#### Route Parameters
```javascript
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params);
});
```

### 5. Serving Static Files

- **Basic Serving:**
  ```javascript
  app.use(express.static('public'));
  ```
- **Virtual Path:**
  ```javascript
  app.use('/static', express.static('public'));
  ```
- **Absolute Path:**
  ```javascript
  const path = require('path');
  app.use('/static', express.static(path.join(__dirname, 'public')));
  ```

### 6. Examples

Reference examples include authentication, content negotiation, session management, and more with complete Express app structures including routers, middleware, and error handlers.

### 7. FAQ

- **404 Handling:**
  ```javascript
  app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
  });
  ```

- **Error Handling:**
  ```javascript
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  ```


## Supplementary Details
### Technical Specifications & Implementation Details

1. **Installation & Environment:**
   - Command: `npm install express --save` adds Express as a dependency in package.json (npm 5.0+ adds automatically; older versions require '--save').
   - Environment: Express 4.x requires Node.js 0.10+; Express 5.x requires Node.js 18+.

2. **Hello World Implementation:**
   - Code snippet provided creates a basic server listening on port 3000. Use `node app.js` to execute.

3. **Express Generator Details:**
   - Use `npx express-generator` to scaffold an app with required directories (app.js, bin/www, routes, views, public).
   - Template engines: options include ejs, hbs, pug, hogan, etc.
   - Command-line options:
     - `-h, --help` for usage info
     - `--version` for version info
     - `--no-view` to generate without view engine
     - `-v, --view <engine>` to specify a view engine (default: jade)
     - `-c, --css <engine>` for stylesheet support (default: plain css)
     - `--git` to add a .gitignore file

4. **Routing Specifications:**
   - Route function signature: `app.METHOD(path, handler)` where METHOD is lowercase HTTP verb.
   - Supports multiple handlers and middleware chaining. Use `next()` to delegate control.
   - Route parameters must be word characters; use regex for more control with pattern like `/user/:userId(\d+)`.

5. **Static File Serving Options:**
   - Basic signature: `express.static(root, [options])` where root is the directory to serve.
   - Multiple directories can be defined; order of declaration defines precedence.
   - Virtual path prefix allows mounting at a specified URL (e.g., `/static`).
   - Use path.join(__dirname, 'public') to specify an absolute path, ensuring correct file lookup regardless of execution directory.

6. **Best Practices & Troubleshooting:**
   - Always check Node.js version compatibility.
   - Use reverse proxy caching for production serving of static assets.
   - For 404 errors, place a catch-all middleware at the bottom of the middleware stack.
   - For error handling, use middleware with four arguments to capture errors.


## Reference Details
### Complete API Specifications and Code Examples

#### 1. Express Application Setup

- **Method Signature:**
  ```javascript
  const express = require('express');
  const app = express();
  // app.METHOD(path, [callback, ...])
  ```

- **Example: Hello World Application**
  ```javascript
  // app.js
  const express = require('express');
  const app = express();
  const port = 3000;

  // Define GET route at '/'
  app.get('/', (req, res) => {
    // Sends text response
    res.send('Hello World!');
  });

  // Starts the server on port 3000
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  ```

#### 2. Express Generator Command Line Options

- **Usage:**
  ```bash
  express [options] [dir]
  ```

- **Options:**
  - `-h, --help` : Output usage information.
  - `--version` : Output the version number.
  - `-e, --ejs` : Add ejs engine support.
  - `--hbs` : Add handlebars engine support.
  - `--pug` : Add pug engine support.
  - `-H, --hogan` : Add hogan.js engine support.
  - `--no-view` : Generate without a view engine.
  - `-v, --view <engine>` : Add view support (defaults to jade).
  - `-c, --css <engine>` : Add stylesheet support (defaults to plain css).
  - `--git` : Add a .gitignore file.
  - `-f, --force` : Force generation in a non-empty directory.

- **Example Usage:**
  ```bash
  express --view=pug myapp
  cd myapp
  npm install
  ```

#### 3. Routing API

- **Basic Route:**
  ```javascript
  app.get('/', (req, res) => {
    res.send('hello world');
  });
  ```

- **Route with Parameters:**
  ```javascript
  app.get('/users/:userId/books/:bookId', (req, res) => {
    // req.params = { userId: 'value', bookId: 'value' }
    res.send(req.params);
  });
  ```

- **Chained Route Handling:**
  ```javascript
  app.route('/book')
    .get((req, res) => res.send('Get a random book'))
    .post((req, res) => res.send('Add a book'))
    .put((req, res) => res.send('Update the book'));
  ```

- **Middleware Example with next():**
  ```javascript
  const cb0 = (req, res, next) => {
    console.log('CB0');
    next();
  };

  const cb1 = (req, res, next) => {
    console.log('CB1');
    next();
  };

  const cb2 = (req, res) => {
    res.send('Hello from C!');
  };

  app.get('/example/c', [cb0, cb1, cb2]);
  ```

#### 4. Static Files Serving

- **Method Signature:**
  ```javascript
  express.static(root, [options]);
  ```

- **Example with Virtual Path and Absolute Directory:**
  ```javascript
  const path = require('path');
  app.use('/static', express.static(path.join(__dirname, 'public')));
  ```

- **Accessing Files:**
  - URL: http://localhost:3000/static/images/kitten.jpg

#### 5. Troubleshooting Procedures

- **Server Startup:**
  - Run: `node app.js`
  - Expected output: `Example app listening on port 3000`

- **Debugging 404 Errors:**
  - Add middleware at the end of the route definitions:
    ```javascript
    app.use((req, res, next) => {
      res.status(404).send("Sorry can't find that!");
    });
    ```

- **Error Handling:**
  - Add error-handling middleware:
    ```javascript
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
    ```

This precise documentation provides developers with direct code examples, configuration options, API method signatures, and troubleshooting commands, ensuring an immediately applicable implementation of Express-based applications.

## Original Source
Express Documentation
https://expressjs.com/

## Digest of EXPRESS

# Express Documentation Extract

**Retrieved on:** 2023-10-07

## Overview

This document compiles the core technical details extracted from the Express.js website. The content includes installation instructions, example applications (Hello World), usage of the Express generator, routing definitions, static file serving, and FAQs.

## Installation

- **Install Express:**

  npm command:
  ```bash
  npm install express --save
  ```

- **Node.js Requirements:**
  - Express 4.x: Node.js 0.10 or higher
  - Express 5.x: Node.js 18 or higher

- **Creating a New App:**
  ```bash
  mkdir myapp
  cd myapp
  npm init
  npm install express
  ```

## Hello World App

A minimal Express application example:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

To run the app:
```
node app.js
```

## Express Generator

- **Installation and usage with npx:**
  ```bash
  npx express-generator
  ```

- **Global installation for earlier Node versions:**
  ```bash
  npm install -g express-generator
  express
  ```

- **Command Help:**
  ```bash
  express -h
  ```

- **Example to create app with Pug view engine:**
  ```bash
  express --view=pug myapp
  cd myapp
  npm install
  ```

- **Run app commands:**
  - On MacOS/Linux:
    ```bash
    DEBUG=myapp:* npm start
    ```
  - On Windows Command Prompt:
    ```bash
    set DEBUG=myapp:* & npm start
    ```
  - On Windows PowerShell:
    ```powershell
    $env:DEBUG='myapp:*'; npm start
    ```

## Routing

### 1. Basic Route Definition

All routes follow the structure: `app.METHOD(PATH, HANDLER)`.

Example GET and POST route:

```javascript
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Got a POST request');
});
```

### 2. Advanced Routing Patterns

- **Route with multiple handlers:**

  ```javascript
  app.get('/example/d', [cb0, cb1], (req, res, next) => {
    console.log('Passing control...');
    next();
  }, (req, res) => {
    res.send('Hello from D!');
  });
  ```

- **Route parameters:**

  ```javascript
  // Example: /users/34/books/8989
  app.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params);
  });
  ```

- **Regular expressions in routes:**

  ```javascript
  app.get(/a/, (req, res) => {
    res.send('/a/');
  });
  ```

### 3. Chained Route Handlers using app.route()

```javascript
app.route('/book')
  .get((req, res) => {
    res.send('Get a random book');
  })
  .post((req, res) => {
    res.send('Add a book');
  })
  .put((req, res) => {
    res.send('Update the book');
  });
```

## Serving Static Files

- **Basic usage:**
  ```javascript
  app.use(express.static('public'));
  ```
  Files available at URL without including "public" in the path.

- **Multiple directories:**
  ```javascript
  app.use(express.static('public'));
  app.use(express.static('files'));
  ```

- **Virtual path prefix:**
  ```javascript
  app.use('/static', express.static('public'));
  ```

- **Using absolute paths:**
  ```javascript
  const path = require('path');
  app.use('/static', express.static(path.join(__dirname, 'public')));
  ```

## Express Examples

A collection of example applications including auth, content negotiation, cookie sessions, error handling, and more. For instance:

- **Cookie-based sessions example**
- **Multi-router example**
- **MVC style controllers**

## FAQ

- **404 Handling:**
  ```javascript
  app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
  });
  ```

- **Error Handler:**
  ```javascript
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  ```

- **Sending Files and HTML:**
  Use `res.sendFile()` to send files. Render dynamic templates with supported view engines.

---

**Attribution:** Express.js documentation, Data Size: 9326355 bytes, Links Found: 20935

## Attribution
- Source: Express Documentation
- URL: https://expressjs.com/
- License: MIT
- Crawl Date: 2025-04-20T21:40:56.394Z
- Data Size: 9326355 bytes
- Links Found: 20935

## Retrieved
2025-04-20
library/NODE_CLI.md
# library/NODE_CLI.md
# NODE_CLI

## Crawl Summary
Crawled URL (https://blog.risingstack.com/node-js-cli-tutorial/) yielded no direct technical content. The technical details were derived from the associated source entry from SOURCES.md. Key points include CLI architecture, argument parsing with Commander.js, configuration handling, error management with process exit codes, and modular command design with precise code examples.

## Normalised Extract
Table of Contents:
1. CLI Architecture
   - Initiate CLI with shebang and modular design separating main entry, commands, and utilities.
2. Argument Parsing
   - Use Commander.js with `program.option(flag, description, defaultValue?)`.
   - API signature: `program.option(flag: string, description: string, defaultValue?: any) => Command`.
3. Execution Patterns
   - Use try-catch blocks and synchronous/asynchronous method design.
   - Use `process.exit(code)` to indicate success (0) or failure (non-zero).
4. Configuration Options
   - Manage configurations via JSON/YAML files with explicit keys (e.g., name, verbose, outputPath).
5. Error Handling
   - Implement error logging and controlled exit with error codes.
6. Code Examples
   - Complete sample scripts for CLI entry file and modular commands.
7. Troubleshooting
   - Detailed steps for correcting common errors like missing shebang and flag misconfigurations.

Detailed implementations are provided in each section with exact code snippets.

## Supplementary Details
Supplementary Technical Specifications:
- CLI Execution:
  - Entry file must start with `#!/usr/bin/env node`.
  - Use Commander.js: Install via `npm install commander`.
  - Version specification using `program.version('1.0.0')`.
- Argument Parsing:
  - Define required flags using angle brackets in flag definitions, e.g., `<name>`.
  - Command Signature Example: `program.option('-n, --name <name>', 'User name')`.
- Configuration Options:
  - JSON file example:
    {
      "name": "defaultUser",
      "verbose": true,
      "outputPath": "./dist"
    }
  - YAML alternative using js-yaml can load similar configurations.
- Error Management:
  - Use try/catch around main execution code.
  - Log errors to console and/or file with detailed messages.
- Best Practices:
  - Use descriptive error messages.
  - Maintain modular structure for easier testing and maintenance.
- Implementation Steps:
  1. Create entry file with shebang and import necessary modules.
  2. Parse arguments using Commander.js.
  3. Validate arguments and configurations.
  4. Execute command actions in modular functions.
  5. Implement try/catch for error management and log accordingly.


## Reference Details
API Specifications and Code Examples:

1. Commander.js API:
   - Method: program.option(flag: string, description: string, defaultValue?: any): Command
   - Method: program.version(version: string, [flags]): Command
   - Method: program.parse(argv: Array<string>): Command
   - Full Example:
     ```js
     const { program } = require('commander');

     program
       .version('1.0.0', '-v, --version', 'Output the current version')
       .option('-n, --name <name>', 'Specify user name')
       .parse(process.argv);

     if (!program.name) {
       console.error('Error: Name is required.');
       process.exit(1);
     } else {
       console.log(`Hello, ${program.name}!`);
     }
     ```
   
2. Process Exit:
   - API: process.exit(code: number): never
   - Usage: `if(error) { process.exit(1); } else { process.exit(0); }`

3. Node.js CLI Execution Guidelines:
   - Use shebang `#!/usr/bin/env node` on top of CLI scripts for execution in Unix environments.
   - File permissions: Ensure the CLI file has executable permissions (`chmod +x cli.js`).

4. Error Handling Best Practices:
   - Implement try/catch blocks:
     ```js
     try {
       // operation
     } catch (err) {
       console.error('Operation failed:', err);
       process.exit(1);
     }
     ```
   - Log errors to console with detailed stack traces in development mode.

5. Troubleshooting Procedures:
   - Command: `node cli.js --name Test` should output `Hello, Test!`.
   - If the CLI does not run, check:
     a. Presence of shebang line
     b. Correct installation of Node.js and dependencies (e.g., commander)
     c. File permissions (e.g., using `chmod +x cli.js`)
   - Expected outputs:
     - Success: `Hello, <name>!`
     - Failure without name: Error message and exit code 1

6. SDK Method Signatures and Configuration:
   - Example JSON configuration loader:
     ```js
     const fs = require('fs');
     const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
     console.log(`Configuration Loaded: ${JSON.stringify(config)}`);
     ```
   - Configuration Options:
     * name (string): User name, default 'defaultUser'
     * verbose (boolean): Toggle verbose logging, default false
     * outputPath (string): Path to output directory, default './dist'

Developers can directly integrate these examples and API specifications into their CLI tool implementation for robust, modular, and error-resilient applications.

## Original Source
Building CLI Tools with Node.js (RisingStack)
https://blog.risingstack.com/node-js-cli-tutorial/

## Digest of NODE_CLI

# Node CLI Tool

**Retrieved:** 2023-10-17

## Overview
This document compiles the technical details extracted from the RisingStack tutorial on building CLI tools with Node.js. The document covers architecture, argument parsing, execution patterns, configuration details, error handling, code examples, and troubleshooting procedures.

## Table of Contents
1. CLI Architecture
2. Argument Parsing
3. Execution Patterns
4. Configuration Options
5. Error Handling
6. Code Examples
7. Troubleshooting

## 1. CLI Architecture
- The CLI is initiated via a shebang (`#!/usr/bin/env node`) at the top of the entry file.
- It uses modular design to separate command parsing, core logic, and error handling.
- Typical structure:
  - main.js: Entry point, argument parsing
  - commands/: Directory containing specific command modules
  - lib/: Utility functions

## 2. Argument Parsing
- Utilizes packages like Commander.js or Yargs for parsing.
- For Commander.js:
  - Method: `program.option(flags, description, [defaultValue])`
  - Example flags: `-n, --name <name>`
  - Return Type: A Command object
- Example API signature:
  ```js
  program.option(flag: string, description: string, defaultValue?: any) => Command
  ```

## 3. Execution Patterns
- Synchronous execution flow using try-catch blocks for error management.
- Asynchronous functions can be initiated using async/await if needed.
- Exit process with specific exit codes (0 for success, non-zero for error):
  ```js
  process.exit(0);
  process.exit(1);
  ```

## 4. Configuration Options
- Configuration can be handled via JSON or YAML files.
- Typical options include setting a default parameter value, enabling verbose logging, and specifying file paths.
- Example configuration in JSON:
  ```json
  {
    "name": "defaultUser",
    "verbose": true,
    "outputPath": "./dist"
  }
  ```

## 5. Error Handling
- Use structured error handling with meaningful error messages.
- Implementation example:
  ```js
  try {
    // main CLI execution code
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
  ```
- Best practice is to log errors to a file when in production mode.

## 6. Code Examples
- **Entry File (cli.js):**
  ```js
  #!/usr/bin/env node
  const { program } = require('commander');

  program
    .version('1.0.0')
    .option('-n, --name <name>', 'Specify the user name')
    .parse(process.argv);

  if (program.name) {
    console.log(`Hello, ${program.name}!`);
  } else {
    console.error('Name not provided. Use -n or --name to specify the user name.');
    process.exit(1);
  }
  ```

- **Modular Command Example (commands/greet.js):**
  ```js
  module.exports = {
    command: 'greet <name>',
    description: 'Greet the user by name',
    action: (name) => {
      console.log(`Greetings, ${name}!`);
    }
  };
  ```

## 7. Troubleshooting
- **Common Issue:** Missing shebang line leads to execution error.
  - **Solution:** Ensure `#!/usr/bin/env node` is the first line of the entry file.
- **Common Issue:** Incorrect flag definition may cause unparsed arguments.
  - **Solution:** Verify flag syntax and use of angle brackets `< >` for required arguments.
- **Command:** To test the CLI locally:
  ```bash
  node cli.js --name John
  ```
  Expected output: `Hello, John!`


## Attribution
- Source: Building CLI Tools with Node.js (RisingStack)
- URL: https://blog.risingstack.com/node-js-cli-tutorial/
- License: MIT
- Crawl Date: 2025-04-21T06:51:24.990Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-21
library/PDFKIT.md
# library/PDFKIT.md
# PDFKIT

## Crawl Summary
PDFKit is installed via npm and used by requiring 'pdfkit'. Create a document with new PDFDocument(), then pipe the output to a file or HTTP response. Key features include adding pages with customizable margins (using numbers, strings with units, or objects for specific sides), switching to previous pages with buffering (bufferPages option and methods like switchToPage and flushPages), setting default fonts, adding document metadata, and applying encryption and access privileges with options such as userPassword, ownerPassword, permissions, and specifying the PDF version for encryption method. PDF/A conformance is supported by specifying 'subset' along with proper PDF versions and tagging. Examples include code for text, images, vector graphics, and browser usage with blob-stream.

## Normalised Extract
## Table of Contents
1. Installation
2. Creating a Document
3. Using PDFKit in the Browser
4. Adding Pages
5. Switching Pages
6. Setting Default Font
7. Setting Document Metadata
8. Encryption and Access Privileges
9. PDF/A Conformance
10. Adding Content

---

### 1. Installation
- Command: `npm install pdfkit`

### 2. Creating a Document
- Method: `const doc = new PDFDocument();`
- Pipe to file: `doc.pipe(fs.createWriteStream('/path/to/file.pdf'));`
- Finalize: `doc.end();`

### 3. Using PDFKit in the Browser
- Require modules: `pdfkit` and `blob-stream`
- Sample:
```javascript
const PDFDocument = require('pdfkit');
const blobStream  = require('blob-stream');
const doc = new PDFDocument();
const stream = doc.pipe(blobStream());
// add content
 doc.end();
 stream.on('finish', () => {
   const blob = stream.toBlob('application/pdf');
   const url = stream.toBlobURL('application/pdf');
   iframe.src = url;
});
```

### 4. Adding Pages
- Default first page auto-added.
- Method: `doc.addPage({ options });`
- Margin options:
  - Single value (number or string): e.g. `doc.addPage({ margin: 50 });`
  - Object for sides: e.g. `{ margins: { top: 50, bottom: 50, left: 72, right: 72 } }`

### 5. Switching Pages
- Enable buffering: `new PDFDocument({ bufferPages: true })`
- Switch: `doc.switchToPage(pageNumber)`
- Flush: `doc.flushPages()`

### 6. Setting Default Font
- Option in constructor: `new PDFDocument({ font: 'Courier' })`

### 7. Setting Document Metadata
- Set `doc.info` or pass `info` on creation.
- Properties: Title, Author, Subject, Keywords, CreationDate, ModDate.

### 8. Encryption and Access Privileges
- Options in constructor:
```javascript
{
  userPassword: 'password',
  ownerPassword: 'password',
  permissions: {
    printing: 'highResolution',
    modifying: true,
    copying: true,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: true
  },
  pdfVersion: '1.7'
}
```

### 9. PDF/A Conformance
- Set subset option and ensure font embedding:
```javascript
const doc = new PDFDocument({
  subset: 'PDF/A-1a',
  pdfVersion: '1.4',
  tagged: true
});
```

### 10. Adding Content
- Examples include text, images, vector graphics, and annotations.
- Full code sample provided in the detailed digest shows chaining methods:
```javascript
// Text
 doc.font('fonts/PalatinoBold.ttf').fontSize(25).text('Some text with an embedded font!', 100, 100);
// Image
 doc.image('path/to/image.png', { fit: [250, 300], align: 'center', valign: 'center' });
// Vector graphics
 doc.addPage().fontSize(25).text('Here is some vector graphics...', 100, 100);
 doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill('#FF3300');
 // Transforms and SVG path
 doc.scale(0.6).translate(470, -380).path('M 250,75 L 323,301 131,161 369,161 177,301 z').fill('red', 'even-odd').restore();
// Annotations & link
 doc.addPage().fillColor('blue').text('Here is a link!', 100, 100).underline(100, 100, 160, 27, { color: '#0000FF' }).link(100, 100, 160, 27, 'http://google.com/');

 doc.end();
```

## Supplementary Details
### Parameter and Option Details

- Installation: Uses npm. Command: `npm install pdfkit`.
- PDFDocument Constructor Options:
  - font: string (default 'Helvetica'). Example: `{ font: 'Courier' }`.
  - bufferPages: boolean (enables page buffering). Example: `{ bufferPages: true }`.
  - margin: number or string (e.g., 50 or '2in' or '2em').
  - margins: object with keys top, right, bottom, left.
  - pdfVersion: string (allowed values: '1.3', '1.4', '1.5', '1.6', '1.7', '1.7ext3').
  - userPassword: string (for encryption).
  - ownerPassword: string (for encryption).
  - permissions: object. Keys: printing, modifying, copying, annotating, fillingForms, contentAccessibility, documentAssembly. Values: boolean or specific strings (e.g., 'lowResolution', 'highResolution').
  - subset: string (to enable PDF/A compliance, e.g., 'PDF/A-1', 'PDF/A-1a', 'PDF/A-1b', 'PDF/A-2', etc.).
  - tagged: boolean (for PDF/A accessibility).

### Implementation Steps
1. Create a new PDFDocument with desired options.
2. Pipe the output to a destination (e.g., file stream or blob-stream for browsers).
3. Add content using provided methods (text, image, vector graphics, annotations).
4. For multi-page documents, use `addPage()`, optionally handling margins and layout.
5. If necessary, enable buffering with `bufferPages: true`, and later switch pages using `switchToPage()` and finalize with `flushPages()`.
6. End the document with `doc.end()`, which flushes buffered pages if not already done.

### Configuration Options with Defaults and Effects
- Default font: 'Helvetica'.
- Default page size: letter.
- Default margin: 72 points (1 inch) on all sides if not specified.
- Encryption: Enabled by providing passwords and permissions; defaults to PDF version '1.3' if not set.
- PDF/A: Requires font embedding and tagged content; standard fonts might need replacement via registerFont().

## Reference Details
## API Specifications and Code Examples

### PDFDocument Constructor

Signature:

```javascript
new PDFDocument(options?: {
  size?: string | [number, number],        // e.g. 'letter' or [595.28, 841.89]
  layout?: 'portrait' | 'landscape',         // default: 'portrait'
  margin?: number | string,                  // single margin for all sides
  margins?: { top: number, bottom: number, left: number, right: number },
  font?: string,                             // default font name, e.g., 'Helvetica'
  bufferPages?: boolean,                     // if true, pages are buffered
  pdfVersion?: '1.3' | '1.4' | '1.5' | '1.6' | '1.7' | '1.7ext3',
  userPassword?: string,                     // for file encryption
  ownerPassword?: string,                    // for file encryption
  permissions?: {
    printing?: 'lowResolution' | 'highResolution',
    modifying?: boolean,
    copying?: boolean,
    annotating?: boolean,
    fillingForms?: boolean,
    contentAccessibility?: boolean,
    documentAssembly?: boolean
  },
  subset?: string,                           // PDF/A subset, e.g., 'PDF/A-1a'
  tagged?: boolean                           // for PDF/A compliance
}): PDFDocument
```

### Methods

- pipe(destination: WritableStream): WritableStream
- addPage(options?: { margin?: number | string, margins?: { top: number, right: number, bottom: number, left: number }, fontSize?: number }): PDFDocument
- switchToPage(pageNumber: number): void
- bufferedPageRange(): { start: number, count: number }
- flushPages(): void
- font(fontName: string): PDFDocument
- fontSize(size: number): PDFDocument
- text(text: string, x?: number, y?: number, options?: object): PDFDocument
- image(path: string, options?: { fit?: [number, number], align?: 'center' | 'left' | 'right', valign?: 'center' | 'top' | 'bottom' }): PDFDocument
- moveTo(x: number, y: number): PDFDocument
- lineTo(x: number, y: number): PDFDocument
- fill(color: string, rule?: string): PDFDocument
- save(): PDFDocument
- restore(): PDFDocument
- scale(x: number, y?: number): PDFDocument
- translate(x: number, y: number): PDFDocument
- path(d: string): PDFDocument
- underline(x: number, y: number, width: number, height: number, options?: { color: string }): PDFDocument
- link(x: number, y: number, width: number, height: number, url: string): PDFDocument
- end(): void

### Example Usage (Complete Code Sample)

```javascript
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document with encryption and custom font
const doc = new PDFDocument({
  font: 'Courier',
  bufferPages: true,
  pdfVersion: '1.7',
  userPassword: 'userpass',
  ownerPassword: 'ownerpass',
  permissions: {
    printing: 'highResolution',
    modifying: true,
    copying: true,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: true
  }
});

// Stream to a file
const stream = fs.createWriteStream('output.pdf');
doc.pipe(stream);

// Add text with an embedded font
 doc.font('fonts/PalatinoBold.ttf')
    .fontSize(25)
    .text('Some text with an embedded font!', 100, 100);

// Insert an image with constraints
 doc.image('path/to/image.png', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
 });

// Add a new page with vector graphics
 doc.addPage()
    .fontSize(25)
    .text('Here is some vector graphics...', 100, 100);

// Draw a triangle
 doc.save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill('#FF3300');

// Apply transforms and render an SVG path
 doc.scale(0.6)
    .translate(470, -380)
    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    .fill('red', 'even-odd')
    .restore();

// Add annotations and link
 doc.addPage()
    .fillColor('blue')
    .text('Here is a link!', 100, 100)
    .underline(100, 100, 160, 27, { color: '#0000FF' })
    .link(100, 100, 160, 27, 'http://google.com/');

// Finalize the PDF file
 doc.end();
```

### Troubleshooting Procedures

1. If Browserify fails to load built-in font data:
   - Ensure `brfs` is installed as a devDependency: `npm install brfs --save-dev`
   - Check the Browserify error message for misconfigured transforms.

2. If PDF output is not generated:
   - Confirm that the stream destination (file or blob) is correctly set up.
   - Verify that `doc.end()` is called to flush all buffers.
   - For buffered pages, confirm that `doc.flushPages()` or `doc.end()` triggers flushing.

3. Debugging encryption issues:
   - Test by providing only a userPassword and verify full access.
   - If using ownerPassword, confirm permissions are explicitly defined.
   - Use a PDF viewer that respects encryption settings.

This specification provides developers with complete and ready-to-use technical details for implementing PDFKit in Node or the browser.


## Original Source
PDFKit Documentation
https://pdfkit.org/docs/getting_started.html

## Digest of PDFKIT

# PDFKit Documentation Digest (Retrieved on 2023-10-05)

## Installation

To install PDFKit using npm:

```
npm install pdfkit
```

## Creating a Document

Include the PDFKit module and create an instance of PDFDocument:

```javascript
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();
```

PDFDocument instances are readable Node streams. You can pipe them to writable streams (e.g., file or HTTP response) and call the `end()` method to finalize the PDF:

```javascript
doc.pipe(fs.createWriteStream('/path/to/file.pdf')); // write to PDF
// For HTTP response:
doc.pipe(res);
// Add content to PDF using the methods below

// finalize the PDF and end the stream
doc.end();
```

## Using PDFKit in the Browser

In the browser you have two main methods:

1. Using Browserify/Webpack
2. Using a standalone script

To generate a Blob from a PDFDocument, pipe the document to a blob-stream:

```javascript
const PDFDocument = require('pdfkit');
const blobStream  = require('blob-stream');

const doc = new PDFDocument();
const stream = doc.pipe(blobStream());

// Add content

// Finalize document
 doc.end();
 stream.on('finish', function() {
   const blob = stream.toBlob('application/pdf');
   const url = stream.toBlobURL('application/pdf');
   iframe.src = url;
 });
```

**Note:** When using Browserify, you must install the `brfs` module to load built-in font data.

## Adding Pages

A new PDFDocument comes with a first page automatically (unless `autoFirstPage: false` is supplied). Subsequent pages can be added:

```javascript
doc.addPage();
```

You can add content on every new page using the `pageAdded` event:

```javascript
doc.on('pageAdded', () => doc.text("Page Title"));
```

Options for pages include setting the size as an array (in points) or a predefined size (default is letter), orientation (portrait or landscape), and margins. Margins can be set as a single number, string with units (e.g. '2in', '2em') or as an object:

```javascript
// 50 point margin on all sides
 doc.addPage({ margin: 50 });

// 2 inch margin on all sides
 doc.addPage({ margin: '2in' });

// 2em margin using the font size
 doc.addPage({ fontSize: 14, margin: '2em' });

// Different margins on each side
 doc.addPage({
   margins: { top: 50, bottom: 50, left: 72, right: 72 }
 });
```

## Switching to Previous Pages

In buffered pages mode (enabled with `bufferPages: true` in the constructor), you can switch to previous pages using `doc.switchToPage(pageNumber)` and flush them with `doc.flushPages()`:

```javascript
const doc = new PDFDocument({ bufferPages: true });
// ... add pages
const range = doc.bufferedPageRange(); // returns { start: 0, count: n }

for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  doc.text(`Page ${i + 1} of ${range.count}`);
}

doc.flushPages();
// Alternatively, calling doc.end() will flush pages automatically
 doc.end();
```

## Setting Default Font

The default font is Helvetica. To use a different font (e.g. Courier):

```javascript
const doc = new PDFDocument({ font: 'Courier' });
```

## Setting Document Metadata

Metadata properties can be set in the `doc.info` object or passed as an `info` option during instantiation. Allowed properties include:

- Title
- Author
- Subject
- Keywords
- CreationDate (auto-set by PDFKit)
- ModDate

Example:

```javascript
doc.info = {
  Title: 'My Document',
  Author: 'Author Name',
  Subject: 'PDFKit Guide',
  Keywords: 'pdf, javascript, pdfkit'
};
```

## Encryption and Access Privileges

Encryption can be enabled by providing a `userPassword` and/or `ownerPassword` as well as permission options during the PDFDocument creation. Allowed permission settings include:

- printing: 'lowResolution' or 'highResolution'
- modifying: true
- copying: true
- annotating: true
- fillingForms: true
- contentAccessibility: true
- documentAssembly: true

Specify the PDF version to choose the desired encryption method. Available versions and their encryption methods:

- '1.3' (default) - 40-bit RC4
- '1.4' - 128-bit RC4
- '1.5' - 128-bit RC4
- '1.6' - 128-bit AES
- '1.7' - 128-bit AES
- '1.7ext3' - 256-bit AES

Example:

```javascript
const doc = new PDFDocument({
  userPassword: 'userpass',
  ownerPassword: 'ownerpass',
  permissions: {
    printing: 'highResolution',
    modifying: true,
    copying: true,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: true
  },
  pdfVersion: '1.7'
});
```

## PDF/A Conformance

To create PDF/A documents, pass the `subset` option to the PDFDocument constructor. For example:

- PDF/A-1b: use `subset: 'PDF/A-1'` or `'PDF/A-1b'` (requires at least PDF version 1.4 and embedding fonts)
- PDF/A-1a: use `subset: 'PDF/A-1a'` (tagged set to true is required)
- PDF/A-2 and PDF/A-3 variants require at least PDF version 1.7

Example for PDF/A-1a:

```javascript
const doc = new PDFDocument({
  subset: 'PDF/A-1a',
  pdfVersion: '1.4',
  tagged: true
});
```

**Important:** For PDF/A, fonts must be embedded using `registerFont()` with embeddable font files (e.g. .ttf).

## Adding Content

After creating a PDFDocument instance, various types of content can be added including text, images, and vector graphics. For example:

```javascript
// Text with embedded font
 doc.font('fonts/PalatinoBold.ttf')
   .fontSize(25)
   .text('Some text with an embedded font!', 100, 100);

// Image with constraints
 doc.image('path/to/image.png', {
   fit: [250, 300],
   align: 'center',
   valign: 'center'
 });

// Adding a new page and vector graphics
 doc.addPage()
   .fontSize(25)
   .text('Here is some vector graphics...', 100, 100);

// Draw a triangle
 doc.save()
   .moveTo(100, 150)
   .lineTo(100, 250)
   .lineTo(200, 250)
   .fill('#FF3300');

// Apply transforms and render an SVG path
 doc.scale(0.6)
   .translate(470, -380)
   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
   .fill('red', 'even-odd')
   .restore();

// Adding text with annotations and links
 doc.addPage()
   .fillColor('blue')
   .text('Here is a link!', 100, 100)
   .underline(100, 100, 160, 27, { color: '#0000FF' })
   .link(100, 100, 160, 27, 'http://google.com/');

// Finalize the document
 doc.end();
```


## Attribution
- Source: PDFKit Documentation
- URL: https://pdfkit.org/docs/getting_started.html
- License: MIT
- Crawl Date: 2025-04-20T19:46:10.474Z
- Data Size: 922356 bytes
- Links Found: 954

## Retrieved
2025-04-20
library/REGEX_GUIDE.md
# library/REGEX_GUIDE.md
# REGEX_GUIDE

## Crawl Summary
The technical details cover JavaScript regular expressions: creation via literal and constructor, writing patterns with simple and special characters, escaping rules, usage of capturing groups, detailed method signatures for exec(), test(), match(), matchAll(), replace(), split(), and the behavior of each. It also documents regex flags (d, g, i, m, s, u, v, y) with examples and provides a full code example for phone number validation along with configuration details.

## Normalised Extract
# Table of Contents

1. Creating a Regular Expression
2. Writing a Regular Expression Pattern
3. Special Characters and Escaping
4. Capturing Groups and Parentheses
5. Regular Expression Methods and Signatures
6. Regex Flags and Their Effects
7. Phone Number Validation Example
8. Tools and Resources

---

## 1. Creating a Regular Expression

- **Literal**: `const re = /ab+c/;`
- **Constructor**: `const re = new RegExp("ab+c");`

## 2. Writing a Regular Expression Pattern

- Simple: `/abc/` matches "abc"
- Complex: `/ab*c/` matches 'a' followed by 0+ 'b's then 'c'
- Example with Group: `/Chapter (\d+)\.\d*/`

## 3. Special Characters and Escaping

- Use backslash to escape special characters. Example:
  - To match `a*b`: `/a\*b/` or `new RegExp("a\\*b")`
  - For literal slash: `/\/example\/[a-z]+/i`
  - For a backslash: `/[A-Z]:\\/`

## 4. Capturing Groups and Parentheses

- Parentheses capture submatches:

```js
const myRe = /d(b+)d/g;
const myArray = myRe.exec("cdbbdbsbz");
// Returns: ['dbbd', 'bb', index: 1, input: 'cdbbdbsbz']
```

## 5. Regular Expression Methods and Signatures

- `exec(str: string): RegExpExecArray | null`
- `test(str: string): boolean`
- `match(regexp: RegExp): (string[] | null)`
- `matchAll(regexp: RegExp): IterableIterator<RegExpExecArray>`
- `search(regexp: RegExp): number`
- `replace(searchValue, replaceValue): string`
- `split(separator: RegExp | string, limit?: number): string[]`

## 6. Regex Flags and Their Effects

| Flag | Description | Property |
|------|-------------|----------|
| d    | Generate indices | hasIndices |
| g    | Global search | global |
| i    | Case-insensitive | ignoreCase |
| m    | Multiline (^ and $ for each line) | multiline |
| s    | Dot matches newline | dotAll |
| u    | Unicode mode | unicode |
| v    | Enhanced Unicode | unicodeSets |
| y    | Sticky search | sticky |

Example: `const re = /pattern/gi;`

## 7. Phone Number Validation Example

### HTML

```html
<p>
  Enter your phone number (with area code) and then click "Check".
  <br />
  Format: ###-###-####
</p>
<form id="form">
  <input id="phone" />
  <button type="submit">Check</button>
</form>
<p id="output"></p>
```

### JavaScript

```js
const form = document.querySelector("#form");
const input = document.querySelector("#phone");
const output = document.querySelector("#output");

// Regex breakdown:
// ^ : Start of line
// (?:\d{3}|\(\d{3}\)) : Three digits or (three digits)
// ([-/.]) : Separator captured
// \d{3} : Three digits
// \1 : Same separator
// \d{4} : Four digits
// $ : End of line
const re = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/;

function testInfo(phoneInput) {
  const ok = re.exec(phoneInput.value);
  output.textContent = ok
    ? `Thanks, your phone number is ${ok[0]}`
    : `${phoneInput.value} isn't a phone number with area code!`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  testInfo(input);
});
```

## 8. Tools and Resources

- RegExr
- Regex Tester
- Regex Interactive Tutorial
- Regex Visualizer


## Supplementary Details
### Technical Specifications and Implementation Details

1. **Creation Methods**:
   - **Literal Notation**: Automatically compiled on script load. Best when regex is constant.
   - **Constructor Function**: Allows dynamic regex creation. Ensure proper escaping in string literals (e.g., `\\` for a literal backslash).

2. **Flags Configuration**:
   - Default flag settings are off unless specified in the regex literal or constructor.
   - Flags are immutable once the RegExp object is created.
   - Example: `/\w+ /g` vs. `new RegExp("\\w+ ", "g")`

3. **Pattern Writing**:
   - Use parentheses `()` to group parts of the expression and capture submatches.
   - Use non-capturing groups `(?:...)` when the match need not be stored.
   - For matching literal characters that are normally special, always precede with a backslash.

4. **Implementation Steps for Validation**:
   - Define HTML input and output elements.
   - Create a RegExp object with precise control over expected patterns and flags.
   - Attach event listeners to the form to process input on submission and use `exec()` for match retrieval.
   - Use the captured match (if any) for processing (e.g., display the validated number).

5. **Troubleshooting**:
   - Use `console.log()` to output the result of `exec()` for debugging.
   - Verify flag usage: Global (`g`) flag may affect the `lastIndex` of the RegExp object.
   - Ensure proper escaping of special characters especially when using the RegExp constructor.
   - Use online tools like RegExr to visually test patterns and isolate issues.

6. **Best Practices**:
   - Always assign regex literals to variables if you plan to inspect properties like `lastIndex`.
   - Avoid creating multiple instances of regex patterns unnecessarily, as properties may differ between instances.
   - Use the appropriate method (`exec`, `test`, `match`) based on whether you require detailed match info or simple boolean checks.


## Reference Details
### Complete API Specifications and Code Examples

1. **RegExp Object Creation**
   - **Literal Notation**:
     - Syntax: `/pattern/flags`
     - Example: `const re = /ab+c/;`
     - Behavior: Compiled at load time, faster if constant.

   - **Constructor Function**:
     - Syntax: `new RegExp(pattern: string, flags?: string)`
     - Example: `const re = new RegExp("ab+c", "g");`
     - Note: Remember to escape backslashes (e.g., "\\d" for digit).

2. **RegExp Methods**

   - **exec()**:
     - Signature: `exec(str: string): RegExpExecArray | null`
     - Returns: An array containing the full match, captured groups, and additional properties (`index` and `input`), or `null` if no match.
     - Example:
       ```js
       const myRe = /d(b+)d/g;
       const myArray = myRe.exec("cdbbdbsbz");
       // Output: ['dbbd', 'bb', index: 1, input: 'cdbbdbsbz']
       ```

   - **test()**:
     - Signature: `test(str: string): boolean`
     - Returns: `true` if there is a match, otherwise `false`.
     - Example:
       ```js
       const re = /abc/;
       console.log(re.test("abcdef")); // true
       ```

   - **match()**:
     - Signature: `match(regexp: RegExp): string[] | null`
     - Returns: An array of matches or `null` if no match is found.
     - Example:
       ```js
       const str = "fee fi fo fum";
       console.log(str.match(/\w+ /g)); // ['fee ', 'fi ', 'fo ']
       ```

   - **matchAll()**:
     - Signature: `matchAll(regexp: RegExp): IterableIterator<RegExpExecArray>`
     - Returns: An iterator for all matches, including capturing groups.

   - **search()**:
     - Signature: `search(regexp: RegExp): number`
     - Returns: The index of the first match, or `-1` if not found.

   - **replace() / replaceAll()**:
     - Signature: `replace(searchValue: string | RegExp, replaceValue: string | ((...args: any[]) => string)): string`
     - Use: To replace found patterns with a replacement string or function result.

   - **split()**:
     - Signature: `split(separator: RegExp | string, limit?: number): string[]`
     - Use: To divide a string into an array based on the separator.

3. **Flags and Options**

   - **Flags**: 'g', 'i', 'm', 's', 'u', 'y', 'd', 'v'
   - **Example**:
     ```js
     const re = /pattern/gi; // Global, case-insensitive
     ```
   - **Effects**:
     - `g`: Searches entire string, affects `lastIndex` property in iterative methods.
     - `i`: Case-insensitive matching.
     - `m`: `^` and `$` match start/end of any line in a multiline string.
     - `s`: Dot (`.`) matches newline characters.
     - `u`: Treat pattern as a sequence of Unicode code points.
     - `y`: Sticky match starting exactly at `lastIndex`.

4. **Detailed Troubleshooting Procedures**

   - **Debugging `lastIndex` Issues**:
     - When using `/pattern/g`, log `re.lastIndex` to see where the next match will start.
     - Example:
       ```js
       const re = /d(b+)d/g;
       let match;
       while((match = re.exec("cdbbdbsbz")) !== null) {
         console.log(`Found match at index ${match.index} with lastIndex ${re.lastIndex}`);
       }
       ```

   - **Escaping Problems**:
     - If a regex literal is terminated prematurely, check for unescaped `/` characters.
     - For constructor usage, double escape: `new RegExp("\\d{3}")` for `\d{3}`.

   - **Validation Test Cases**:
     - Use test strings to ensure patterns match exactly:
       ```js
       // Phone number example
       const re = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/;
       console.log(re.test("123-456-7890")); // true
       console.log(re.test("(123)456-7890")); // true
       console.log(re.test("1234567890")); // false
       ```

5. **Concrete Best Practices**

   - Always define regex variables to reuse and inspect properties.
   - Use non-capturing groups when you do not need to retain match data.
   - Validate input using the most appropriate method (`test` for boolean results, `exec` for detailed matches).
   - Utilize online regex testers for rapid prototyping and debugging before deployment.

This comprehensive specification provides developers with all the necessary details to implement and troubleshoot JavaScript regular expressions directly in their projects.

## Original Source
MDN Regular Expressions
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

## Digest of REGEX_GUIDE

# REGEX GUIDE DOCUMENT

**Retrieved on:** 2023-10-08

# 1. Creating a Regular Expression

There are two distinct methods to create a regular expression in JavaScript:

- **Literal Notation**: Compiled at script load time. Example:

```js
const re = /ab+c/;
```

- **Constructor Notation**: Compiled at runtime. Example:

```js
const re = new RegExp("ab+c");
```

# 2. Writing a Regular Expression Pattern

Patterns combine simple characters and special characters:

- **Simple Pattern**: `/abc/` matches the substring "abc" exactly.
- **Complex Pattern**: `/ab*c/` matches an 'a' followed by zero or more 'b's then a 'c'.
- **Example with Groups**: `/Chapter (\d+)\.\d*/` uses parentheses to capture digits.

# 3. Special Characters and Escaping

- **Special Characters**: Characters like `*`, `.`, `?`, `+` have special meanings.
- **Escaping**: Use a backslash to treat special characters as literals. Examples:
  - Matching `a*b`:
    - Literal: `/a\*b/`
    - Constructor: `new RegExp("a\\*b")`
  - Matching a literal slash `/` in a pattern: `/\/example\/[a-z]+/i`
  - Matching a literal backslash: `/[A-Z]:\\/`

# 4. Parentheses and Capturing Groups

Parentheses () not only group sub-patterns but also capture parts of the match for later use.

Example:

```js
const myRe = /d(b+)d/g;
const myArray = myRe.exec("cdbbdbsbz");
// myArray => ['dbbd', 'bb', index: 1, input: 'cdbbdbsbz']
```

# 5. RegExp Methods and Their Behaviors

**Method Signatures and Descriptions:**

- **exec()**: Searches for a match in a string.
  - **Signature**: `RegExp.prototype.exec(str: string): RegExpExecArray | null`
  - **Example**:
    ```js
    const myRe = /d(b+)d/g;
    const myArray = myRe.exec("cdbbdbsbz");
    ```

- **test()**: Tests for a match, returns boolean.
  - **Signature**: `RegExp.prototype.test(str: string): boolean`

- **match()**: Returns an array containing all matches or null.
  - **Signature**: `String.prototype.match(regexp: RegExp): (string | null)[] | null`

- **matchAll()**: Returns an iterator over all matches.
  - **Signature**: `String.prototype.matchAll(regexp: RegExp): IterableIterator<RegExpExecArray>`

- **search()**: Returns the index where the match is found or -1.
  - **Signature**: `String.prototype.search(regexp: RegExp): number`

- **replace() / replaceAll()**: Replace matched substring(s) with a replacement string.
  - **Signature**: `String.prototype.replace(regexp: RegExp|string, newSubStr: string|((...args: any[]) => string)): string`

- **split()**: Splits a string by a regular expression or fixed string.
  - **Signature**: `String.prototype.split(separator: RegExp|string, limit?: number): string[]`

# 6. Flags and Their Descriptions

Flags modify regex behavior. They are included as part of the regex literal or constructor:

| Flag | Description | Property |
|------|-------------|----------|
| d    | Generate indices for substring matches | hasIndices |
| g    | Global search | global |
| i    | Case-insensitive search | ignoreCase |
| m    | Multiline search (each line treated separately for ^ and $) | multiline |
| s    | Allows . to match newline characters | dotAll |
| u    | Unicode; treat pattern as Unicode code points | unicode |
| v    | UnicodeSets upgrade | unicodeSets |
| y    | Sticky search; match starting at current position | sticky |

Example using flags:

```js
const re = /pattern/gi;
// or
const re = new RegExp("pattern", "gi");
```

# 7. Code Example: Phone Number Validation

**HTML:**

```html
<p>
  Enter your phone number (with area code) and then click "Check".
  <br />
  The expected format is like ###-###-####.
</p>
<form id="form">
  <input id="phone" />
  <button type="submit">Check</button>
</form>
<p id="output"></p>
```

**JavaScript:**

```js
const form = document.querySelector("#form");
const input = document.querySelector("#phone");
const output = document.querySelector("#output");

// The regular expression:
// ^ asserts start of line
// (?:\d{3}|\(\d{3}\)) matches 3 digits or (3 digits) WITHOUT capturing
// ([-/.]) capturing group for dash, slash, or dot
// \d{3} matches 3 digits
// \1 matches the same separator as captured
// \d{4} matches four digits
// $ asserts end of line
const re = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/;

function testInfo(phoneInput) {
  const ok = re.exec(phoneInput.value);
  output.textContent = ok
    ? `Thanks, your phone number is ${ok[0]}`
    : `${phoneInput.value} isn't a phone number with area code!`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  testInfo(input);
});
```

# 8. Additional Tools & Resources

- **RegExr**: Online tool for building and testing regex patterns.
- **Regex Tester**: Live testing and debugging of regex patterns.

# Attribution

Content extracted from MDN Regular Expressions guide.
Data Size: 3606244 bytes, Links: 36114


## Attribution
- Source: MDN Regular Expressions
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
- License: CC BY-SA 2.5
- Crawl Date: 2025-04-21T03:54:28.902Z
- Data Size: 3606244 bytes
- Links Found: 36114

## Retrieved
2025-04-21
library/YARGS_DOC.md
# library/YARGS_DOC.md
# YARGS_DOC

## Crawl Summary
Overview: Yargs is a Node.js command line parser offering dynamic help, command grouping, and bash completion. Installation via npm is required. Primary usage involves initializing yargs, setting a script name, usage pattern, and defining commands with positional arguments, defaults, and types. Examples include a basic command ('hello') with a default parameter, dual module support for CommonJS and ESM, and experimental support for Deno. Technical specifics include TypeScript integration with compilation through Rollup to generate both ESM and CommonJS bundles, conditional exports, and removal of deprecated helpers.

## Normalised Extract
# Table of Contents
1. Overview
2. Installation
3. Getting Started
4. Command Execution
5. Dual Module Support
   - CommonJS
   - ESM
6. Deno Support
7. Additional Details

## 1. Overview
- Build interactive CLI tools
- Parse command line arguments
- Dynamic help and bash-completion

## 2. Installation
Command:
```
$ npm install --save yargs
```

## 3. Getting Started
Example file (example.js):
```javascript
#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs()
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    return yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    });
  }, (argv) => {
    console.log('hello', argv.name, 'welcome to yargs!');
  })
  .help()
  .parse(hideBin(process.argv));
```

## 4. Command Execution
To test the command:
```
$ node example.js hello --name Parrot
```
Expected Output:
```
hello Parrot welcome to yargs!
```

## 5. Dual Module Support
### CommonJS Example
```javascript
const { argv } = require('yargs');

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}
```

### ESM Example
```javascript
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv);
  })
  .demandCommand(1)
  .argv;
```

## 6. Deno Support (Experimental)
```javascript
import yargs from 'https://deno.land/x/yargs/deno.ts';
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts';

yargs()
  .command('download <files...>', 'download a list of files', (yargs: YargsType) => {
    return yargs.positional('files', {
      describe: 'a list of files to do something with'
    });
  }, (argv: Arguments) => {
    console.info(argv);
  })
  .strictCommands()
  .demandCommand(1)
  .parse(Deno.args);
```

## 7. Additional Details
- **TypeScript**: Written in TypeScript with a dual bundle process (ESM via TypeScript compilation and CommonJS via Rollup).
- **Configuration**: Use `.scriptName()`, `.usage()`, and `.command()` to configure your CLI.
- **Defaults and Types**: Positional parameters define type (e.g., string), default value (e.g., 'Cambi'), and description.
- **Breaking Changes**: Removal of deep import support and deprecated helpers.


## Supplementary Details
## Yargs Supplementary Technical Specifications

- **Installation Command:**
  - npm install --save yargs

- **CLI Initialization:**
  - Method: yargs()
  - Chainable methods include:
    - .scriptName(name: string): Sets the command alias.
    - .usage(usage: string): Defines the usage pattern. e.g., '$0 <cmd> [args]'.
    - .command(command: string, description: string, [builder], [handler]): Defines a command with a builder function to specify options.
    - .help(): Enables the help command.
    - .parse(args: string[]): Parses command line arguments.
    
- **Builder Function Details:**
  - Use yargs.positional(name, { type: 'string', default: 'Cambi', describe: 'the name to say hello to' }) to set parameter details.

- **Conditional Exports:**
  - Yargs now supports both CommonJS and ESM via Node.js conditional exports. No deep file imports permitted.

- **TypeScript & Rollup:**
  - The library is compiled to ESM using TypeScript compiler, and a secondary Rollup step generates the CommonJS bundle.
  - No shipped type declaration files; install @types/yargs separately.

- **Deno Experimental Support:**
  - Usage is similar to Node.js but leverages Deno.args and imports from Deno-hosted URLs.


## Reference Details
## Yargs API and SDK Reference

### 1. Core API Methods:

- yargs()
  - Returns: Yargs instance
  - Chainable methods:
    - scriptName(name: string): Yargs
    - usage(usage: string): Yargs
    - command(command: string, description: string, builder?: (yargs: Yargs.Argv) => Yargs.Argv, handler?: (argv: any) => void): Yargs
    - help(): Yargs
    - parse(args?: string[]): any

### 2. Example Code (ESM):

```javascript
#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Setup the CLI with a custom script name, usage, and a command

yargs(hideBin(process.argv))
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command(
    'hello [name]', 
    'welcome ter yargs!', 
    (yargs) => {
      return yargs.positional('name', {
        type: 'string',
        default: 'Cambi',
        describe: 'the name to say hello to'
      });
    }, 
    (argv) => {
      // Handler: Print a greeting message
      console.log('hello', argv.name, 'welcome to yargs!');
    }
  )
  .help()
  .parse();
```

### 3. CommonJS Example:

```javascript
const { argv } = require('yargs');

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}
```

### 4. Deno Example (Experimental):

```javascript
import yargs from 'https://deno.land/x/yargs/deno.ts';
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts';

yargs()
  .command(
    'download <files...>', 
    'download a list of files', 
    (yargs: YargsType) => {
      return yargs.positional('files', {
        describe: 'a list of files to do something with'
      });
    }, 
    (argv: Arguments) => {
      console.info(argv);
    }
  )
  .strictCommands()
  .demandCommand(1)
  .parse(Deno.args);
```

### 5. Configuration Options and Best Practices

- Always set a script name and usage for clarity.
- Use builder functions to enforce type safety on arguments.
- For TypeScript projects, install `@types/yargs` and configure your build to handle both ESM and CommonJS outputs.
- In troubleshooting, run the CLI with `--help` to verify expected command definitions:

Command:
```
$ node example.js --help
```
Expected Output:
```
pirate-parser <cmd> [args]
Commands:
  pirate-parser hello [name]  welcome ter yargs!
Options:
  --help  Show help  [boolean]
```

### 6. Troubleshooting Procedures

- If commands do not display correctly, verify the builder function syntax and positional configuration.
- Ensure you use `hideBin(process.argv)` in ESM setups.
- For module resolution issues, check if the Node.js version supports conditional exports (Node 10+ recommended).
- For Deno, verify that the Deno runtime has network access to load modules.


## Original Source
Yargs Documentation
https://yargs.js.org/docs/

## Digest of YARGS_DOC

# YARGS DOCUMENTATION

Retrieved on: 2023-10-11

## Overview

Yargs is a Node.js library that helps in building interactive command line tools by parsing arguments and generating an elegant user interface. It provides commands, grouped options, dynamically generated help menus, and bash-completion shortcuts.

## Installation

To install yargs, run the following command in your terminal:

```
$ npm install --save yargs
```

## Getting Started

Create a file (e.g., example.js) with the following code:

```javascript
#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Initialize yargs and configure the command line interface

yargs()
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    return yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    });
  }, (argv) => {
    console.log('hello', argv.name, 'welcome to yargs!');
  })
  .help()
  .parse(hideBin(process.argv));
```

Run the following command to view help:

```
$ node example.js --help
```

This will output:

```
pirate-parser <cmd> [args]

Commands:
  pirate-parser hello [name]  welcome ter yargs!

Options:
  --help  Show help  [boolean]
```

## Command Execution

Example of running the hello command:

```
$ node example.js hello --name Parrot
```

Expected output:

```
hello Parrot welcome to yargs!
```

## Dual Module Support

### CommonJS Example:

```javascript
const { argv } = require('yargs');

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}
```

### ESM Example:

```javascript
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv);
  })
  .demandCommand(1)
  .argv;
```

## Deno Support (Experimental)

```javascript
import yargs from 'https://deno.land/x/yargs/deno.ts';
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts';

yargs()
  .command('download <files...>', 'download a list of files', (yargs: YargsType) => {
    return yargs.positional('files', {
      describe: 'a list of files to do something with'
    });
  }, (argv: Arguments) => {
    console.info(argv);
  })
  .strictCommands()
  .demandCommand(1)
  .parse(Deno.args);
```

## Additional Technical Details

- **TypeScript Conversion**: yargs is written in TypeScript and supports both ESM and CommonJS modules using Node.js conditional exports. Type declaration files are not shipped, so TypeScript users need to install `@types/yargs` separately.
- **Conditional Exports**: The exported files are explicitly defined; deep file imports (e.g., `lib/utils/obj-filter.js`) are not allowed.
- **Breaking Changes**: Removal of the `rebase` helper and dropping support for Node 8.

## Attribution

Data Size: 348060 bytes
Links Found: 34
No errors detected.


## Attribution
- Source: Yargs Documentation
- URL: https://yargs.js.org/docs/
- License: MIT
- Crawl Date: 2025-04-20T20:46:49.922Z
- Data Size: 348060 bytes
- Links Found: 34

## Retrieved
2025-04-20
library/JQ_MANUAL.md
# library/JQ_MANUAL.md
# JQ_MANUAL

## Crawl Summary
The crawled data from https://stedolan.github.io/jq/manual/ returned Data Size: 0 bytes with no additional links or content. The technical extraction relies on known jq specifications and the structure inferred from the official manual.

## Normalised Extract
## Table of Contents
1. Introduction
2. Filter Syntax
3. Built-in Functions
4. Command-Line Options
5. Code Examples
6. Troubleshooting

### 1. Introduction
- jq is a command-line JSON processor. Usage: `jq [OPTIONS] FILTER [FILE...]`.

### 2. Filter Syntax
- Identity: `.` returns the input as-is.
- Object Access: `.key` accesses the field 'key' in a JSON object.
- Array Slicing: `.[start:end]` extracts an array subset.
- Chaining: `filter1 | filter2` pipes the output of one filter to the next.
- Assignment: `|=` updates a value within the structure.

### 3. Built-in Functions
- `length`: Returns the length (number of elements in an array or characters in a string).
- `keys`: Returns a sorted array of the keys in an object.
- `add`: Aggregates numbers in an array (e.g., sums up values).

### 4. Command-Line Options
- `--raw-output, -r`: Prints output as raw strings.
- `--slurp, -s`: Aggregates all input JSON objects into one array.
- `--compact-output, -c`: Minimizes the output by reducing whitespace.
- `--null-input, -n`: Provides null input when no file is specified.
- `--arg <name> <value>`: Defines a string variable for use in filters.
- `--argjson <name> <value>`: Defines a JSON variable for use in filters.
- `--exit-status`: Sets a non-zero exit status if the final output is false.

### 5. Code Examples
```bash
# Example 1: Basic JSON output
jq . input.json

# Example 2: Extracting a nested field
jq '.foo | .bar' input.json

# Example 3: Using argument insertion in filters
jq --arg username "test_user" '.users[] | select(.name == $username)' input.json
```

### 6. Troubleshooting
- **Syntax Validation:** Run `jq . input.json` to check JSON formatting.
- **Debugging Filters:** If encountering errors, try using available debug options such as `--debug` (if supported) to trace filter execution.
- **Segmentation Faults:** Validate the input data, compile with debugging symbols, and use gdb for detailed analysis.


## Supplementary Details
### Technical Specifications and Implementation Details

- **Filter Parsing:**
  - Filters are parsed using recursive descent parser.
  - The AST (Abstract Syntax Tree) is generated to evaluate the filter against JSON tokens.

- **Input Processing:**
  - By default, jq reads input JSON line-by-line unless the `--slurp` option is used, which aggregates the entire input into one array.
  - The `--null-input` option allows execution without any input file, using a `null` value.

- **Configuration Options (Defaults and Effects):
  - `--raw-output (-r)`: OFF by default; when enabled, outputs raw strings.
  - `--compact-output (-c)`: OFF by default; when enabled, minimizes whitespace.
  - `--slurp (-s)`: OFF by default; when enabled, reads all inputs into a single array.
  - `--exit-status`: Causes the exit status to be non-zero if the filter’s final value is false.
  - `--arg name value` & `--argjson name value`: Used to pass external variables to the filter with explicit type definitions.

- **Best Practices:
  - Chain filters using `|` for modular processing.
  - Use parentheses to enforce precedence in complex filters.
  - Validate JSON input before applying jq filters.
  - Utilize `--slurp` for bulk processing of multiple JSON objects.

- **Troubleshooting Steps:
  1. Validate JSON with `jq . filename` to ensure it is well-formed.
  2. Test filter expressions on small JSON samples.
  3. Invoke `jq --debug` (if available) to output internal processing details.
  4. Check return codes from filter compilation and execution: 0 for success, non-zero for errors.


## Reference Details
### Complete API Specifications and Implementation Patterns

#### Command-Line Invocation:
```
jq [OPTIONS] FILTER [FILE...]
```
Options:
- `--raw-output, -r`: Outputs raw strings instead of JSON formatted output.
- `--slurp, -s`: Reads all input JSON objects into one array.
- `--compact-output, -c`: Produces minimized JSON output (no extra whitespace).
- `--null-input, -n`: Executes the filter with `null` as the input when no file is provided.
- `--arg <name> <value>`: Declares a variable for use in the jq filter with a string value.
- `--argjson <name> <value>`: Declares a variable for use in the jq filter with a JSON value.
- `--exit-status`: Sets exit status based on the final result of the filter.

#### Hypothetical libjq API (for embedding jq in C applications):

// Initializes the jq processing state. Returns a pointer to jq_state.
jq_state* jq_init(void);

// Compiles the specified filter string into an internal representation.
// Returns 0 on success, non-zero on failure.
int jq_compile(jq_state *state, const char *filter) __attribute__((nonnull));

// Sets a string variable for filter processing.
// Returns 0 on success.
int jq_set_arg(jq_state *state, const char *var_name, const char *value) __attribute__((nonnull));

// Processes the given JSON input and returns a linked list of results.
// The caller is responsible for freeing the results; returns NULL in case of error.
jq_result* jq_process_input(jq_state *state, JSON_VALUE *input);

// Cleans up and frees the jq processing state.
void jq_teardown(jq_state *state);

#### Code Example (C Usage):
/*
#include <stdio.h>
#include "jq.h"

int main(int argc, char *argv[]) {
    jq_state *state = jq_init();
    if (jq_compile(state, ".foo | .bar") != 0) {
        fprintf(stderr, "Filter compilation error\n");
        return 1;
    }
    // Setting a variable for the filter
    jq_set_arg(state, "username", "test_user");
    JSON_VALUE *input = parse_json_from_file("input.json");
    jq_result *results = jq_process_input(state, input);
    for (jq_result *res = results; res; res = res->next) {
        char *output = json_serialize(res->value);
        printf("%s\n", output);
        free(output);
    }
    jq_teardown(state);
    return 0;
}
*/

#### Troubleshooting Procedures:
1. Run `jq --debug FILTER FILE` to obtain detailed debug output (if supported by the jq build).
2. Check the return value from `jq_compile`:
   - 0 indicates success.
   - Non-zero indicates a syntax or compilation error.
3. Validate JSON input externally using tools such as `jsonlint`.
4. For segmentation faults, compile your application with debugging symbols and use gdb to perform a backtrace.

#### Return Types & Error Handling:
- jq_compile: Returns 0 on success, non-zero on error (with error messages output to stderr).
- jq_process_input: Returns a linked list (jq_result*), which must be freed by the caller. Returns NULL on processing error.
- Exceptions are managed via error codes and stderr output, with the command-line tool returning a non-zero exit status on failure.


## Original Source
jq Manual
https://stedolan.github.io/jq/manual/

## Digest of JQ_MANUAL

# jq Manual Documentation

**Retrieved on:** 2023-10-11

## Overview
The jq manual provides technical details for the jq command-line JSON processor. It covers filter syntax, built-in functions, command-line options, and troubleshooting procedures.

## Table of Contents
1. Introduction
2. Filter Syntax
3. Built-in Functions
4. Command-Line Options
5. Code Examples
6. Troubleshooting

## 1. Introduction
- jq is a lightweight and flexible command-line JSON processor.
- **Usage:** `jq [OPTIONS] FILTER [FILE...]`

## 2. Filter Syntax
- **Identity Filter:** `.` returns the input unchanged.
- **Object Field Access:** `.key` accesses the value for the key "key" in an object.
- **Array Slicing:** `.[start:end]` extracts a subarray from the specified indices.
- **Pipe Operator:** Uses `|` to chain multiple filter operations.
- **Assignment Operator:** `|=` updates values within data structures.

## 3. Built-in Functions
- **length:** Returns the length of an array or string. Example: `.[].length`
- **keys:** Returns a sorted array of keys from an object. Example: `. | keys`
- **add:** Sums all numbers in an array. Example: `[1,2,3] | add`

## 4. Command-Line Options
- `--raw-output, -r`: Outputs raw strings instead of JSON-encoded strings.
- `--slurp, -s`: Reads all inputs into a single JSON array.
- `--compact-output, -c`: Produces compact (minimized whitespace) JSON output.
- `--null-input, -n`: Uses `null` as input when no file is provided.
- `--arg name value`: Defines a variable with a string value for use in the filter.
- `--argjson name value`: Defines a variable with a JSON value.
- `--exit-status`: Alters exit status based on the filter output (non-zero if false).

## 5. Code Examples
```bash
# Basic usage: Output the entire JSON content
jq . input.json

# Using a filter to extract a nested field
jq '.foo | .bar' input.json

# Passing an argument as a variable
jq --arg username "test_user" '.users[] | select(.name == $username)' input.json
```

## 6. Troubleshooting
- **Syntax Errors:**
  - Verify filter syntax. Use `jq --debug` if available.
  - Check that all brackets and quotes are correctly paired.
- **Invalid JSON Input:**
  - Validate JSON files using tools like `jsonlint`.
  - Use `jq . file.json` to test JSON integrity.
- **Segmentation Faults:**
  - Run jq with debugging symbols compiled; use gdb to trace faults.
  - Confirm that the input file is not corrupted.


## Attribution
- Source: jq Manual
- URL: https://stedolan.github.io/jq/manual/
- License: MIT
- Crawl Date: 2025-04-20T19:22:01.807Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-20
library/VEGA_DOCS.md
# library/VEGA_DOCS.md
# VEGA_DOCS

## Crawl Summary
The crawled Vega documentation provides a complete technical specification including JSON-based visualization grammar, detailed configuration options for marks, scales, axes, signals, and projections. The JavaScript API includes a View constructor with parameters (renderer, container, hover) along with usage examples showing how to embed or render visualizations on web pages. It details command line utilities for generating PDF, PNG, and SVG outputs, with all available options (base directory, scale, seed, config file, etc.). Additional specifics cover integration with D3 and bundler usage, providing direct SDK method signatures and complete code examples.

## Normalised Extract
## Table of Contents
1. Specification Reference
2. API Reference
3. Web Deployment
4. Command Line Utilities
5. Vega-Lite API

---

### 1. Specification Reference
- Vega specifications are JSON objects with properties:
  - width, height
  - data: { url, format }
  - scales: mapping from data values to visual encoding
  - axes & legends: visual representation of scales
  - marks: definitions for graphical elements
  - signals: dynamic variables for interactivity
  - projections: geographical mapping

### 2. API Reference
- **View API Constructor:**

  Signature:
  `new vega.View(runtime: VegaRuntime, options: { renderer: string, container: string | HTMLElement, hover: boolean })`

- **Methods:**
  - `view.runAsync(): Promise<void>`
  - `vega.parse(spec: Object): VegaRuntime`

- **Example:**

```javascript
var view;
fetch('https://vega.github.io/vega/examples/bar-chart.vg.json')
  .then(res => res.json())
  .then(spec => {
    view = new vega.View(vega.parse(spec), {
      renderer: 'canvas',
      container: '#view',
      hover: true
    });
    return view.runAsync();
  });
```

### 3. Web Deployment
- **Importing via CDN:**

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
```

- **Using with D3:**

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script src="https://cdn.jsdelivr.net/npm/topojson-client@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega@5/build/vega-core.min.js"></script>
</head>
```

- **Bundler Import:**

```javascript
import * as vega from "vega";
```

### 4. Command Line Utilities
- **Utilities:** vg2pdf, vg2png, vg2svg
- **Options:**
  - `-b, --base <String>`: Base directory (e.g., `http://host/data/`)
  - `-h, --header`: Include XML header in SVG
  - `-s, --scale <Number>`: Resolution scale, default is 1
  - `-seed <Number>`: Seed for random number generation
  - `-c, --config <String>`: Vega config file
  - `-f, --format <String>`: Number format locale file
  - `-t, --timeFormat <String>`: Data/time format locale file
  - `-l, --loglevel <String>`: Log level (error, warn, info, debug)

- **Example Command:**

```
vg2png test/specs-valid/bar.vg.json bar.png 2> vg2png.log
```

### 5. Vega-Lite API
- **Usage Example:**

```javascript
vl.markBar()
  .data('data/movies.json')
  .encode(
    vl.x().fieldQ('IMDB_Rating').bin(true),
    vl.y().count()
  );
```

- **Produced JSON:**

```json
{
  "mark": "bar",
  "data": { "url": "data/movies.json" },
  "encoding": {
    "x": {
      "bin": true,
      "field": "IMDB_Rating",
      "type": "quantitative"
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative"
    }
  }
}
```

## Supplementary Details
### Detailed Technical Specifications

1. **Vega Specification JSON Object:**
   - **Properties:**
     - `width`: Number (e.g., 500)
     - `height`: Number (e.g., 300)
     - `data`: Object with properties such as `url` (string), `format` (object specifying type, parse, etc.)
     - `scales`: Array of objects; each scale defines a mapping with keys like `name`, `type`, `domain`, and `range`.
     - `axes` and `legends`: Arrays defining visual configuration with properties like `orient`, `title`, `format`.
     - `marks`: Array where each object represents a graphical mark with type (e.g., `rect`, `line`, `symbol`) and associated encoding channels.
     - `signals`: Array with objects containing key `name` (string) and `init` (initial value), among others.
     - `projections`: Object mapping geographical coordinates using properties like `type` and `scale`.

2. **View API Implementation:**
   - **Method Details:**
     - `vega.parse(spec: object): VegaRuntime` converts a Vega spec into a runtime representation.
     - `new vega.View(runtime, options)`: Creates an interactive view; options include:
       - `renderer`: 'canvas' | 'svg'
       - `container`: CSS selector string or DOM element
       - `hover`: boolean for enabling hover effects.
   - **Return Values:** Promises from `view.runAsync()` resolve when rendering is complete.

3. **Command Line Utilities Options Detailed:**
   - `-b, --base`: Sets base directory; must be a valid URL or file path.
   - `-s, --scale`: Expects a numeric value; affects coordinate resolution (e.g., 2 for double resolution).
   - `-seed`: Expects an integer; replaces default Math.random.
   - `-c, --config`: String leading to a config file in JSON/JS format that overrides default config settings.
   - Logging: `-l, --loglevel` accepts 'error', 'warn', 'info', or 'debug'.

4. **Build and Test Process for Vega-Lite API:**
   - Clone repository via `git clone https://github.com/vega/vega-lite-api`.
   - Install dependencies: `yarn`
   - Build API: `yarn build`
   - Run test suite: `yarn test`

5. **Best Practices:**
   - Use CDN for production only if you have reliable caching or serve your own files.
   - Validate JSON specifications with provided schemas to prevent runtime errors.
   - When using command line tools, redirect stderr to log files to capture detailed error messages.

6. **Troubleshooting Procedures:**
   - **Rendering Issues:**
     - Command: `vg2png input.json output.png 2> error.log`
     - Expected Output: PNG file generated; check error.log for missing data or parsing errors.
   - **JavaScript API Failures:**
     - Use browser console to log errors when running `view.runAsync()`.
     - Verify that the container element exists and is empty prior to initialization.
   - **Module Import Errors:**
     - Ensure correct bundler configuration when using `import * as vega from "vega";`.

Refer to the examples above for complete implementation patterns.

## Reference Details
### Complete API Specifications and Examples

#### Vega View API

**Method Signature:**
```
new vega.View(runtime: VegaRuntime, options: {
  renderer: 'canvas' | 'svg',
  container: string | HTMLElement,
  hover: boolean
}): ViewInstance
```

**Key Methods:**
- `view.runAsync(): Promise<void>`: Renders the view asynchronously.
- `vega.parse(spec: object): VegaRuntime`: Parses the JSON specification into a runtime dataflow graph.

**Example Usage:**

```javascript
// Fetch specification and render view
fetch('https://vega.github.io/vega/examples/bar-chart.vg.json')
  .then(res => res.json())
  .then(spec => {
    const runtime = vega.parse(spec);
    const view = new vega.View(runtime, {
      renderer: 'canvas',
      container: '#view',
      hover: true
    });
    view.runAsync()
      .then(() => console.log('Rendered successfully'))
      .catch(err => console.error('Render failed:', err));
  });
```

#### Vega-Embed Module

**Function Signature:**
```
vegaEmbed(el: string | HTMLElement, specUrl: string, options?: object): Promise<{ spec: object, view: ViewInstance }>
```

**Usage Example:**

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
</head>
<body>
  <div id="view"></div>
  <script>
    vegaEmbed('#view', 'https://vega.github.io/vega/examples/bar-chart.vg.json')
      .then(result => {
        // result.spec contains the Vega spec
        // result.view is the Vega view instance
        console.log('Embed successful');
      })
      .catch(console.error);
  </script>
</body>
```

#### Command Line Utilities (vg2pdf, vg2png, vg2svg)

**Usage:**
```
vg2png [options] input_vega_json_file output_png_file
```

**Available Options:**
- `-b, --base <String>`: Base directory (e.g., `http://host/data/` or a local path).
- `-h, --header`: Include XML header (SVG only).
- `-s, --scale <Number>`: Resolution scale factor. Default: 1.
- `-seed <Number>`: Seed for random number generation.
- `-c, --config <String>`: Path to configuration file (JSON or JS).
- `-f, --format <String>`: Path to number format locale file.
- `-t, --timeFormat <String>`: Path to time format locale file.
- `-l, --loglevel <String>`: Logging level (error, warn, info, debug).

**Example Command:**
```
vg2png test/specs-valid/bar.vg.json bar.png 2> vg2png.log
```

#### Vega-Lite API

**JavaScript API Example:**

```javascript
// Import and use Vega-Lite API to create a bar chart specification
vl.markBar()
  .data('data/movies.json')
  .encode(
    vl.x().fieldQ('IMDB_Rating').bin(true),
    vl.y().count()
  );
```

**Expected JSON Output:**

```json
{
  "mark": "bar",
  "data": { "url": "data/movies.json" },
  "encoding": {
    "x": {
      "bin": true,
      "field": "IMDB_Rating",
      "type": "quantitative"
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative"
    }
  }
}
```

---

These specifications, method signatures, code examples, configuration options, and troubleshooting steps are intended to provide developers with an immediately applicable guide for using Vega and Vega-Lite APIs.

## Original Source
Vega Documentation
https://vega.github.io/vega/docs/

## Digest of VEGA_DOCS

# Vega Documentation Digest

**Retrieved Date:** 2023-10-30

## Specification Reference

A Vega specification is a JSON object that defines an interactive visualization. It includes:

- **Basic Properties:** width, height, metadata.
- **Data:** Definitions for data loading, parsing, and transformations.
- **Scales:** Mapping of data values (numbers, strings) to visual properties (coordinates, colors, sizes).
- **Axes & Legends:** Configuration for visualizing scales.
- **Marks:** Graphical marks (rectangles, lines, symbols) to represent data.
- **Signals:** Dynamic variables for interactions.
- **Projections:** Mapping of geographic coordinates (longitude, latitude) to visual space.

## API Reference

Vega provides a JavaScript runtime API that parses JSON specifications and creates interactive views. Key components include:

### View API

**Constructor:**

```
new vega.View(runtime: VegaRuntime, options: {
  renderer: string,    // 'canvas' or 'svg'
  container: string | HTMLElement,  // DOM container selector or object
  hover: boolean       // enable hover processing
})
```

**Example Code:**

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
<body>
  <div id="view"></div>
  <script>
    var view;
    fetch('https://vega.github.io/vega/examples/bar-chart.vg.json')
      .then(res => res.json())
      .then(spec => render(spec))
      .catch(err => console.error(err));

    function render(spec) {
      view = new vega.View(vega.parse(spec), {
        renderer: 'canvas',  // renderer can be 'canvas' or 'svg'
        container: '#view',   // DOM container for the view
        hover: true         // enable hover processing
      });
      return view.runAsync();
    }
  </script>
</body>
```

### Vega-Embed Module

**Usage Example:**

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
</head>
<body>
  <div id="view"></div>
  <script>
    vegaEmbed('#view', 'https://vega.github.io/vega/examples/bar-chart.vg.json');
  </script>
</body>
```

## Web Deployment

### Importing Vega JavaScript

Direct import via CDN:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
```

Or using a bundler:

```javascript
import * as vega from "vega";
```

### Using Vega with D3

If using d3 independently, load d3 first, then a smaller Vega bundle:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script src="https://cdn.jsdelivr.net/npm/topojson-client@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega@5/build/vega-core.min.js"></script>
</head>
```

## Command Line Utilities (vega-cli)

Vega offers command line utilities: vg2pdf, vg2png, vg2svg.

### Usage Syntax:

```
vg2pdf [options] [input_vega_json_file] [output_pdf_file]
vg2png [options] [input_vega_json_file] [output_png_file]
vg2svg [options] [input_vega_json_file] [output_svg_file]
```

### Options:

- `-b, --base [String]` : Base directory for data/image loading. Example: `-b http://host/data/`.
- `-h, --header` : (Flag) Include XML header and DOCTYPE in SVG output (vg2svg only).
- `-s, --scale [Number]` : Resolution scale factor. Default is 1.
- `-seed [Number]` : Seed for random number generation.
- `-c, --config [String]` : Provide a Vega config object file path (JSON or .js).
- `-f, --format [String]` : Set the number format locale, file path for JSON or .js.
- `-t, --timeFormat [String]` : Set data/time format locale, file path for JSON or .js.
- `-l, --loglevel [String]` : Logging level (error, warn, info, debug). Default is warn.
- `--help` : Show usage help.

### Example Command:

```
vg2png test/specs-valid/bar.vg.json bar.png 2> vg2png.log
```

## Vega-Lite API

Vega-Lite provides a high-level JSON syntax for visualizations. Example usage in JavaScript:

```javascript
// Creating a bar mark with Vega-Lite API
vl.markBar()
  .data('data/movies.json')
  .encode(
    vl.x().fieldQ('IMDB_Rating').bin(true),
    vl.y().count()
  );
```

Produces the JSON specification:

```json
{
  "mark": "bar",
  "data": {"url": "data/movies.json"},
  "encoding": {
    "x": {
      "bin": true,
      "field": "IMDB_Rating",
      "type": "quantitative"
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative"
    }
  }
}
```

## Attribution

- Data Size: 13670356 bytes
- Links Found: 11295
- Source: Vega Documentation from https://vega.github.io/vega/docs/


## Attribution
- Source: Vega Documentation
- URL: https://vega.github.io/vega/docs/
- License: BSD-3-Clause
- Crawl Date: 2025-04-20T18:25:27.721Z
- Data Size: 13670356 bytes
- Links Found: 11295

## Retrieved
2025-04-20
library/SHARP.md
# library/SHARP.md
# SHARP

## Crawl Summary
Sharp is a high performance Node.js image processing library using libvips. It supports diverse image formats (JPEG, PNG, WebP, GIF, AVIF, TIFF, SVG) and runtimes (Node.js, Deno, Bun). The library provides detailed configuration options for input parameters (e.g., autoOrient, limitInputPixels), metadata handling, and format conversion commands. Key API methods include the Sharp constructor, clone(), metadata(), stats(), toFile(), toBuffer(), along with format-specific methods (jpeg, png, webp, gif, jp2, tiff, avif, heif, jxl) that accept precise option objects. The documentation outlines installation commands, build-from-source configurations, bundler integration, and AWS Lambda deployment best practices.

## Normalised Extract
## Table of Contents
1. Installation
2. Prebuilt Binaries & Cross-platform Settings
3. Build from Source & Custom libvips
4. API Constructor and Options
5. Common API Methods (clone, metadata, stats)
6. Output Options (toFile, toBuffer)
7. Metadata and Profile Handling
8. Format Conversion Methods (jpeg, png, webp, gif, jp2, tiff, avif, heif, jxl)
9. Bundler & AWS Lambda Integration
10. Troubleshooting & Best Practices

---

### 1. Installation
- npm: `npm install sharp`
- pnpm: `pnpm add sharp`
- yarn: `yarn add sharp`
- bun: `bun add sharp`

### 2. Prebuilt Binaries & Cross-platform Settings
- Prebuilt binaries for macOS (x64 & ARM64), various Linux architectures, and Windows.
- Use installation flags: `--cpu`, `--os`, `--libc` for platform specifics.

### 3. Build from Source & Custom libvips
- Use environment variables: `SHARP_IGNORE_GLOBAL_LIBVIPS` or `SHARP_FORCE_GLOBAL_LIBVIPS`.
- Requirements: C++17, node-addon-api (v7+), node-gyp (v9+).

### 4. API Constructor and Options
- Signature: `new Sharp([input], [options])`
- Input types: Buffer, ArrayBuffer, TypedArray, string, or array.
- Options include: `failOn`, `limitInputPixels`, `unlimited`, `autoOrient`, `sequentialRead`, `density`, `ignoreIcc`, and others for multi-page, raw, create, text, join.

### 5. Common API Methods
- `clone() ⇒ Sharp` to capture the current pipeline state.
- `metadata([callback]) ⇒ Promise.<Object>` returns image dimensions, format, channels, etc.
- `stats([callback]) ⇒ Promise.<Object>` returns channel statistics and image metrics.

### 6. Output Options
- `toFile(fileOut, [callback]) ⇒ Promise.<Object>` writes image to file with inferred format.
- `toBuffer([options], [callback]) ⇒ Promise.<Buffer>` outputs processed image data; supports `{ resolveWithObject: true }`.

### 7. Metadata and Profile Handling
- Methods: `keepExif()`, `withExif(exif)`, `withExifMerge(exif)`, `keepIccProfile()`, `withIccProfile(icc, [options])`, `keepMetadata()`, and `withMetadata([options])`.

### 8. Format Conversion Methods
- **jpeg(options)**: Options such as `quality`, `progressive`, `chromaSubsampling`, etc.
- **png(options)**: Options such as `compressionLevel`, `palette`, and `dither`.
- **webp(options)**: Options include `quality`, `lossless`, `preset`, etc.
- **gif(options)**: Options include `reuse`, `colours`, `dither`, etc.
- Additional methods for `jp2()`, `tiff()`, `avif()`, `heif()`, and `jxl()` with similar patterns.

### 9. Bundler & AWS Lambda Integration
- Exclude sharp from bundling in webpack (using externals) and esbuild (using external).
- For AWS Lambda, include correct binaries and avoid symlinks; configure API Gateway's binary media types.

### 10. Troubleshooting & Best Practices
- Use jemalloc on glibc-based systems to avoid memory fragmentation.
- For cross-compiling, set npm flags (`--platform`, `--arch`, `--libc`).
- Verify installation of node-addon-api and node-gyp if build issues occur.
- In serverless environments, allocate sufficient memory (e.g., 1536 MB) for performance.


## Supplementary Details
Configuration details extracted:
- **Input Options**: 'limitInputPixels' (default: 268402689, set to false for no limit), 'autoOrient' (default: false), 'sequentialRead' (default: true), 'density' (default: 72).
- **Creation Options**: Use 'create' object with properties: width, height, channels (3 or 4), background (color object/string), and noise (type: 'gaussian', mean, sigma).
- **Text Options**: 'text' object with properties: text (UTF-8 string, supports Pango markup), font, fontfile, width, height, align, justify, dpi, rgba, spacing, and wrap style.
- **Join Options**: 'join' object with properties: across (number of images horizontally), animated (boolean), shim (pixel gap), background, halign, and valign.
- **Metadata Options**: Methods like withExif (accepts an object keyed by IFD labels), withIccProfile (accepts a file path or built-in names like 'srgb', 'p3', 'cmyk').
- **Format Conversion**: Strict options for each converter:
  - jpeg: quality (default 80), chromaSubsampling ('4:2:0'), progressive flag, optimisation options.
  - png: compressionLevel (default 6), progressive, adaptiveFiltering, quality, and palette settings.
  - webp: quality (default 80), lossless, nearLossless, preset, effort, loop, delay.
  - gif: reuse palette, colours (default 256), dither, inter-frame error thresholds.
- **Build & Deployment**: Use environment variables (SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS) and build commands (npm install --build-from-source). Troubleshooting includes checking node-addon-api/node-gyp installations and setting bundler exclusions.


## Reference Details
Complete API Specifications and Implementation Details:

1. Constructor:
   - Signature:
     `new Sharp(input?: Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|Uint16Array|Int16Array|Uint32Array|Int32Array|Float32Array|Float64Array|string|Array, options?: Object)`
   - Options Object Properties:
     • failOn: string (default 'warning')
     • limitInputPixels: number | boolean (default 268402689)
     • unlimited: boolean (default false)
     • autoOrient: boolean (default false)
     • sequentialRead: boolean (default true)
     • density: number (default 72)
     • ignoreIcc: boolean (default false)
     • pages: number (default 1)
     • page: number (default 0)
     • subifd: number (default -1)
     • level: number (default 0)
     • pdfBackground: string | Object
     • animated: boolean (default false)
     • raw: Object { width: number, height: number, channels: number, premultiplied?: boolean }
     • create: Object { width: number, height: number, channels: number, background: string|Object, noise?: { type: string, mean: number, sigma: number } }
     • text: Object { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: string, justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: string }
     • join: Object { across: number, animated?: boolean, shim?: number, background?: string|Object, halign?: string, valign?: string }

2. clone() Method:
   - Signature: `clone() ⇒ Sharp`
   - Example:
     ```
     const pipeline = sharp().rotate();
     const clone1 = pipeline.clone().resize(800, 600);
     const clone2 = pipeline.clone().extract({ left: 20, top: 20, width: 100, height: 100 });
     ```

3. metadata() Method:
   - Signature: `metadata([callback]) ⇒ Promise.<Object>`
   - Returns an object with properties:
     { format, size, width, height, space, channels, depth, density, chromaSubsampling, isProgressive, isPalette, bitsPerSample, pages, pageHeight, loop, delay, orientation, exif, icc, iptc, xmp, tifftagPhotoshop, formatMagick, comments }
   - Example:
     ```
     const metadata = await sharp(input).metadata();
     ```

4. stats() Method:
   - Signature: `stats([callback]) ⇒ Promise.<Object>`
   - Returns an object with:
     { channels: [{ min, max, sum, squaresSum, mean, stdev, minX, minY, maxX, maxY }], isOpaque, entropy, sharpness, dominant }
   - Example:
     ```
     const { dominant } = await sharp(input).stats();
     ```

5. toFile() Method:
   - Signature: `toFile(fileOut: string, [callback: function]) ⇒ Promise.<Object>`
   - Returns output info including: format, size, width, height, channels, premultiplied, cropOffsetLeft, cropOffsetTop, attentionX, attentionY, pageHeight, pages
   - Example:
     ```
     sharp(input).toFile('output.png', (err, info) => { /* use info */ });
     ```

6. toBuffer() Method:
   - Signature: `toBuffer([options], [callback]) ⇒ Promise.<Buffer>`
   - Options: { resolveWithObject?: boolean }
   - Example:
     ```
     sharp(input).toBuffer({ resolveWithObject: true })
       .then(({ data, info }) => { /* data: Buffer, info: output details */ });
     ```

7. Metadata/Profile Methods:
   - `keepExif() ⇒ Sharp`
   - `withExif(exif: Object) ⇒ Sharp`
   - `withExifMerge(exif: Object) ⇒ Sharp`
   - `keepIccProfile() ⇒ Sharp`
   - `withIccProfile(icc: string, [options: { attach?: boolean }]) ⇒ Sharp`
   - `keepMetadata() ⇒ Sharp`
   - `withMetadata([options: { orientation?: number, density?: number }]) ⇒ Sharp`
   - Example:
     ```
     sharp(input)
       .withExif({ IFD0: { Copyright: 'The National Gallery' } })
       .toBuffer();
     ```

8. Format Conversion Methods (jpeg, png, webp, gif, etc.):
   - **jpeg(options: Object) ⇒ Sharp**
     Options: {
       quality: number (default 80),
       progressive: boolean (default false),
       chromaSubsampling: string (default '4:2:0', use '4:4:4' to disable subsampling),
       optimiseCoding: boolean (default true),
       mozjpeg: boolean (default false),
       trellisQuantisation: boolean,
       overshootDeringing: boolean,
       optimiseScans: boolean,
       quantisationTable: number
     }
     Example:
     ```
     sharp(input)
       .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
       .toBuffer();
     ```

   - **png(options: Object) ⇒ Sharp**
     Options: {
       progressive: boolean,
       compressionLevel: number (default 6),
       adaptiveFiltering: boolean,
       palette: boolean,
       quality: number,
       effort: number,
       colours: number (default 256),
       dither: number (default 1.0),
       force: boolean (default true)
     }

   - **webp(options: Object) ⇒ Sharp**
     Options: {
       quality: number (default 80),
       alphaQuality: number (default 100),
       lossless: boolean,
       nearLossless: boolean,
       smartSubsample: boolean,
       smartDeblock: boolean,
       preset: string (default 'default'),
       effort: number (default 4),
       loop: number,
       delay: number | Array<number>,
       minSize: boolean,
       mixed: boolean,
       force: boolean
     }

   - **gif(options: Object) ⇒ Sharp**
     Options: {
       reuse: boolean (default true),
       progressive: boolean,
       colours: number (default 256),
       effort: number (default 7),
       dither: number (default 1.0),
       interFrameMaxError: number,
       interPaletteMaxError: number,
       loop: number,
       delay: number | Array<number>,
       force: boolean
     }

   - Other methods (`jp2()`, `tiff()`, `avif()`, `heif()`, `jxl()`) follow similar option patterns with documented defaults.

9. Best Practices & Troubleshooting:
   - Use `npm install --build-from-source` when required by a global libvips.
   - For cross-compiling, configure using npm flags: `--platform`, `--arch`, `--libc`.
   - Exclude sharp from bundling with proper externals settings for webpack/esbuild/electron.
   - For AWS Lambda, deploy with the appropriate binary for the target architecture and avoid symlinks.
   - If encountering build errors, ensure node-addon-api and node-gyp are installed via:
     ```
     npm install --save node-addon-api node-gyp
     ```

Full code examples and configurations are provided in the inline documentation above.


## Original Source
Sharp Image Processing
https://sharp.pixelplumbing.com/

## Digest of SHARP

## Sharp Image Processing

Retrieved: 2023-10-10

### Overview
- High performance Node.js image processing leveraging the libvips library for fast image resizing (4x-5x faster than ImageMagick and GraphicsMagick).
- Supports input and output in multiple formats including JPEG, PNG, WebP, GIF, AVIF, TIFF, and SVG.
- Compatible with Node.js (>= 18.17.0), Deno, and Bun; utilizes Node-API v9.
- Handles colour spaces, embedded ICC profiles, alpha transparency, and uses Lanczos resampling for quality retention.

### Installation

Commands:
```
npm install sharp
pnpm add sharp
yarn add sharp
bun add sharp
```

For pnpm, sharp might need to be added to ignoredBuiltDependencies or onlyBuiltDependencies to silence warnings.

### Prebuilt Binaries & Cross-platform Installation

Prebuilt binaries are available for:
- macOS x64 (>= 10.15) and macOS ARM64
- Linux (ARM, ARM64, ppc64, s390x, x64 with glibc/musl requirements)
- Windows x64 and x86

Cross-platform support is enabled using installation flags such as:
```
npm install --cpu=x64 --os=darwin sharp
npm install --cpu=arm64 --os=darwin sharp
npm install --cpu=x64 --os=linux --libc=glibc sharp
npm install --cpu=x64 --os=linux --libc=musl sharp
```

### Custom libvips and Build-from-Source

- To use a custom, globally-installed libvips, ensure its version matches the version in config.libvips of package.json and is detectable via `pkg-config --modversion vips-cpp`.
- Build from source is triggered if a global libvips is detected or if `npm install --build-from-source` is used.
- Use environment variables: `SHARP_IGNORE_GLOBAL_LIBVIPS` (to never use global libvips) or `SHARP_FORCE_GLOBAL_LIBVIPS` (to force its use).
- Prerequisites include a C++17 compiler, node-addon-api (v7+), and node-gyp (v9+).

### WebAssembly

Experimental support for multi-threaded Wasm environments via Workers. Use:
```
npm install --cpu=wasm32 sharp
```

### AWS Lambda & Bundler Integration

- AWS Lambda: Ensure the deployment package's node_modules includes binaries for linux-x64 or linux-arm64. Avoid symbolic links.
- Bundlers:
  - Webpack: Exclude sharp via the externals configuration:
    ```
    externals: { 'sharp': 'commonjs sharp' }
    ```
  - esbuild: Use the external configuration:
    ```
    buildSync({ entryPoints: ['app.js'], bundle: true, platform: 'node', external: ['sharp'] });
    ```
  - Electron: Configure asarUnpack/unpack options to exclude sharp from the ASAR archive.
  - Vite: Exclude sharp via rollupOptions in the build configuration.

### API: Constructor

**Signature:**
```
new Sharp([input], [options])
```

**Parameters:**
- **input**: `Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array | string | Array`
  - If provided, it can be a Buffer/ArrayBuffer/TypedArray containing image data in JPEG, PNG, WebP, AVIF, GIF, SVG, TIFF, or raw pixel data, or a string path to an image file. Arrays of inputs are concatenated.
- **options**: `Object` (optional) with possible properties:
  - **failOn**: `string` (default: 'warning') - Determines when to abort on invalid pixel data.
  - **limitInputPixels**: `number | boolean` (default: 268402689) - Maximum pixel count allowed.
  - **unlimited**: `boolean` (default: false) - Removes safety limits if true.
  - **autoOrient**: `boolean` (default: false) - Automatically rotates/flips based on EXIF Orientation.
  - **sequentialRead**: `boolean` (default: true) - Use sequential read (can be set false for random access).
  - **density**: `number` (default: 72) - DPI for vector images.
  - **ignoreIcc**: `boolean` (default: false) - Ignores embedded ICC profiles.
  - **pages**, **page**, **subifd**, **level**, **pdfBackground**, **animated**, **raw**, **create**, **text**, **join**: Additional options for multi-page images, raw pixel data, newly created images, text rendering, image joining, etc.

**Example:**
```
sharp('input.jpg')
  .resize(300, 200)
  .toFile('output.jpg', function(err) {
    // output.jpg is 300x200 resized from input.jpg
  });
```

### API: clone()

**Signature:**
```
clone() ⇒ Sharp
```
Creates a snapshot of the current Sharp instance to allow multiple processing pipelines.

**Example:**
```
const pipeline = sharp().rotate();
pipeline.clone().resize(800, 600).pipe(firstWritableStream);
pipeline.clone().extract({ left: 20, top: 20, width: 100, height: 100 }).pipe(secondWritableStream);
```

### API: Metadata Extraction

**Signature:**
```
metadata([callback]) ⇒ Promise.<Object>
```
Returns an object containing properties such as:
- `format`, `size`, `width`, `height`, `space`, `channels`, `depth`, `density`,
- `chromaSubsampling`, `isProgressive`, `isPalette`, `bitsPerSample`,
- `pages`, `pageHeight`, `loop`, `delay`, `orientation`, and more.

**Example:**
```
const metadata = await sharp(input).metadata();
```

### API: Stats

**Signature:**
```
stats([callback]) ⇒ Promise.<Object>
```
Returns:
- `channels`: Array of statistics for each channel (min, max, sum, squaresSum, mean, stdev, minX, minY, maxX, maxY).
- `isOpaque`: Boolean, true if fully opaque.
- `entropy`: Greyscale entropy estimation.
- `sharpness`: Estimation based on Laplacian convolution.
- `dominant`: Dominant sRGB color based on a 4096-bin histogram.

**Example:**
```
const { dominant } = await sharp(input).stats();
```

### Output Options

#### toFile

**Signature:**
```
toFile(fileOut, [callback]) ⇒ Promise.<Object>
```
Writes the processed image to a file. The output format is inferred from the file extension, supporting JPEG, PNG, WebP, AVIF, TIFF, GIF, DZI, or raw pixel data.

**Example:**
```
sharp(input)
  .toFile('output.png', (err, info) => { /* info contains format, size, dimensions, etc. */ });
```

#### toBuffer

**Signature:**
```
toBuffer([options], [callback]) ⇒ Promise.<Buffer>
```
Options can include `{ resolveWithObject: true }` to return an object with `data` and `info`.

**Example:**
```
sharp(input)
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => { /* use data and info */ });
```

### Metadata and Profile Handling

Methods to manage image metadata:
- `keepExif()`: Retain all EXIF metadata.
- `withExif(exif)`: Set EXIF metadata (object keyed by IFD names).
- `withExifMerge(exif)`: Merge provided EXIF data with existing metadata.
- `keepIccProfile()`: Retain the input ICC profile.
- `withIccProfile(icc, [options])`: Attach a specified ICC profile (filesystem path or built-in name such as 'srgb', 'p3', 'cmyk'); option `attach` (default true).
- `keepMetadata()`: Retain all metadata elements (EXIF, ICC, XMP, IPTC).
- `withMetadata([options])`: Keep most metadata and optionally update orientation and density.

**Example:**
```
sharp(input)
  .withExif({ IFD0: { Copyright: 'The National Gallery' } })
  .toBuffer();
```

### Format Conversion Methods

#### jpeg([options]) ⇒ Sharp
Options:
- `quality`: number (default 80, range 1-100)
- `progressive`: boolean (default false)
- `chromaSubsampling`: string (default '4:2:0'; use '4:4:4' to prevent subsampling)
- `optimiseCoding`/`optimizeCoding`: boolean (default true)
- `mozjpeg`: boolean (default false)
- `trellisQuantisation`: boolean
- `overshootDeringing`: boolean
- `optimiseScans`/`optimizeScans`: boolean
- `quantisationTable`/`quantizationTable`: number

**Example:**
```
sharp(input)
  .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
  .toBuffer();
```

#### png([options]) ⇒ Sharp
Options:
- `progressive`: boolean (default false)
- `compressionLevel`: number (default 6)
- `adaptiveFiltering`: boolean (default false)
- `palette`: boolean (when true, produces indexed PNG output)
- `quality`: number
- `effort`: number
- `colours`/`colors`: number (default 256)
- `dither`: number (default 1.0)
- `force`: boolean (default true)

**Example:**
```
sharp(input)
  .png({ palette: true })
  .toBuffer();
```

#### webp([options]) ⇒ Sharp
Options include:
- `quality`: number (default 80)
- `alphaQuality`: number (default 100)
- `lossless`: boolean (default false)
- `nearLossless`: boolean (default false)
- `smartSubsample`: boolean (default false)
- `smartDeblock`: boolean (default false)
- `preset`: string (default 'default')
- `effort`: number (default 4)
- `loop`: number
- `delay`: number or array of numbers
- `minSize`: boolean (default false)
- `mixed`: boolean (default false)
- `force`: boolean (default true)

**Example:**
```
sharp(input)
  .webp({ lossless: true })
  .toBuffer();
```

#### gif([options]) ⇒ Sharp
Options include:
- `reuse`: boolean (default true)
- `progressive`: boolean (default false)
- `colours`/`colors`: number (default 256)
- `effort`: number (default 7)
- `dither`: number (default 1.0)
- `interFrameMaxError`: number
- `interPaletteMaxError`: number
- `loop`: number
- `delay`: number or array of numbers
- `force`: boolean (default true)

**Example:**
```
sharp(pngBuffer)
  .gif()
  .toBuffer();
```

Similar detailed options exist for `jp2()`, `tiff()`, `avif()`, `heif()`, and `jxl()`, each with their own defined parameters and defaults.

### Troubleshooting & Best Practices

- When using glibc-based Linux, consider employing jemalloc to avoid memory fragmentation.
- For cross-compiling, use npm flags `--platform`, `--arch`, and `--libc` to configure the target environment.
- If node-addon-api or node-gyp are missing, install via:
  ```
npm install --save node-addon-api node-gyp
  ```
- In bundlers, ensure sharp is excluded from bundling to prevent packaging issues (see webpack externals, esbuild external, electron asar unpacking).
- For AWS Lambda, ensure the deployment package contains the correct binary for the target platform and avoid the use of symbolic links.

## Attribution

- Data Size: 7630234 bytes
- Links Found: 18948
- Crawled from: https://sharp.pixelplumbing.com/


## Attribution
- Source: Sharp Image Processing
- URL: https://sharp.pixelplumbing.com/
- License: MIT
- Crawl Date: 2025-04-21T04:50:54.200Z
- Data Size: 7630234 bytes
- Links Found: 18948

## Retrieved
2025-04-21
library/YARGS_DOCS.md
# library/YARGS_DOCS.md
# YARGS_DOCS

## Crawl Summary
The crawled content provides detailed information on installing and using yargs for CLI applications. It includes explicit code examples for both CommonJS and ESM modules, as well as experimental support for Deno. Key API methods such as .command() and .parse() are documented with their exact parameters and callback signatures. The content also details installation via npm, usage instructions, output examples, and lists significant breaking changes like the removal of deep requires and the dropped Node 8 support.

## Normalised Extract
## Table of Contents
1. Introduction
2. Installation
3. Getting Started
4. CLI Usage
5. Dual Module Support
   - CommonJS Example
   - ESM Example
6. Deno Support
7. Breaking Changes
8. Contributing Guidelines

---

### 1. Introduction
- Yargs is used to build interactive CLI tools, parse command line arguments, and generate help menus automatically.

### 2. Installation
- Command: `npm install --save yargs`

### 3. Getting Started
- Starter Code:

```js
#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs()
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    });
  }, function (argv) {
    console.log('hello', argv.name, 'welcome to yargs!');
  })
  .help()
  .parse(hideBin(process.argv));
```

### 4. CLI Usage
- Help command: `$ node example.js --help`
- Expected output includes usage pattern, command list, and options.

### 5. Dual Module Support
#### CommonJS

```js
const { argv } = require('yargs');

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}
```

#### ESM

```js
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv);
  })
  .demandCommand(1)
  .argv;
```

### 6. Deno Support

```ts
import yargs from 'https://deno.land/x/yargs/deno.ts';
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts';

yargs()
  .command('download <files...>', 'download a list of files', (yargs: YargsType) => {
    return yargs.positional('files', {
      describe: 'a list of files to do something with'
    });
  }, (argv: Arguments) => {
    console.info(argv);
  })
  .strictCommands()
  .demandCommand(1)
  .parse(Deno.args);
```

### 7. Breaking Changes
- Removal of deep requires; only explicitly exported helpers are available.
- Removed `rebase` function.
- Dropped Node 8 support.

### 8. Contributing Guidelines
- Fork and clone the repository, follow coding styles, write unit tests, and adhere to the Contributor Code of Conduct.

## Supplementary Details
### Supplementary Technical Specifications

1. Installation Options:
   - Command: `npm install --save yargs`
   - No additional configuration parameters.

2. API Methods & Configuration:
   - yargs().command(cmd: string, desc: string, builder?: Function, handler?: Function)
     * Example for a command named 'hello' with a positional 'name' parameter:
       - Parameter 'name': type: string, default: 'Cambi', description: 'the name to say hello to'.
   - yargs().usage(format: string) sets the usage string.
   - yargs().help() automatically adds a help command with `--help` flag.
   - yargs().parse(args: string | string[]) processes the provided arguments.

3. Dual Module Support:
   - For ESM, use: `import yargs from 'yargs'` and `import { hideBin } from 'yargs/helpers'`.
   - For CommonJS, require yargs using: `const { argv } = require('yargs');`.

4. Deno Support (Experimental):
   - Import yargs using: `import yargs from 'https://deno.land/x/yargs/deno.ts';`
   - Use provided types via: `import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts';`

5. Build Process (for Dual Mode Library):
   - Compile TypeScript targeting ESM; then use Rollup to create a CommonJS bundle.

6. Breaking Changes Impact:
   - Deep require paths are disabled. Users must use documented API methods.
   - Removed `rebase` method which previously wrapped `path.relative`.
   - Node 8 is no longer supported, so features are tailored for higher Node versions.

## Reference Details
### Complete API Specifications and Code Examples

#### 1. Command Registration API

Method Signature:

```ts
command(command: string, description: string, builder?: (yargs: any) => any, handler?: (argv: any) => void): any
```

**Example Usage:**

```js
// Registering a command 'hello' with a positional parameter
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs()
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    return yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    });
  }, (argv) => {
    console.log('hello', argv.name, 'welcome to yargs!');
  })
  .help()
  .parse(hideBin(process.argv));
```

#### 2. Module Imports for Dual Environment

**CommonJS Import Example:**

```js
const { argv } = require('yargs');

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}
```

**ESM Import Example:**

```js
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv);
  })
  .demandCommand(1)
  .argv;
```

#### 3. Deno Specific Usage (Experimental)

```ts
import yargs from 'https://deno.land/x/yargs/deno.ts';
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts';

yargs()
  .command('download <files...>', 'download a list of files', (yargs: YargsType) => {
    return yargs.positional('files', {
      describe: 'a list of files to do something with'
    });
  }, (argv: Arguments) => {
    console.info(argv);
  })
  .strictCommands()
  .demandCommand(1)
  .parse(Deno.args);
```

#### 4. Configuration Options and Best Practices

- **Usage String:** Set with `.usage('$0 <cmd> [args]')` to define the command structure.
- **Help:** Always attach `.help()` to auto-generate a help menu.
- **Command Builder:** Use builder function to define positional parameters with type, default values, and description.

#### 5. Troubleshooting Procedures

- **Issue:** Command not recognized
  **Command:** Ensure usage of `.demandCommand(1)` to enforce at least one subcommand.
  **Expected Output:** Error message prompting for a valid command.

- **Issue:** Incorrect parameter types
  **Command:** Verify parameter configuration inside `.positional()` ensuring the correct `type` (e.g., 'string').
  **Expected Output:** Help message showing defaults and type info.

- **Build Errors in Dual Mode:**
  **Command:** For ESM build, run TypeScript compilation followed by Rollup bundling.
  **Expected Output:** A CommonJS bundle is generated without deep require errors.

## Original Source
Yargs Documentation
https://yargs.js.org/docs/

## Digest of YARGS_DOCS

# YARGS Documentation Digest

**Retrieved Date:** 2023-10-05

## Introduction
Yargs is a Node.js library that helps build interactive command line tools by parsing arguments and automatically generating an elegant help interface. It supports commands, grouped options, bash-completion, and more.

## Installation
To install yargs, run:

```
npm install --save yargs
```

## Getting Started
Create an `example.js` file with the following code to get started:

```js
#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs()
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    });
  }, function (argv) {
    console.log('hello', argv.name, 'welcome to yargs!');
  })
  .help()
  .parse(hideBin(process.argv));
```

Run the help command:

```
$ node example.js --help
```

Expected output:

```
pirate-parser <cmd> [args]

Commands:
  pirate-parser hello [name]  welcome ter yargs!

Options:
  --help  Show help  [boolean]
```

Run the hello command:

```
$ node example.js hello --name Parrot
```

Output:

```
hello Parrot welcome to yargs!
```

## Dual Module Support (ESM and CommonJS)

### CommonJS Example:

```js
const { argv } = require('yargs');

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}
```

### ESM Example:

```js
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv);
  })
  .demandCommand(1)
  .argv;
```

## Deno Support (Experimental)

```ts
import yargs from 'https://deno.land/x/yargs/deno.ts';
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts';

yargs()
  .command('download <files...>', 'download a list of files', (yargs: YargsType) => {
    return yargs.positional('files', {
      describe: 'a list of files to do something with'
    });
  }, (argv: Arguments) => {
    console.info(argv);
  })
  .strictCommands()
  .demandCommand(1)
  .parse(Deno.args);
```

## Significant Breaking Changes

- **Conditional Exports:** Deep file requires (e.g., `lib/utils/obj-filter.js`) are no longer supported as only explicitly defined helpers are exported.
- **Removed Methods:** The `rebase` helper method (wrapping `path.relative`) has been removed.
- **Node 8 Support Dropped.**

## Contributing Guidelines

Contributors are encouraged to:
- Fork the repository and clone the project.
- Write unit tests conforming to the standard coding style as enforced in the test suite.
- Follow the Contributor Code of Conduct which prohibits harassment and unethical behavior.

**Attribution:** Retrieved from https://yargs.js.org/docs/

**Data Size:** 348060 bytes

## Attribution
- Source: Yargs Documentation
- URL: https://yargs.js.org/docs/
- License: MIT
- Crawl Date: 2025-04-21T01:07:33.169Z
- Data Size: 348060 bytes
- Links Found: 34

## Retrieved
2025-04-21
library/SVG2_SPEC.md
# library/SVG2_SPEC.md
# SVG2_SPEC

## Crawl Summary
The crawled content provides a highly detailed table of contents outlining the SVG 2 specification. It covers precise technical sections including rendering models, DOM interfaces, geometric property definitions, path data grammar, text layout, and styling rules. Specific configuration details such as the use of the `viewBox` attribute, the transformation matrix computations in the ‘transform’ property, and the exact SVG attributes for fill, stroke, and markers are clearly listed. Each section provides exact instructions on attribute syntax (e.g. real number precision, clamping of values), detailed command definitions for path construction (moveto, lineto, Bézier curves, elliptical arcs), and comprehensive DOM interface descriptions for all SVG elements.

## Normalised Extract
## Table of Contents and Technical Details

### 1. Introduction
- **Overview:** SVG 2 builds on SVG 1.1 Second Edition. It defines an XML-based language for two-dimensional graphics that can be scaled, styled with CSS, and animated via declarative or script-based methods.
- **Key Attributes:** Candidate Recommendation dated 04 October 2018.

### 2. Conformance Criteria
- **Processing Modes:**
  - Dynamic interactive, animated, secure animated, static, secure static.
- **Document Conformance:**
  - Conforming SVG DOM subtrees, conforming markup fragments, and error processing rules.

### 3. Rendering Model
- **Rendering Tree:**
  - Definitions comparing rendered vs non-rendered elements.
- **Painter’s Model:**
  - Establishing stacking contexts and ordering elements based on SVG structure.
- **Opacity Handling:**
  - Group and element opacity determined by the 'opacity' property.

### 4. Basic Data Types and Interfaces
- **Attribute Syntax:**
  - Real number precision and clamping for restricted ranges.
- **DOM Interfaces:**
  - SVGElement, SVGGraphicsElement, SVGGeometryElement, and interfaces for basic data types (SVGNumber, SVGLength, SVGAngle, etc.).
- **Animated Attributes:**
  - Interfaces such as SVGAnimatedBoolean, SVGAnimatedNumber, SVGAnimatedLength, SVGAnimatedRect, etc.

### 5. Document Structure
- **Core Elements:** `<svg>`, `<g>`, `<defs>`, `<symbol>`, `<use>`.
- **Conditional Processing:**
  - Use of `<switch>`, attributes `requiredExtensions`, and `systemLanguage` for conditional rendering.
- **Metadata:**
  - `<desc>`, `<title>`, and `<metadata>` to enhance accessibility and SEO.

### 6. Styling
- **CSS Integration:**
  - Inline `<style>` elements and external style sheets using `<link>` elements.
- **Presentation Attributes:**
  - Class and style attributes for element-specific styling, along with user agent style sheet defaults.

### 7. Geometry Properties
- **Shape Attributes:**
  - Definitions for `cx`, `cy` (center coordinates); `r` (radius); `rx`, `ry` for ellipses; `x`, `y`, `width`, `height` for basic shapes.

### 8. Coordinate Systems, Transformations and Units
- **Transformations:**
  - The `transform` property accepts transformation functions (translate, scale, rotate, skewX, skewY, matrix).
- **Viewport and ViewBox:**
  - The `viewBox` attribute defines the inner coordinate system and is complemented by `preserveAspectRatio` for aspect control.
- **Units:**
  - Defined measurement units and intrinsic sizing properties of SVG content.

### 9. Paths
- **Path Data (`d` Attribute):**
  - Contains commands: moveto (M, m), lineto (L, l), closepath (Z, z), cubic Bézier curves (C, c), quadratic Bézier curves (Q, q), and elliptical arcs (A, a).
- **Grammar:**
  - Detailed command syntax with error handling for malformed path data.

### 10. Basic Shapes
- **Elements:**
  - `<rect>`, `<circle>`, `<ellipse>`, `<line>`, `<polyline>`, `<polygon>` with specific attribute semantics and DOM interfaces (SVGRectElement, SVGCircleElement, etc.).

### 11. Text
- **Text Elements:**
  - `<text>`, `<tspan>`, `<textPath>` with attributes for layout (x, y, dx, dy, rotate).
- **Layout Processing:**
  - Handling of inline-size, shape-inside, and white-space rules.

### 12. Embedded Content
- **Embedding External Content:**
  - `<image>` element for raster images and `<foreignObject>` for incorporating non-SVG XML/HTML.

### 13. Painting: Filling, Stroking and Marker Symbols
- **Fill Properties:**
  - `fill`, `fill-rule` (nonzero/evenodd), `fill-opacity`.
- **Stroke Properties:**
  - `stroke`, `stroke-opacity`, `stroke-width`, `stroke-linecap` (butt, round, square), `stroke-linejoin` (miter, round, bevel), `stroke-dasharray`, `stroke-dashoffset`.
- **Markers:**
  - `<marker>` element with properties `marker-start`, `marker-mid`, and `marker-end` to define arrowheads and vertices.

This extract constitutes a directly usable technical reference for developers implementing or extending SVG functionalities in applications.


## Supplementary Details
## Supplementary Technical Specifications

### Transformation Specifications
- **Transform Property Syntax:**
  - translate(tx, [ty])
  - scale(sx, [sy])
  - rotate(angle, [cx, cy])
  - skewX(angle)
  - skewY(angle)
  - matrix(a, b, c, d, e, f)

Example:

  transform="translate(50,100) rotate(45) scale(1.5)"

### ViewBox and Aspect Ratio
- **viewBox Attribute:** Defines a rectangle in user space. Format: "min-x min-y width height". E.g., viewBox="0 0 300 150".
- **preserveAspectRatio:** Format: "(none | xMidYMid meet | xMinYMin slice, etc.)". Default is "xMidYMid meet".

### DOM Interfaces and Animated Attributes
- **SVGElement Interface:** Base interface for all SVG elements with properties such as id, className, and style.
- **Animated Interfaces:**
  - SVGAnimatedNumber { baseVal: number; animVal: number; }
  - SVGAnimatedLength { baseVal: SVGLength; animVal: SVGLength; }

### Error Handling in Path Data
- **Invalid Commands:** The parser must raise errors when unexpected characters are encountered or when numbers fall out of valid ranges.
- **Fallback Procedures:** If an at-risk feature is not implemented, it should be removed according to the specification.

### Configuration Options in SVG Rendering
- **Stroke Configurations:**
  - Default stroke-width: 1 (if not specified)
  - Default stroke-linecap: butt
  - Default stroke-linejoin: miter
  - Stroke-dasharray and dashoffset must be parsed as lists of numbers with exact spacing behavior.

### Best Practices
- **Implementation:** Ensure proper namespace declaration (xmlns="http://www.w3.org/2000/svg") in the root `<svg>` element.
- **Accessibility:** Always include `<title>` and `<desc>` elements for assistive technologies.
- **Performance:** Use the `<use>` element for reusing definitions defined in `<defs>` to minimize DOM size.

### Troubleshooting Procedures
- **Validation:** Use an XML/SVG validator to ensure all elements conform to the SVG 2 DTD.
- **Debug Commands:** In browser developer tools, inspect the computed style and the rendering tree (e.g., using Chrome DevTools Elements panel) to pinpoint misconfigurations.
- **Example Command:**
    xmllint --noout --schema http://www.w3.org/Graphics/SVG/svg11.xsd yourfile.svg
  Expected Output: "yourfile.svg" is valid.


## Reference Details
## Complete API and Implementation Specifications

### SVG DOM API Specifications

1. SVGElement Interface
   - Properties:
     • id: DOMString
     • className: SVGAnimatedString
     • style: CSSStyleDeclaration
   - Methods:
     • `SVGElement.getBBox(): SVGRect` – Returns the bounding box.
     • `SVGElement.getCTM(): SVGMatrix` – Returns the current transformation matrix.

2. Animated Attributes (Example: SVGAnimatedNumber)
   - Structure:
     {
       baseVal: number,  // The static value
       animVal: number   // The animated value
     }

3. SVGTransform API
   - Method Signature:
     • `createSVGTransform(): SVGTransform`
       - Returns a new SVGTransform with properties:
         - type: number (enum value)
         - matrix: SVGMatrix (with properties a, b, c, d, e, f)
         - angle: number (for rotate, skew operations)

### SDK Method Signatures and Code Examples

// Creating a new SVG element and setting a transform
var svgNS = "http://www.w3.org/2000/svg";
var svgElem = document.createElementNS(svgNS, 'svg');
svgElem.setAttribute('width', '300');
svgElem.setAttribute('height', '150');

var rect = document.createElementNS(svgNS, 'rect');
rect.setAttribute('x', '50');
rect.setAttribute('y', '20');
rect.setAttribute('width', '100');
rect.setAttribute('height', '50');
rect.setAttribute('fill', 'blue');

// Applying transformation
rect.setAttribute('transform', 'translate(10,20) rotate(30)');

svgElem.appendChild(rect);
document.body.appendChild(svgElem);

// Using SVGAnimatedLength
// Assuming we have an SVG circle element with a radius attribute
var circle = document.createElementNS(svgNS, 'circle');
circle.setAttribute('cx', '75');
circle.setAttribute('cy', '75');
circle.setAttribute('r', '40');
circle.setAttribute('fill', 'red');

// Accessing animated value (if any animation is applied)
var radiusAnimated = circle.r; // This is an SVGAnimatedLength object
console.log('Base radius:', radiusAnimated.baseVal.value, 'Animated radius:', radiusAnimated.animVal.value);

### Configuration Options and Their Effects

- xmlns (Namespace): Must be set to "http://www.w3.org/2000/svg"; default if omitted can cause rendering issues.
- viewBox: Defines the internal coordinate system. E.g., viewBox="0 0 300 150" sets origin at (0,0) with width 300 and height 150.
- preserveAspectRatio: Controls scaling behavior. Values include "xMidYMid meet" (default), "none", etc.

### Best Practices with Implementation Code

// Best practice: Always include accessibility tags
var title = document.createElementNS(svgNS, 'title');
title.textContent = 'Sample SVG Graphic';

var desc = document.createElementNS(svgNS, 'desc');
desc.textContent = 'A blue rectangle and red circle.';

svgElem.insertBefore(title, svgElem.firstChild);
svgElem.insertBefore(desc, svgElem.firstChild);

// Validate SVG structure using xmllint as troubleshooting step:
// Command:
//   xmllint --noout --schema http://www.w3.org/Graphics/SVG/svg11.xsd file.svg
// Expected outcome: 'file.svg' is valid if no errors are returned.

### Detailed Troubleshooting Procedures

1. Verify all attributes and namespaces are correctly defined.
2. Check the browser console for parsing errors related to SVG content.
3. Use developer tools to inspect the computed layout and applied transformations.
4. In case of animation issues, confirm that animated attributes (baseVal and animVal) are being updated as per the JavaScript API.

This complete reference provides developers with an exhaustive set of API specifications, method signatures, code examples, and configuration options required for direct implementation of SVG 2 features.


## Original Source
W3C SVG 2 Specification
https://www.w3.org/TR/SVG2/

## Digest of SVG2_SPEC

# Scalable Vector Graphics (SVG) 2 Specification

**Retrieved Date:** 2023-10-30

This document presents the full technical digest of the W3C SVG 2 Candidate Recommendation published on 04 October 2018. The specification defines the complete syntax, features, and behaviors for describing two-dimensional vector and mixed graphics using XML. It covers detailed topics such as conformance criteria, rendering models, basic data types and interfaces, document structure, styling, geometry properties, coordinate systems and transformations, path data, basic shapes, text layout, embedded content, and painting (filling, stroking, marker symbols).

## Table of Contents

1. Introduction
   - Overview of SVG 2
   - Compatibility requirements
   - Normative Terminology

2. Conformance Criteria
   - Processing modes (dynamic, animated, static, secure modes)
   - Document and software conformance classes

3. Rendering Model
   - Rendering tree definitions
   - Painter’s model and stacking contexts
   - Group rendering and opacity effects

4. Basic Data Types and Interfaces
   - Attribute syntax (real number precision, clamping values)
   - SVG DOM overviews and interface definitions (SVGElement, SVGGraphicsElement, SVGGeometryElement)
   - Interfaces for basic types and animated attributes (SVGNumber, SVGLength, SVGAngle, SVGAnimatedString, etc.)

5. Document Structure
   - Definition of the `<svg>` element with namespaces
   - Grouping (`<g>`), definitions (`<defs>`), symbol and use elements
   - Conditional processing and metadata inclusion

6. Styling
   - Use of CSS for styling SVG content
   - Inline style sheets (`<style>`), external style sheets via `<link>`
   - Presentation attributes and required CSS features

7. Geometry Properties
   - Properties like `cx`, `cy`, `r`, `rx`, `ry`, `x`, `y`, `width`, and `height`
   - Effects of these properties on shape rendering

8. Coordinate Systems, Transformations and Units
   - Viewport and coordinate system definitions
   - The `transform` attribute and transformation matrices
   - The `viewBox` and `preserveAspectRatio` attributes
   - Unit specifications and intrinsic sizing

9. Paths
   - The `<path>` element and its `d` attribute
   - Command definitions: moveto, lineto, closepath, cubic & quadratic Bézier curves, elliptical arcs
   - Grammar and error handling in path data

10. Basic Shapes
    - Elements for simple shapes: `<rect>`, `<circle>`, `<ellipse>`, `<line>`, `<polyline>`, `<polygon>`
    - DOM interfaces for each shape and points list handling

11. Text
    - Definitions, font and glyph metrics
    - Text elements (`<text>`, `<tspan>`, `<textPath>`) and attributes like x, y, dx, dy, and rotate
    - Layout algorithms, white-space handling, text decoration and rendering order

12. Embedded Content
    - Handling embedded images using the `<image>` element
    - Foreign content via `<foreignObject>` and incorporation of HTML elements

13. Painting: Filling, Stroking and Marker Symbols
    - Specification of fill properties (`fill`, `fill-rule`, `fill-opacity`)
    - Stroke properties (`stroke`, `stroke-opacity`, `stroke-width`, `stroke-linecap`, `stroke-linejoin`, `stroke-dasharray`, `stroke-dashoffset`)
    - Marker elements and properties (`marker-start`, `marker-mid`, `marker-end`)
    - Additional rendering hints and color interpolation

---

**Attribution:** Technical content extracted directly from the W3C SVG 2 specification as published by the W3C SVG Working Group.

**Data Size:** 19918006 bytes


## Attribution
- Source: W3C SVG 2 Specification
- URL: https://www.w3.org/TR/SVG2/
- License: W3C License
- Crawl Date: 2025-04-21T07:46:57.567Z
- Data Size: 19918006 bytes
- Links Found: 155348

## Retrieved
2025-04-21
library/VITEST_DOC.md
# library/VITEST_DOC.md
# VITEST_DOC

## Crawl Summary
Vitest is a Vite-powered testing framework with support for ESM, TypeScript, and JSX. It provides unified configuration through vite.config files, supports workspaces for monorepo setups, and offers a wide range of configuration options including CLI flags, environment settings, dependency optimization, and test pool settings. Key technical configurations include detailed test file matching patterns, server and dependency settings, and options for global variables and aliasing. Detailed code examples and configuration file setups are provided for seamless integration and usage.

## Normalised Extract
**Table of Contents**
1. Getting Started & Installation
2. Writing Tests
3. Running Tests
4. Configuration (Separate and Vite-based)
5. CLI Options & Commands
6. Workspaces Support
7. Dependency Optimization & Server Options
8. Environment & Pool Configurations
9. Troubleshooting

---

1. **Getting Started & Installation**
   - Install Vitest via npm/yarn/pnpm/bun.
   - Ensure Vite >= 5.0.0 and Node >= 18.0.0.
   - Use `npx vitest` for direct execution.

2. **Writing Tests**
   - Code example for function and test file
   - Example snippets provided with clear file names (`sum.js`, `sum.test.js`).

3. **Running Tests**
   - Command examples: `npm run test`, `yarn test`, `pnpm test`.
   - Special note for Bun users: use `bun run test`.

4. **Configuration**
   - Separate file example: `vitest.config.ts` using `defineConfig` from 'vitest/config'.
   - Vite-based config with triple slash directives (`<reference types="vitest" />` or `<reference types="vitest/config" />`).
   - Merging configurations using `mergeConfig` from 'vitest/config'.

5. **CLI Options & Commands**
   - Script setup in package.json with `test` and `coverage` commands.
   - Options include `--config`, `--port`, `--https`, `--watch`, etc.

6. **Workspaces Support**
   - Define multiple projects using `vitest.workspace.ts`.
   - Example with glob patterns and custom test configurations (happy-dom, node).

7. **Dependency Optimization & Server Options**
   - Detailed configuration options for server, deps, and optimizer.
   - Options include `server.sourcemap`, `server.debug`, and dependency inlining.

8. **Environment & Pool Configurations**
   - Supports `node`, `jsdom`, `happy-dom`, etc.
   - Custom environment definition with full API shape.
   - Pool options like `threads`, `forks`, `vmThreads` etc.

9. **Troubleshooting**
   - Guidelines on Bun command usage, alias configurations, and handling memory in VM threads.
   - Steps to disable auto dependency installations and resolve module caching issues.


## Supplementary Details
### Detailed Configuration Specifications

- **Test File Matching**:
  - include: `["**/*.{test,spec}.?(c|m)[jt]s?(x)"]`
  - exclude: `["**/node_modules/**", "**/dist/**", "**/cypress/**", "**/.{idea,git,cache,output,temp}/**", "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*"]`

- **Global Options**:
  - globals: `false` (set to `true` to enable Jest-like global APIs)

- **Server Settings**:
  - server.sourcemap: `'inline'` (or boolean)
  - server.debug: { dumpModules: `boolean | string`, loadDumppedModules: `boolean` }
  - server.deps.external: Default `[ /\/node_modules\// ]`
  - server.deps.inline: Default `[]` or `true` to inline every dependency
  - server.deps.fallbackCJS: `false`
  - server.deps.cacheDir: `'node_modules/.vite'`

- **Dependency Optimizer**:
  - deps.optimizer: Supports options for `ssr` and `web` modes; integrates with Vite's optimizeDeps.
  - deps.web.transformAssets: `true`
  - deps.web.transformCss: `true`
  - deps.web.transformGlobPattern: `[]`
  - deps.web.interopDefault: `true`

- **Environment Settings**:
  - environment: Defaults to `'node'`; alternatives: `'jsdom'`, `'happy-dom'`, `'edge-runtime'`, or custom string.
  - Custom environment example provided with a shape conforming to Vitest's Environment API.

- **Runner & Pool**:
  - runner: Default `'node'` (or specify benchmark runner)
  - pool: Options include `'threads'`, `'forks'`, `'vmThreads'`, `'vmForks'` with default being `'forks''.

- **Benchmark Options**:
  - benchmark.include: `["**/*.{bench,benchmark}.?(c|m)[jt]s?(x)"]`
  - benchmark.exclude: `["node_modules", "dist", ".idea", ".git", ".cache"]`
  - benchmark.reporters: `'default'`

**Implementation Steps for Configuring Vitest**:
1. Create/modify `vite.config.ts` or `vitest.config.ts` with a test property.
2. Use triple slash directives for type reference: `/// <reference types="vitest/config" />`.
3. Merge configurations if necessary with `mergeConfig`.
4. Define workspaces via a `vitest.workspace.ts` file for monorepo setups.
5. Setup package.json scripts to execute `vitest` or `vitest run --coverage`.

**Troubleshooting Steps**:
- For dependency issues, run: `export VITEST_SKIP_INSTALL_CHECKS=1`.
- If test runner errors occur on Bun, ensure to run `bun run test`.
- For alias problems, verify that aliases are defined in the Vite config and that they target node_modules directly.
- For memory leakage using vmThreads, consider using forks pool or adjust `deps.optimizer` settings.


## Reference Details
### Complete API Specifications & Code Examples

#### 1. Vitest Config API

- **defineConfig (from 'vitest/config')**:

  ```ts
  import { defineConfig } from 'vitest/config';

  export default defineConfig({
    test: {
      // File matching
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'],

      // Global APIs
      globals: false,

      // Server configuration
      // sourcemap can be 'inline' or boolean
      // debug: { dumpModules: boolean | string, loadDumppedModules: boolean }
      // deps: configuration with external, inline, fallbackCJS, cacheDir
      server: {
        sourcemap: 'inline',
        debug: {
          dumpModules: false,
          loadDumppedModules: false
        },
        deps: {
          external: [/\/node_modules\//],
          inline: [],
          fallbackCJS: false,
          cacheDir: 'node_modules/.vite'
        }
      },

      // Environment settings
      environment: 'node',

      // Runner and pool settings
      runner: 'node',
      pool: 'forks',

      // Benchmark options
      benchmark: {
        include: ['**/*.{bench,benchmark}.?(c|m)[jt]s?(x)'],
        exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
        reporters: 'default'
      }
    }
  });
  ```

#### 2. Merging Vite and Vitest Configs

  ```ts
  import { defineConfig, mergeConfig } from 'vitest/config';
  import viteConfig from './vite.config.mjs';

  export default mergeConfig(viteConfig, defineConfig({
    test: {
      exclude: ['packages/template/*']
    }
  }));
  ```

#### 3. Custom Environment Definition

  ```ts
  // environment.ts
  import type { Environment } from 'vitest';

  const customEnv: Environment = {
    name: 'custom',
    transformMode: 'ssr',
    setup() {
      // custom initialization
      return {
        teardown() {
          // cleanup code
        }
      };
    }
  };

  export default customEnv;
  ```

#### 4. Package.json Scripts Example

  ```json
  {
    "scripts": {
      "test": "vitest",
      "coverage": "vitest run --coverage"
    }
  }
  ```

#### 5. Troubleshooting Commands

- **Run Vitest tests once:**

  ```bash
  vitest run
  ```

- **Specify a custom config file:**

  ```bash
  vitest --config ./path/to/vitest.config.ts
  ```

- **Disable automatic dependency installation:**

  ```bash
  export VITEST_SKIP_INSTALL_CHECKS=1
  ```

- **Run tests in Bun:**

  ```bash
  bun run test
  ```

- **Check CLI options:**

  ```bash
  npx vitest --help
  ```

#### 6. Best Practices Implementation

- Use a unified configuration file (e.g., `vite.config.ts`) to avoid discrepancies between app and test setups.
- Leverage workspaces for monorepo projects by defining a `vitest.workspace.ts` with glob patterns and specific environment configs.
- Always include `.test.` or `.spec.` in your test file names to ensure they are discovered.
- For improved dependency handling, customize `server.deps.inline` and optimizer options.

These specifications and patterns are immediately applicable and complete for integrating Vitest into your project.


## Original Source
Vitest Documentation
https://vitest.dev/

## Digest of VITEST_DOC

# Vitest Documentation

**Retrieved Date:** 2023-10-12

## Getting Started

Vitest is a next generation testing framework powered by Vite. The documentation details the installation steps, configuration options, CLI commands, and integration examples.

### Installation

- Using npm:
  ```bash
  npm install -D vitest
  ```
- Using yarn:
  ```bash
  yarn add -D vitest
  ```
- Using pnpm:
  ```bash
  pnpm add -D vitest
  ```
- Using bun:
  ```bash
  bun add -D vitest
  ```

**Note:** Vitest requires Vite >=5.0.0 and Node >=18.0.0. If running via NPX, use:

```bash
npx vitest
```

### Writing Tests

Example: Create a function and its test.

**sum.js**
```js
export function sum(a, b) {
  return a + b;
}
```

**sum.test.js**
```js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

In your package.json add:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

### Running Tests

Run tests using:

- npm:
  ```bash
  npm run test
  ```
- yarn:
  ```bash
  yarn test
  ```
- pnpm:
  ```bash
  pnpm test
  ```

**Bun Users:** Run tests with `bun run test` (not `bun test`).

### Configuring Vitest

Vitest supports unified configuration with Vite. If a root `vite.config.ts` is found, Vitest will use its plugins and alias configuration.

#### Separate Config File

Create a separate `vitest.config.ts` for test-specific configuration:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test options here
  }
});
```

#### Using Vite Config

When using Vite's config, add the `test` property and include a triple slash directive:

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // ... Specify options here
  }
});
```

**Migration:** The `<reference types="vitest" />` is being migrated to `<reference types="vitest/config" />`.

#### Merging Configurations

Using `mergeConfig` to merge Vite and Vitest configurations:

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // Test options
  }
}));
```

### Workspaces Support

Vitest supports running multiple project configurations with a workspace file. Example `vitest.workspace.ts`:

```ts
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  {
    test: {
      name: 'happy-dom',
      root: './shared_tests',
      environment: 'happy-dom',
      setupFiles: ['./setup.happy-dom.ts'],
    },
  },
  {
    test: {
      name: 'node',
      root: './shared_tests',
      environment: 'node',
      setupFiles: ['./setup.node.ts'],
    },
  },
]);
```

### Command Line Interface (CLI)

Default npm scripts in a scaffolded project:

```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

CLI options include:

- `vitest run` to run tests once.
- `--config ./path/to/vitest.config.ts` to specify a config file.
- Additional flags such as `--port`, `--https`, and `--watch`.

### Automatic Dependency Installation

Vitest prompts to install missing dependencies automatically. To disable, set:

```bash
export VITEST_SKIP_INSTALL_CHECKS=1
```

### IDE Integrations

An official VS Code extension is available on the VS Code Marketplace to improve testing experience.

## Configuration Options

### General Test Options:

- **include:** string[] (Default: `["**/*.{test,spec}.?(c|m)[jt]s?(x)"]`)
- **exclude:** string[] (Default: `["**/node_modules/**", "**/dist/**", "**/cypress/**", "**/.{idea,git,cache,output,temp}/**", "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*"]`)
- **globals:** boolean (Default: false). Enable global APIs similar to Jest.

### Server Options:

- **server.sourcemap:** 'inline' | boolean (Default: 'inline')
- **server.debug:** { dumpModules?: boolean | string, loadDumppedModules?: boolean }
- **server.deps:** {
    external: (string | RegExp)[] (Default: [/\/node_modules\//]),
    inline: (string | RegExp)[] | true (Default: []),
    fallbackCJS: boolean (Default: false),
    cacheDir: string (Default: 'node_modules/.vite')
  }

### Dependency Optimization Options:

- **deps.optimizer:** { ssr?: any, web?: any }
- **deps.web:** { transformAssets?: boolean (Default: true), transformCss?: boolean (Default: true), transformGlobPattern?: RegExp | RegExp[] (Default: []), interopDefault?: boolean (Default: true) }
- **deps.moduleDirectories:** string[] (Default: ['node_modules'])

### Environment Options:

- **environment:** 'node' | 'jsdom' | 'happy-dom' | 'edge-runtime' | string (Default: 'node')
- Custom environment can be defined by using a package such as `vitest-environment-{name}`.

### Runner and Pool Options:

- **runner:** Path to a custom test runner (Default: 'node' or 'benchmark')
- **pool:** 'threads' | 'forks' | 'vmThreads' | 'vmForks' (Default: 'forks')

### Benchmark Options:

- **benchmark.include:** string[] (Default: `["**/*.{bench,benchmark}.?(c|m)[jt]s?(x)"]`)
- **benchmark.exclude:** string[] (Default: `["node_modules", "dist", ".idea", ".git", ".cache"]`)
- **benchmark.reporters:** array (Default: 'default')

## Troubleshooting

- **Issue with Bun:** If using Bun, run tests with `bun run test`.
- **Alias Problems:** Ensure that aliases are defined for direct ES imports. For example, do not alias require calls.
- **Memory Leaks in VM Threads:** When using `vmThreads`, note that ES modules are cached indefinitely which might lead to memory leaks. Consider manual adjustments for memory management.
- **Missing Dependencies:** If Vitest prompts for dependency installation, set `VITEST_SKIP_INSTALL_CHECKS=1` to disable automatic installation.

## Attribution

Data Size: 36251597 bytes
Links Found: 25517
Error: None


## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev/
- License: MIT
- Crawl Date: 2025-04-21T05:48:54.154Z
- Data Size: 36251597 bytes
- Links Found: 25517

## Retrieved
2025-04-21
