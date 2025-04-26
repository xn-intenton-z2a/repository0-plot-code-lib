# Overview
Add a built-in presets manager allowing users to save, list, remove, and invoke named plot configurations via a simple YAML file.

# Preset Storage & Format
Use js-yaml in src/lib/main.js to load and store presets in a file named .plot-presets.yaml in the user home directory or current working directory. The file is a YAML mapping from preset names to objects containing expression (string), range (string), and optional CLI overrides (width, height, background, color, format, input-file, export-data-format, export-file).

# CLI Integration
Extend the CLI parser in src/lib/main.js with the following commands:
- --preset-add <name> plus flags --expression, --range, and any style or I/O flags to add or overwrite a preset with the given name.
- --preset-remove <name> to delete a preset entry. Emit an error if not found.
- --preset-list to display all saved preset names and their core settings in a table format.
- --preset <name> to load the saved configuration and invoke the existing plot workflow as if flags were passed directly.

Use zod to validate that the YAML file content matches the schema: an object whose keys are nonempty strings and values are objects with required expression and range strings and optional overrides with matching types.

# File Handling and Defaults
On startup, immediately load existing presets file if it exists. For add/remove/list commands operate on the file and exit without running the plot engine. For --preset <name>, merge the preset values with environment defaults and CLI flags, giving precedence to flags.

# Testing
Add unit tests in tests/unit/preset.test.js to cover:
- Creating, listing, removing, and invoking presets.
- Validation failures when YAML is malformed.
- Fallback when no presets file exists.

# Documentation
Update README.md CLI Usage section to document the new preset commands with usage examples. Enhance docs/USAGE.md with a dedicated Presets section showing sample .plot-presets.yaml content and command examples.