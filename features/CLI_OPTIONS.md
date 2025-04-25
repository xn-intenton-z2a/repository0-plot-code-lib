# CLI OPTIONS Enhancement

This update extends the consolidated CLI options handler to include support for a new flag --preview. In addition to the existing flags --stats, --verbose, and --config, the --preview flag enables the tool to output an ASCII representation of the plotted data directly to the console. This improvement provides a quick, terminal-friendly visualization of the generated plot without writing to an image file.

## Source Code Updates

- Update the CLI parser in src/lib/main.js to recognize and validate the --preview flag as a boolean parameter using Zod. The flag should work in tandem with other flags and not interfere with file outputs.
- When the --preview flag is provided, compute an ASCII representation of the time series data based on the generated y-values. The ASCII preview should use a simple character mapping (for example, asterisks or dashes) to depict the plot, allowing users to quickly assess the data visually in the terminal.
- Ensure that if both --file and --preview are provided, the PNG and/or SVG conversions execute as specified while printing the preview as supplementary output.

## Testing Enhancements

- Update tests in tests/unit/main.test.js to simulate CLI calls that include the new --preview flag. The tests should check that:
   - The CLI correctly detects the --preview flag and follows the new branch of generating ASCII output.
   - The preview output is sent to the console along with any other log messages.
   - There is no interference with the behavior of other flags such as --stats, --verbose, or --config.

## Documentation Updates

- Revise README.md to include usage examples demonstrating the use of the --preview flag. For instance, provide an example where the command invokes the CLI with --expression, --range, --file, and --preview, and describe the expected ASCII output along with the file generation.
- Update any relevant sections that list supported CLI options to include --preview and describe its behavior.

## Dependency and Build Consistency

- No additional external dependencies are required for this enhancement. Make sure all modifications remain compliant with Node 20 and ES modules.
- Cross verify that merging the configuration defaults from --config and new preview functionality do not conflict with existing CLI logic.

## Benefits

- Offers users a quick, in-terminal visual overview of the plot via ASCII art, beneficial for rapid testing and development without generating full image files.
- Enhances the unified CLI experience by consolidating all flag-based functionalities into a single, maintainable handler.
- Maintains compatibility with existing output behaviors while providing an additional mode for previewing data.
