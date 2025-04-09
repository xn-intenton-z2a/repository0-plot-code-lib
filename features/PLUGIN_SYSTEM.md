# Overview
The PLUGIN_SYSTEM feature introduces a lightweight plugin architecture that allows users and external developers to extend the plotting library with custom plot types, formula evaluators, and other processing modules. By scanning a designated plugins directory or reading a configuration file, the system can dynamically load and register plugins with minimal configuration.

# Motivation
- **Extensibility:** Enable developers to add or modify plotting behaviors without modifying the core code.
- **Community Engagement:** Foster a community-driven ecosystem where new features, visualizations, and processing techniques are contributed by users.
- **Seamless Integration:** Provide a simple interface for integrating new functionalities that complements the existing CORE_ENGINE capabilities.

# Implementation Details
1. **Plugin Loader:**
   - Implement a plugin loader in a single source file (e.g., `src/lib/pluginSystem.js`) that scans a predefined directory (e.g., `plugins/`) for plugin modules.
   - Allow plugins to export standard functions (e.g., `register`, `execute`) that the core engine will call upon initialization.

2. **CLI Integration:**
   - Add a new CLI flag (e.g., `--plugin`) to trigger the plugin system. This flag will optionally accept a plugin name or configuration file to load specific plugins.
   - Extend the main control flow in `src/lib/main.js` to invoke the plugin loader when the flag is detected.

3. **Plugin Registration and Execution:**
   - Provide a simple API for plugins to register new plot types and formula evaluation mechanisms into the CORE_ENGINE.
   - Ensure error handling and logging are in place to capture issues during plugin loading or execution.

4. **Testing and Documentation:**
   - Add unit tests for the plugin loader and for sample plugins to verify correct registration and execution.
   - Update the README and CONTRIBUTING documents to provide instructions on how to develop and integrate plugins into the system.

# Usage Examples
**Loading a Plugin via CLI:**
```bash
node src/lib/main.js --plugin myCustomPlugin
```

**Plugin Module Example:**
```js
// plugins/myCustomPlugin.js
export function register(coreEngine) {
   coreEngine.registerPlotType('customPlot', (params) => {
      // Custom plotting logic
      console.log('Executing custom plot with params:', params);
   });
}
```

This PLUGIN_SYSTEM enhances the library's flexibility, allowing it to adapt quickly to new plotting requirements and contribute to our mission of being the go-to plot library for formula visualisations.