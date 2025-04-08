# CHAT_ISSUES Feature Specification

## Description
This feature integrates a Chat Completions API into the plotting tool. It automates the transformation of natural language prompts into fully formed, well-structured GitHub issue drafts. Users can submit descriptive prompts for new functionalities, bug reports, or improvements, and the system will return actionable issue templates complete with implementation instructions, testing guidelines, and documentation updates. This integration supports both CLI and web interface interactions, enabling iterative refinements until the drafted issue meets project standards.

## Motivation
- **Streamlined Issue Management:** Convert simple prompts into detailed GitHub issues, reducing manual overhead and ensuring consistency across issues.
- **Iterative Refinement:** Facilitate a dialogue-driven process where users can provide follow-up instructions to refine generated issues, ensuring that the final output is precise and actionable.
- **Enhanced Documentation:** Automatically include details aligned with the project’s CONTRIBUTING guidelines and the mission to be the go-to plot library for formula-based visualisations.
- **Mission Alignment:** By integrating modern AI-driven assistance, this feature reinforces our commitment to innovation and usability, helping maintain a high standard in issue quality and project management.

## Implementation Details
1. **API Integration and Input Processing:**
   - Introduce dedicated CLI and web interface options (e.g., a `--chat` flag on the CLI and a chat submission field in the web interface) to gather natural language prompts.
   - Sanitize and validate inputs to ensure security and proper formatting.
   - Enrich the user-provided prompt with contextual information drawn from core repository files (e.g., CONTRIBUTING.md, MISSION.md) to guide the generated issues.

2. **Chat Completions Engine:**
   - Connect with the OpenAI Chat Completions API using securely managed credentials (via environment variables).
   - Parse the API response to extract a set of actionable GitHub issues. Each issue draft should include a title, detailed description, actionable steps, testing guidelines, and links or references to relevant documentation.
   - Support output in Markdown and JSON formats for seamless integration with GitHub and other project management tools.

3. **Iterative Dialogue and Customization:**
   - Implement an interactive dialogue mechanism allowing users to submit follow-up prompts to further refine the generated issues.
   - Allow users to adjust issue templates, tone, and metadata (such as labels and priority) either directly through the initial prompt or via subsequent commands.
   - Log the interaction history to support debugging and continuous improvement of the issue generation process.

4. **CLI and Web Interface Enhancements:**
   - For the CLI, add a flag (e.g., `--chat`) that directs the tool to process the provided natural language prompt and output the generated issue drafts in the terminal.
   - For the web interface, create a dedicated section where users can input their prompt, view the generated issues in real-time, and interactively refine them before submission to GitHub.

5. **Testing and Documentation:**
   - Develop unit and integration tests to simulate API interactions and ensure that the generated issues adhere to repository standards.
   - Update the README and CONTRIBUTING documentation with detailed usage examples and configuration instructions.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --chat "Implement modular API for real-time data transformation with iterative feedback."
  ```

- **Web Interface Example:**
   - Navigate to the chat issue generation section.
   - Submit a descriptive prompt via the provided input field.
   - Review the generated GitHub issue drafts, refine as necessary through follow-up prompts, and then export or submit the final version directly.
