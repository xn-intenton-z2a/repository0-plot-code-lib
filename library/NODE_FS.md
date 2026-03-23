NODE_FS

Normalised extract

Table of contents
1. readFileSync signature and behaviour
2. Encoding and return types
3. Error handling and exceptions
4. Example CSV load pattern (conceptual)

Details

1. readFileSync signature and behaviour
fs.readFileSync(path[, options])
- Synchronously reads the entire contents of a file.
- Returns: Buffer unless options specify an encoding string, in which case a string is returned.
- Throws an exception on error (e.g., file not found, permission denied). Wrap calls in try/catch if necessary.

2. Encoding and return types
- Options may be an object or encoding string.
- Common usage: fs.readFileSync(path, 'utf8') to get a JavaScript string.
- When reading CSV for parsing, pass 'utf8' to avoid manual Buffer decoding.

3. Error handling and exceptions
- Synchronous API throws on failure; either propagate the error or catch and handle (log, exit with error code, or return empty data set).
- Consider validating file size before reading (fs.statSync) for very large files, or prefer stream-based APIs for large inputs.

4. Example CSV load pattern (conceptual, not language-escaped)
- Read text: content = fs.readFileSync(csvPath, 'utf8')
- Split lines by CRLF or LF and ignore blank lines
- For each non-empty line, split on comma into [time, value]
- Parse time and value: timeNumber = parseFloat(time) or new Date(time) depending on format; valueNumber = parseFloat(value)
- Validate parsed numbers (isFinite) and collect arrays of points [{time: t, value: v}] or numeric arrays [[x0,y0], [x1,y1], ...]

Reference details (signatures)
fs.readFileSync(path: string | Buffer | URL | integer, options?: { encoding?: string | null, flag?: string } | string): Buffer | string

Digest
Source: https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
Retrieved: 2026-03-23
Downloaded bytes: 935744

Attribution
Content originated from Node.js API documentation (nodejs.org). See source URL above.
