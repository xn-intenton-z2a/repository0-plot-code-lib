# Overview

The PLOT_ENGINE feature will implement the core functionality of the repository by converting mathematical formulae into visual plots. It will handle multiple output formats (SVG, ASCII, CSV, JSON, Markdown, HTML) and process various modes, including direct plot generation via CLI, interactive prompt mode, and web interface mode via an Express server.

# Design

- **Input Parsing:**
  - Accept command-line arguments where the first argument is the output target (e.g., output file or CLI flag) and the second is the formula definition (e.g., `quad:1,0,0,-10,10,1`).
  - Support flags such as `--interactive` and `--serve` to trigger different modes.

- **Plot Computation:**
  - Utilize the mathjs library to parse and evaluate mathematical expressions over a specified range.
  - Include basic plotting functionalities for types like quadratic, linear, sine, cosine, exponential and logarithmic functions.

- **Output Generation:**
  - Depending on the flags and the target, generate the appropriate plot output in the desired format.
  - Implement error handling and graceful exit if invalid input is provided.

- **Integration Modes:**
  - **CLI Mode:** Directly generate a plot file and print a summary in the console.
  - **Interactive Mode:** Prompt the user to input formulae, providing real-time feedback and updates.
  - **Web Interface Mode:** Start an Express server that provides an HTTP endpoint for plotting via browser requests.

# Usage

Below are a few examples of how a user might interact with the new PLOT_ENGINE:

1. **Basic CLI Plot Generation**
   ```bash
   node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
   ```

2. **Interactive CLI**
   ```bash
   node src/lib/main.js --interactive
   ```

3. **Web Interface**
   ```bash
   node src/lib/main.js --serve
   ```

The PLOT_ENGINE is designed to be self-contained within a single repository file, making it both lightweight and easy to maintain.
