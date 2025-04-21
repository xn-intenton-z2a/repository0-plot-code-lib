# Expression Evaluation Enhancement

This update consolidates and extends the functionality for evaluating mathematical expressions. It merges the previously separate features handling basic expressions and extended expressions (including piecewise definitions and custom functions) into a single, robust evaluation module. The updated feature supports conventional expressions such as `y=sin(x)`, as well as piecewise expressions provided with the `piecewise:` prefix. It also allows users to specify custom functions, either as inline JavaScript strings or via a JSON object, to further customize the evaluation process.

## Overview

- **Objective:** Merge and enhance the expression evaluation capability to support both standard and advanced mathematical expressions within a single feature. This includes support for piecewise expressions, extended function sets (e.g., cosine, tangent, logarithm, etc.), and user-defined custom functions.
- **Benefit:** Simplifies the codebase by combining similar evaluation functionalities and provides a unified API for expression handling. Users can now provide complex expressions in a single format and get reliable time series data as output.

## CLI Parameter Parsing & Validation

- Extend the argument parser to accept the `--expression` flag that now supports multiple expressions separated by semicolons. The tool will parse these expressions and determine if they should be handled by the standard evaluator or by the piecewise handler (when prefixed with `piecewise:`).
- Validate the input expression format and range using regular expressions. If the range does not conform to the expected format (e.g., `x=start:end`), the feature throws a clear error message.

## Implementation Details

- **Standard Expressions:** When an expression such as `y=sin(x)` is provided, the function computes the result using built-in Math functions.
- **Extended Expressions:** The evaluator now supports additional expressions like `y=cos(x)`, `y=tan(x)`, `y=log(x)`, `y=exp(x)`, `y=x^2`, `y=sqrt(x)`, etc.
- **Piecewise Support:** If the expression starts with the keyword `piecewise:`, the evaluator splits the expression into segments. Each segment is expected in the format `if <condition> then <expression>`. The evaluation function iterates through these segments, evaluates the condition for a given x value, and applies the corresponding expression if the condition is met. If none match, it defaults to `0`.
- **Custom Functions:** Users can supply additional custom functions either via the CLI using a JSON string or through YAML configuration. Custom functions can be provided as function definitions or strings that are evaluated into functions.
- **Merging Workflow:** This feature supersedes the previously separate EXPRESSION_EVAL and EXPRESSION_EXT capabilities by providing a single, unified approach.

## Testing Enhancements

- Unit tests have been updated in `tests/unit/main.test.js` to simulate various expression inputs including standard, extended, and piecewise expressions. New test cases verify the correct parsing and evaluation of piecewise conditions and custom function handling.
- Tests ensure that edge cases, such as invalid expression formats or out-of-bound ranges, are appropriately reported to the user, and that no unexpected exceptions occur during evaluation.

## Documentation Updates

- The README and internal documentation are updated to reflect the new unified expression evaluation API. Usage examples now demonstrate how to provide multiple expressions and piecewise definitions.
- Documentation clearly explains how users can provide custom functions, with detailed examples for both inline JavaScript expressions and JSON-based configuration.

## Conformance with Mission and Guidelines

- **Repository Constraints:** All updates are confined to modifications in the source file, test file, README, and dependencies file. No new files are created or deleted.
- **Mission Alignment:** The enhanced expression evaluation functionality drives the mission to be a go-to plot library by simplifying user input and providing precise, on-demand evaluations of mathematical expressions for visualization.
- **Integration:** This feature integrates seamlessly with the existing CLI, allowing users to plot both standard and advanced expressions without altering their workflow.
