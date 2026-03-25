NORMALISED_EXTRACT

Table of contents:
- process.argv structure
- Recommended CLI parsing algorithm (posix-style)
- Help/usage handling and examples
- Edge cases and quoting considerations

process.argv structure
- process.argv is an Array<string> provided by Node.js containing the full command-line invocation.
  - process.argv[0] is the Node.js executable path.
  - process.argv[1] is the path of the executed script (e.g., src/lib/main.js).
  - process.argv.slice(2) are the user-supplied arguments and flags.

Recommended CLI parsing algorithm
1. let args := process.argv.slice(2)
2. Iterate index i from 0 to args.length-1:
   - If args[i] === '--help' or args[i] === '-h': print usage text and exit with code 0.
   - If args[i] startsWith('--') and args[i] contains '=': split key/value at the first '=' and set options[keyWithoutLeadingDashes] = value.
   - Else if args[i] startsWith('--') and next token exists and next token does not start with '-': treat next token as the value for this flag (e.g., --file output.svg); increment i to skip the value.
   - Else if args[i] startsWith('-') and is a cluster of short flags (e.g., -ab): expand per-character or treat according to project convention.
   - Else treat args[i] as a positional parameter and push into an array of positionals.
3. After parsing, validate required keys (e.g., one of expression or csv is present, file output path is provided) and emit helpful errors if missing.

Help/usage handling and examples
- The --help handler should print concise usage and example commands, for example:
  - node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
  - node src/lib/main.js --csv data.csv --file output.png
- When --help is present do not attempt to read/write files; exit immediately after displaying help.

Edge cases and quoting
- Shells perform quoting before Node receives argv; arguments containing spaces are provided as single argv entries when quoted by the caller.
- Windows and POSIX shells differ in quoting rules; validate arguments such as JSON-like values or expressions for balanced quotes if you parse them further.

DETAILED_DIGEST

Source: https://nodejs.org/api/process.html#processargv
Date retrieved: 2026-03-25
Data captured: ~679.8 KB

Extracted technical points used above: process.argv layout and recommended robust parsing patterns for flags and positional arguments.

ATTRIBUTION
Node.js process.argv documentation.