# PLOT_ENGINE

## Overview
This update to the PLOT_ENGINE not only retains its role as the core plotting and numerical analysis module but also integrates a robust expression parsing and validation layer. By incorporating an expression parser, the engine can now process and validate plot specification strings (e.g., "quad:1,0,0,-10,10,1", "expr:Math.sin(x)*x:-10,10,0.5") before execution. This enhancement improves error handling, provides clearer feedback to users on malformed inputs, and leverages the mathjs library for complex expression evaluations, all while maintaining backward compatibility with legacy plot specifications.

## Key Objectives
- **Expression Parsing & Validation:**
  - Implement a dedicated parsing component within the PLOT_ENGINE to interpret and validate plot specification strings.
  - Use mathjs to evaluate and transform expressions, ensuring that formulas are syntactically and semantically correct.
  - Provide precise error messages when an expression fails validation, aiding in quick debugging and user guidance.

- **Comprehensive Plot Generation:**
  - Maintain support for traditional and extended plot types (quadratic, linear, sine, cosine, tangent, polar, exponential, logarithmic, dual axis, box, and violin plots).
  - Ensure that numerical analysis (smoothing, derivative, integration, statistical functions) continues to operate seamlessly on validated inputs.

- **Robust Debug Logging & CLI Integration:**
  - Extend existing CLI flags (e.g., --analyze, --debug) to work in concert with the new parsing logic, providing detailed logs of parsing outcomes.
  - Ensure that invalid inputs are handled gracefully without compromising the plotting pipeline.

- **Documentation & Testing:**
  - Update unit tests to cover the new expression parsing functionality.
  - Revise the existing documentation (README and CONTRIBUTING guides) and usage examples to reflect the improvements in error handling and input validation.

## Design & Implementation
### Expression Parsing Module
- **Parser Integration:**
  - Develop a new parser function or module (e.g., `src/lib/parser.js`) to process the raw plot specification string.
  - The parser will analyze prefixes (like "quad:", "expr:" etc.) and parameters, converting them into a structured format for the plotting engine.
  - Implement error-checking routines to detect syntax errors or unsupported operations using mathjs where applicable.

### Modifications to the Plot Engine
- **Input Flow Enhancement:**
  - Update the main plotting routine to invoke the parser before any numerical computations or plotting is performed.
  - If the parser encounters errors, immediately log detailed error messages and stop further processing.

- **Backward Compatibility:**
  - Ensure that legacy plot specifications continue to work without modification, but with the added benefit of improved error handling.
  
### CLI and Logging Improvements
- Enhance CLI routing (in `src/lib/main.js`) so that invalid plot specifications trigger a clear diagnostic output.
- Maintain robust error logging, especially when the `--debug` flag is used.

## Usage Examples
- **Valid Plot Specification with Expression Parsing:**
  ```bash
  node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
  ```

- **Custom Mathematical Expression Validation:**
  ```bash
  node src/lib/main.js output.svg "expr:Math.sin(x)*x:-10,10,0.5"
  ```

- **Debug Mode to Trace Parsing:**
  ```bash
  node src/lib/main.js debug_plot.svg "expr:Math.sin(x)*x:-10,10,0.5" --debug
  ```

This update to the PLOT_ENGINE reinforces its central role by not only producing high-quality plots with extensive numerical analysis but also by ensuring that input expressions are correctly parsed and validated, aligning with our mission to be a go-to plotting library for formula visualizations.