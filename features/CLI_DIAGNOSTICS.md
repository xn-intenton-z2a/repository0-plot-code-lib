# CLI_DIAGNOSTICS Enhancement

## Overview
This feature adds a diagnostics mode to the CLI tool. When the user provides the `--diagnostics` flag, the tool will bypass the normal plotting execution and instead output key runtime information. The diagnostics output includes the Node.js version, operating system platform, and a snapshot of important environment variables loaded from the `.env` file. This feature enhances debuggability and transparency, aligning with our mission to be the go-to plot library by empowering both users and developers with quick system insights.

## Implementation Details

### Source File (`src/lib/main.js`)
- **CLI Argument Parsing:**
  - Update the `parseCLIArgs` function to recognize the `--diagnostics` flag, setting a new parameter (e.g. `diagnostics: false` by default) to true when the flag is encountered.
  - Example addition:
    ```js
    case "--diagnostics":
      params.diagnostics = true;
      break;
    ```

- **Diagnostics Mode Execution:**
  - At the beginning of the `main` function, check if `params.diagnostics` is true. If so, gather and output diagnostics information:
    - Node.js version (`process.version`)
    - Operating system platform (`process.platform`)
    - Relevant environment variables (such as `SVG_WIDTH`, `SVG_HEIGHT`, etc. if available).
    - Optionally, include versions of key dependencies from `package.json` for further insights.
  - Output the diagnostics in a clear, well-structured format and exit the process gracefully.
  - Example snippet:
    ```js
    if (params.diagnostics) {
      console.log('Diagnostics Information:');
      console.log('Node.js Version:', process.version);
      console.log('Platform:', process.platform);
      console.log('Environment Variables:', {
        SVG_WIDTH: process.env.SVG_WIDTH,
        SVG_HEIGHT: process.env.SVG_HEIGHT,
        SVG_PADDING: process.env.SVG_PADDING,
        SVG_POINTS: process.env.SVG_POINTS
      });
      process.exit(0);
    }
    ```

### Test File Update (`tests/unit/main.test.js`)
- Add tests to validate the diagnostics mode functionality:
  - Simulate calling the CLI with the `--diagnostics` flag.
  - Verify that the output contains the expected information (e.g., Node.js version, platform, and key environment variable values).
  - Ensure that when diagnostics mode is enabled, no SVG or PNG generation or file I/O occurs.

### README Update (`README.md`)
- Add a section under CLI options documenting the diagnostics mode:
  - Explain that invoking the tool with `--diagnostics` outputs system and configuration information instead of a plot.
  - Provide an example command:
    ```bash
    node src/lib/main.js --diagnostics
    ```

### Dependencies Update (`package.json`)
- No new dependencies are required. Ensure the `dotenv` dependency continues to be maintained as it supports environment variable loading.

## Impact and Benefits
- **Improved Debuggability:** Users can quickly obtain system and configuration information to diagnose issues.
- **Enhanced Transparency:** Detailed diagnostics output builds user confidence that the tool is correctly installed and configured.
- **Streamlined Troubleshooting:** Developers benefit from having immediate access to key runtime information during support and development.
