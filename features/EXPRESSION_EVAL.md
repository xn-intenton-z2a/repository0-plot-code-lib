# EXPRESSION_EVAL Feature Enhancement

This feature enhances the CLI tool by robustly evaluating mathematical expressions provided via the `--expression` flag. In addition to standard expressions such as `y=sin(x)`, `y=cos(x)`, `y=tan(x)`, and others, this update introduces support for piecewise expressions and custom function definitions. 

# Overview

- **Objective:** Expand the expression evaluation capabilities to accommodate complex mathematical formulations. Users can now specify piecewise expressions by prefixing their input with `piecewise:`. In a piecewise expression, multiple conditional segments can be defined, allowing different functions to be applied based on the input value. Additionally, the tool supports custom functions supplied either as native JavaScript functions or as string representations, enabling further flexibility. 

- **Benefit:** By supporting piecewise expressions and custom functions, the CLI tool becomes significantly more powerful and user-friendly, aligning with the mission to be the "jq of formulae visualisations." This change allows for more intricate and diverse mathematical representations without altering the core CLI workflow.

# Implementation Details

- **CLI Parameter Parsing:**
  - Extend the argument parser in `src/lib/main.js` to process the `--expression` flag. The input expression may begin with `piecewise:`. 
  - Maintain backward compatibility for standard expressions such as `y=sin(x)`, `y=cos(x)`, etc.

- **Data Processing:**
  - When an expression starts with `piecewise:`, the tool parses the remaining string into conditional segments. Each segment should follow the syntax `if <condition> then <expression>`. The tool evaluates these conditions in sequence and applies the corresponding expression for the first matched condition. If no condition is met, the default value is set to 0.
  - For standard expressions, the function evaluates the expression using preset conditions (e.g., mapping `y=sin(x)` to `Math.sin(x)`).
  - Custom functions may be provided via the `--custom-functions` option. These can be defined as native functions or as strings that are evaluated into functions dynamically.

- **Error Handling:**
  - The feature validates the range provided via the `--range` flag. If the range does not match the expected format (e.g., "x=start:end"), an error is thrown.
  - For expressions that do not match any recognized pattern or when no conditions are matched in a piecewise definition, the output defaults to 0.

# Testing Enhancements

- **Unit Tests:**
  - Update the test suite (in `tests/unit/main.test.js`) to include scenarios where piecewise expressions are provided. 
  - Verify that given boundaries, conditions are correctly evaluated – for example, if `x < 0`, the function computes `sin(x)`, and if `x >= 0`, it computes `cos(x)`.
  - Tests must also verify that custom functions (both as strings and functions) return the expected outputs.

# Documentation Updates

- **README.md:**
  - Update the documentation to include examples of piecewise expressions. 
  - Include usage examples such as:
    ```sh
    node src/lib/main.js --expression "piecewise: if x < 0 then sin(x); if x >= 0 then cos(x)" --range "x=-1:1" --file output.svg
    ```
  - Document the custom functions option to illustrate how users can override or add new mathematical functions.

# Conformance with Mission and Guidelines

- All modifications are confined to existing source files, test files, README, and dependency files, following repository guidelines.
- This enhancement aligns with the mission to be a go-to plot library by increasing the expressiveness and flexibility of the formula input mechanism.
- The updated feature does not create new files, but improves the core evaluation functionality to handle more complex cases, thereby distinguishing itself within the repository's feature set.
