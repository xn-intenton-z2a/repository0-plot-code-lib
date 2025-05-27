# Mission Statement

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

**plot-code-lib** is a JavaScript library and CLI tool designed to:
- Transform and given range and a simple expression syntax for (pick an existing open standard) to time series data.
- Read and write the time series data in a standard format (pick an existing open standard).
- Make use of libraries for formula parsing, time series generation, plotting, and persistence in image formats.
- Generate SVG and PNG plots from the time series data and save these as files.
- Variations on this example: `node run start -- --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1" --file output.svg` .
- Showcase all the features of the library via a CLI by dry running tp generate example commands and output in the README.md file.

`plot-code-lib` facilitate the creation of plots from mathematical expressions and time series data. It will take a
mathematical expression and a range of values and generate a plot in SVG or PNG format.

## Seed repository activity at 2025-05-27T02:43:27.939Z

When responding to a post on url , the repository was seeded with mission:



and outcome "success"

LLM API Usage:

---


## Maintain Feature at 2025-05-27T02:45:13.594Z

Activity:

Maintained feature TIME_SERIES_GENERATION with

Feature spec:

# Overview

Introduce a core command that parses a simple mathematical expression and a numeric range from CLI flags, generates a time series of data points, and writes the result as JSON to stdout or to a file. This feature covers argument parsing, expression evaluation, range expansion, and JSON serialization.

# Behavior

When invoked via the CLI with an expression and range:
- The CLI accepts --expression or -e for a formula in terms of x (e.g. y=sin(x)).
- The CLI accepts --range or -r using a syntax x=<start>:<end>:<step> (e.g. x=0:3.14:0.1).
- The range is expanded into an ordered list of x values.
- The expression is parsed and evaluated for each x to produce y values.
- The output is a JSON array of objects [{ x: number, y: number }, ...].
- By default, the JSON is printed to stdout. A --output or -o flag may specify a file path to write the JSON.

# Implementation

- Use a parsing library (e.g. mathjs) to parse and evaluate the expression in a sandboxed context.
- Expand the range string by splitting on colon and mapping to start, end, step as numbers. Ensure step > 0 and start<=end.
- Generate the series by looping from start to end inclusive in increments of step.
- Serialize the series array to JSON and either print to console or write to the specified file.
- Errors in parsing or invalid ranges should terminate with a non-zero exit code and an error message on stderr.

# CLI Interface

- repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.28:0.1" 
- Additional optional flag --output <path> to write JSON to file.

# Tests

- Verify expression parsing and evaluation for common functions (sin, cos, polynomial).
- Verify range string parsing, including fractional and integer steps.
- Confirm correct JSON output structure and content.
- Confirm file writing when --output is provided and stdout behavior when not.



LLM API Usage:
```json
{"prompt_tokens":4346,"completion_tokens":1205,"total_tokens":5551,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":704,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---