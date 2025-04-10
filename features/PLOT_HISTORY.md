# PLOT_HISTORY Feature Specification (Enhanced with Record Management)

## Overview
This feature persists user plot interactions by recording key parameters and inputs used in plot generation. In addition to listing, clearing, and re-running history records, this update introduces enhanced search, tagging, categorization, export functionality, and now individual record management. Users can attach custom tags, filter their history, export data in multiple formats, and now delete or update individual history records. These improvements enhance reproducibility, auditability, and ease of managing past plot commands.

## Implementation Details
### History Logging, Tagging, and Export
- **Automatic Recording:** Every plot command (with parameters like formula, interval, step, colors, export paths, etc.) is automatically recorded as a JSON entry in a local file (e.g., `history.json`).
- **Tag Attachment:** Users can attach one or more tags to a plot command using a new CLI flag (e.g., `--tag <tag1,tag2>`).
- **Enhanced Data Schema:** Each record is updated to include an optional `tags` field (array of strings).
- **Export Functionality:** 
  - Introduce a new CLI flag (e.g., `--export-history`) that allows the history to be exported in either JSON or CSV formats. 
  - When exporting, the system reads `history.json` and formats the output accordingly. 
  - For CSV, standard headers such as timestamp, command, parameters, and tags are provided.

### CLI Commands and Enhancements
- **View History (`--history`):**
  - Lists all previous plot commands with timestamps, parameters, and associated tags.
  - Enhanced filtering supports text queries as well as tag-specific queries (e.g., `--history --query tag:experiment`).
- **Clear History (`--clear-history`):**
  - Command to delete all existing history records.
- **Re-run History (`--rerun-history`):**
  - Allows re-execution of a recorded command by its unique identifier, retrieving associated parameters and tags.
- **Export History (`--export-history`):**
  - Exports the history data to a file in the chosen format (e.g., JSON or CSV, selectable via an optional parameter such as `--format csv`).

### New Enhancements: Record Management
- **Delete Individual Record (`--delete-history <record_id>`):**
  - Allows users to delete a specific history record identified by its unique identifier. This adds fine-grained control, especially in cases where certain commands are no longer relevant or contain sensitive data.
- **Update Record Tags (`--update-history <record_id> --tag <new_tags>`):**
  - Enables users to update or correct the tags associated with a specific history record. This is useful for reorganizing records for improved filtering and categorization.

## Testing and Documentation
### Unit and Integration Tests
- **History and Tagging Tests:**
  - Verify that plot commands executed with the `--tag` flag correctly record tags in `history.json`.
  - Test that filtering and viewing history using tag-based queries returns the expected results.
- **Export Functionality Tests:**
  - Validate that the `--export-history` flag outputs the complete history in the specified format.
  - Include tests ensuring that CSV headers are correctly generated and that the data is accurate.
- **Record Management Tests:**
  - Ensure that individual history records can be deleted with the `--delete-history` command.
  - Validate that updating records with the `--update-history` command correctly alters the associated tags.

### Documentation Updates
- Update README.md and CONTRIBUTING.md with usage examples for tagging, exporting, deleting, and updating history records.
- Include troubleshooting guidelines for common issues (e.g., file permission errors during export or record update failures).

## Usage Examples
- **Recording a Plot with Tags:**
  - Command: `node src/lib/main.js --plot "sin(x)" --tag basic,experiment`
- **Viewing History with Tag Filtering:**
  - Command: `node src/lib/main.js --history --query tag:basic`
- **Re-running a Tagged Plot Command:**
  - Command: `node src/lib/main.js --rerun-history <record_id>`
- **Exporting History Data:**
  - Command: `node src/lib/main.js --export-history --format csv`
  - Alternatively, `node src/lib/main.js --export-history` defaults to JSON export.
- **Deleting an Individual History Record:**
  - Command: `node src/lib/main.js --delete-history <record_id>`
- **Updating Record Tags:**
  - Command: `node src/lib/main.js --update-history <record_id> --tag updatedTag1,updatedTag2`