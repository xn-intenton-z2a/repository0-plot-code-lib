# Purpose

Enhance the existing --reseed CLI flag documentation and maintain a clear change history by updating the project changelog.

# Behavior

When users invoke the CLI help or consult the README, they will see a dedicated section describing the --reseed flag, its purpose, and an example. In addition, the repository CHANGELOG.md will include a new entry under an Unreleased heading that summarizes the documentation update.

# Implementation

- In README.md:
  - Add a "Reseed Flag" subsection under the "CLI Usage" heading.
  - Document the syntax: `repository0-plot-code-lib --reseed`.
  - Explain that this flag triggers the reseeding process using the configuration file defined by the AGENT_CONFIG_FILE environment or default path.
  - Provide an example invocation and expected console output snippet.

- In USAGE.md:
  - Mirror the updated documentation for the --reseed flag under the CLI Usage section.
  - Ensure that examples and descriptions match the README content.

- In CHANGELOG.md:
  - Under the topmost Unreleased section (or create it if missing), add:
    "Added documentation for the --reseed CLI flag in README and USAGE, and updated changelog."
  - Follow the existing changelog formatting conventions.

# Testing

- In tests/unit/main.test.js:
  - Add a unit test that invokes the CLI with `--reseed` and verifies that the main function routes into the reseeding logic path (mocking fs and js-yaml).  
  - Confirm that missing seed file errors are handled gracefully.

# Documentation

- Ensure README.md now contains a fully detailed "Reseed Flag" section with usage, description, and example output.  
- Confirm USAGE.md is updated similarly.  
- Verify CHANGELOG.md accurately reflects the new documentation changes under Unreleased.
