# CONFIG_MANAGER Feature Specification

## Description
This feature introduces a configuration management system that allows users to save, load, and manage custom plotting profiles. Users can define default plot settings such as color themes, axis styles, line thickness, and other visualization parameters, storing them in configuration files. These profiles can then be loaded for future plotting sessions via CLI or the web interface, providing a personalized and streamlined plotting experience.

## Motivation
- **Enhanced User Experience:** Users often have preferred settings for their visualizations. By allowing them to save these as profiles, the tool becomes more user-friendly and efficient for recurring workflows.
- **Consistency:** Loading configuration profiles ensures that plots retain consistency across sessions, promoting uniformity in presentations and reports.
- **Mission Alignment:** This feature aligns with our mission to be the go-to plotting library by reducing repetitive input, similar to how jq allows for reusable query configurations. It empowers users to customize and preserve their unique visual styles.

## Implementation Details
1. **CLI Integration:**
   - Introduce new CLI flags such as `--save-config <profileName>` and `--load-config <profileName>`.
   - When saving, capture current plot parameters (e.g., themes, axis settings, default plot types) and store them in a JSON configuration file located in a user-specific directory.
   - When loading, merge the saved profile settings with current command-line parameters, where explicit CLI options override the defaults in the profile.

2. **Configuration File Management:**
   - Use a standardized JSON schema to validate configuration profiles with tools like `zod`.
   - Allow users to manually edit configuration files if needed, and provide default sample profiles in the documentation.

3. **Web Interface Support:**
   - Add a configuration management panel in the web interface where users can create new profiles, select from pre-defined ones, and update existing settings interactively.
   - Provide real-time previews of how the loaded configuration will affect the current plot.

4. **Testing and Documentation:**
   - Develop unit and integration tests to cover saving, loading, and merging configurations, ensuring backward compatibility with existing features.
   - Update the README and CONTRIBUTING documentation with examples, usage instructions, and troubleshooting tips for managing configuration profiles.

## Usage
- **CLI Example:**
  ```bash
  # Save current settings as 'defaultProfile'
  node src/lib/main.js --save-config defaultProfile --plot "linear:column1,column2,-10,10,1"

  # Load the saved configuration for subsequent plotting commands
  node src/lib/main.js --load-config defaultProfile --plot "sine:1,0,0,360,1"
  ```

- **Web Interface Example:**
   - Launch the web server and navigate to the configuration panel to select a profile or create a new custom configuration. The selected profile will automatically populate default settings in the plotting interface.