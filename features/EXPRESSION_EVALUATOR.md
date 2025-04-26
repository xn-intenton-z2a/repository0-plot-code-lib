# EXPRESSION_EVALUATOR Feature

This feature adds the ability to parse a mathematical expression and generate a numeric time series based on a specified range of x values.

# CLI Parameter Parsing and Validation
- Use zod in src/lib/main.js to define and parse flags:
  - --expression required when no input file is provided. A string expression in x (for example y=sin(x) or x^2+3*x-5)
  - --range required when no input file is provided. Syntax x=min:max[:step], where min < max and optional step defaults to (max-min)/100
- Emit clear error messages for missing or invalid values

# Expression Parsing
- Import mathjs and parse the expression string into an AST
- Compile the AST into a function that accepts a numeric x and returns y
- Catch syntax errors and report them via console error and exit code

# Time Series Generation
- Parse the range definition into numeric min, max, and step values
- Build an array of x values from min to max using the step interval
- For each x value, evaluate y using the compiled function
- Exclude any non finite y results and report if any values are invalid

# Testing Enhancements
- Add tests to tests/unit/main.test.js to cover:
  - Valid and invalid expression strings
  - Valid and invalid range definitions
  - Correct number of data points for a given range and default step
  - Sample output of x and y pairs matching known functions
  - Errors thrown on syntax failures or invalid ranges

# Documentation Updates
- Update README.md usage section with examples:
  node src/lib/main.js --expression y=sin(x) --range x=0:6.28:0.1
  Should output a time series array of points with x and y values