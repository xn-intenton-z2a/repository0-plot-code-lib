# PLOT_ENGINE

## Overview
This update to the PLOT_ENGINE not only retains its role as the core plotting and numerical analysis module but also integrates a robust expression parsing and validation layer. By incorporating an expression parser, the engine can now process and validate plot specification strings (e.g., "quad:1,0,0,-10,10,1", "expr:Math.sin(x)*x:-10,10,0.5") before execution. This enhancement improves error handling, provides clearer feedback to users on malformed inputs, and leverages the mathjs library for complex expression evaluations, all while maintaining backward compatibility with legacy plot specifications.

## Key Objectives
- **Expression Parsing & Validation:**
  - Implement a dedicated parsing component to interpret and validate plot specification strings.
  - Use mathjs to evaluate and transform expressions, ensuring that formulas are syntactically and semantically correct.
  - Provide precise error messages when an expression fails validation, aiding in quick debugging and user guidance.

- **Comprehensive Plot Generation:**
  - Support traditional and extended plot types (quadratic, linear, sine, cosine, tangent, polar, exponential, logarithmic, dual axis, box, and violin plots).
  - Ensure that numerical analysis (smoothing, derivative calculations, integration, and statistical functions) operates seamlessly on validated inputs.

- **Plot History Caching:**
  - Introduce a caching mechanism that records details of every plot generated, including the plot specification, timestamp, and summary metadata.
  - Store history locally (preferably in a dedicated file) so that users can retrieve previous plot configurations and results.
  - Add a new CLI flag `--history` that, when invoked, displays the cached plot history along with relevant details for quick reference and re-use.

- **Robust Debug Logging & CLI Integration:**
  - Extend existing CLI flags (e.g., --analyze, --debug) to work seamlessly with the new parsing and caching logic, providing detailed logs of processing and caching outcomes.
  - Ensure that invalid inputs trigger clear diagnostic outputs and that errors are logged with sufficient context.

- **Documentation & Testing:**
  - Update unit tests to cover both the new expression parsing functionality and the plot history caching mechanism.
  - Revise documentation (README and CONTRIBUTING guides) and usage examples to incorporate details of the new caching functionality.

## Design & Implementation
### Expression Parsing Module
- **Parser Integration:**
  - Develop a parser function (e.g., `src/lib/parser.js`) to process the raw plot specification string, handling prefixes such as "quad:" and "expr:".
  - Integrate syntax checking and error handling using mathjs to ensure input validity.

### Modifications to the Plot Engine
- **Input Flow Enhancement:**
  - Update the main plotting routine to invoke the parser before any numerical computations or plotting occurs.
  - On detecting parsing errors, log detailed error messages and abort further processing.

- **Backward Compatibility:**
  - Maintain support for legacy plot specifications while adding robust error handling and input validation.

### Plot History Caching
- **Caching Mechanism:**
  - Implement a simple caching layer that logs each plot request along with its specification, the generated plot summary, and a timestamp.
  - Store this history in a dedicated file in the user’s local environment, making retrieval efficient.

- **CLI Flag for History Retrieval:**
  - Add a `--history` flag in the CLI (update the main parser in `src/lib/main.js`) which, when invoked, reads and displays the cached plot history.
  - Ensure that the history output formats remain consistent with other output modes, providing a clear summary of past plots.

### CLI and Logging Improvements
- **Enhanced Routing:**
  - Update the main CLI routing to include handling for the new `--history` flag.
  - Leverage the existing robust logging mechanism to log cache operations and parser results.

## Usage Examples
### Generating a Plot
```bash
node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
```

### Custom Mathematical Expression
```bash
node src/lib/main.js output.svg "expr:Math.sin(x)*x:-10,10,0.5"
```

### Debug Mode
```bash
node src/lib/main.js debug_plot.svg "expr:Math.sin(x)*x:-10,10,0.5" --debug
```

### Retrieving Plot History
```bash
node src/lib/main.js --history
```

## Future Considerations
- Extend the caching mechanism to allow for cache expiration and manual clearing.
- Integrate more granular history details, such as user comments or modifications to previous plot specs.
- Further enhance error handling as new plot types and edge cases are identified.
