# CHAT_ISSUES Feature Specification

## Description
This feature adds a Chat Completions integration that leverages our existing OpenAI dependency to generate a series of GitHub issues based on a natural language prompt. The goal is to allow users or automated systems to supply a description of improvements, bug fixes, or new capabilities, and receive a structured series of issues that can be further refined and iteratively implemented. This aligns with our mission of being the go-to plot library and the jq of formulae visualisations, by streamlining project management and feature planning.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--chat`) to activate the Chat Completions mode.
   - When used, the application will accept an additional argument containing the natural language prompt for feature or issue generation.
   - Extend the existing argument parser in `src/lib/main.js` to detect and route this flag to the Chat Issues module.

2. **Chat Completions API Integration:**
   - Utilize the already included `openai` package to interact with the Chat Completions API.
   - Construct a request that includes the user-supplied prompt and guidelines from the CONTRIBUTING.md and MISSION.md files to ensure that generated issues align with our project standards and mission.
   - Handle authentication and error states correctly, ensuring sensitive API keys are managed via environment variables (e.g., using dotenv).

3. **Issue Generation and Formatting:**
   - Parse the Chat Completions response to extract a series of structured issue descriptions.
   - Each issue should include a title, a brief description, and implementation suggestions.
   - Optionally, an output format like JSON or markdown can be specified for further processing.

4. **Integration with Existing Pipelines:**
   - Ensure the generated issues can be seamlessly integrated into our GitHub workflow. For example, consider outputting the issues in a format that can be easily imported via GitHub's API or a templating tool.
   - Maintain consistency with the current project structure and update the documentation accordingly.

5. **Testing and Documentation:**
   - Add unit tests to simulate API responses and validate issue parsing logic.
   - Develop integration tests to ensure that the CLI flag correctly triggers the Chat Issues workflow and that the output adheres to expected formats.
   - Update the README and CONTRIBUTING.md with sample usage instructions and troubleshooting guidelines.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --chat "Improve plotting performance for large datasets and add modular extensions for future plot types."
  ```
- **Expected Behavior:**
   - The tool sends the supplied prompt to the Chat Completions API.
   - A series of potential GitHub issues is generated, covering aspects such as performance improvements, modular code adjustments, and test coverage enhancements.
   - The output is displayed in the terminal or optionally saved to a file for further review.