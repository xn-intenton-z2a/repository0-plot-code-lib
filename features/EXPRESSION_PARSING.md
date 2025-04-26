# Overview
Parse mathematical expressions and generate time series data from a specified range of values.

# Expression and Range Parsing
- Import mathjs in src/lib/main.js or a dedicated module to parse and compile the expression string into a function f(x).
- Use zod in src/lib/main.js to define and validate CLI flags:
  - --expression: required; string representing a mathematical formula in x.
  - --range: required; syntax x=min:max[:step], where step defaults to 1 if omitted.
- Parse the range string into numeric start, end, and step values, validating that start <= end and step > 0.

# Time Series Generation
- Using the compiled function f(x), iterate from start to end by step and evaluate f at each x.
- Collect results into an array of objects { x: number, y: number }.
- Filter out any entries where y is not a finite number.

# CLI and API Integration
- Extend the main(args) function in src/lib/main.js to parse the new flags, invoke the range parser and expression evaluator, and output the resulting time series as JSON to stdout when --export-data-format=json is set.
- Export a reusable evaluateExpressionRange helper for direct import in API contexts or other modules.

# Testing
- Add tests/unit/expression.test.js covering:
  - Valid and invalid expression strings.
  - Range parsing with and without step.
  - Generated series length and content for simple functions (e.g., x^2).
  - Handling of non-finite results.

# Documentation Updates
- Update README.md CLI Usage to include examples of expression parsing and JSON export:
  repository0-plot-code-lib --expression "x^2" --range "x=0:5"
- Enhance docs/USAGE.md with a section on expression parsing and time series output.