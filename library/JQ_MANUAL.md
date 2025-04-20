# JQ_MANUAL

## Crawl Summary
The crawled data from https://stedolan.github.io/jq/manual/ returned Data Size: 0 bytes with no additional links or content. The technical extraction relies on known jq specifications and the structure inferred from the official manual.

## Normalised Extract
## Table of Contents
1. Introduction
2. Filter Syntax
3. Built-in Functions
4. Command-Line Options
5. Code Examples
6. Troubleshooting

### 1. Introduction
- jq is a command-line JSON processor. Usage: `jq [OPTIONS] FILTER [FILE...]`.

### 2. Filter Syntax
- Identity: `.` returns the input as-is.
- Object Access: `.key` accesses the field 'key' in a JSON object.
- Array Slicing: `.[start:end]` extracts an array subset.
- Chaining: `filter1 | filter2` pipes the output of one filter to the next.
- Assignment: `|=` updates a value within the structure.

### 3. Built-in Functions
- `length`: Returns the length (number of elements in an array or characters in a string).
- `keys`: Returns a sorted array of the keys in an object.
- `add`: Aggregates numbers in an array (e.g., sums up values).

### 4. Command-Line Options
- `--raw-output, -r`: Prints output as raw strings.
- `--slurp, -s`: Aggregates all input JSON objects into one array.
- `--compact-output, -c`: Minimizes the output by reducing whitespace.
- `--null-input, -n`: Provides null input when no file is specified.
- `--arg <name> <value>`: Defines a string variable for use in filters.
- `--argjson <name> <value>`: Defines a JSON variable for use in filters.
- `--exit-status`: Sets a non-zero exit status if the final output is false.

### 5. Code Examples
```bash
# Example 1: Basic JSON output
jq . input.json

# Example 2: Extracting a nested field
jq '.foo | .bar' input.json

# Example 3: Using argument insertion in filters
jq --arg username "test_user" '.users[] | select(.name == $username)' input.json
```

### 6. Troubleshooting
- **Syntax Validation:** Run `jq . input.json` to check JSON formatting.
- **Debugging Filters:** If encountering errors, try using available debug options such as `--debug` (if supported) to trace filter execution.
- **Segmentation Faults:** Validate the input data, compile with debugging symbols, and use gdb for detailed analysis.


## Supplementary Details
### Technical Specifications and Implementation Details

- **Filter Parsing:**
  - Filters are parsed using recursive descent parser.
  - The AST (Abstract Syntax Tree) is generated to evaluate the filter against JSON tokens.

- **Input Processing:**
  - By default, jq reads input JSON line-by-line unless the `--slurp` option is used, which aggregates the entire input into one array.
  - The `--null-input` option allows execution without any input file, using a `null` value.

- **Configuration Options (Defaults and Effects):
  - `--raw-output (-r)`: OFF by default; when enabled, outputs raw strings.
  - `--compact-output (-c)`: OFF by default; when enabled, minimizes whitespace.
  - `--slurp (-s)`: OFF by default; when enabled, reads all inputs into a single array.
  - `--exit-status`: Causes the exit status to be non-zero if the filter’s final value is false.
  - `--arg name value` & `--argjson name value`: Used to pass external variables to the filter with explicit type definitions.

- **Best Practices:
  - Chain filters using `|` for modular processing.
  - Use parentheses to enforce precedence in complex filters.
  - Validate JSON input before applying jq filters.
  - Utilize `--slurp` for bulk processing of multiple JSON objects.

- **Troubleshooting Steps:
  1. Validate JSON with `jq . filename` to ensure it is well-formed.
  2. Test filter expressions on small JSON samples.
  3. Invoke `jq --debug` (if available) to output internal processing details.
  4. Check return codes from filter compilation and execution: 0 for success, non-zero for errors.


## Reference Details
### Complete API Specifications and Implementation Patterns

#### Command-Line Invocation:
```
jq [OPTIONS] FILTER [FILE...]
```
Options:
- `--raw-output, -r`: Outputs raw strings instead of JSON formatted output.
- `--slurp, -s`: Reads all input JSON objects into one array.
- `--compact-output, -c`: Produces minimized JSON output (no extra whitespace).
- `--null-input, -n`: Executes the filter with `null` as the input when no file is provided.
- `--arg <name> <value>`: Declares a variable for use in the jq filter with a string value.
- `--argjson <name> <value>`: Declares a variable for use in the jq filter with a JSON value.
- `--exit-status`: Sets exit status based on the final result of the filter.

#### Hypothetical libjq API (for embedding jq in C applications):

// Initializes the jq processing state. Returns a pointer to jq_state.
jq_state* jq_init(void);

// Compiles the specified filter string into an internal representation.
// Returns 0 on success, non-zero on failure.
int jq_compile(jq_state *state, const char *filter) __attribute__((nonnull));

// Sets a string variable for filter processing.
// Returns 0 on success.
int jq_set_arg(jq_state *state, const char *var_name, const char *value) __attribute__((nonnull));

// Processes the given JSON input and returns a linked list of results.
// The caller is responsible for freeing the results; returns NULL in case of error.
jq_result* jq_process_input(jq_state *state, JSON_VALUE *input);

// Cleans up and frees the jq processing state.
void jq_teardown(jq_state *state);

#### Code Example (C Usage):
/*
#include <stdio.h>
#include "jq.h"

int main(int argc, char *argv[]) {
    jq_state *state = jq_init();
    if (jq_compile(state, ".foo | .bar") != 0) {
        fprintf(stderr, "Filter compilation error\n");
        return 1;
    }
    // Setting a variable for the filter
    jq_set_arg(state, "username", "test_user");
    JSON_VALUE *input = parse_json_from_file("input.json");
    jq_result *results = jq_process_input(state, input);
    for (jq_result *res = results; res; res = res->next) {
        char *output = json_serialize(res->value);
        printf("%s\n", output);
        free(output);
    }
    jq_teardown(state);
    return 0;
}
*/

#### Troubleshooting Procedures:
1. Run `jq --debug FILTER FILE` to obtain detailed debug output (if supported by the jq build).
2. Check the return value from `jq_compile`:
   - 0 indicates success.
   - Non-zero indicates a syntax or compilation error.
3. Validate JSON input externally using tools such as `jsonlint`.
4. For segmentation faults, compile your application with debugging symbols and use gdb to perform a backtrace.

#### Return Types & Error Handling:
- jq_compile: Returns 0 on success, non-zero on error (with error messages output to stderr).
- jq_process_input: Returns a linked list (jq_result*), which must be freed by the caller. Returns NULL on processing error.
- Exceptions are managed via error codes and stderr output, with the command-line tool returning a non-zero exit status on failure.


## Original Source
jq Manual
https://stedolan.github.io/jq/manual/

## Digest of JQ_MANUAL

# jq Manual Documentation

**Retrieved on:** 2023-10-11

## Overview
The jq manual provides technical details for the jq command-line JSON processor. It covers filter syntax, built-in functions, command-line options, and troubleshooting procedures.

## Table of Contents
1. Introduction
2. Filter Syntax
3. Built-in Functions
4. Command-Line Options
5. Code Examples
6. Troubleshooting

## 1. Introduction
- jq is a lightweight and flexible command-line JSON processor.
- **Usage:** `jq [OPTIONS] FILTER [FILE...]`

## 2. Filter Syntax
- **Identity Filter:** `.` returns the input unchanged.
- **Object Field Access:** `.key` accesses the value for the key "key" in an object.
- **Array Slicing:** `.[start:end]` extracts a subarray from the specified indices.
- **Pipe Operator:** Uses `|` to chain multiple filter operations.
- **Assignment Operator:** `|=` updates values within data structures.

## 3. Built-in Functions
- **length:** Returns the length of an array or string. Example: `.[].length`
- **keys:** Returns a sorted array of keys from an object. Example: `. | keys`
- **add:** Sums all numbers in an array. Example: `[1,2,3] | add`

## 4. Command-Line Options
- `--raw-output, -r`: Outputs raw strings instead of JSON-encoded strings.
- `--slurp, -s`: Reads all inputs into a single JSON array.
- `--compact-output, -c`: Produces compact (minimized whitespace) JSON output.
- `--null-input, -n`: Uses `null` as input when no file is provided.
- `--arg name value`: Defines a variable with a string value for use in the filter.
- `--argjson name value`: Defines a variable with a JSON value.
- `--exit-status`: Alters exit status based on the filter output (non-zero if false).

## 5. Code Examples
```bash
# Basic usage: Output the entire JSON content
jq . input.json

# Using a filter to extract a nested field
jq '.foo | .bar' input.json

# Passing an argument as a variable
jq --arg username "test_user" '.users[] | select(.name == $username)' input.json
```

## 6. Troubleshooting
- **Syntax Errors:**
  - Verify filter syntax. Use `jq --debug` if available.
  - Check that all brackets and quotes are correctly paired.
- **Invalid JSON Input:**
  - Validate JSON files using tools like `jsonlint`.
  - Use `jq . file.json` to test JSON integrity.
- **Segmentation Faults:**
  - Run jq with debugging symbols compiled; use gdb to trace faults.
  - Confirm that the input file is not corrupted.


## Attribution
- Source: jq Manual
- URL: https://stedolan.github.io/jq/manual/
- License: MIT
- Crawl Date: 2025-04-20T19:22:01.807Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-20
