# FORMULA_HINTS Feature Specification (Enhanced with Context-Aware Suggestions)

## Overview
This enhancement refines the smart formula validation and suggestion mechanism to provide context-aware corrections. In addition to intercepting and analyzing formula parse errors, the updated FORMULA_HINTS feature leverages user history and custom function definitions to offer more relevant and precise suggestions. This improvement reinforces our mission by reducing user errors and aiding exploration of correct mathematical syntax.

## Enhanced Suggestion Engine
- **Context-Aware Analysis:** In addition to using string similarity measures (e.g., Levenshtein distance), the engine now references the HISTORY_MANAGER to incorporate commonly corrected formulas. Frequently used functions and user-specific patterns are considered when generating suggestions.
- **Custom Function Support:** Allows users to extend the set of valid function names by supplying custom definitions through a configuration file or directly via CLI flags. The suggestion engine respects these additions during its validation process.
- **Dynamic Feedback:** Suggestions include links to documentation excerpts and examples, enabling users to further educate themselves on correct syntax and potential pitfalls.

## Integration with Existing Systems
- **CLI and Library API:** The enhanced suggestion mechanism remains integrated with the CLI interface (via `src/lib/main.js`) and exposed as a library function (`validateFormula(formula)`). Error messages now include a context summary extracted from recent history and previous corrections.
- **Testing & Adaptability:** Extensive unit tests are incorporated to simulate a range of input errors, ensuring that the additional context improves suggestion accuracy. Tests include scenarios with both default and custom function sets.
- **Documentation:** Updates are made to README.md and CONTRIBUTING.md to present detailed usage examples, configuration instructions for custom functions, and troubleshooting tips for users.

## Benefits
- **Improved Accuracy:** By analyzing user history and custom configurations, suggestions become more tailored and relevant.
- **Reduced User Frustration:** More actionable error messages and examples assist users in quickly correcting their formulas.
- **Educational Value:** Integrated links to documentation and usage examples enhance user understanding and promote best practices in formula entry.

## Summary
This update to FORMULA_HINTS consolidates the error detection and suggestion process by introducing context-aware capabilities and custom function support. It remains fully integrated with both the CLI and library APIs, ensuring an improved and user-friendly plotting experience.
