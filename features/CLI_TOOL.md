# CLI_TOOL Enhancement with Interactive Mode

## Overview
This update refines the existing CLI_TOOL feature by adding a fully integrated interactive mode. When the user supplies the `--interactive` flag, the program will prompt the user for required inputs (such as function expression, range, and additional plotting parameters) using Node's built-in `readline` module. This enhancement simplifies usage by offering a guided prompt-based input method alongside the standard command-line flags.

## Implementation Details
### Source File (`src/lib/main.js`)
- **Interactive Mode Detection**: At the top of the main function, the code will check if `--interactive` is present among the CLI arguments.
- **Interactive Prompting**: Using the `readline` module, the tool will sequentially prompt for key parameters such as the mathematical expression (e.g., `y=sin(x)`), range (e.g., `x=0:9[,y=-1:1]`), and other optional parameters.
- **Argument Merging**: The answers received will be merged with existing CLI arguments so that the remaining code (which processes expressions, CSV input, and output generation) remains unchanged.
- **Backward Compatibility**: All existing flags (e.g., `--file`, `--json`, etc.) continue to work as before.

### Test File (`tests/unit/main.test.js`)
- **Interactive Mode Tests**: New tests will simulate interactive input by mocking the `readline` module. This will verify that when `--interactive` is provided, the tool correctly prompts for input and produces the expected output (SVG, PNG, or JSON) based on the merged arguments.

### README File (`README.md`)
- **CLI Usage Section Update**: Document the new interactive mode. This section will describe how to use the `--interactive` flag and list the prompted inputs. An example usage snippet will be added to guide users.

### Dependencies
- No additional external dependencies are required. The existing Node.js built-in `readline` module is used for interactive prompting.

## Impact and Benefits
- **Enhanced User Experience**: New users can enter plot parameters in a guided, interactive manner, reducing the frustration of remembering multiple command-line flags.
- **Unified and Accessible Interface**: Integrates interactive mode within the consolidated CLI tool, maintaining backward compatibility while providing an accessible alternate input method.
- **Consistency with Mission**: This enhancement supports the mission of making the plot library a go-to tool by simplifying initial usage and reducing the learning curve for first-time users.
