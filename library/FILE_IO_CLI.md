FILE_IO_CLI

TABLE OF CONTENTS:
1. Normalised extract: CLI flags and file inference
2. process.argv usage and argument parsing
3. path.extname and file format inference
4. Node fs methods for read/write and streaming
5. Examples, error handling, and exit codes
6. Digest and attribution

NORMALISED EXTRACT:
- CLI should accept flags: --expression, --range, --csv, --file, --help. Flags may appear in any order. If --help present, print usage and exit 0.
- File format inference: use path.extname(filePath) to determine output format. Recognize .svg and .png (case-insensitive). If unknown extension, throw or default to .svg.

ARG PARSING (manual minimal parser):
- Access raw args: const argv = process.argv.slice(2)
- Iterate argv with index i: if argv[i] startsWith('--') then switch on flag name; value is argv[i+1] if present and does not startWith('--'). Support boolean flags like --help.
- Example return shape: { expression?: string, range?: string, csv?: string, file?: string, help?: boolean }

PATH AND FS (exact API):
- path.extname(filePath: string): string -> returns extension including '.' or empty string
- fs.promises.readFile(path, {encoding:'utf8'}) -> Promise<string>
- fs.promises.writeFile(path, data) -> Promise<void>
- fs.createReadStream(path, {encoding:'utf8'}) -> Readable stream (for CSV streaming)
- fs.createWriteStream(path) -> Writable stream

ERROR HANDLING & EXIT CODES:
- Return non-zero exit codes for user errors: missing required flag -> exit 2; file write error -> exit 3; parse error -> exit 4.
- Print user-friendly error messages to stderr before exiting.

REFERENCE & DIGEST:
- Node process API: process.argv and process.exit documented at https://nodejs.org/api/process.html retrieved 2026-03-24, bytes: 694208
- Node path API: path.extname, path.join at https://nodejs.org/api/path.html retrieved 2026-03-24, bytes: 95923
- Node fs API: fs.promises.readFile/writeFile and fs.createReadStream at https://nodejs.org/api/fs.html retrieved 2026-03-24, bytes: 935744

IMPLEMENTATION NOTES:
- Export a CLI entrypoint main(argv?: string[]): Promise<number> for testability. If main called without argv, use process.argv.slice(2).
- For file writes of binary PNG, use Buffer and fs.promises.writeFile(filePath, buffer).
- For SVG, write UTF-8 string with fs.promises.writeFile(filePath, svgString, 'utf8').
