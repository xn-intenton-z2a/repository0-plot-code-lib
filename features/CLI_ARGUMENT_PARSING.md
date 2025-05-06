# CLI Argument Parsing

# Overview
Implement structured parsing and validation of CLI arguments for expression, range, output file, and format using Zod.

# Implementation
Update src/lib/main.js to import zod, define a CLI schema capturing expression (string), range (string matching x=min:max,y=min:max), file (string), and format (svg or png default svg). Parse process.argv using the schema and invoke main with the validated config object. Ensure error messages are user-friendly.

# Testing and Documentation
Add unit tests in tests/unit/main-args.test.js for valid arguments scenarios and for invalid inputs ensuring appropriate errors. Update README.md and USAGE.md with detailed usage examples, flag descriptions, and sample commands.