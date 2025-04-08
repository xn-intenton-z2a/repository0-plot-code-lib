# CUSTOM_ALIASES Feature Specification

## Description
This feature introduces the ability to define and manage custom command aliases for the plotting tool. Users can create shorthand commands for frequently used plot commands or complex parameter sets. By assigning a simple alias to a longer command sequence, the workflow becomes more efficient and user-friendly, reducing repetitive typing and potential errors.

## Motivation
- **Enhanced Efficiency:** Simplifies the usage of complex plot commands by reducing them to easily memorable aliases.
- **Improved Productivity:** Streamlines workflows, especially for users who routinely use a set of parameters or complex commands.
- **Consistency:** Encourages standardization across team members by sharing alias configurations, ensuring consistent usage of plots.
- **Mission Alignment:** Reinforces our mission to be the go-to plot library by providing tools that simplify formula-based visualisations and reduce manual overhead.

## Implementation Details
1. **CLI Integration:**
   - Introduce new CLI flags (e.g., `--set-alias`, `--list-aliases`, `--remove-alias`) for managing custom command aliases.
   - Allow users to define an alias by associating a short name with a full plotting command (e.g., `--set-alias myplot="linear:col1,col2,-10,10,1"`).
   - When a user enters an alias (e.g., `myplot`), the system should look up and execute the corresponding full command.

2. **Configuration Management:**
   - Store aliases in a dedicated configuration file (JSON format) located in a user-specific directory, similar to configuration profiles.
   - Allow users to export, import, and share their alias configurations.
   - Integrate alias resolution into the existing command parsing system without interfering with other functionalities.

3. **Web Interface Support:**
   - Add a section in the web interface where users can manage their custom aliases interactively.
   - Provide options to add, edit, delete, and test aliases in real-time, with immediate feedback on the resolved command.

4. **Testing and Documentation:**
   - Develop unit and integration tests to verify that alias definitions, retrieval, and execution work as expected.
   - Update the README and CONTRIBUTING documentation with usage examples, detailed instructions, and troubleshooting tips for managing custom aliases.

## Usage
- **Setting an Alias (CLI):**
  ```bash
  node src/lib/main.js --set-alias myplot="linear:col1,col2,-10,10,1"
  ```

- **Listing Aliases (CLI):**
  ```bash
  node src/lib/main.js --list-aliases
  ```

- **Using an Alias:**
  Once an alias is set, instead of typing the full command, users can simply invoke it:
  ```bash
  node src/lib/main.js myplot
  ```

- **Removing an Alias (CLI):**
  ```bash
  node src/lib/main.js --remove-alias myplot
  ```

- **Web Interface Example:**
  - Navigate to the alias management section to view existing aliases.
  - Use form inputs to add new aliases or modify existing ones, with the interface providing a preview of the resolved command.
