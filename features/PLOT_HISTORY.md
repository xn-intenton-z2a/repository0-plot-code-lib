# PLOT_HISTORY Feature Specification (Enhanced with Tagging)

## Overview
This feature persists user plot interactions by recording key parameters and inputs used in plot generation. In addition to listing, clearing, and re-running history records, this update introduces enhanced search, tagging, and categorization capabilities. Users can now attach user-defined tags to each plot record and filter their history by these tags along with query parameters. This enhancement improves reproducibility and eases the management of past plot commands.

## Implementation Details
### History Logging and Tagging
- **Automatic Recording:** Every plot command (including parameters like formula, interval, step, colors, export paths, etc.) is automatically logged as a JSON entry in a local file (e.g., `history.json`).
- **Tag Attachment:** Allow users to optionally attach one or more tags to a plot command with a new CLI flag (e.g., `--tag <tag1,tag2>`).
- **Data Schema Update:** Each history record is updated to include an optional `tags` field that stores an array of strings.

### CLI Commands and Enhancements
- **View History (`--history`):**
  - Lists all previous plot commands along with their timestamps, parameters, and any associated tags.
  - **Enhanced Filtering:** Supports an optional `--query` flag to filter by text as well as tag-based queries (e.g., `--history --query tag:basic`).
- **Clear History (`--clear-history`):**
  - Provides a command to delete all existing history records.
- **Re-run History (`--rerun-history`):**
  - Introduces a flag to re-execute a previously recorded plot command by specifying its unique identifier.
  - The command retrieves the corresponding parameters and attached tags, and triggers the plotting engine accordingly.

### Tag-Based Search and Categorization
- **Tag Filtering:**
  - When a query includes a tag prefix (e.g., `tag:experiment`), the system will filter records that include the specified tag in their `tags` array.
- **User Feedback:**
  - The CLI will display records with their associated tags clearly, enabling users to quickly identify and select the desired history record.

## Testing and Documentation
### Unit and Integration Tests
- **Tagging Functionality Tests:**
  - Validate that when a plot command is executed with the `--tag` flag, the tags are correctly recorded in `history.json`.
  - Test filtering of history entries using both text filters and tag-specific queries.
- **CLI Command Tests:**
  - Ensure retrieval of history entries, including tags, works accurately.
  - Confirm that the re-run functionality correctly executes commands with tagging data.

### Documentation Updates
- **README and CONTRIBUTING:**
  - Update documentation with examples on how to use the tagging feature, including how to attach tags during plotting and filter history by tags.
  - Include troubleshooting tips for common issues related to history logging and tagging.

## Usage Examples
- **Recording a Plot with Tags:**
  - Command: `node src/lib/main.js --plot "sin(x)" --tag basic,experiment`
- **Listing History Filtering by Tag:**
  - Command: `node src/lib/main.js --history --query tag:basic`
- **Re-running a Tagged Plot Command:**
  - Command: `node src/lib/main.js --rerun-history <record_id>`
