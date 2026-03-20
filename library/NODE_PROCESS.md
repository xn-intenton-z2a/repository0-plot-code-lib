NODE_PROCESS

TABLE OF CONTENTS:
1. process.argv and CLI argument conventions
2. process.exit and exit codes
3. process.env and environment access
4. stdout/stderr writing and synchronous considerations
5. Reference details (types and signatures)
6. Detailed digest and retrieval metadata

NORMALISED EXTRACT:
- process.argv: Array<string>. Index 0 is executable path (node), index 1 is script path, arguments begin at index 2. Common pattern: const args = process.argv.slice(2).
- process.exit(code?: number): never returns; code is integer exit status where 0 = success. If omitted, Node exits with code 0 unless there was an unhandled error.
- process.env: Record<string, string | undefined> for environment variables; values are strings or undefined.
- process.stdout.write(chunk: string | Uint8Array, encoding?: string, callback?: (err?: Error) => void): boolean — writes to STDOUT, returns false when kernel buffer is full; listen for 'drain' when false.
- process.stderr.write same signature for STDERR.

SUPPLEMENTARY DETAILS:
- CLI parsing: use process.argv.slice(2) for simple cases; for robust parsing consider minimist or yargs if needed, but for this project simple slice + manual parsing suffices.
- Exit codes: use 0 for success, >0 for errors; return non-zero for CLI failures to integrate with scripts.
- When writing binary data to STDOUT (rare for this CLI), ensure you use Buffer objects and fs.writeFile to produce files instead.

REFERENCE DETAILS (exact types/signatures):
- process.argv: string[]
- process.exit(code?: number): never
- process.env: { [key: string]: string | undefined }
- process.stdout.write(chunk: string | Uint8Array, encoding?: string, cb?: (err?: Error) => void): boolean
- process.stderr.write(chunk: string | Uint8Array, encoding?: string, cb?: (err?: Error) => void): boolean

DETAILED DIGEST (extracted/normalised from Node.js process reference, retrieved 2026-03-20):
- The process module exposes runtime information and standard streams. For CLI tools the key values are process.argv, process.env and the stdout/stderr stream APIs. Use slice(2) to obtain CLI args. Exiting the process explicitly is done with process.exit(code).

ATTRIBUTION:
Source: https://nodejs.org/api/process.html — retrieved 2026-03-20. Data size fetched during crawl: 694208 bytes.
