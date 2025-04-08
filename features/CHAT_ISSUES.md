# CHAT_ISSUES Feature Specification

## Description
This feature integrates a Chat Completions API into the plotting tool to streamline issue management. It automates the transformation of natural language prompts into fully formed, well-structured GitHub issue drafts. Users can submit descriptive prompts for new functionalities, bug reports, or improvements, and the system will return actionable issue templates complete with implementation instructions, testing guidelines, and documentation updates. The feature supports both CLI and web interface interactions, and has been updated to incorporate an iterative dialogue process that allows users to refine and finalize issue drafts interactively.

## Motivation
- **Streamlined Issue Management:** Reduce manual overhead by converting simple prompts into detailed GitHub issues that adhere to project standards.
- **Iterative Refinement:** Facilitate a dialogue-driven process that improves the quality of generated issues by allowing incremental user feedback and adjustments.
- **Enhanced Documentation:** Automatically include details aligned with the project’s CONTRIBUTING guidelines and MISSION, ensuring consistency and comprehensive guidance.
- **Mission Alignment:** By integrating modern AI-driven assistance, this feature reinforces our commitment to being the go-to plotting library for formula-based visualisations.

## Implementation Details
1. **API Integration and Input Processing:**
   - Introduce dedicated CLI and web interface options (e.g., a `--chat` flag on the CLI and a chat submission field on the web interface) to capture natural language prompts.
   - Sanitize and validate inputs to ensure security and proper formatting.
   - Enrich user-provided prompts with contextual information drawn from core repository documents (e.g., CONTRIBUTING.md, MISSION.md) to produce high-quality issue drafts.

2. **Chat Completions Engine:**
   - Connect securely to the OpenAI Chat Completions API using managed credentials.
   - Parse the API response to extract a set of actionable GitHub issues. Each draft includes a title, detailed description, actionable steps, testing guidelines, and links to relevant documentation.
   - Support output in both Markdown and JSON formats for seamless integration with GitHub and other project management tools.

3. **Iterative Dialogue and Customization:**
   - Implement an interactive dialogue mechanism allowing users to submit follow-up prompts to further refine generated issues.
   - Allow adjustments in issue templates, tone, and metadata (such as labels and priority) either through the initial prompt or via subsequent commands.
   - Log interaction history to support debugging and continuous improvement of the issue generation process.

4. **CLI and Web Interface Enhancements:**
   - For the CLI, add the `--chat` flag that directs the tool to process provided natural language prompts and output the generated issue drafts in the terminal.
   - For the web interface, create a dedicated section where users can input their prompt, view generated issues in real time, and interactively refine them before submission.

5. **Testing and Documentation:**
   - Develop comprehensive unit and integration tests to simulate API interactions and verify that generated issues adhere to repository standards.
   - Update the README and CONTRIBUTING documents with detailed usage examples, configuration instructions, and troubleshooting guidelines.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --chat "Implement modular API for real-time data transformation with iterative feedback."
  ```

- **Web Interface Example:**
   - Navigate to the chat issue generation section on the web interface.
   - Submit a descriptive prompt via the provided input field.
   - Review and refine the generated GitHub issue drafts interactively before exporting or submitting the final version.
