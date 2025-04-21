# AI_ASSIST Feature Enhancement

This feature introduces an AI-assisted mode that leverages the OpenAI API to help users generate appropriate mathematical expressions and ranges for plotting based on natural language descriptions. With the new CLI flag `--ai-assist`, users can provide a free-form description (using the `--description` flag) and the tool will query the OpenAI API to derive a valid expression (e.g. `y=sin(x)`) and a corresponding range (e.g. `x=0:6.28`).

## Overview

- **Objective:** Simplify plot creation by enabling users to describe the plot they need in plain language. The feature then automatically translates the description into a mathematical expression and range to generate the plot.

- **Benefit:** Lowers the barrier for non-expert users and enhances the usability of the CLI. Embraces the mission of being the "jq of formulae visualisations" by incorporating intelligent assistance.

## CLI Parameter Parsing & Validation

- Extend the argument parser in the source file (`src/lib/main.js`) to include a new boolean flag `--ai-assist` and a string parameter `--description`.

- When `--ai-assist` is active along with a provided description, bypass standard expression input. Instead, call the OpenAI API using the existing `openai` dependency to get a suggested mathematical expression and range. 

- Validate that the API response contains both an expression (e.g., in the format `y=sin(x)`) and a range (e.g., `x=0:6.28`). If the response is invalid or the API call fails, provide a clear error message and fall back to manual input.

## Implementation Details

- **Source Code Updates:**
  - In `src/lib/main.js`, add logic to detect the `--ai-assist` flag. If present, use the OpenAI API (via the `openai` package) to send a prompt constructed from the user's description provided by `--description`.
  - Parse the response from the API to extract a valid expression and range. Use these generated values in place of the standard `--expression` and `--range` options.
  - Ensure that all other functionalities (such as CSV, SVG, PNG export) behave correctly with the AI-generated parameters.

- **Error Handling:**
  - If the API call fails (network issues, invalid key, etc.), log an appropriate error and exit with a non-zero status or revert to standard mode if possible.

## Testing Enhancements

- **Unit Tests:**
  - Update the test file (`tests/unit/main.test.js`) to include scenarios where `--ai-assist` and `--description` are provided. Mock the OpenAI API call so that predictable outputs are returned (e.g., a fixed mapping to `y=sin(x)` and `x=0:6.28`).
  - Verify that when these flags are active, the tool generates the expected plot output and logs the correct AI assistance message.

## Documentation Updates

- **README.md:**
  - Add a new section documenting the `--ai-assist` feature with usage examples:
    ```sh
    node src/lib/main.js --ai-assist --description "Plot the sine function over one period"
    ```
  - Explain that when this flag is enabled, the tool uses OpenAI to suggest the best-fit mathematical expression and range based on the provided description.

## Conformance with Mission and Guidelines

- **Repository Constraints:**
  - All changes are confined to modifications in the source file (`src/lib/main.js`), test file (`tests/unit/main.test.js`), and the README. No new files are created or deleted.
  - This feature leverages the already available `openai` dependency for AI-based assistance.

- **Mission Alignment:**
  - By integrating AI assistance, the library further distinguishes itself as a go-to tool for formula visualisations, empowering users to generate plots with natural language descriptions.
