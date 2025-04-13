# BATCH_PROCESSING Feature Specification

## Description
This feature introduces a batch processing mode that allows users to submit a file containing multiple plot commands. This file-driven approach enables automated and non-interactive generation of multiple plots in one go.

## Motivation
- **Scalability:** Process a set of plot instructions in one command, making it easier to generate numerous plots without manual intervention.
- **Automation:** Supports integration into scripts and larger workflows where plots need to be generated based on scheduled or bulk data inputs.
- **Consistency:** Ensures uniform handling of plot commands compared to interactive or one-off CLI invocations.
- **Mission Alignment:** Enhances productivity for users who need rapid visualisation of mathematical formulae, reinforcing our mission to be the go-to tool for formula visualisations.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--batch <filePath>`) to specify the path to a command file.
   - Extend the main entry point (`src/lib/main.js`) to detect this flag and branch execution accordingly.

2. **Batch File Format:**
   - The batch file will consist of one plot command per line, e.g., `quad:1,0,0,-10,10,1 output.svg`.
   - Allow comments in the file (lines starting with `#`) and ignore empty lines.

3. **Command Parsing and Execution:**
   - Utilize the existing formula parsing and validation logic to process each line as a distinct plot command.
   - Execute commands sequentially, generating appropriate output files or streaming responses.
   - Handle errors gracefully; log errors for individual commands without terminating the entire batch process.

4. **Feedback and Logging:**
   - Provide a summary report at the end of the batch process indicating the success or failure of each command.
   - Optionally, include verbose logging when a `--verbose` flag is provided, detailing the processing of each command.

5. **Testing and Documentation:**
   - **Unit Tests:** Add tests to simulate batch processing scenarios, including typical cases, error conditions, and edge cases (e.g., malformed commands).
   - **Documentation:** Update the README and CONTRIBUTING guides with examples on how to use the batch processing mode. Provide a sample batch file in the repository documentation.

## Usage
- **Batch Mode Invocation:**
  ```bash
  node src/lib/main.js --batch commands.txt
  ```

- **Example Batch File (commands.txt):**
  ```txt
  # Generate a quadratic plot
  quad:1,0,0,-10,10,1 quadratic.svg

  # Generate a linear plot
  linear:2,3,-10,10,1 linear.svg

  # Generate a sine plot
  sine:1,1,0,0,360,30 sine.svg
  ```

- **Output:**
  - Each valid command produces the corresponding plot file. A summary report at the end of processing indicates success or errors for each command.
