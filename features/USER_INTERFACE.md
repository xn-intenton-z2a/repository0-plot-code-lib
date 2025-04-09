# USER_INTERFACE Feature

## Overview
This feature consolidates the interactive CLI wizard and the web API endpoints into a unified user interface layer. The enhanced USER_INTERFACE now not only provides context-sensitive help, interactive plotting configuration, and real-time feedback for both command-line and web environments, but also introduces a new Plot Preview capability. This preview mode allows users to quickly see a draft view of their plot configuration before executing full rendering (whether static or animated). This merge reinforces our mission to be the go-to tool for formula visualisations by ensuring a consistent, responsive, and informative user experience across all access points.

## Key Enhancements
- **Unified Interaction:**
  - Combines the existing CLI wizard with web API endpoints to offer a seamless, integrated experience.
  - Provides context-sensitive guidance regardless of the user’s interface (command-line or HTTP).
- **Interactive CLI Improvements:**
  - Retains step-by-step prompts, real-time input validation, and integrated help content.
  - Leverages existing numeric validation and formula parsing from the CORE_ENGINE routines.
- **Web API Integration:**
  - Exposes HTTP endpoints (e.g., `/api/plot`, `/api/help`) that mirror CLI functionalities such as plot type selection and parameter configuration.
  - Supports real-time control commands (e.g., start, pause, resume animations) that interface with both PLOT_ANIMATIONS and CORE_ENGINE features.
- **Plot Preview Capability:**
  - Introduces a new preview mode which enables users to view a thumbnail or draft version of the plot before committing to full rendering.
  - Integrates with both the CLI (via a new flag or command) and the web interface (via a dedicated preview endpoint) to offer fast, low-overhead feedback.
  - Helps users verify their configuration, theme, and parameter choices in real time, improving overall usability and reducing potential errors.
- **Enhanced Documentation & Testing:**
  - Updates the README and CONTRIBUTING guidelines to include usage examples for the new preview functionality.
  - Extends unit and integration tests to cover preview scenarios along with traditional CLI and HTTP interactions.

## Implementation Roadmap
1. **Refactor CLI Wizard:**
   - Update the existing CLI module to incorporate a preview mode activated via a new flag (e.g., `--preview`).
   - Merge the help and configuration logic to also return a simplified plot preview before a full render is triggered.
2. **Develop Web Endpoints:**
   - Create a dedicated HTTP endpoint (e.g., `/api/preview`) that processes preview requests and returns a lightweight, draft version of the plot.
   - Ensure that the preview endpoint leverages the same configuration and CORE_ENGINE routines as the full render endpoints.
3. **Integration & Synchronization:**
   - Ensure that both CLI and Web interactions use the unified routines from CORE_ENGINE.
   - Synchronize preview output with the dynamic rendering options provided through PLOT_ANIMATIONS, while keeping resource usage low.
4. **Testing & Documentation:**
   - Expand test coverage to validate both interactive preview responses and web API preview outputs.
   - Update documentation with details on how to invoke and utilize preview mode, including examples for both CLI and HTTP usage.

## Benefits
- **Consistency:** A single interface for both full rendering and preview ensures users have a familiar and efficient workflow.
- **Reduced Errors:** Users can verify plot configurations through a quick preview, reducing the chance of misconfigurations.
- **Enhanced Accessibility:** The preview mode makes the tool more user-friendly for both novice and advanced users by providing immediate visual feedback.
- **Streamlined Maintenance:** Consolidating similar functionalities into one module reduces code duplication and simplifies future enhancements.
