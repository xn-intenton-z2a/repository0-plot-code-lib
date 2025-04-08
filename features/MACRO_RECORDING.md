# MACRO_RECORDING Feature Specification

## Description
This feature introduces macro recording capabilities into the plotting library. Users will be able to record a series of plotting commands and interactions—whether from the CLI or the web interface—and save them as a macro script. These macros can then be replayed to automate repetitive tasks, ensure reproducibility of visualizations, and streamline workflows for complex plotting sequences.

## Motivation
- **Enhanced Productivity:** Automate repetitive plotting tasks by recording sequences of commands, reducing manual effort.
- **Reproducibility:** Easily recreate complex plots and analysis workflows, which is especially beneficial for reporting and iterative analysis.
- **User Empowerment:** Providing a macro recording feature aligns with our mission by giving users advanced tools to tailor their experience, much like a powerful DSL for formula-based visualisations.

## Implementation Details
1. **CLI Integration:**
   - Introduce new flags such as `--record` to start recording a session and `--replay <macro_file>` to execute a recorded macro.
   - Capture all CLI commands and associated parameters during a recording session and store them in a structured format (e.g., JSON).
   - Ensure that the recorded macro includes valid numeric parameters, error handling codes, and advanced plotting options consistent with other features.

2. **Web Interface Integration:**
   - Add record and replay buttons in the web UI, allowing users to capture their interactions (including advanced plotting actions, custom themes, and error bars settings).
   - Provide an interface to view, edit, and save the recorded macros for future use.
   - Implement safeguards to ensure that recorded actions remain synchronized with any updates or changes in the plotting commands.

3. **Macro File Format and Storage:**
   - Store macros in a portable JSON format that can be easily shared and versioned.
   - Allow users to export and import macro files to integrate with their workflow and external automation tools.

4. **Testing and Documentation:**
   - Develop unit and integration tests that simulate record, save, and replay scenarios to verify that the macros accurately reproduce the intended plot outputs.
   - Update the README and CONTRIBUTING guidelines with examples and detailed usage instructions for the macro recording and playback functionality.

## Usage
- **CLI Example:**
  ```bash
  # Record a session and save it to a macro file
  node src/lib/main.js --record session_macro.json "linear:column1,column2,-10,10,1"

  # Replay a previously recorded macro
  node src/lib/main.js --replay session_macro.json
  ```

- **Web Interface Example:**
   - Launch the web server with `npm run start:web`.
   - Use the record button to capture your plotting commands and interactions.
   - Save and later replay the macro to regenerate the plots automatically.
