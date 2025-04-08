# INTERACTIVE_LEGENDS Feature Specification

## Description
This feature adds interactive legend capabilities to the plotting tool, enabling users to dynamically toggle the visibility of plot series through clickable legend items. It enhances the visual interactivity of plots especially in the web interface, allowing audiences to focus on specific data series or hide cluttered information. When enabled, legends become actionable components within the SVG/HTML output and provide a richer user experience.

## Motivation
- **Enhanced Data Exploration:** Users can selectively display or hide plot series, facilitating more focused analysis of complex datasets.
- **Improved Aesthetics:** Interactive legends make plots cleaner and more informative, aligning with our mission to be the go-to plotting tool for detailed and formula-based visualisations.
- **Mission Integration:** By adding dynamic interactivity commonly found in modern charting libraries, we reinforce our commitment to versatile and user-friendly data visualisation tools.

## Implementation Details
1. **CLI and Web Interface Integration:**
   - Introduce a new flag (e.g., `--interactive-legends`) to enable interactive legends mode when generating plots.
   - For the web interface, integrate a clickable legend area into the existing UI that responds to user interactions using JavaScript event listeners.

2. **Rendering Engine Enhancements:**
   - Modify the SVG output generation to include legend elements with embedded JavaScript (or use external JS files) to handle click events. 
   - Update the rendering pipeline to attach unique identifiers to each data series and its corresponding legend item.
   - Ensure that toggling legend items dynamically modifies the visibility of the associated plot elements without the need to re-render entire plots.

3. **Parameter Parsing and Configuration:**
   - Extend the CLI parameter parser to recognize and validate the `--interactive-legends` flag.
   - Allow customization of legend appearance (e.g., position, font size, color) through additional options, ensuring these parameters follow existing validation rules.

4. **Testing and Documentation:**
   - Develop unit tests to verify that the interactive legend toggling is correctly implemented in both CLI-generated SVG outputs and in the web-based interface.
   - Update README and CONTRIBUTING documentation to include examples, guidelines, and supported customization options.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --interactive-legends output.svg "line:series1,series2,series3,-10,10,1"
  ```
- **Web Interface Example:**
   - Launch the web interface with interactive legends enabled (e.g., via a configuration option or toggle button).
   - Once the plot is rendered, users can click on legend items to hide or show the corresponding data series dynamically.
