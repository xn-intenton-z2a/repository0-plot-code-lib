# CLI_WIZARD Feature

## Overview
Enhance the interactive CLI wizard to not only guide users through choosing plot types and configuring advanced options but also to provide integrated, context-sensitive help. This upgrade builds on the existing CLI_WIZARD functionality by leveraging robust numeric parameter validation and formula parsing from the CORE_ENGINE, ensuring a seamless and user-friendly configuration process.

## Key Enhancements
- **Interactive Prompts and Real-time Validation:**
  - Provide step-by-step guidance for selecting plot types (e.g., spiral, polarHeatmap, dualAxis) and entering advanced numeric parameters.
  - Reuse Core Engine routines to validate numeric inputs, including strict handling of NaN aliases and locale-specific number formatting.
  - Immediately flag input errors and offer suggestions to correct invalid entries.

- **Context-Sensitive Help System:**
  - Implement an on-demand help command (e.g., typing "help") during the wizard to display detailed usage instructions similar to those in the README and CONTRIBUTING guidelines.
  - Offer dynamic examples and tips based on the current wizard context, such as valid numeric formats, JSON configuration examples, and common troubleshooting advice.
  - Ensure help content is contextually aware, adapting to whether the user is configuring standard plot parameters or advanced JSON configurations.

- **Integrated User Experience:**
  - Maintain backward compatibility with existing CLI flag-based invocations while providing enhanced interactive assistance for less experienced users.
  - Ensure that both CLI and web API endpoints receive unified interactive guidance, reinforcing the library’s mission as the go-to tool for formula visualizations.

## Implementation Roadmap
1. **Module Enhancements:**
   - Update the `src/lib/cliWizard.js` module to integrate help command triggers that display contextually relevant instructions.
   - Incorporate real-time feedback hooks that utilize the existing validation logic from CORE_ENGINE.
2. **Testing and Documentation:**
   - Extend unit and integration tests (e.g., in `tests/unit/main.test.js`) to cover interactive help functionalities and input validation scenarios.
   - Update documentation in `README.md` and `CONTRIBUTING.md` with detailed examples of using the interactive help features.

## Benefits
- **Improved Usability:** Users enjoy a smoother setup experience with guided prompts and immediate, helpful feedback on configuration errors.
- **Error Reduction:** Clear in-context help reduces common mistakes and accelerates the learning curve for new users.
- **Enhanced Consistency:** A unified interactive experience across CLI and web interfaces strengthens the library’s mission to be the definitive plotting tool.
