# CALC_ENGINE

## Overview
The CALC_ENGINE feature introduces a suite of numerical analysis tools to complement the plotting capabilities of the repository. It focuses on performing derivative calculations, estimating the area under the curve (using the trapezoidal rule), and computing basic statistical functions such as average, median, mode, and standard deviation of data points derived from mathematical expressions.

## Key Objectives
- **Numerical Analysis Integration:** Seamlessly integrate with the PLOT_ENGINE to use computed data for further analytical computations.
- **Derivative Calculation:** Implement methods to approximate the derivative of a given function using finite differences.
- **Area Estimation:** Calculate the area under the curve using trapezoidal approximation to quickly quantify aggregate properties.
- **Statistical Computation:** Provide functionalities to compute average, median, mode, and standard deviation from plot data arrays.
- **CLI and Library Interface:** Enable analyzable data output via a dedicated CLI flag (`--analyze`) and support usage as a standalone module in scripts.

## Design & Implementation
### Architecture
- **Modular Design:** Develop a single source file (e.g., `calcEngine.js`) that houses all analysis routines, ensuring minimal dependencies and ease of testing.
- **Integration with PLOT_ENGINE:** The CALC_ENGINE will receive data output from PLOT_ENGINE and perform the necessary numerical computations before returning results in JSON format for further consumption by CLI or web interfaces.

### CLI Integration
- **Analyze Flag:** When the CLI flag `--analyze` is provided alongside a plot specification, the main engine will delegate numerical analysis tasks to CALC_ENGINE. This includes derivative approximation, area calculation, and basic statistics.

### Testing & Documentation
- **Unit Tests:** Implement comprehensive tests using vitest in a file (e.g., `tests/unit/calcEngine.test.js`) to cover a range of valid and edge-case scenarios.
- **Error Handling and Validation:** Ensure that erroneous inputs are caught early, with clear, actionable error messages consistent with the rest of the repository.
- **Documentation:** Update the README and CONTRIBUTING guidelines to provide examples and detailed usage instructions for the new analysis functionalities.

## Usage
### Command-Line Example
```bash
node src/lib/main.js output.svg "quad:1,0,0,-10,10,1" --analyze
```
This command will generate the plot using PLOT_ENGINE and then run the CALC_ENGINE to output additional numerical analysis results as JSON.

### Library Integration
The analysis routines can also be imported directly into other Node.js scripts for programmatic access:
```javascript
import { analyzeData } from './src/lib/calcEngine.js';

const plotData = generatePlotData(someFunction);
const analysisResults = analyzeData(plotData);
console.log(analysisResults);
```
