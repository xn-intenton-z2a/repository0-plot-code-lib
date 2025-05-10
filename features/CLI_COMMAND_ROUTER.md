# CLI Command Router

Implement a command router in the main CLI entrypoint to inspect the first argument and dispatch to the corresponding subcommand handler, unifying plot and reseed workflows under a single consistent interface.

# Behavior

When invoked with no arguments:
- Print a help summary listing available commands (plot, reseed) and brief descriptions.
- Exit with code 0.

When the first argument is "plot":
- Parse flags using existing PLOT_COMMAND definitions (--type, --width, --height, --data, --output).
- Invoke the internal plot handler in src/lib/main.js to generate an ASCII chart or write to file.
- On success, print summary of output or written file path and exit with code 0.
- On errors (flag validation, file read/write), print descriptive error and exit with non-zero code.

When the first argument is "reseed":
- Forward remaining flags to the reseed implementation (--dry-run, --force planned).
- In dry-run mode, list target files that would be reset and exit with code 0.
- In future force mode, overwrite files and report each write operation.

# Implementation Details

- Enhance src/lib/main.js to inspect args[0] and route to handlers rather than unconditionally logging inputs.
- Use zod schema definitions to validate subcommand names and accepted flags, falling back to help output on unknown commands.
- Maintain ESM compatibility and preserve existing shebang invocation.
- Ensure correct exit codes and consistent console output formatting for downstream scripts.

# Testing

- Update tests/unit/plot-generation.test.js to call main(["plot","--type","bar","--data","data.json"]), mock fs.readFile, and assert that console.log is invoked with an ASCII bar chart representation.
- Add tests in tests/unit/plot-generation.test.js for help output when no args and for error handling on invalid JSON/YAML input.
- Extend tests/unit/main.test.js to include a test for reseed dry-run: main(["reseed","--dry-run"]) and assert listing of target files.

# Documentation

- Update README.md to include top-level CLI usage examples invoking both plot and reseed subcommands, matching actual console output.
- Ensure USAGE.md reflects the new routing behavior and provides example snippets for help, plot, and reseed commands.