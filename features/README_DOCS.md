# README_DOCS

Status: Implemented and documented

Overview

The README provides CLI usage examples, a description of the PNG rasterisation approach, and a short API reference for named exports from src/lib/main.js.

Behavior

- Document example CLI commands for expression ranges and CSV input.
- Explain the baseline PNG approach and how to opt into a full rasteriser by installing an optional dependency.

Acceptance criteria (testable)

- README contains CLI usage examples demonstrating --expression with --range and --csv usage examples with --file.
- README documents that the baseline PNG output is a minimal fallback and instructs users how to enable full rasterisation.

Testing notes

- Tests may assert README contains certain substrings but keep expectations tolerant to minor wording changes.
