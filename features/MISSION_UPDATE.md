# MISSION_UPDATE

# Overview
Add an update-mission subcommand to the CLI that regenerates MISSION.md to reflect currently supported CLI commands and list upcoming features for better alignment with the project mission.

# CLI Usage
- repository0-plot-code-lib update-mission [--preview]
- --preview: Show the updated mission content without writing to file.

# Implementation Details
1. Register a new update-mission command in src/lib/main.js using yargs.
2. Collect supported commands by reading USAGE.md headings or introspecting yargs command definitions.
3. Collect upcoming feature names by scanning the features directory for markdown files and extracting their headings.
4. Generate MISSION.md content:
   - Project title and description from README.md.
   - A list of supported CLI commands with brief summaries.
   - An "Upcoming Features" section listing feature names.
5. If --preview is set, print the generated content to stdout; otherwise overwrite MISSION.md with the new content.
6. Exit with code 0 on success and 1 on any error.

# Testing
- Mock fs.readFile and fs.writeFile, and simulate the features directory to verify the generated content.
- Test preview mode to confirm it logs content without writing to MISSION.md.
- Integration test: run the update-mission command in a sample repo and verify MISSION.md contains all expected sections.

# Documentation Updates
- Update README.md to include the update-mission command and its options along with example invocations.