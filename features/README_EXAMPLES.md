# README_EXAMPLES

Summary
Enhance README.md with explicit CLI and library usage examples and document the optional PNG dependency and how to install it.

Specification
- Add a CLI examples section containing the mission example commands and a short explanation of the range format start:step:end.
- Add a PNG export section describing which optional dependency is supported and the installation command.
- Reference example files in the examples/ directory such as examples/data.csv and examples/example.svg.

Files to change
- Update README.md with these example sections and link to examples/ files.
- Provide an examples/ directory with a small data.csv and an example.svg when implementing code that can generate them.

Acceptance Criteria
- README contains the two example CLI commands from the mission and a description of the range format.
- README documents which optional dependency is required for PNG export and how to install it.
