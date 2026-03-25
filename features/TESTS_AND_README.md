# TESTS_AND_README

## Summary

Define the testable acceptance criteria and README documentation required by the mission so implementations can be validated and users can follow examples.

## Motivation

Unit tests and README examples are part of the mission acceptance criteria and ensure the library is usable and verifiable.

## Scope

- Provide unit test coverage targets for expression parsing, range evaluation, SVG structure, PNG output header, and CLI behavior.
- Specify README content that demonstrates CLI usage and explains PNG rendering choices.

## Requirements

- Tests must include assertions that parsing "y=Math.sin(x)" returns a callable function and that evaluating over -3.14:0.01:3.14 yields approximately 628 points.
- Tests must assert that renderSVG's output contains a viewBox and a polyline points attribute.
- Tests must assert that PNG output buffers begin with the PNG magic bytes.
- README must include at least two example CLI commands: one that generates SVG from expression+range and one that generates PNG from CSV.

## Acceptance Criteria

- A test suite exists that can run via npm test and contains focused unit tests covering the points above.
- README has a usage section with the two example commands and a short note about PNG generation dependencies.

## Notes

- When implementing tests, export functions from src/lib/main.js so they can be imported directly rather than invoking the CLI when possible.
