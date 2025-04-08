# PLOT_HISTORY Feature Specification

## Description
This feature introduces a persistent history log for all plotting commands executed via the CLI and web interface. With PLOT_HISTORY, every plot generated, along with its parameters and output metadata, is saved in a chronological history file or database. Users can review past commands, re-run previous plots, or compare different iterations of visualizations. This feature enhances reproducibility and provides a convenient way to track the evolution of visual outputs over time.

## Motivation
- **Reproducibility:** By maintaining a detailed log of plot commands and their outcomes, users can easily recreate specific visualization states or debug erroneous plots.
- **User Workflow:** Enables users to efficiently recall recent plotting sessions, re-run successful commands with minor modifications, or share their history in collaborative settings.
- **Mission Alignment:** Supports our overarching mission of being the go-to plot library by providing a robust toolchain for iterative, formula-based visualisations. A history feature ensures that users, much like with macro recording, do not lose valuable workflow steps, fostering consistency and efficiency.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new flag (e.g., `--history`) that displays a log of recent plotting commands along with their parameters and timestamps.
   - Provide sub-commands such as `--history clear` to purge the history and `--history view` to display past entries.
   - Enable an option to re-run a selected history entry directly from the CLI.

2. **Data Storage:**
   - Maintain a local history file in JSON or a lightweight database (e.g., SQLite) stored in a user-specific directory.
   - Ensure that each log entry contains the command invoked, the output format, parameter details, and a timestamp.
   - Implement automatic archiving or purging strategies to manage file size and performance.

3. **Web Interface Integration:**
   - Add a dedicated section within the web interface where users can browse their plotting history.
   - Enable interactive features such as filtering by date, searching for specific plot types, and previewing the log details before re-triggering a plot.
   - Offer a one-click option to load a past command into the current plot interface for further editing.

4. **Testing and Documentation:**
   - Develop unit and integration tests to simulate history logging, retrieval, and re-execution across both CLI and web environments.
   - Update the README and CONTRIBUTING documents with detailed usage examples, troubleshooting guidelines, and configuration instructions.

## Usage
- **CLI Example:**
  ```bash
  # Generate a plot (this action gets logged automatically)
  node src/lib/main.js "linear:column1,column2,-10,10,1"

  # View recent plotting history
  node src/lib/main.js --history view

  # Re-run a specific history entry by its ID
  node src/lib/main.js --history run <entry_id>
  ```

- **Web Interface Example:**
   - Navigate to the history panel available in the web interface.
   - Browse through the list of past plotting commands with details and timestamps.
   - Select an entry to either view its details or re-run the associated plot command.
