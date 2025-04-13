# CLI_PLOTTING

This feature enhances the CLI tool to accept and process command line arguments for generating plots from mathematical expressions. It directly aligns with our mission of transforming expressions and ranges into visual plots, offering users a more interactive experience via the command line.

## Feature Description

- Parse command line arguments for options like `--expression`, `--range`, and `--file`.
- If an `--expression` and `--range` are provided, the tool will use the `mathjs` library to evaluate the expression over the specified range, simulating a plot generation by producing dummy SVG content.
- If a `--file` option is provided, the tool will log a message indicating that the generated plot would be saved to the given file (actual file operations will be simulated through logs, as file creation is not modified in this feature).
- Provide default behavior when no plotting arguments are provided, maintaining backward compatibility.

## Implementation Details

- **Source Code:** Update `src/lib/main.js` to include a simple command line argument parser that extracts parameters for `--expression`, `--range`, and `--file`.
- **Dummy Plot Generation:** Use `mathjs` to perform basic evaluations and generate a placeholder SVG (or similar) output. This allows the feature to stay self-contained and simple.
- **Testing:** Extend the existing tests in `tests/unit/main.test.js` to cover new argument scenarios ensuring the CLI processes inputs without error and provides appropriate log outputs.
- **Documentation:** Enhance the `README.md` file to include usage examples and descriptions for the new CLI options. This will help users understand how to utilize the new feature.

## Testing & Documentation

- Ensure that running `npm test` confirms that both default and argument-driven executions complete without errors.
- Update `README.md` to include examples like:

```
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
```

This new feature is contained within the existing repository structure, updating only the allowed files to provide a refined CLI plotting capability as per our project mission.
