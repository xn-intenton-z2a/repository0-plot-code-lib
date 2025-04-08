# CHAT_ISSUES Feature Specification

## Description
This feature integrates a Chat Completions API into our plotting tool to automatically convert natural language prompts into well-structured GitHub issues. Users can submit descriptive prompts that will be processed into actionable issues complete with implementation details, testing guidelines, and documentation adjustments. The generated issues adhere strictly to our CONTRIBUTING guidelines and align with our mission to be the go-to plot library for formula-based visualisations.

## Motivation
- **Automated Issue Creation:** Streamline project management by reducing manual effort in translating ideas into actionable tasks.
- **Consistency & Quality:** Ensure that every generated issue follows repository standards, maintaining uniformity and clarity across development tasks.
- **Iterative Improvement:** Support an interactive, multi-step dialogue where users can refine the generated issues via follow-up prompts, ensuring comprehensive and precise issue details.

## Implementation Details
1. **CLI and Web Interface Integration:**
   - Introduce a `--chat` flag for the CLI to accept natural language prompts.
   - Extend the web interface with a dedicated section for chat-based issue generation, allowing users to input and iteratively refine prompts.
   - Sanitize and validate all input to maintain security and adherence to repository guidelines.

2. **Chat Completions API Integration:**
   - Utilize the `openai` package to send the prompt along with contextual guidelines (drawn from CONTRIBUTING.md and MISSION.md) to the Chat Completions API.
   - Secure API credentials via environment variables and implement robust error handling for network and authentication issues.

3. **Issue Generation and Formatting:**
   - Parse the API response to extract a list of structured GitHub issues. Each issue will include a clear title, detailed description, and actionable suggestions categorized by implementation, testing, and documentation updates.
   - Support output in both Markdown and JSON formats to facilitate integration with GitHub workflows.
   - Implement an iterative dialogue feature that allows users to send follow-up prompts to further refine the generated issues.

4. **Enhanced Customization:**
   - Enable customizable templates for issue generation, allowing users to modify tone, formatting, and include metadata such as labels and priority tags.
   - Record and log all interaction details for debugging purposes and to improve future iterations of issue generation.

5. **Testing and Documentation:**
   - Develop comprehensive unit and integration tests simulating API interactions and verifying that all generated issues meet repository standards.
   - Update the README and CONTRIBUTING guidelines with detailed usage examples, configuration instructions, and troubleshooting tips for the CHAT_ISSUES feature.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --chat "Add modular API for data transformation with iterative refinement to incorporate user feedback"
  ```
- **Web Interface Example:**
  Access the chat-based issue generator through the web interface's dedicated section, allowing users to submit prompts and review generated GitHub issues with options for iterative improvements.

This enhanced CHAT_ISSUES feature not only automates the creation of detailed GitHub issues but also supports an interactive dialogue to ensure every generated issue is as clear, complete, and actionable as possible.