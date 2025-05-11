# Overview
Add per-axis scale options for how sample points are distributed across each axis. Linear sampling remains the default. Logarithmic sampling can be selected for axes that span several orders of magnitude and only supports positive minimum and maximum values.

# CLI Integration
- Introduce a new optional flag --scale that accepts assignments of axis to scale type such as x=log or y=linear. Multiple assignments separated by commas.
- Update minimist configuration to parse scale as a string and Zod schema to validate a record mapping axis names to one of the allowed values linear or log.
- Default behavior when --scale is omitted continues to use linear sampling for all axes.

# Implementation
1. Parse the scale specification string into an object mapping each axis to its scale type. If an invalid scale type is encountered, display a clear error and exit with code 1.
2. Extend the safeParsed options object to include an optional scale record alongside expression, range, points, format, and output.
3. Modify generateSeries to accept the scale record. For each axis apply the selected sampling method:
   1. linear: compute an evenly spaced array of values between min and max as before.
   2. log: verify that both min and max are strictly positive, then generate a geometric progression where each point equals min times the ratio (max divided by min) raised to the fractional index.
   3. On scale error or invalid axis name, throw an error before data generation.
4. Proceed to build the Cartesian product and evaluate each combination exactly as existing behavior.

# Tests
- Add unit tests for parsing the scale flag that confirm valid inputs produce the correct mapping and invalid inputs produce errors.
- Add tests for generateSeries using log scale on a simple range such as x spanning 1 to 100 with three points yielding [1,10,100].
- Add an integration test invoking CLI with --expression y=x --range x=1:100 --points 3 --scale x=log that inspects the axis values in the output series.

# Documentation
- Update USAGE.md with examples demonstrating the --scale flag and comparing linear versus log sampling.
- Update README.md features list to mention axis scaling support under Time Series Generation.
