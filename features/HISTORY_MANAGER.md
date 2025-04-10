# HISTORY_MANAGER Feature Specification (Enhanced with Recycle Bin for Undo Functionality)

## Overview
This feature unifies and consolidates plot history management across both the CLI and HTTP API layers, eliminating duplication and ensuring consistency of history operations. It records user plot commands, supports tagging, individual record management (viewing, updating, and deletion), filtering, and export functionality. The new enhancement introduces a recycle bin mechanism, allowing users to undo accidental deletions for improved data safety. This unified history manager reinforces our mission to be the go-to plot library by providing reproducible, audit-friendly, and accessible history data through both local and remote interfaces.

## Implementation Details
- **Unified Data Store:**
  - Store history records in a JSON file (e.g., `history.json`) with each record containing parameters, timestamps, and optional tags.
  - Record structure supports fields such as formula, interval, step, colors, and export paths.

- **CLI Integration:**
  - Commands include viewing history, filtering (with tag or text queries), clearing all history, re-running a specific command via its unique identifier, updating record tags, and deleting individual records.
  - New command for undoing a deletion: `--undo-history <record_id>` which moves a record from the recycle bin back into the main history store.

- **HTTP API Endpoints:**
  - **GET /history:** Retrieve a list of all active history records with support for filtering by tags or text queries.
  - **PUT /history/:id:** Update metadata or tags of a specific history record.
  - **DELETE /history/:id:** Delete a specific record by moving it to a temporary recycle bin rather than permanent deletion.
  - **POST /history/export:** Export history data in JSON or CSV formats with the format selectable via a query parameter.

- **Undo & Recycle Bin Functionality:**
  - **Recycle Bin:** Deleted history records are stored in a separate JSON file (e.g., `history_trash.json`) for a configurable period before permanent deletion.
  - **Restoration Command:** Provide a CLI command (`--undo-history <record_id>`) and an HTTP endpoint (e.g., `PUT /history/restore/<record_id>`) to restore deleted records from the recycle bin.
  - **Automatic Purge:** After a defined retention period, records in the recycle bin are automatically purged to free up storage.

## Testing and Documentation
- **Unit and Integration Tests:**
  - Validate that history records are correctly logged, filtered, updated, and not immediately lost after deletion.
  - Test CLI commands including the new undo functionality, ensuring that restoration from the recycle bin works as expected.
  - Test HTTP endpoints to verify correct responses for listing, updating, deleting (with recycle bin transfer), restoring, and exporting history data.

- **Documentation Updates:**
  - Update the README.md and CONTRIBUTING.md files with clear usage examples and troubleshooting guidelines for history management, including the undo/recycle bin process.
  - Provide usage examples for both CLI and HTTP interactions detailing how to delete and restore records.

## Benefits
- **Data Safety:** The recycle bin mechanism minimizes data loss from accidental deletions by allowing an undo operation.
- **Enhanced Usability:** Users gain an added layer of control over history records, which contributes to a more forgiving and robust experience.
- **Consistency:** Maintains unified history operations across CLI and HTTP API layers with the added safety net of reversible deletions.

## Summary
This enhanced HISTORY_MANAGER feature not only consolidates core history record management but also introduces a robust undo functionality via a recycle bin system. By allowing users to restore accidentally deleted records, it significantly improves the overall user experience and data integrity, fully supporting our mission of being the go-to plot library for formula visualisations.