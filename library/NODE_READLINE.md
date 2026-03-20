NODE_READLINE

NORMALISED EXTRACT
- The readline module provides an interface for reading data (lines) from a Readable stream (commonly fs.createReadStream) one line at a time and is suitable for streaming CSV with modest memory use.
- Create an interface with readline.createInterface(options) where options.input is a stream.Readable and options.output is optional; event 'line' delivers each line string (without line terminators).
- For CSV that follows RFC4180, line-based splitting is only safe when fields do not contain newlines; fully RFC4180-compliant parsing requires handling quoted fields which may contain embedded newlines; in those cases use a proper CSV parser or accumulate lines until quoted fields are closed.

TABLE OF CONTENTS
1. createInterface options
2. Events and methods
3. CSV parsing considerations
4. Example streaming pattern (textual)

DETAILS
1. createInterface options
- Signature: readline.createInterface(options: { input: Readable, output?: Writable, completer?: Function, terminal?: boolean, historySize?: number, prompt?: string, crlfDelay?: number }) -> Interface
- input: Node stream.Readable; crlfDelay: number helps normalize CRLF across platforms when using input from fs.createReadStream.

2. Events and methods
- Event: 'line' — callback receives a single line string.
- Event: 'close' — emitted when the input stream is exhausted and interface is closed.
- Method: rl.question(query: string, callback(answer: string)) — prompt-based input for interactive CLIs.
- Method: rl.close() — close the interface and underlying input if necessary.

3. CSV parsing considerations
- Use readline when CSV rows are strictly single-line and fields do not contain embedded CR/LF inside quotes.
- For RFC4180-compliant parsing where fields may contain CR/LF or commas inside quotes, either use a streaming CSV parser or implement accumulation logic to detect unmatched quotes across lines.

4. Example streaming pattern (textual)
- Create a readable stream from fs.createReadStream(filePath, { encoding: 'utf8' });
- Create rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
- rl.on('line', (line) => { parse line into columns by RFC4180 rules; push numeric value into series; });
- rl.on('close', () => { finalize data processing; });

REFERENCE DETAILS (SIGNATURES)
- readline.createInterface(options: { input: Readable, output?: Writable, completer?: Function, terminal?: boolean, historySize?: number, prompt?: string, crlfDelay?: number }) -> Interface
- Interface.on('line', (line: string) => void)
- Interface.on('close', () => void)
- Interface.question(query: string, callback: (answer: string) => void)
- Interface.close(): void

DETAILED DIGEST (source: https://nodejs.org/api/readline.html)
- Retrieved: 2026-03-20
- Crawl size: 205471 bytes
- Content digested: Node.js readline reference describing createInterface options, events and typical streaming usage; important notes about CRLF handling and limits of line-based parsing for RFC4180 CSV.

ATTRIBUTION
- Source: https://nodejs.org/api/readline.html
- Retrieved: 2026-03-20
- Bytes downloaded during crawl: 205471
