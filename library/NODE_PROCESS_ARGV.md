Normalised extract

This document consolidates authoritative details about Node.js process.argv: its shape, parsing semantics, platform edge-cases, and best practices for argument handling in CLI applications.

Table of contents

- Normalised extract
- Overview
- Structure and content
- Quoting and shell interaction
- Argument parsing best practices
- Edge cases and platform specifics
- Supplementary details
- Reference details (API signatures)
- Detailed digest and retrieval
- Attribution

Overview

process.argv is a runtime-provided array containing the command-line arguments passed to the Node.js process. It is a simple string array and responsibility for parsing non-trivial arguments falls to the application or a dedicated parsing library.

Structure and content

- process.argv: string[]
- Typical layout: [0] = node executable path, [1] = script path (or entry), [2...] = user arguments
- When Node is executed with -e or -p the layout and contents may vary (inline code occupies a synthetic script position)

Quoting and shell interaction

- Shells perform globbing and quoting before Node receives argv — the exact content depends on the shell and platform (POSIX shells, cmd.exe, PowerShell)
- Windows quoting rules differ: cmd.exe passes a raw command string and the C runtime splits it; PowerShell passes pre-parsed arguments; use libraries that normalise across platforms when necessary

Argument parsing best practices

- Prefer established libraries (yargs, minimist, commander) for robust handling of flags, options, subcommands, and help generation
- For simple scripts, parse process.argv.slice(2) and implement deterministic rules: short flags (-a), grouped flags (-abc), long flags (--name=value or --name value)
- Never assume argument order unless the CLI is explicitly positional

Edge cases and platform specifics

- Shebang lines: when executing a script directly, argv[0] may be the interpreter path or the script path depending on OS and invocation
- Unicode and environment encodings: Node normalizes argv to JavaScript strings; non-UTF8 locales may require extra handling when interacting with native subsystems
- Long command lines: platform limits exist (Windows ~32k, POSIX often large but implementation-defined)

Supplementary details

- For deterministic reproducible parsing, document CLI behaviour and versions, and include a --version flag
- When executing child processes, prefer spawn with argument array rather than shell string to avoid shell quoting pitfalls

Reference details (API signatures)

- process.argv: string[]
- process.execPath: string
- process.argv0: string (modifiable alias for display in e.g., process.title)

Detailed digest (retrieval)

- Retrieval date: 2026-03-21
- Crawl size: 679.8 KB
- Digest: Compiled from Node.js docs, community articles, and cross-platform CLI guidance.

Attribution

Sources: Node.js official documentation, community guides on CLI and shell behavior, and argument parsing library READMEs. Normalised for concise developer reference.