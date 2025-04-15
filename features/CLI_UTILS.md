# CLI UTILITIES ENHANCEMENT

This feature consolidates extra CLI flags into a single unified utility feature. It merges the existing diagnostics mode with a new version display functionality, thereby streamlining CLI feedback and debugging support.

## Overview

- **Diagnostics Mode:** Continues to output key runtime information (Node.js version, dependency confirmation, and environment details) when the `--diagnostics` flag is present.
- **Version Information:** Adds a new `--version` flag that displays the current version of the application as specified in `package.json`.

## Implementation Details

### Source File (`src/lib/main.js`)

- Modify the CLI entry point to detect the `--version` flag. When present, read the version (by importing or reading from `package.json`) and log it, then terminate execution immediately.
- Retain the existing diagnostics functionality triggered by the `--diagnostics` flag.
- Ensure the new flag handling coexists gracefully with the existing parameter parsing for plotting operations.

Example snippet:
```js
if (parsedArgs.version) {
  // Option 1: Directly import package.json if allowed, or hardcode version string from package.json
  import pkg from '../../package.json' assert { type: 'json' };
  console.log(`Version: ${pkg.version}`);
  return;
}
```

### Test File (`tests/unit/main.test.js`)

- Add tests to verify that invoking the CLI with `--version` outputs the version string and exits correctly.
- Ensure that tests for the `--diagnostics` flag remain intact.

Example test case:
```js
import { main } from '@src/lib/main.js';

describe('CLI Utilities', () => {
  test('should display version when --version is passed', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    main(['--version']);
    // Expect output to contain the version number (example expected version can be adapted based on package.json)
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/^Version: \d+\.\d+\.\d+/));
    consoleSpy.mockRestore();
  });
});
```

### README Updates (`README.md`)

- Document the new `--version` flag under the CLI usage section:
  - Explain that running `node src/lib/main.js --version` will output the app version.
  - Provide an example snippet in the documentation along with the diagnostics usage.

### Dependencies (`package.json`)

- No dependency updates are required. Ensure changes conform to Node 20 and ESM standards.

## Benefits

- **Enhanced Transparency:** Users can quickly confirm the application version, aiding in debugging and compatibility verification.
- **Unified CLI Enhancements:** Combining diagnostics and version info into one feature simplifies user commands and maintenance.
- **Improved User Confidence:** Version output reassures users about the current release they are interacting with.
