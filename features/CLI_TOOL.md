# CLI_TOOL Unified Mode Enhancement

## Overview
This feature consolidates the separate CLI functionalities for plotting (previously detailed in CLI_PLOTTING) and diagnostics (CLI_DIAGNOSTICS) into a single, unified command-line interface mode called CLI_TOOL. In addition to supporting environment-based configuration and diagnostics output, the unified CLI now introduces an interactive mode triggered by the `--interactive` flag. When enabled, the tool prompts users for input parameters (such as mathematical expressions, ranges, output file options, and other customizable plotting parameters) via the terminal. This interactive session simplifies usage for users who prefer guided input over complex command-line arguments.

## Implementation Details
- **Source File (`src/lib/main.js`):**
  - **Interactive Mode Detection:**
    - At the beginning of the `main` function, check if the `--interactive` flag is present in the CLI arguments. If present, initiate an interactive prompt using Node's built-in `readline` module.
    - Example snippet:
      ```js
      import readline from 'readline';
      
      async function promptUser(question) {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        return new Promise(resolve => rl.question(question, ans => {
          rl.close();
          resolve(ans);
        }));
      }
      
      if (args.includes('--interactive')) {
        // Sequentially prompt for required parameters
        const expression = await promptUser('Enter expression (e.g., y=sin(x)): ');
        const range = await promptUser('Enter range (e.g., x=0:9[,y=-1:1]): ');
        // Additional prompts for optional parameters can be added here
        // Merge the interactive input with existing CLI args for further processing
        args = [...args.filter(arg => arg !== '--interactive'), '--expression', expression, '--range', range];
      }
      ```

  - **Unified Flow:**
    - Retain the existing logic for processing CLI arguments, plotting via SVG/PNG generation, and diagnostics when the `--diagnostics` flag is provided. This ensures backward compatibility while streamlining usage under one mode.

- **Test File Update (`tests/unit/main.test.js`):**
  - Add tests to simulate interactive mode. Mock the `readline` module to automatically supply inputs and verify that the tool produces valid output (SVG, PNG, or JSON) when running in interactive mode.

- **README Update (`README.md`):**
  - Update the CLI Usage section to include documentation for the new interactive mode. For example, add a new section titled "Interactive Mode" describing how to invoke the tool with `--interactive` and detailing the prompted inputs.

- **Dependencies:**
  - No new external dependencies are required since Node's built-in `readline` module is used for interactive prompting.

## Impact and Benefits
- **Simplified User Experience:** New users can start the tool with interactive prompts rather than remembering multiple command-line flags.
- **Unified CLI Interface:** Consolidating plotting, diagnostics, and interactive input into one streamlined CLI avoids feature fragmentation, making maintenance and usage more straightforward.
- **Backward Compatibility:** Existing usage with flags such as `--expression`, `--range`, and `--diagnostics` remains intact.

This enhancement aligns with the repository's mission to be the "go-to plot library with a CLI" by making the tool more accessible and reducing the learning curve for users.
