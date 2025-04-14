# Interactive Mode Enhancement

## Overview
This feature consolidates and enhances the interactive mode functionality in the CLI tool. It merges the previously separate implementations into a unified, high-quality interactive prompt experience. The interactive mode guides the user to enter required parameters in a step-by-step manner if the `--interactive` flag is provided, ensuring both usability for beginners and backwards compatibility for advanced users.

## Implementation Details
- **Source File Updates (`src/lib/main.js`):**
  - Consolidate interactive mode detection and prompt initialization into a single unified section.
  - Once the `--interactive` flag is detected, launch a guided dialogue using Node's built-in `readline` module to prompt the user for any missing required arguments such as mathematical expression, x-range (and optional y-range), output file, and additional configurations.
  - Merge interactive input responses with any CLI-provided parameters, preserving the original logic for expression evaluation, scaling, and output generation (SVG/PNG/JSON).
  - Integrate input validations (e.g., ensuring x and y values are valid and positive when logarithmic mode is requested) during the interactive session.

- **Test File Updates (`tests/unit/main.test.js`):**
  - Update and expand the interactive mode tests by simulating user inputs via mocked readline responses.
  - Ensure that the interactive mode correctly collects input, merges parameters, and produces consistent output identical to non-interactive flag-based usage.

- **README File Updates (`README.md`):**
  - Update the CLI usage documentation to clearly describe how to utilize the `--interactive` flag.
  - Provide examples with interactive mode and explain the step-by-step prompt flow.

- **Dependencies:**
  - Use only the built-in Node.js `readline` module. No new dependencies are introduced.

## Impact and Benefits
- **User-Friendly Experience:** Provides a guided interface for users unfamiliar with CLI parameters, lowering the entry barrier.
- **Consistency:** Unifies the interactive mode implementation, avoiding duplicate and fragmented documentation and code paths.
- **Backward Compatibility:** Retains current CLI flag behavior when `--interactive` is not present, ensuring that advanced users can continue using the tool as before.
- **Quality Assurance:** Enhanced tests ensure reliable interactive mode operation across all output formats (SVG, PNG, and JSON).

## Future Enhancements
- Incorporate further validations and fallback mechanisms within the interactive prompts to handle edge cases.
- Optionally introduce a configuration store for persisting previous inputs to streamline repeated usage.
