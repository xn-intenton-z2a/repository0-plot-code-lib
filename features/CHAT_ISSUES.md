# CHAT_ISSUES Feature Specification

## Description
This feature integrates a Chat Completions API into the plotting tool to automatically generate well-structured GitHub issue drafts. Users can submit natural language prompts—describing new functionalities, improvements, or bug reports—and the system will produce actionable issue templates. These templates include a precise title, step-by-step implementation instructions, testing guidelines, and documentation updates. It supports an iterative dialogue that allows users to refine and finalize issues interactively.

## Motivation
- **Streamlined Issue Management:** Automates the creation of GitHub issues based on descriptive prompts, significantly reducing manual overhead while ensuring consistency with repository standards.
- **Iterative Enhancement:** Facilitates a conversational workflow, allowing developers to incrementally refine the issue details until they accurately capture the intended changes.
- **Mission Alignment:** Supports our mission of being the go-to plot library by integrating advanced, formula-driven visualisation tools with modern, AI-powered development workflows.

## Implementation Details
1. **API Integration and Input Processing:**
   - Introduce a CLI flag (e.g., `--chat`) and a dedicated section in the web interface for submitting natural language prompts.
   - Sanitize user inputs and enrich them with contextual data extracted from the repository’s core documents (e.g., README, CONTRIBUTING, MISSION).

2. **Chat Completions Engine:**
   - Securely connect to the Chat Completions API using managed credentials, ensuring proper handling of API keys and rate limits.
   - Parse API responses to extract structured issue data, including title, description, step-by-step implementation, testing advice, and recommended documentation changes.
   - Log all API interactions to allow review and potential reversion of changes if necessary.

3. **Iterative Dialogue and Customization:**
   - Enable follow-up prompts to further refine the generated issues on parameters such as issue labels, priorities, and additional metadata.
   - Support interactive editing in both the CLI output and the web interface, allowing users to adjust any aspect of the issue before final submission.

4. **CLI and Web Interface Enhancements:**
   - For CLI interactions, display generated issue drafts in the terminal with options for immediate editing or saving as a JSON/Markdown file.
   - In the web interface, provide an interactive editor that includes inline help and tooltips, making it easy for users to modify the draft before submission to GitHub.

5. **Testing and Documentation:**
   - Develop comprehensive tests to simulate various input scenarios and ensure that the generated issues adhere to repository and community standards.
   - Update the README and CONTRIBUTING documents with clear examples and guidelines on how to use the CHAT_ISSUES feature.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --chat "Add support for real-time data filtering with interactive legends."
  ```
- **Web Interface Example:**
   - Navigate to the chat issue generation section in the web UI.
   - Input your descriptive prompt and interactively refine the generated GitHub issue draft before submission.
