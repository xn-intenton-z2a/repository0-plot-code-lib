# FORMULA_ASSIST Feature Specification (Enhanced with Chat Integration)

## Overview
This feature consolidates expression tracing, formula hinting, and auto-correction while introducing a new interactive Chat Integration powered by the OpenAI API. In addition to providing a detailed, step-by-step breakdown of math expression evaluations and intelligent auto-corrections, this enhancement enables users to engage in real-time conversational assistance. Users can ask for clarifications, debugging tips, and alternative formula suggestions directly from the CLI or via an optional HTTP endpoint, reinforcing our mission to be the go-to plot library for formula visualisations.

## Implementation Details
- **Integrated CLI Flags:**
  - `--trace`: Enables detailed logging of the evaluation process including parsing, unit conversion, and intermediate calculations.
  - `--autocorrect`: Activates auto-correction for common formula mistakes with a preview prompt.
  - `--chat`: Launches an interactive chat session where users can input queries about formula errors or request suggestions. This session leverages the OpenAI API to generate context-aware responses.

- **Core Functionality:**
  - **Expression Trace:** Logs all evaluation steps while offering an optional HTTP endpoint (e.g., `GET /trace?formula=<formula>`) for remote debugging.
  - **Context-Aware Hints:** Provides intelligent suggestions and corrections using both pre-defined algorithms and real-time feedback through chat integration.
  - **Auto-Correction:** Suggests safe corrections by previewing the modified formula, which the user can confirm before execution.
  - **Chat Integration:**
    - Implements a lightweight module (e.g., `src/lib/formulaAssist.js`) that interfaces with the OpenAI API using the `openai` library and environment-based API keys via `dotenv`.
    - Supports both blocking CLI sessions and an optional HTTP endpoint to fetch chat-based advice (e.g., `GET /chat?query=<input>`).
    - Enhances user interaction by offering detailed explanations, usage examples, and alternative suggestions in natural language.

## Testing and Documentation
- **Unit Tests:**
  - Verify that the `--trace` mode outputs detailed and correct evaluation logs without performance degradation.
  - Test scenario-based responses from the chat integration by mocking OpenAI API calls to ensure context-aware and accurate suggestions.
  - Validate that auto-correction suggestions are generated properly and logged for auditing.
- **Integration Tests:**
  - Simulate complete CLI command flows integrating trace, autocorrect, and chat functionality.
  - Ensure that HTTP endpoints for trace and chat deliver correct and consistent responses.
- **Documentation Updates:**
  - Update README.md and CONTRIBUTING.md with comprehensive usage examples covering the new `--chat` flag.
  - Provide troubleshooting tips and detailed descriptions of how to set up environment variables for the OpenAI API.

## Benefits
- **Enhanced Debugging and Learning:** The integrated chat system provides on-demand, interactive help, reducing the time for diagnosing formula errors and understanding corrective suggestions.
- **Improved Usability:** Real-time conversation-based assistance simplifies complex debugging scenarios, especially when combined with existing auto-correction and expression tracing.
- **Seamless Integration:** Embedding chat capabilities into the existing formula assist module keeps the architecture lean, maintainable, and in line with the repository's mission.

## Summary
The updated FORMULA_ASSIST feature not only maintains its core capabilities of expression tracing and auto-correction but also significantly enhances the user experience by incorporating an OpenAI API-driven chat integration. This interactive functionality empowers users with immediate, context-aware support, ensuring that our plot library remains the definitive tool for formula visualisations.