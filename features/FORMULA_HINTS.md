# FORMULA_HINTS Feature Specification

## Overview
This feature introduces a smart formula validation and suggestion mechanism. When users input a mathematical formula that fails to parse or returns an error, the system analyzes the input to provide corrective suggestions. This feature enhances the usability of the plotting library by reducing errors and helping users discover correct syntax and common formulas.

## Implementation Details
### Integration with Existing Parsers
- **Error Interception:** Hook into the formula evaluation process (using mathjs) to catch parsing errors or unrecognized tokens.
- **Suggestion Engine:** Implement a lightweight suggestion engine that compares the input formula against a list of valid function names (e.g., sin, cos, tan, log, etc.) and common patterns. Use string similarity metrics (like Levenshtein distance) to propose alternatives.
- **Feedback Mechanism:** When a formula is invalid, return a clear error message along with one or two suggestions for a corrected formula.

### CLI and Library Support
- **CLI Integration:** Enhance the CLI interface (in `src/lib/main.js`) to display suggestion messages when an invalid formula is provided. This ensures immediate feedback during interactive sessions and dry-run simulations.
- **Library API:** Expose a helper function (e.g., `validateFormula(formula)`) that can be imported into user projects to pre-validate and suggest corrections prior to plotting. This function will seamlessly integrate with existing validation logic in the plotting engine.

### Testing and Documentation
- **Unit Tests:** Create tests to validate the suggestion logic for various invalid inputs. Ensure that for typos or minor errors, the most relevant suggestions are provided.
- **Documentation:** Update README.md and CONTRIBUTING.md with examples on how to use the formula hints feature. Provide examples of common mistakes and their recommended corrections.

## Benefits
- **User Assistance:** Reduces frustration by immediately suggesting fixes for common input errors.
- **Improved Success Rate:** Enhances the likelihood of successful plot generations by proactively catching formula mistakes.
- **Educational Value:** Educates users on proper syntax and common functions, reinforcing the mission to be the go-to plot library for formula visualisations.
