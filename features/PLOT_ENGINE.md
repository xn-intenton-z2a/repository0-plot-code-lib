# PLOT_ENGINE

## Overview

The PLOT_ENGINE is the core plotting module of the repository, responsible for converting a wide range of mathematical functions into visual plots. It supports multiple modes of operation including command-line, interactive REPL, and a web-based interface. In addition to the traditional functionalities such as generating quadratic, linear, sine, cosine, exponential, and logarithmic plots, the PLOT_ENGINE now incorporates advanced statistical visualization and interactive plotting capabilities to enhance user experience and analytical insights.

## Key Objectives

- **Comprehensive Plot Generation:** Support for standard mathematical functions and extended plot types including tangent, polar, parametric, inverse function plots, cumulative averages, gradient visualizations, box plots, and violin plots.
- **Multi-Modal Operation:** Enable plot generation through direct CLI commands, an enhanced interactive REPL for real-time formula input and evaluation, and an Express-based web interface.
- **Advanced Data Analysis:** Incorporate analytical methods such as area under the curve calculation, derivative estimation via finite differences, and additional statistical metrics.
- **Robust Error Handling & Diagnostics:** Consistent logging and error diagnostics to aid in troubleshooting and ensuring stable operation across all modes.

## Design & Implementation

### CLI and File-based Plot Generation

- **Command-line Arguments:** The first argument specifies the output type (e.g., file or specific format), and subsequent arguments provide the plot specification (e.g., formula and range). Additional flags such as `--help` display usage instructions.
- **Formula Evaluation:** Utilizes the mathjs library for precise computation over defined ranges, followed by constructing visual outputs in multiple formats such as SVG, ASCII, CSV, JSON, Markdown, and HTML.

### Enhanced Interactive REPL

- **Interactive Mode Revamp:** Upgraded interactive mode now functions as a full-fledged REPL that prompts the user for input, evaluates mathematical expressions in real-time, and displays immediate plot previews or analytical summaries.
- **Real-time Feedback:** Users receive instantaneous confirmation of parsed formulas and can iteratively refine their input with dynamic error checking and suggestions, enriching the user experience.
- **Seamless Integration:** The REPL seamlessly ties into the underlying plotting engine, ensuring that all CLI functionalities (e.g., alias resolution and diagnostic logging) are maintained.

### Web Interface

- **Express-based Endpoint:** Implements an HTTP API endpoint that allows clients to request plots dynamically using standard query parameters, facilitating integration with web applications and further automation.
- **Scalable Deployment:** Designed to operate in both development and production environments with minimal configuration through environment variables.

### Testing & Quality Assurance

- **Comprehensive Unit Testing:** Utilizes vitest to cover all aspects of plot generation, REPL interactions, HTTP request handling, and error diagnostics.
- **Integration with NAN_HANDLER:** Maintains the consistency and configurability provided by the NAN_HANDLER for alias resolution, ensuring valid numerical handling throughout plot computations.

## Usage

### CLI Quickstart

```bash
node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
```

### Enhanced Interactive REPL

```bash
node src/lib/main.js --interactive
```

- The REPL will prompt for formulas interactively and provide immediate textual or visual feedback.

### Web Interface

```bash
node src/lib/main.js --serve
```

- Access the web interface at http://localhost:3000 to generate plots via HTTP requests.

By enhancing the PLOT_ENGINE with an interactive REPL along with extended plotting capabilities and detailed error diagnostics, the repository continues to fulfill its mission of being the go-to tool for formula visualisations.
