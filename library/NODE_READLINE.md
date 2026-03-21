NODE_READLINE

Normalised extract

Table of contents
1. Purpose and use-cases
2. createInterface options and returned Interface
3. Key methods and events (signatures)
4. Line-oriented CSV reading pattern
5. Implementation notes and performance

1. Purpose and use-cases
The Node.js readline module provides line-oriented input processing for readable streams. Primary use-cases: interactive prompts and line-by-line processing of text streams such as CSV files when full streaming tools are preferred.

2. createInterface options and returned Interface
- Signature: readline.createInterface(options) -> Interface
- Important options (object):
  - input (required): stream.Readable (e.g., fs.createReadStream)
  - output (optional): stream.Writable (for prompt output)
  - completer (optional): function for tab-completion
  - terminal (optional, boolean): if true, treats streams as TTY
  - historySize (optional, number)
  - prompt (optional, string)
  - crlfDelay (optional, number): number of ms to wait for CR LF sequences to be treated as single newline (default recommended: Infinity for reliable CSV line handling)
- Returned Interface: object that emits events and exposes line-oriented methods.

3. Key methods and events (signatures)
- interface.on(event: 'line', listener: (line: string) => void)
- interface.on(event: 'close', listener: () => void)
- interface.question(query: string, callback: (answer: string) => void)
- interface.prompt(preserveCursor?: boolean) -> void
- interface.setPrompt(prompt: string) -> void
- interface.close() -> void
- interface.pause()/interface.resume() for flow control
- interface.write(data, key?) -> void (writes to output stream when terminal true)

Events
- 'line' — emitted whenever the input stream receives an end-of-line sequence; listener receives the line text without the newline.
- 'close' — emitted when the input stream is closed or interface.close() is called.

4. Line-oriented CSV reading pattern
- Create a read stream: fs.createReadStream('data.csv')
- Create an interface: readline.createInterface({ input: readStream, crlfDelay: Infinity })
- On each 'line' event, parse the CSV row (split on comma, or use an RFC4180-aware parser) and process time,value columns.
- On 'close' event finalize processing and close resources.

5. Implementation notes and performance
- For very large CSV files prefer streaming parsers that handle quoting and RFC4180 rules; readline splits on raw newline characters and does not parse quoted multi-line CSV fields.
- Use crlfDelay: Infinity to ensure CRLF sequences are handled consistently across platforms.
- For interactive CLI prompts, pass an output stream (process.stdout) and use interface.question for synchronous-style prompts.

Supplementary details
- The Interface is an EventEmitter; attaching many listeners may have typical Node.js EventEmitter memory considerations.
- When input is a TTY and terminal=true, readline provides editing and history behaviour; for non-interactive batch CSV processing, set terminal:false or omit output.

Reference details
- Module: require('readline') or import readline from 'node:readline'
- createInterface(options:Object) -> Interface
- Event: 'line'(line), 'close'()
- Methods: question(query, cb), pause(), resume(), close()

Detailed digest
- Source: Node.js readline documentation (retrieved 2026-03-21)
- Crawl size: 201.1 KB (HTML response saved during fetch)
- Extracted facts: createInterface options, crlfDelay usage, 'line' event semantics, limitations for RFC4180 quoted fields.

Attribution
- Source URL: https://nodejs.org/api/readline.html
- Retrieved: 2026-03-21
- Data size (fetched): 201.1 KB
