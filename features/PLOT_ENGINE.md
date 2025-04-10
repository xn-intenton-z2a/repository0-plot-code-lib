# PLOT_ENGINE Feature Specification (Enhanced with Plot Caching)

## Overview
This feature combines core plotting capabilities with multiple output modalities. It evaluates mathematical expressions and generates clear, colorized ASCII plots, while offering enhanced export options. In this update, the feature is expanded to support plot templates and an integrated caching mechanism. The caching feature improves performance by storing computed plot data, reducing recomputation for repeated requests. This reinforces our mission of being the go-to plot library for formula visualisations by providing both visual output and efficient configuration management in a single, unified interface.

## Implementation Details
### CLI Integration
- Extend the main CLI handler (in `src/lib/main.js`) to support various flags:
  - `--plot`: Triggers the plot generation process.
  - `--interval`, `--step`, `--color`: Configure the appearance of the plot.
  - `--export`: Exports the generated ASCII plot to a file, with an optional file path parameter.
  - `--json-out`: Outputs the computed plot data (e.g., arrays of x and y values) in JSON format, for consumption by other applications.
  - **New Flags for Templates:**
    - `--save-template <name>`: Saves current plot parameters as a template under the provided name.
    - `--list-templates`: Lists all saved plot templates stored in a local JSON file (e.g., `templates.json`).
    - `--use-template <name>`: Loads a saved template to pre-populate plotting parameters, which can be combined with other CLI flags.

### Plot Computation and Output Modalities
- **Expression Evaluation:** Utilize mathjs to parse the provided mathematical expression and compute data points over a specified interval and step size.
- **ASCII Plot Generation:** Scale and map the computed data to generate a clear ASCII plot, with optional colorization using ANSI escape sequences.
- **File Export:** Use Node’s fs module to write the ASCII plot to a file when the `--export` flag is provided. In case of file I/O failures, default to console output.
- **JSON Data Export:** When the `--json-out` flag is enabled, output the computed plot data as a JSON object, including arrays of x and y values and any computed scales.

### Plot Templates
- **Template Storage:** Implement a mechanism to store plot templates in a JSON file (e.g., `templates.json`). Each template will include all necessary parameters such as formula, interval, step, color, and export options.
- **Saving Templates:** When a user invokes the `--save-template <name>` flag along with current plotting parameters, validate and store the template in the JSON file with robust error handling for file I/O operations.
- **Listing and Loading:** The `--list-templates` flag will read from `templates.json` and display available template names. The `--use-template <name>` flag will load the corresponding template and merge its parameters with any additional CLI inputs.
- **CLI Feedback:** Provide clear success or error messages when saving, listing, or using templates.

### Caching Mechanism
- **Purpose:** Introduce an in-memory cache to store computed plot data, reducing recalculation when the same plotting parameters are provided in subsequent requests.
- **Implementation:**
  - Utilize a lightweight caching structure (e.g., a JavaScript `Map`) keyed by a hash of the plot parameters (formula, interval, step, color).
  - Optionally, introduce a Time-To-Live (TTL) mechanism for cache entries to ensure fresh data and manage memory usage.
  - Before invoking the computation logic, check if a cache entry exists for the given parameters. If found, return the cached plot; otherwise, compute and store the result in the cache.
- **Integration:** Ensure the caching mechanism integrates seamlessly with both direct CLI invocations and template-based plot generations.

### Error Handling and Validation
- Validate mathematical expressions and CLI parameters, providing precise error messages for any malformed input.
- For template operations and caching, handle file read/write errors and cache misses gracefully, reverting to default behaviours if necessary.

## Testing and Documentation
### Unit and Integration Tests
- Develop tests to simulate CLI commands including combinations of `--plot`, `--export`, `--json-out`, and new template flags (`--save-template`, `--list-templates`, `--use-template`).
- Verify that plot templates are correctly saved to, retrieved from, and merged with runtime parameters.
- Implement tests covering the caching logic to ensure that repeated calls with identical parameters retrieve plots from the cache instead of triggering redundant computations.

### Documentation
- Update the README.md, CONTRIBUTING.md, and any relevant documentation with clear usage examples for the new plot caching mechanism.
- Include examples demonstrating how caching improves performance during re-run operations, along with troubleshooting guidelines for cache-related issues.

## Usage Examples
- **Generating a Plot with Templates and Caching:**
  - Save a template: `node src/lib/main.js --plot "sin(x)" --interval -10,10 --step 0.5 --save-template basicSin`
  - List templates: `node src/lib/main.js --list-templates`
  - Use a template with caching: `node src/lib/main.js --use-template basicSin --json-out`
- **Combined Operations:**
  - Command: `node src/lib/main.js --plot "x^2" --color --export output.txt --json-out`
  - Subsequent identical commands should utilize the cached result, reducing computation time.
