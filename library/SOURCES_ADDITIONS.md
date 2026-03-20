SOURCES_ADDITIONS

TABLE OF CONTENTS:
1. process.argv (Node.js CLI arguments)
2. PNG file signature (magic bytes)
3. Supplementary details
4. Reference details (exact values, types)
5. Detailed digest and retrieval metadata
6. Attribution

NORMALISED EXTRACT:
1) process.argv (Node.js CLI arguments)
- Type: string[] (Array of strings).
- Contents: index 0 = Node executable path; index 1 = path to the executed script; subsequent indices (>=2) are user-supplied CLI arguments.
- Common usage pattern: to access only user arguments use process.argv.slice(2) which yields a string[] of the passed flags/values.
- process.exit(code?: number): never returns; code is an integer exit status where 0 indicates success and any non-zero value indicates failure.
- process.env: record of environment variables where property values are string | undefined; read-only from Node point-of-view (assignment mutates process.env at runtime).
- Streams: process.stdout.write(chunk) and process.stderr.write(chunk) accept string | Uint8Array and return boolean; when false, the caller should wait for the 'drain' event before writing additional data.

2) PNG file signature (magic bytes)
- The first 8 bytes of any PNG file are the PNG signature (hex): 89 50 4E 47 0D 0A 1A 0A
- Byte sequence (decimal): 137 80 78 71 13 10 26 10
- Purpose: provides a strong file-type marker and identifies data as network-order (big-endian) PNG data; any PNG-validating reader must check these bytes before further parsing.

SUPPLEMENTARY DETAILS:
- process.argv is provided by the runtime; do not assume argument ordering beyond standard conventions; use a CLI parser (minimist/yargs) for robust flag parsing where needed.
- When writing CLI tools that may output binary file contents, prefer writing to files using fs.writeFile or piping Buffer objects to a child process; stdout is fine for textual output.
- For PNG validation, check the 8-byte signature first, then parse chunks sequentially (length, type, data, CRC). A mismatched signature or truncated chunk is an immediate failure.

REFERENCE DETAILS (exact values and types):
- process.argv: string[]
- process.exit(code?: number): never
- process.env: { [key: string]: string | undefined }
- process.stdout.write(chunk: string | Uint8Array, encoding?: string, cb?: (err?: Error) => void): boolean
- PNG signature (8 bytes, hex): 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
- PNG signature (8 bytes, decimal): 137 80 78 71 13 10 26 10

DETAILED DIGEST (retrieved 2026-03-20):
- Node process reference: authoritative definitions of process.argv, process.env, process.exit, and the stdout/stderr stream write signatures; use process.argv.slice(2) for CLI args extraction; exit codes are standard POSIX integer semantics.
- PNG spec and summaries: the canonical PNG signature is the first 8 bytes listed above; chunk parsing follows and must be validated by readers.

ATTRIBUTION:
- Node process reference: https://nodejs.org/api/process.html (retrieved 2026-03-20)
- PNG specification (signature and chunk format): https://www.w3.org/TR/PNG/ (retrieved 2026-03-20)
- Supplemental PNG summary: https://en.wikipedia.org/wiki/Portable_Network_Graphics#File_signature (retrieved 2026-03-20)

DATA SIZE FETCHED DURING CREATION: combined referenced sources; representative spec excerpts already present in library documentation (no large crawl was required for these short extracts).
