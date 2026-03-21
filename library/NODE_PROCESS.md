NODE_PROCESS

Table of contents
- CLI argument model: process.argv
- Environment and working directory: process.env, process.cwd()
- Exiting and exit codes: process.exit and signals
- Standard IO streams: process.stdin, process.stdout, process.stderr
- Implementation notes for CLI flag parsing
- Reference signatures
- Detailed digest and retrieval metadata
- Attribution

Normalised extract (key technical points)
- process.argv is an array of strings where index 0 is the Node executable path, index 1 is the executed script path, and indices 2+ are user-supplied CLI arguments.
- There is no built-in flag parser; simple parsing can be implemented by scanning process.argv.slice(2) for flags like --expression, --range, --file and reading their following values.
- process.exit(code) immediately terminates the Node.js process with the specified exit code; an uncaught exception will cause a non-zero exit.
- Standard streams process.stdout.write(string|Buffer) and process.stderr.write are synchronous for small writes but may be buffered; use console.error/console.log for convenience in CLI tools.

Supplementary details (implementation specifics)
- For deterministic flag parsing, implement a simple loop: iterate over args = process.argv.slice(2); when arg matches '--flag' take args[i+1] as its value; handle '--help' as a boolean flag that prints usage and exits 0.
- Avoid relying on shell word-splitting; expect users to quote complex values. Support both --flag value and --flag=value forms if desired by parsing '=' in the token.
- Use process.exitCode = N then return to allow async cleanup where necessary; call process.exit(N) only after synchronous cleanup or on immediate termination.

Reference details (API signatures)
- process.argv: string[]
- process.exitCode: number | undefined
- process.exit(code?: number): never
- process.env: { [key: string]: string | undefined }
- process.cwd(): string
- process.stdout: NodeJS.WriteStream
- process.stdin: NodeJS.ReadableStream

Concrete best practices with examples
- Parse flags via a deterministic scanner over process.argv.slice(2); treat unknown flags as errors and display help with exit code 2.
- Print usage information on '--help' and exit 0; print errors to stderr and exit with non-zero codes for invalid usage.

Detailed digest (content retrieved)
Source: https://nodejs.org/api/process.html
Retrieved: 2026-03-21
Downloaded bytes: 694208
Extract: Node.js process documentation details process.argv structure, environment variables, exit behavior, standard IO streams, and recommended patterns for CLI tools including handling exit codes and asynchronous shutdown.

Attribution
- Source URL: https://nodejs.org/api/process.html
- Data size (bytes) fetched during crawl: 694208
