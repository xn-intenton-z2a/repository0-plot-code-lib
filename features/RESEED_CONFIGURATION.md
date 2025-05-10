# Purpose

This feature enhances documentation and testing for the --reseed CLI flag in the project.

# Behavior

When run as repository0-plot-code-lib --reseed, the CLI will trigger the reseeding process using the configuration defined in AGENT_CONFIG_FILE, overwriting target files with seed content and reporting progress.

# Implementation

Update README.md and USAGE.md to include a new section under CLI Usage that describes the --reseed flag, its purpose, and an example invocation. Ensure the example shows expected output or behavior.

# Testing

In tests/unit/main.test.js add unit tests for main invoked with the --reseed flag. Mock fs and js-yaml modules to simulate reading and writing seed files. Verify that main calls the reseeding logic and handles missing seed files gracefully.

# Documentation

Add a section in README under Usage with heading 'Reseed Flag' that explains how to use --reseed. Update USAGE.md similarly with flag description and example usage.