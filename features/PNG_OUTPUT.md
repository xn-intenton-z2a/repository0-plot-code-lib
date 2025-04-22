# PNG_OUTPUT Feature Enhancement

This update introduces PNG plot output to enhance the CLI functionality. In addition to generating SVG plots, the tool will now detect if the user requests a PNG output via the file parameter and automatically convert the generated SVG to a PNG image. This aligns with our mission to be a go-to plot library by supporting multiple output formats.

# CLI Parameter Parsing & Validation

- Update the CLI argument parsing in `src/lib/main.js` to inspect the `--file` parameter. If the output file extension is `.png`, the tool will trigger the PNG conversion process.
- Validate that, when a `.png` file is specified, the user-provided expression and range remain valid.
- If no file parameter is provided or if its extension is not `.png`, the tool will proceed with the default SVG output routine.

# Implementation Details

- **Source Modifications:**
  - In `src/lib/main.js`, add logic to detect the file extension of the output file. If a `.png` extension is detected, first generate the SVG using the existing process (as in the D3PLOT feature) and then convert it to PNG using the conversion routine.
  - Integrate the `sharp` library as a dependency for converting SVG to PNG. Use asynchronous routines to ensure that the conversion does not block the CLI execution.

- **Testing Enhancements:**
  - Update `tests/unit/main.test.js` to include tests which simulate passing a `--file output.png` parameter. The tests should verify that the conversion routine is triggered and that the PNG output is produced as expected (this can be a simulated check without actual file writing).

- **Documentation Updates:**
  - Update the `README.md` to document the new PNG output feature. Include usage examples such as:

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.png
  ```
  - Explain that when the output file ends with `.png`, the CLI tool converts the generated SVG plot into a PNG image.

- **Dependency & Build Consistency:**
  - Add the `sharp` package to the `dependencies` in `package.json` to facilitate the image conversion. This ensures compatibility with Node 20 and adheres to contemporary standards.

# Summary

The PNG_OUTPUT enhancement provides an additional output option that meets user needs for different image formats. The implementation builds upon existing output functionalities by adding conditional conversion using the `sharp` library. This change is isolated to existing source, test, README, and dependencies without creating new files.
