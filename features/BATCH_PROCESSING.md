# BATCH_PROCESSING Feature Specification

## Description
This feature introduces batch processing capabilities into our plotting library. It enables users to execute a series of plotting commands defined in an external file (e.g., a plain text or JSON file) in one go. By automating sequential plot generation, this functionality reduces repetitive command-line invocations and streamlines workflows when multiple plots need to be generated consistently.

## Motivation
- **Enhanced Efficiency:** Users working on large datasets or producing multiple plots for reports can automate the plotting process, saving time and reducing manual input.
- **Reproducibility:** Batch processing helps in consistently generating plots from pre-defined instructions, ensuring reproducibility across different sessions.
- **Mission Alignment:** This feature reinforces our mission to be the go-to plot library (the jq of formulae visualisations) by introducing automation and scalability, thus catering to both one-off plotting needs and bulk processing tasks.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new flag (e.g., `--batch <filePath>`) that tells the CLI to read and process a file containing multiple plot commands.
   - The batch file can be formatted as either a plain text file with one command per line or a structured JSON array of commands.

2. **Command Parsing and Validation:**
   - Reuse the existing numeric validation and parameter parsing logic for each command pulled from the batch file.
   - Enforce proper error handling so that if one command fails validation, the system logs the error and optionally continues with subsequent commands.

3. **Execution Pipeline:**
   - For each command in the batch file, call the main plotting function to generate the corresponding plot output.
   - Support batch processing for both CLI and, where applicable, web interface contexts by queuing commands and processing them sequentially.

4. **Testing and Documentation:**
   - Develop unit and integration tests to simulate batch input scenarios, ensuring that the processing of multiple commands works as expected.
   - Update the README and CONTRIBUTING documentation with examples and usage guidelines for batch processing.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --batch commands.txt
  ```
- **Batch File Format Example (Plain Text):**
  ```
  linear:column1,column2,-10,10,1
  scatter:1,2;3,4;5,6;7,8
  sine:1,0,0,360,1
  ```
- **Batch File Format Example (JSON):**
  ```json
  [
    "linear:column1,column2,-10,10,1",
    "scatter:1,2;3,4;5,6;7,8",
    "sine:1,0,0,360,1"
  ]
  ```
