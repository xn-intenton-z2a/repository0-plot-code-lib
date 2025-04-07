# ASCII_PLOTTING Feature Specification

## Description
This feature introduces an ASCII plotting mode that enables the generation of text-based plots directly in the terminal. By using the `--ascii` flag, users can display simplified plots rendered as ASCII art. This mode is particularly useful for environments where graphical output may not be available or when a lightweight, instant visual representation is desired.

## Motivation
- **Enhanced Accessibility:** Provides users with a quick, terminal-friendly representation of plots without the need for graphical interfaces.
- **Immediate Feedback:** Enables rapid iteration and previewing of mathematical functions in text format.
- **Mission Alignment:** Supports our mission of being the go-to plotting tool by offering versatile output formats including a simple ASCII art mode.

## Implementation Details
1. **CLI Integration:**
   - Add recognition of the `--ascii` flag in the CLI parser within `src/lib/main.js`.
   - Ensure that the ASCII mode is mutually exclusive with graphical output modes unless explicitly overridden by other flags.

2. **Plot Data Conversion:
   - Reuse the current numeric validations and plot data generation logic.
   - Introduce a new module or extend existing plotting logic to map numerical coordinate data to a grid of characters.
   - Design the ASCII rendering engine to represent axes, grid lines, and plot curves using common ASCII characters (e.g., `|`, `-`, `+`, `*`).

3. **Output Formatting:**
   - Format the final ASCII plot to fit typical terminal widths and heights, with options to adjust resolution via additional flags if needed.
   - Provide clear, formatted output in the terminal, including axis labels for enhanced readability.

4. **Error Handling and Feedback:**
   - Use the existing error handling for numeric input validation to ensure that the plotted data is accurate.
   - Output informative messages in case of invalid input or if the plot exceeds predefined dimensions.

5. **Testing and Documentation:**
   - **Unit Tests:** Add tests to verify that the ASCII mode correctly transforms numeric plot data into text output and that invalid inputs produce appropriate error messages.
   - **Documentation:** Update the README and contributing guidelines with examples on how to launch and use the ASCII plotting mode. For example:
     ```bash
     node src/lib/main.js --ascii "sine:1,1,0,0,360,30"
     ```

## Usage
- **Launch in ASCII Mode:**
  ```bash
  node src/lib/main.js --ascii output.txt "quad:1,0,0,-10,10,1"
  ```
- **Expected Behavior:**
   - The tool processes the mathematical expression and renders the plot as a grid of ASCII characters in the terminal or specified text file.
   - The output includes clear axis representations and the plotted function rendered using character symbols.
