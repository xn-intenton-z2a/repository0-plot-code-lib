features/WEB_INTERFACE.md
# features/WEB_INTERFACE.md
# WEB_INTERFACE Feature (Enhanced)

## Overview
This feature combines the HTTP API for plotting with enhanced debugging and diagnostic capabilities. It unifies the endpoints required for plot submission, health checks, and detailed diagnostics, streamlining the user experience and reducing code duplication. The consolidated web interface remains aligned with our mission of being the go-to tool for formula visualisations while supporting both interactive plotting and comprehensive error tracking.

## API Endpoints
- **POST /plot**: Accepts a JSON payload containing plotting commands and configuration. It supports both numeric parameter sequences and detailed JSON-based configurations. The endpoint validates input using robust Zod validation routines inherited from the CORE_ENGINE.
- **GET /health**: Provides a simple health check confirming the service is running normally.
- **GET /debug**: Returns detailed diagnostic information including current configuration settings, environment variables, processing metrics, and error logs. This endpoint supports developers in troubleshooting and performance monitoring.

## Implementation Considerations
- **Single Source File Integration**: The enhanced web interface should be implemented in a single source file (e.g., `src/web/app.js`) while reusing the CORE_ENGINE routines for numeric parsing and JSON configuration.
- **Error Handling & Logging**: Leverage existing error handling callbacks and Zod schema validation to ensure consistent error messaging. Detailed logging should be enabled for debugging when requested through the /debug endpoint.
- **Testing**: Extend the current test suites to cover the unified web endpoints, ensuring that the /plot, /health, and /debug endpoints work correctly, including edge cases and invalid inputs.
- **Documentation**: Update README and CONTRIBUTING documentation to reflect the new, merged web interface features, with examples for CLI and HTTP usage.

## Benefits
- **Unified Access**: Merges plotting and debugging capabilities under a single HTTP service, reducing maintenance overhead and simplifying deployment.
- **Enhanced Debugging**: Provides real-time diagnostic information via the /debug endpoint, improving troubleshooting in both development and production environments.
- **Mission Alignment**: Supports our goal of being the go-to plot library through improved reliability, better error messaging, and a seamless API for both plotting and diagnostics.features/rejects/PLUGIN_SYSTEM.md
# features/rejects/PLUGIN_SYSTEM.md
# PLUGIN_SYSTEM Feature

## Overview
This feature introduces a modular plugin system that enables dynamic extension of plotting functionalities without modifying the core codebase. It allows third-party and internal plugins to integrate with the CLI wizard, diagnostics mode, and even the web API. The PLUGIN_SYSTEM reinforces our mission by making the plotting library adaptable, extensible, and future-proof for additional plot types and functionalities.

## Architecture & Implementation
- **Module Creation:**
  - Develop a dedicated module, e.g., `src/lib/pluginSystem.js`, managing plugin registration, initialization, and lifecycle events.
  - Provide well-defined interfaces for plugins to register callbacks or hooks that the core engine can invoke.
- **Integration with CORE_ENGINE:**
  - Enhance the interactive CLI wizard and diagnostics mode to load and display plugin statuses.
  - Allow plugins to contribute additional plot types or modify existing behavior dynamically through hook registration.
- **Web API Compatibility:**
  - Expose endpoints within the unified WEB_API to allow querying available plugins and triggering plugin-specific actions if needed.
- **Error Handling & Safety:**
  - Incorporate robust error handling to ensure that a malfunctioning plugin does not compromise the main functionality.
  - Log plugin loading events and errors for easier troubleshooting, following the same logging practices used in numeric validations.

## Usage Examples
- **CLI Integration:**
  - Register a plugin that adds a new plot type (e.g., a custom heatmap) to the interactive CLI wizard.
  - Diagnostics mode will display all loaded plugins and their statuses to aid in troubleshooting.

- **Web API Integration:**
  - Provide an API endpoint (e.g., `/plugins`) in the web interface to list registered plugins and available extensions.

## Documentation & Testing
- Update the README and CONTRIBUTING guidelines to include details on how to develop and integrate plugins.
- Add unit tests in `tests/unit/` to cover plugin registration, execution, and failure scenarios.
- Ensure that integration tests validate the interoperability between plugins and core plotting mechanisms.

## Benefits
- **Extensibility:** Facilitate third-party contributions and experimental features without altering core logic.
- **Modularity:** Enable clean separation between core functionalities and extended features offered by plugins.
- **Enhanced Diagnostics:** Improve monitoring of plugin health and performance, aiding both developers and users in troubleshooting.

## Future Opportunities
- Introduce a marketplace or repository of plugins that users can browse and install dynamically.
- Extend the PLUGIN_SYSTEM to support versioning, dependency resolution, and safe updates.
features/rejects/INTERACTIVE_MODE.md
# features/rejects/INTERACTIVE_MODE.md
# INTERACTIVE_MODE Feature Specification

## Description
This feature introduces an interactive command-line mode for the plotting library. When launched with the `--interactive` flag, the application will enter an interactive REPL-like session where users can iteratively input mathematical formulas, adjust parameters, and immediately preview plots. The interactive session will support command history, auto-completion for supported plot types (e.g., quadratic, linear, sine, cosine, etc.), and on-screen guidance to ensure a smooth user experience.

## Motivation
- **Enhanced Usability:** Provides a more engaging and dynamic way to work with the plotting tool, especially for users who prefer iterative and exploratory data visualization.
- **Immediate Feedback:** Users will see live updates and can experiment with different formula parameters without restarting the application.
- **Accessibility:** Simplifies the process for newcomers by offering inline help and suggestions, lowering the entry barrier for using the tool.

## Implementation Details
1. **CLI Integration:**
   - Detect the `--interactive` flag from the command-line arguments in the main entry point (`src/lib/main.js`).
   - Branch the execution flow to initiate an interactive session using Node's `readline` module.

2. **Interactive Session Features:**
   - **Prompt Interface:** Initialize a REPL interface that continuously prompts the user for input.
   - **Auto-completion:** Implement auto-completion for command keywords (e.g., plot types and commands like 'help' or 'exit').
   - **Input Validation:** Utilize the existing parsing logic to validate the formulas entered by the user.
   - **Dynamic Ploting:** Allow the interactive mode to generate plots on-the-fly. The plot output will be displayed or saved depending on user interaction.
   - **Help System:** Include a help command (`help`) to list available commands, plot types, and usage tips within the session.

3. **Feedback and Error Handling:**
   - Provide clear error messages for invalid inputs.
   - Allow users to re-enter or modify commands without restarting the session.
   - Log session activities for debugging and improvement purposes.

4. **Testing and Documentation:**
   - **Unit Tests:** Add tests to simulate interactive mode sessions, ensuring that the input prompt, auto-completion, and dynamic plotting trigger as expected.
   - **Documentation:** Update the README and the CONTRIBUTING guide with examples on how to run and utilize the interactive mode. Include usage examples such as:
     ```bash
     node src/lib/main.js --interactive
     ```
   - **User Guide:** Create a short guide on available commands within the interactive session.

## Usage
- Launch the interactive mode by using the following command:
  ```bash
  node src/lib/main.js --interactive
  ```
- Within the interactive session, type `help` to view available commands and plot types.
- Enter a mathematical expression (e.g., `quad:1,0,0,-10,10,1`) to generate and preview a plot dynamically.
- Exit the mode by entering `exit` or pressing `Ctrl+C`.

This feature is designed to further our mission of being the go-to plotting tool by offering a flexible and user-friendly interface that caters to both new and experienced users.features/rejects/BATCH_PROCESSING.md
# features/rejects/BATCH_PROCESSING.md
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
features/rejects/HIGH_RES_EXPORT.md
# features/rejects/HIGH_RES_EXPORT.md
# HIGH_RES_EXPORT Feature Specification

## Description
This feature introduces high resolution export capabilities to the plotting library, enabling users to generate exportable plots in high DPI formats such as PNG and JPEG. In addition to the existing SVG, ASCII, and HTML outputs, users can now specify a resolution (DPI) parameter to produce images suited for presentations, printed materials, and publications.

## Motivation
- **Professional Output:** High resolution images are critical for printed media and professional presentations, ensuring crisp and clear visuals.
- **Expanded Use Cases:** Enhances the tool's utility in academic publications, marketing materials, and digital media where high quality is essential.
- **Mission Alignment:** Reinforces our mission to be the go-to plot library for formula visualisations by offering versatile, publication-quality outputs.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--high-res`) to activate high resolution export mode.
   - Allow an optional parameter (e.g., `--dpi <value>`) that defines the desired dots-per-inch resolution. If not specified, default to a high standard (e.g., 300 DPI).
   - Update the argument parser in `src/lib/main.js` to detect and process these flags alongside existing plotting commands.

2. **Rendering Adjustments:**
   - Modify the rendering pipeline to generate plot outputs with increased pixel density. For SVG outputs, embed scaling instructions to ensure resolution independence prior to conversion.
   - For bitmap-based outputs (PNG, JPEG), integrate an optional conversion step. This could involve using an external module (such as `sharp` if available) to convert high quality SVGs to PNG/JPEG formats without degradation.
   - Validate numeric inputs for DPI and notify users of any invalid entries with clear error messages.

3. **Output Formats:**
   - Support output in high resolution PNG and JPEG in addition to current formats.
   - Ensure that high resolution images maintain aspect ratio and accurate plotting details, even when scaled.

4. **Testing and Documentation:**
   - Add unit tests and integration tests to simulate high resolution export scenarios. Validate that the DPI setting correctly influences the rendered output resolution.
   - Update the README and CONTRIBUTING guidelines with examples demonstrating how to use the new high resolution export feature.

## Usage
- **Basic High Resolution Export:**
  ```bash
  node src/lib/main.js --high-res output.png "quad:1,0,0,-10,10,1"
  ```
- **Specify Custom DPI:**
  ```bash
  node src/lib/main.js --high-res --dpi 600 output.jpeg "sine:1,1,0,0,360,30"
  ```
- **Fallback Behavior:**
  - If an unsupported output format is specified for high resolution mode, the tool should provide an informative error message and a list of supported formats.

This feature significantly improves the versatility of our plotting tool, enabling users to generate professional-grade, high quality visuals that meet rigorous standards required across various industries.features/rejects/ADVANCED_ANALYTICS.md
# features/rejects/ADVANCED_ANALYTICS.md
# ADVANCED_ANALYTICS Feature Specification

## Description
This feature introduces advanced analytics capabilities to the plotting tool. In addition to generating plots, users can now obtain key mathematical analyses such as derivative calculations, integration (area under the curve), and statistical summaries (average, median, standard deviation). The analytics results can be overlaid on the existing plots or exported as additional output information.

## Motivation
- **Enhanced Analysis:** Provides users with deeper insights by automatically computing derivative curves and integration values of plotted functions.
- **Immediate Feedback:** Enables users to see both the original plot and its analysis simultaneously, aiding in understanding function behavior.
- **Mission Alignment:** Furthers our mission to be the go-to plot library for formula visualisations by integrating comprehensive mathematical analytics directly into the plotting workflow.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--analytics`) that triggers the analytics mode alongside standard plotting.
   - Extend the main processing logic in `src/lib/main.js` to detect the `--analytics` flag and branch into analytics computation.

2. **Analytical Computations:**
   - **Derivative Calculation:** Utilize numerical methods (e.g., finite differences) to compute the derivative of the plotted function. Optionally, overlay the derivative plot on the original graph.
   - **Integration:** Calculate the area under the curve using numerical integration techniques such as the trapezoidal rule and report the value.
   - **Statistical Summaries:** Compute statistics (average, median, standard deviation) of the function values over the defined domain.
   - Leverage existing dependencies (e.g., `mathjs`) to carry out these computations.

3. **Output Reporting:**
   - Results from analytics computations should be integrated into the output. For console output, display a summary report detailing derivative information, integration results, and statistical metrics.
   - For file outputs (SVG, TXT, etc.), include an option to overlay these analytics or output them as a separate report.

4. **Error Handling and Testing:**
   - Ensure that invalid inputs or numerical issues are handled gracefully, outputting clear error messages without interrupting the overall process.
   - Extend unit tests to cover scenarios where analytics computations are performed, including both successful calculations and controlled error conditions.

## Usage
- **Basic Analytics Mode:**
  ```bash
  node src/lib/main.js --analytics output.svg "quad:1,0,0,-10,10,1"
  ```
- **Overlay Derivative Example:**
  ```bash
  node src/lib/main.js --analytics --overlay output.svg "sine:1,1,0,0,360,30"
  ```
- **Output Detailed Report:**
  ```bash
  node src/lib/main.js --analytics --report output.txt "expr:Math.sin(x)*x:-10,10,0.5"
  ```

With these enhancements, users gain immediate insights into both the visual and analytical aspects of the plotted functions, making the tool a more comprehensive resource for mathematical visualisations.features/rejects/REPORT_GENERATOR.md
# features/rejects/REPORT_GENERATOR.md
# REPORT_GENERATOR Feature Specification

## Description

The REPORT_GENERATOR feature introduces the ability to automatically generate comprehensive, shareable reports alongside plot generation. These reports integrate the rendered plot (in formats such as SVG or PNG) with analytical insights, configuration details, and optional user commentary. The output, primarily in Markdown format, can serve as a robust documentation and presentation tool for users, enhancing reproducibility and communication of visual analysis.

## Motivation

- **Enhanced Documentation:** Automatically produce detailed reports that combine visual plots with analytical data, configuration settings, and context explanations.
- **Streamlined Sharing:** Facilitate easier sharing and archiving of analysis results by packaging plots and metadata into a single, coherent report.
- **Mission Alignment:** Supports our mission by turning the plotting tool into an all-in-one solution for formula visualizations, catering to both technical and non-technical audiences.

## Implementation Details

1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--report`) to trigger report generation in addition to the standard plot output.
   - Allow additional parameters such as `--comment` to attach user-provided insights or contextual notes.
   - Ensure that report generation can be combined with other flags like `--analytics` to include computed analytics in the report.

2. **Report Content Structure:**
   - **Plot Embedding:** Embed the generated plot either as inline SVG code or as a reference to an output image file.
   - **Analytical Insights:** Include summaries of computed statistics (e.g., derivatives, integration, and statistical summaries) if analytics are enabled.
   - **Configuration Details:** Document the plot parameters and configuration settings used, ensuring reproducibility.
   - **User Commentary:** Optionally incorporate comments or annotations provided via CLI.

3. **Output Format Options:**
   - Primary output in Markdown format for easy readability and further conversion.
   - Option to integrate with external conversion tools for PDF export if needed.

4. **Error Handling and Testing:**
   - Validate that report generation does not conflict with other functionalities such as real-time plotting or batch processing.
   - Add unit and integration tests to ensure that all elements of the report (plot image, analytics, settings, and comments) are correctly captured and formatted.

## Usage

- **Basic Report Generation:**
   ```bash
   node src/lib/main.js output.svg "quad:1,0,0,-10,10,1" --report
   ```

- **Enhanced Report with Analytics and Comments:**
   ```bash
   node src/lib/main.js --analytics output.svg "sine:1,1,0,0,360,30" --report --comment "Preliminary analysis of sine function behavior."
   ```

This feature not only enriches the user experience but also bolsters the tool's capacity for generating professional, reproducible documentation of mathematical visualizations.features/rejects/ANIMATED_PLOTTING.md
# features/rejects/ANIMATED_PLOTTING.md
# ANIMATED_PLOTTING Feature Specification

## Description
This feature introduces animated plotting capabilities to the library, allowing users to generate dynamic visualizations that evolve over time. Using this mode, the plotting tool can create sequences of frames—compiled into animated GIFs or video files—that demonstrate how mathematical functions change, offering a clear, time-based perspective on their behavior.

## Motivation
- **Dynamic Visualization:** Go beyond static plots to showcase temporal evolutions, making it easier to understand functions that vary with time or exhibit oscillatory behavior.
- **Enhanced Engagement:** Animated plots provide a more intuitive and engaging representation of mathematical phenomena, increasing the tool's appeal for education, demonstrations, and exploratory data analysis.
- **Mission Alignment:** Further the mission of being the go-to plotting library by incorporating modern, interactive visual outputs that resonate with both novice users and professionals.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--animate`) that triggers animated plotting mode.
   - Allow additional parameters like `--frames` (number of frames), `--duration` (total animation length), and optionally `--delay` (time between frames) to control the animation.
   - Adjust the main entry point in `src/lib/main.js` to interpret these flags and branch into the animation workflow.

2. **Animation Workflow:**
   - **Frame Generation:** Leverage the existing plotting logic to generate a sequence of individual frames based on gradually changing parameters or time steps. Reuse numeric parsing and validation to ensure each frame's input is valid.
   - **Assembly:** Combine the generated frames into an animated format (e.g., GIF). Consider using an optional dependency or integrating with a lightweight encoder if available. Clearly document any additional dependency required.
   - **Output:** Support output file formats commonly used for animations such as `.gif` or video formats. Provide proper error messaging if the output format is unsupported.

3. **Error Handling and Testing:**
   - Validate that the required parameters (and frame count) are provided, and that numeric inputs for time progression are valid.
   - Extend the unit tests to simulate animated plot generation and verify that sequences are correctly assembled into the final output.
   - Ensure the animation mode fails gracefully when parameters are missing or invalid, providing informative error messages to the user.

4. **Documentation and Examples:**
   - Update the README and CONTRIBUTING guidelines to describe animated plotting mode, including examples and parameter explanations.
   - Provide sample usage:
     ```bash
     node src/lib/main.js --animate output.gif "sine:1,1,0,0,360,30" --frames 30 --duration 1000
     ```

## Usage
- **Animated Plot Generation:**
  ```bash
  node src/lib/main.js --animate output.gif "sine:1,1,0,0,360,30" --frames 30 --duration 1000
  ```
- **Parameter Details:**
   - `--animate`: Activates animated plotting mode.
   - `--frames <number>`: Sets the total number of frames to generate.
   - `--duration <milliseconds>`: Determines the total duration of the animation.

This feature empowers users to visualize temporal aspects of mathematical functions in a dynamic, engaging way, fulfilling the promise of our mission to be the ultimate tool for innovative formula visualizations.features/rejects/CONFIG_SUPPORT.md
# features/rejects/CONFIG_SUPPORT.md
# CONFIG_SUPPORT Feature Specification

## Description
This feature provides support for user-defined configuration files to customize default plotting parameters for the library. In addition to the existing JSON configuration support, this update introduces optional YAML support to widen the range of configuration file formats accepted by the CLI. Users can now provide either a JSON or a YAML configuration file to specify default plot settings such as colors, grid styles, axes labels, and output formats. This enhancement reduces the need for repeated command-line arguments and improves the overall user experience while remaining faithful to our mission of offering versatile visualisations.

## Motivation
- **Customizability:** Users can personalize and streamline their plotting outputs by predefining configuration parameters in a file.
- **Flexibility:** Support for both JSON and YAML formats allows users to choose their preferred configuration structure.
- **Consistency:** Ensure consistent plot styling across commands while allowing ad-hoc overrides through CLI flags.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI option `--config <path>` to specify the configuration file path.
   - The application will detect the configuration file type based on its extension (e.g., `.json`, `.yaml`, or `.yml`).
   - Update the main script (src/lib/main.js) to load and parse the configuration file accordingly.

2. **Configuration Parsing:**
   - For JSON files, continue to use a standard JSON parser as previously implemented.
   - For YAML files, integrate a YAML parser, such as `js-yaml`. If the library is not installed, instruct the user on how to add it as an optional dependency.
   - Validate configuration parameters using a schema (e.g., via `zod`) to ensure values and types are correct.
   - Allow configuration values to be overridden by CLI flags when specified.

3. **Plotting Parameter Defaults:**
   - Merge configuration options with existing CLI arguments. For example, default color schemes, grid visibility, and axes parameters should be applied based on the provided configuration file.
   - Document edge cases and fallback behavior when configuration file values are invalid or missing.

4. **Documentation and Tests:**
   - Update the README with examples illustrating how to use both JSON and YAML configuration files. For instance:
     ```bash
     node src/lib/main.js --config config.yaml output.svg "quad:1,0,0,-10,10,1"
     ```
   - Update the configuration file example documents in `features/CONFIG_SUPPORT.md` and README.
   - Extend unit tests to check that configuration files in both JSON and YAML formats are parsed and merged correctly.

## Usage
- **Via CLI:**
  ```bash
  node src/lib/main.js --config path/to/config.json output.svg "quad:1,0,0,-10,10,1"
  node src/lib/main.js --config path/to/config.yaml output.svg "quad:1,0,0,-10,10,1"
  ```

- **Configuration File Examples:**
   **JSON (`config.json`):**
   ```json
   {
     "defaultColor": "#3498db",
     "showGrid": true,
     "axisLabelFontSize": 12
   }
   ```
   **YAML (`config.yaml`):**
   ```yaml
   defaultColor: "#3498db"
   showGrid: true
   axisLabelFontSize: 12
   ```

This feature update aligns with our mission by enhancing the flexibility and usability of the plotting tool, making it a more robust and user-friendly solution for mathematical visualisations.features/rejects/THEME_MANAGER.md
# features/rejects/THEME_MANAGER.md
# THEME_MANAGER Feature Specification

## Description
This feature introduces a theme management system for our plotting tool. Users can select from a variety of predefined themes or create their own custom themes to control the visual appearance of plots. Themes include settings for color palettes, background colors, grid styles, and line aesthetics. The feature integrates with the existing configuration support so that theme preferences can be applied via command-line flags or configuration files.

## Motivation
- **Enhanced Customization:** Users can quickly switch between different styles to match presentation contexts, publication requirements, or personal preferences.
- **Consistency:** Themes ensure that plots maintain a consistent look and feel across different sessions and outputs.
- **Mission Alignment:** By offering versatile visual customization, the tool reinforces our mission to be the go-to plot library for formula visualisations, making it more adaptable for various users and scenarios.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--theme <themeName>`) that allows users to specify the theme for the current plotting session.
   - Update the argument parser in `src/lib/main.js` to detect and apply the theme flag alongside other configurations.

2. **Theme Storage and Management:**
   - Define a default set of themes (for example, `DEFAULT`, `DARK_MODE`, `LIGHT_MODE`, `HIGH_CONTRAST`).
   - Allow themes to be loaded from an external file (e.g., `themes.json` or integrated in the configuration file supported by the `--config` flag).
   - Provide an API or utility module for querying, applying, and even saving new theme configurations.

3. **Rendering Engine Integration:**
   - Modify the rendering pipeline to apply theme settings (e.g., colors, fonts, grid styles) to the generated plots.
   - Ensure that theme changes are reflected consistently whether the output is SVG, PNG, ASCII, or HTML.

4. **Error Handling and Validation:**
   - Validate theme names supplied via the CLI. If a theme is not recognized, return an informative error message and list available themes.
   - Allow fallbacks to a default theme if custom themes are missing or invalid.

5. **Testing and Documentation:**
   - Write unit tests to validate theme parsing, application, and merging with default settings.
   - Update the README and CONTRIBUTING documentation with examples on how to use the `--theme` flag and how to define custom themes.

## Usage
- **Basic Theme Application:**
  ```bash
  node src/lib/main.js output.svg "quad:1,0,0,-10,10,1" --theme DARK_MODE
  ```
- **Defining Custom Themes:**
   - Users can define custom theme configurations in a JSON file. An example `themes.json`:
   ```json
   {
     "MY_CUSTOM_THEME": {
       "backgroundColor": "#f0f0f0",
       "gridColor": "#cccccc",
       "lineColor": "#ff5733",
       "font": "Arial, 12px"
     }
   }
   ```
   - Load the custom theme using the `--config` flag along with `--theme MY_CUSTOM_THEME`.

This feature enhances the versatility and aesthetic control of the plotting tool, enabling users to adapt plot visuals effortlessly to diverse scenarios.features/rejects/USER_INTERFACE.md
# features/rejects/USER_INTERFACE.md
# USER_INTERFACE Feature (Enhanced)

## Overview
This updated USER_INTERFACE feature consolidates and enhances the interactive aspects of our plotting library. It combines the command-line wizard, web API endpoints, and animated plot rendering (previously in the separate PLOT_ANIMATIONS feature) into a single cohesive interface. In addition, a new Command History capability has been added to improve usability by allowing users to review and re-execute previous commands, making the CLI experience more efficient and user-friendly.

## Key Enhancements
- **Unified Interaction:**
  - Merges CLI wizard functionality, web API endpoints, and animated plot rendering into a single interface. 
  - Provides context-sensitive help, dynamic plot previews, and real-time feedback across both command-line and HTTP interactions.

- **Enhanced CLI Experience:**
  - Retains step-by-step prompts, input validation, and integrated help content.
  - Introduces a new Command History feature that stores previous commands during a session. Users can navigate this history to re-execute or modify past plotting commands, improving efficiency for repeated tasks.
  - Leverages existing numeric and formula parsing routines from the CORE_ENGINE, including support for JSON-based parameter configuration and batch plotting commands.

- **Web API Integration:**
  - Exposes unified endpoints (e.g., `/api/plot`, `/api/preview`, `/api/history`) to mirror CLI functionalities. The new history endpoint provides a log of recent commands for session continuity.
  
- **Animated Plot Rendering & Preview Mode:**
  - Incorporates lightweight animated plot transitions that provide visual feedback. These animations were part of the former PLOT_ANIMATIONS feature and now blend seamlessly with the interactive CLI/web interface.
  - Offers a preview mode for quick, low-overhead confirmations before full plot rendering.

## Implementation Roadmap
1. **Merge Existing Functionalities:**
   - Integrate the animation routines from the former PLOT_ANIMATIONS feature directly into the USER_INTERFACE module.
   - Ensure that both CLI and HTTP endpoints offer identical preview and animation options using the unified CORE_ENGINE routines.

2. **Develop Command History:**
   - Implement in-memory storage for the current CLI session, with an option to persist history to a file in the user's home directory for longer sessions.
   - Add keyboard navigation (e.g., up/down arrow support) to allow users to scroll through previous commands.
   - Create an HTTP endpoint (`/api/history`) to fetch command history for web interface users.

3. **Synchronization & Testing:**
   - Ensure that command history works seamlessly with both advanced and non-advanced plotting commands. 
   - Update both unit and integration tests to cover new history functions along with enhanced UI interactions.
   - Update README and CONTRIBUTING documentation with examples of command history usage, including CLI shortcuts and API request examples.

## Benefits
- **Streamlined Experience:** Users benefit from a single, unified interface that minimizes context switching between CLI and web.
- **Improved Usability:** Command History enhances user productivity by making it easy to recall, modify, and re-execute previous commands.
- **Consistent Behavior:** Merging animation and preview functionality into the core user interface ensures a uniform experience across all entry points.
- **Maintenance Efficiency:** Consolidating multiple interactive elements reduces code duplication and simplifies future enhancements.
features/rejects/REALTIME_PLOTTING.md
# features/rejects/REALTIME_PLOTTING.md
# REALTIME_PLOTTING Feature Specification

## Description
This feature introduces real-time plotting capabilities to our library. With real-time plotting, users can stream data continuously and see dynamic, live-updating visualizations. This mode is ideal for time-series data, sensor outputs, or any application requiring immediate visual feedback from incoming data streams.

## Motivation
- **Immediate Feedback:** Enables users to monitor data as it is generated, providing instant insights into trends and anomalies.
- **Enhanced Engagement:** Live visualizations improve user experience by interacting dynamically with data.
- **Mission Alignment:** By supporting real-time updates, we further our mission of being the go-to tool for versatile and innovative formula visualizations.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--live`) to activate real-time plotting mode.
   - Accept additional parameters for specifying the data source (e.g., a WebSocket URL or data stream endpoint).

2. **Data Streaming and Validation:**
   - Integrate with a WebSocket server (or similar streaming API) to handle incoming data.
   - Validate streamed data using existing numeric validation routines and ensure that data points are appropriately timestamped and ordered.

3. **Rendering and Update Mechanism:**
   - Extend the current rendering engine to refresh plots in real time. Use incremental updates to avoid re-rendering the entire plot with each new data point.
   - Support multiple output formats. For web-based outputs (HTML/SVG), ensure smooth transitions and animations between updates.

4. **Configuration and Error Handling:**
   - Allow configuration of refresh rates, buffer sizes, and timeout values either via CLI flags or configuration files.
   - Include robust error handling to manage interruptions in the data stream, such as reconnecting logic and informative user messages.

5. **Testing and Documentation:**
   - Add unit and integration tests for live data streaming, ensuring that the plotting engine correctly updates on new incoming data.
   - Update the README and CONTRIBUTING guides with clear usage examples and troubleshooting tips for real-time plotting.

## Usage
- **Basic Real-Time Plotting Mode:**
  ```bash
  node src/lib/main.js --live ws://localhost:4000/data output.svg "live:data"
  ```

- **Using with Web Interface:**
  Launch the web interface with real-time updates enabled, which will allow multiple clients to view a live-updating plot.

This feature transforms static plotting into an interactive, real-time visualization tool, making our library more versatile and better suited for dynamic data analysis.features/rejects/3D_PLOTTING.md
# features/rejects/3D_PLOTTING.md
# 3D_PLOTTING Feature Specification

## Description
This feature introduces three-dimensional plotting capabilities to the library. It enables users to generate 3D visualizations of mathematical functions, surfaces, and spatial data. By extending beyond traditional 2D plotting, users can explore complex relationships in multidimensional datasets.

## Motivation
- **Enhanced Visual Insight:** 3D plots offer a deeper understanding of multi-dimensional relationships, making it easier to interpret and analyze complex data.
- **Broad Application Spectrum:** Useful in scientific research, engineering, and advanced data analytics where spatial representation is critical.
- **Mission Alignment:** Elevates our mission by evolving our tool into the go-to library for innovative and comprehensive formula visualizations.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--3d`) to trigger the 3D plotting mode.
   - Update the argument parser in `src/lib/main.js` to detect and process the `--3d` flag alongside existing commands.

2. **Rendering Engine Enhancements:**
   - Extend the current rendering pipeline to support three axes (X, Y, and Z).
   - Implement projection methods (such as isometric, perspective, or orthographic) to convert 3D data into 2D representations for static outputs (SVG, PNG) and interactive HTML.
   - Optionally integrate with external libraries (e.g., Three.js or a D3-based 3D module) for enhanced rendering and interactivity.

3. **Input Format and Validation:**
   - Define a new input format for 3D plots, for example: `surface:<expression>,<minX>,<maxX>,<minY>,<maxY>,<resolution>`. Example: `surface:sin(x)*cos(y),-10,10,-10,10,0.5`.
   - Reuse and extend the existing numeric validation routines to accommodate additional parameters for 3D domain definitions.

4. **Output and File Formats:**
   - Support multiple output formats including static (SVG, PNG) and dynamic (HTML with interactive controls).
   - Ensure that the generated 3D plot retains clarity and accuracy in different output settings, with options to adjust resolution and projection.

5. **Testing and Documentation:**
   - Add unit and integration tests to verify the correctness of 3D rendering, input parsing, and projection transformations.
   - Update the README and CONTRIBUTING guides to include usage examples and instructions for the 3D plotting feature.

## Usage
- **Basic 3D Plotting Mode:**
  ```bash
  node src/lib/main.js --3d output.svg "surface:sin(x)*cos(y),-10,10,-10,10,0.5"
  ```
- **Advanced 3D Interactive Output:**
  ```bash
  node src/lib/main.js --3d output.html "surface:exp(-((x/5)^2+(y/5)^2)),-10,10,-10,10,0.5"
  ```

This feature significantly broadens the plotting capabilities of the tool by enabling users to visualize mathematical functions in three dimensions, thereby supporting more advanced data analysis and presentation needs.features/rejects/DIAGNOSTICS.md
# features/rejects/DIAGNOSTICS.md
# DIAGNOSTICS Feature Specification

## Description
This feature introduces a diagnostics mode that allows users to run health checks and environment verifications for the plotting library. By invoking the diagnostics mode (using the `--diagnostics` flag), the application will perform a series of tests including configuration validation, dependency checks, and environment status reporting. The diagnostics information will help users and developers identify configuration issues, incompatible dependency versions, and runtime anomalies.

## Motivation
- **Enhanced Troubleshooting:** Quickly identify issues related to configuration, dependency conflicts, or runtime errors, reducing downtime and support overhead.
- **User Confidence:** Provides transparency into the system’s operational status, reinforcing the reliability of the plotting tool.
- **Developer Tools:** Assists maintainers and contributors by providing detailed reports that can be used to debug and optimize performance, ensuring adherence to the mission of being the go-to plotting library.

## Implementation Details
1. **CLI Integration:**
   - Detect the `--diagnostics` flag in the main entry point (`src/lib/main.js`).
   - Branch the execution flow to initialize a diagnostics session instead of the default plotting actions.

2. **Diagnostics Checks:**
   - **Configuration Validation:** Verify configuration files (JSON/YAML) and check for any schema mismatches or missing required parameters.
   - **Dependency Check:** Report installed versions of key dependencies (e.g., `express`, `mathjs`, `zod`) and compare them against recommended versions.
   - **Environment Verification:** Check for Node.js version compatibility and environmental variables required for extended features (e.g. `dotenv` configurations).
   - **Error Logging:** Scan recent error logs or output messages (if available) to highlight common issues encountered during runtime.

3. **Output Reporting:**
   - Display a summary report in the console with sections for each diagnostics check.
   - Use color-coded output to highlight errors (e.g., red for critical issues, yellow for warnings) and successful checks in green.
   - Optionally, allow a verbose mode (`--verbose`) to display detailed diagnostics for each check.

4. **Integration with Tests:**
   - Add unit tests to simulate diagnostics mode, verifying that the correct reports are generated and that error cases are properly handled without causing the process to terminate unexpectedly.

## Usage
- **Basic Diagnostics Mode:**
   ```bash
   node src/lib/main.js --diagnostics
   ```
- **Verbose Diagnostics Mode:**
   ```bash
   node src/lib/main.js --diagnostics --verbose
   ```

Upon invocation, the diagnostics feature will perform sequential checks and output a clear, formatted report detailing the health of the current plotting environment.
features/rejects/PLOT_ANNOTATION.md
# features/rejects/PLOT_ANNOTATION.md
# PLOT_ANNOTATION Feature Specification

## Description
This feature introduces annotation capabilities to the plotting tool. Users will be able to overlay textual labels, markers, arrows, and other visual callouts onto plots. Annotations can highlight key data points, explain trends, or provide interactive notes on a generated plot. The feature will extend both CLI and web-based outputs, ensuring that plots are not only visually appealing but also informative.

## Motivation
- **Enhanced Communication:** Annotated plots allow users to emphasize important aspects or data insights directly on the visualization.
- **User Flexibility:** Users can add context to plots, making them more suitable for presentations, reports, or educational materials.
- **Mission Alignment:** Supports our mission to be the go-to plot library by providing a richer, more informative visualization experience that caters to both technical users and educators.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--annotate`) that accepts annotation parameters alongside the plot command.
   - Extend the argument parser in the main entry point (`src/lib/main.js`) to handle annotation options.

2. **Annotation Options:**
   - **Text Labeling:** Allow users to specify text to be placed at defined coordinates on the plot.
   - **Arrow/Marker Support:** Enable optional markers or arrows to point out key areas. Parameters may include position, text, color, and style.
   - **Multiple Annotations:** Support multiple annotations per plot, either specified as a comma-separated list or via a structured JSON/YAML input.

3. **Rendering Engine Integration:**
   - Modify the plotting rendering engine to overlay annotations on the plot. Ensure that annotations do not interfere with the underlying graph data.
   - For SVG and HTML outputs, utilize text elements and path elements to represent annotation content.

4. **Error Handling and Validation:**
   - Validate annotation parameters (e.g. coordinate values and supported styles).
   - Provide clear error messages if annotation specifications are invalid or incompatible with the plot type.

5. **Testing and Documentation:**
   - Add unit tests and integration tests to cover various annotation scenarios, including edge cases with overlapping annotations or invalid parameters.
   - Update the README and CONTRIBUTING guides with annotation usage examples and parameter details.

## Usage
- **Basic Annotation Example:**
  ```bash
  node src/lib/main.js output.svg "quad:1,0,0,-10,10,1" --annotate "label:Peak, x:2, y:5"
  ```
- **Multiple Annotations:**
  ```bash
  node src/lib/main.js output.svg "sine:1,1,0,0,360,30" --annotate "label:Start,x:0,y:0; label:End,x:360,y:0"
  ```
- **Web Interface Integration:**
   - When using the web interface (`--serve`), provide an annotation panel that accepts user inputs for text, coordinates, and style options, updating the plot in real time.

This feature will make plots more informative and user-friendly, adding significant value in academic, business, and analytical use cases.features/CORE_ENGINE.md
# features/CORE_ENGINE.md
# CORE_ENGINE Feature (Enhanced)

## Overview
The CORE_ENGINE remains the backbone of our plotting library. In this update, we integrate our robust numeric parsing, advanced JSON-based parameter configuration, and batch plotting support into a unified system. This update improves error handling, extended Unicode normalization and locale-specific number formatting, while preserving our mission of being the go-to tool for formula visualisations.

## JSON Configuration Integration
- **Objective:** Enhance plot configurations by accepting detailed JSON objects to define data arrays, labels, colors, and titles.
- **Features:**
  - Parse parameters as JSON when the input string begins with `{` and ends with `}`.
  - Provide clear error messages for invalid JSON and ensure smooth integration with numeric routines.
  - Update documentation and tests with practical examples for both CLI and web API usage.

## Advanced Numeric Parsing & Error Handling
- **Objective:** Provide robust numeric validation and customization for international or strict numeric inputs.
- **Features:**
  - Utilize Zod schema for comprehensive token transformation including trimming, Unicode normalization (NFC), and locale-aware lower-casing.
  - Support a configurable set of accepted NaN aliases (with full Unicode support) and enforce a canonical form in strict mode.
  - Allow for custom error handling callbacks for flexible error reporting in different environments.
  - Handle thousands separators appropriately based on locale settings (English or European), ensuring precision in numeric conversions.

## Batch Plotting Commands
- **Objective:** Improve user productivity by processing multiple plotting commands in a single CLI invocation.
- **Features:**
  - Seamlessly integrate advanced and non-advanced command handling within the same run.
  - Ensure independent validation and error logging for each command.
  - Provide detailed output and diagnostic logging, enabling efficient debugging and scriptability.

## Benefits
- **Unified Functionality:** Combines core plotting routines with advanced JSON configuration, robust numeric parsing, and batch command processing.
- **Enhanced User Experience:** Customizable and locale-aware numeric handling paired with flexible configuration support directly benefits users working with complex plot setups.
- **Mission Alignment:** Advances our goal of delivering a versatile, user-friendly formula visualization tool with a strong emphasis on reliability and internationalization.
