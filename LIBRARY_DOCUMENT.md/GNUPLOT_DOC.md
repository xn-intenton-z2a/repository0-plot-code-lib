# GNUPLOT_DOC

## Crawl Summary
Gnuplot documentation covers versions 5.4 and 5.5 with detailed commands for installation, configuration, plotting, and customization. Key technical details include command-line instructions for compiling (./configure, make), usage examples for interactive plotting and file output (set terminal pdf, set output, replot), data handling with named blocks and inline data, customization commands (set lmargin, set multiplot layout), enhanced text formatting commands (set encoding utf8, special markup syntax), and troubleshooting steps for common issues (font issues, replotting errors, hidden surface removal).

## Normalised Extract
Table of Contents:
1. INSTALLATION
   - Compile release: ./configure --prefix=$HOME/usr; make; make install
   - Development build: run ./prepare then ./configure
   - Windows build: use config/mingw or config/msvc; update makefile header
2. BASIC PLOTTING
   - Plot functions: plot sin(x)
   - Show build options: show version long; set terminal lists available formats
3. TERMINAL AND OUTPUT
   - Set terminal: set terminal pdf, png, gif animate {delay <time>} {loop <N>} {optimize}
   - File output: set output "filename"; replot; unset output
   - Using push/pop: set terminal push; set terminal pop
4. PLOT CUSTOMIZATION
   - Colors and linetype: set color, set linetype, set palette cubehelix, set pointsize
   - Border positions: set lmargin at screen 0.05; set tmargin at screen 0.95
   - Multiplot: set multiplot layout <rows>, <columns> or use set origin and set size
5. DATA HANDLING
   - Named data blocks: $DATABLOCK << EOD ... EOD; plot $DATABLOCK using 2:3:1 with labels
   - Inline data: plot "-" and terminate with e
   - Filtering data: plot "< sort +2 file.in"
6. TEXT FORMATTING
   - Enhanced text mode: use ^ for superscript, _ for subscript, {} for font changes
   - Disable markup: set title 'example' noenhanced
   - UTF-8 support: set encoding utf8; use Unicode escapes like U+221E for infinity
7. TROUBLESHOOTING
   - Missing fonts in qt session: verify terminal with set terminal
   - Incomplete output files: always use unset output to close file
   - Adjust y-axis label positioning: use numbered labels instead of ylabel when needed
8. SCRIPTING & API USAGE
   - Pipe commands: use external scripting via popen()
   - Integration with higher-level languages (e.g., Octave) via piping commands to gnuplot
Detailed Topics:
INSTALLATION:
  * For Linux release: run ./configure --prefix=$HOME/usr, then make and make install.
  * For development: git clone https://git.code.sf.net/p/gnuplot/gnuplot-main gnuplot
  * For Windows: navigate to config/ directory, update makefile header, and run appropriate make tool.
BASIC PLOTTING:
  * Command example: plot sin(x) draws the sine function.
  * Use show version long to list build and configuration options.
TERMINAL AND OUTPUT:
  * Change output format with set terminal pdf or png.
  * Use set output "filename" to direct file output, then use replot to regenerate graph.
  * Use push/pop commands to temporarily change terminal settings.
PLOT CUSTOMIZATION:
  * Change line colors and types with set color, set linetype; configure palettes with set palette cubehelix.
  * Define plot boundaries using set lmargin, set tmargin, set bmargin, set rmargin with screen fractional values.
DATA HANDLING:
  * Embed data in script using here documents ($DATABLOCK << EOD ... EOD).
  * Use inline data file syntax with plot "-" and terminating with e.
  * For pre-processing data, use shell pipelines: plot "< sort +2 file.in".
TEXT FORMATTING:
  * Use enhanced text mode defaults. Format text with ^ (superscript), _ (subscript), and {/Font options}.
  * Turn off text markup with the keyword noenhanced at commands like set title.
TROUBLESHOOTING:
  * For misaligned labels and output issues, adjust terminal settings and always close file outputs with unset output.
  * Check font issues by verifying set terminal output and referring to configuration guidelines.
SCRIPTING & API USAGE:
  * Piping commands to gnuplot allows integration with languages like Octave.
  * Example command for piping: echo "plot sin(x)" | gnuplot


## Supplementary Details
Compilation:
- Linux: ./configure [--prefix=<path>] followed by make and make install.
- Development build: git clone https://git.code.sf.net/p/gnuplot/gnuplot-main gnuplot; run ./prepare; then ./configure
- Windows: Use makefiles in config directories, update header options.

Terminal Commands:
- Set terminal types: set terminal pdf, set terminal png, set terminal gif animate {delay <time>} {loop <N>} {optimize}
- Output redirection: set output "<filename>"; replot; unset output

Plot Commands:
- Basic: plot sin(x)
- Multiplot: set multiplot layout <rows>, <columns>
- Data block: $DATABLOCK << EOD ... EOD; plot $DATABLOCK using columns

Enhanced Text:
- Markup examples: a^x (superscript), a_x (subscript), {/Times abc} for font changes.
- Disable markup using keyword noenhanced: set title 'sample' noenhanced

Configuration Options:
- set encoding utf8 for UTF-8 support
- Margin settings: set lmargin at screen 0.05, similarly for bmargin, rmargin, tmargin

Best Practices:
- Always verify terminal settings with show version long
- Use set terminal push/pop to minimize state changes
- When in doubt, run minimal command sets to reproduce errors (e.g., plot '-' with minimal dataset)

Troubleshooting:
- If fonts do not render, verify terminal type and use set encoding utf8
- For incomplete files, always unset output after plotting
- For multimode plots issues, verify that multiplot layout and origin settings match expected dimensions


## Reference Details
API and Command Specifications:
1. Command: plot <expression>
   - Usage: plot sin(x)
   - Parameters: Expression string; supports functions, data files, inline data.
   - Return: Renders a graph on the current terminal.

2. Command: set terminal <type> [options]
   - Example: set terminal pdf
   - Options: 
       pdf: Options include 'transparent', 'enhanced', 'fontscale <value>', 'size <width>, <height>'
       gif animate: Options include 'delay <time>', 'loop <N>', 'optimize'
   - Return: Sets the output format for subsequent plots.

3. Command: set output "<filename>"
   - Usage: set output "output.pdf"
   - Return: Directs plot output to the specified file.

4. Command: unset output
   - Usage: unset output
   - Effect: Closes the output file, returning to interactive mode.

5. Data Block Definition:
   - Usage:
     $DATA << EOD
     <data lines>
     EOD
   - Details: Data block can be referenced multiple times after definition.

6. Multiplot Commands:
   - set multiplot layout <rows>, <columns>
   - set origin <x>, <y> and set size <width>, <height>

7. Enhanced Text Markup:
   - Syntax: a^b for superscript, a_b for subscript
   - Font change: {/FontName text} where FontName can include modifiers like *2 for size doubling

8. Scripting Integration:
   - Piping: echo "plot sin(x)" | gnuplot
   - API pattern for embedding: Use popen() in C to open a pipe to gnuplot and send commands.

Example Code Snippet (Bash):
--------------------------------
#!/bin/bash
# Plot sine function and save to PDF
gnuplot <<EOF
  set terminal pdf transparent enhanced fontscale 0.5 size 5.00in, 3.00in
  set output "sin.pdf"
  plot sin(x)
  unset output
EOF
--------------------------------

Detailed Troubleshooting Steps:
- Command: show version long
  Expected output: List of configuration options including compiled terminals.
- If output file remains open, run: unset output
- For font issues: check with set terminal; if using qt terminal, try using win or wxt terminal.
- Verify data block usage by ensuring proper termination with EOD and correct referencing in plot command.


## Information Dense Extract
Gnuplot Documentation v5.4/5.5; Installation: ./configure --prefix=$HOME/usr, make, make install; Dev: git clone https://git.code.sf.net/p/gnuplot/gnuplot-main, ./prepare, ./configure; Windows: use config/mingw/msvc; Basic plot: plot sin(x); Terminal: set terminal pdf/png/gif animate {delay <time>} {loop <N>} {optimize}; Output: set output "filename", replot, unset output; Customization: set color, set linetype, set palette cubehelix, set pointsize; Margins: set lmargin at screen 0.05, etc.; Data: use here document $BLOCK << EOD, inline plot "-"; Text: enhanced text markup (^, _, {}), disable with noenhanced; Scripting: pipe commands (echo "plot sin(x)" | gnuplot); Troubleshooting: show version long, unset output, check terminal fonts; API: Commands with parameters, example snippet provided; Code example in bash for PDF output; Detailed command syntaxes provided.

## Sanitised Extract
Table of Contents:
1. INSTALLATION
   - Compile release: ./configure --prefix=$HOME/usr; make; make install
   - Development build: run ./prepare then ./configure
   - Windows build: use config/mingw or config/msvc; update makefile header
2. BASIC PLOTTING
   - Plot functions: plot sin(x)
   - Show build options: show version long; set terminal lists available formats
3. TERMINAL AND OUTPUT
   - Set terminal: set terminal pdf, png, gif animate {delay <time>} {loop <N>} {optimize}
   - File output: set output 'filename'; replot; unset output
   - Using push/pop: set terminal push; set terminal pop
4. PLOT CUSTOMIZATION
   - Colors and linetype: set color, set linetype, set palette cubehelix, set pointsize
   - Border positions: set lmargin at screen 0.05; set tmargin at screen 0.95
   - Multiplot: set multiplot layout <rows>, <columns> or use set origin and set size
5. DATA HANDLING
   - Named data blocks: $DATABLOCK << EOD ... EOD; plot $DATABLOCK using 2:3:1 with labels
   - Inline data: plot '-' and terminate with e
   - Filtering data: plot '< sort +2 file.in'
6. TEXT FORMATTING
   - Enhanced text mode: use ^ for superscript, _ for subscript, {} for font changes
   - Disable markup: set title 'example' noenhanced
   - UTF-8 support: set encoding utf8; use Unicode escapes like U+221E for infinity
7. TROUBLESHOOTING
   - Missing fonts in qt session: verify terminal with set terminal
   - Incomplete output files: always use unset output to close file
   - Adjust y-axis label positioning: use numbered labels instead of ylabel when needed
8. SCRIPTING & API USAGE
   - Pipe commands: use external scripting via popen()
   - Integration with higher-level languages (e.g., Octave) via piping commands to gnuplot
Detailed Topics:
INSTALLATION:
  * For Linux release: run ./configure --prefix=$HOME/usr, then make and make install.
  * For development: git clone https://git.code.sf.net/p/gnuplot/gnuplot-main gnuplot
  * For Windows: navigate to config/ directory, update makefile header, and run appropriate make tool.
BASIC PLOTTING:
  * Command example: plot sin(x) draws the sine function.
  * Use show version long to list build and configuration options.
TERMINAL AND OUTPUT:
  * Change output format with set terminal pdf or png.
  * Use set output 'filename' to direct file output, then use replot to regenerate graph.
  * Use push/pop commands to temporarily change terminal settings.
PLOT CUSTOMIZATION:
  * Change line colors and types with set color, set linetype; configure palettes with set palette cubehelix.
  * Define plot boundaries using set lmargin, set tmargin, set bmargin, set rmargin with screen fractional values.
DATA HANDLING:
  * Embed data in script using here documents ($DATABLOCK << EOD ... EOD).
  * Use inline data file syntax with plot '-' and terminating with e.
  * For pre-processing data, use shell pipelines: plot '< sort +2 file.in'.
TEXT FORMATTING:
  * Use enhanced text mode defaults. Format text with ^ (superscript), _ (subscript), and {/Font options}.
  * Turn off text markup with the keyword noenhanced at commands like set title.
TROUBLESHOOTING:
  * For misaligned labels and output issues, adjust terminal settings and always close file outputs with unset output.
  * Check font issues by verifying set terminal output and referring to configuration guidelines.
SCRIPTING & API USAGE:
  * Piping commands to gnuplot allows integration with languages like Octave.
  * Example command for piping: echo 'plot sin(x)' | gnuplot

## Original Source
Gnuplot Documentation
https://gnuplot.sourceforge.net/documentation.html

## Digest of GNUPLOT_DOC

# GNUPLOT Documentation

## Overview
This document provides the full technical details for using gnuplot based on the official documentation (versions 5.4 to 5.5). It includes commands for installation, configuration, plotting, and customization as well as detailed troubleshooting steps.

## Installation and Compilation
- To compile from a release version on Linux:
  - Command: ./configure --prefix=$HOME/usr
  - Then: make && make install
- For development source on Linux, run: ./prepare prior to ./configure
- On Windows, use makefiles available in config/mingw, config/msvc, config/watcom, or config/cygwin. Update options in the makefile header and run the appropriate make tool in the same directory.

## Basic Plot Commands
- Plot a function interactively: 
  - Example: gnuplot> plot sin(x)
- To view build options: 
  - Example: gnuplot> show version long

## Terminal and File Output Configuration
- Changing terminal output:
  - Example: gnuplot> set terminal pdf
  - Set output: gnuplot> set output "sin.pdf"
  - Replot command: gnuplot> replot
- Use push/pop for terminal switching:
  - Example: gnuplot> set terminal push

## Customization of Plot Appearance
- Change colors, linetypes, and point properties:
  - Commands: set color, set linetype, set palette, set pointsize
- For exact border positions:
  - Example: 
    set lmargin at screen 0.05
    set bmargin at screen 0.05
    set rmargin at screen 0.95
    set tmargin at screen 0.95

## Advanced Plot Types and Special Features
- 2D and 3D plots, including contour plots, heat maps, and pm3d styles.
- Animation output using GIF: 
  - Command: set terminal gif animate {delay <time>} {loop <N>} {optimize}
- Implicit graphs: Define function f(x,y) and use splot with set table to capture contour line.
- Filled curves:
  - Example: plot '+' using 1:(f($1)):(g($1)) with filledcurves
- Multiplot layouts: 
  - Command: set multiplot layout <rows>, <columns>

## Data Processing and Integration
- Use named data blocks (here documents) for combining commands and data:
  - Example:
    $DATABLOCK << EOD
    cats 4 2
    dogs 1 4
    EOD
    plot $DATABLOCK using 2:3:1 with labels
- Run data through filters:
  - Example: plot "< sort +2 file.in" 
- Pipe commands from external programs for scripting integration.

## Text Formatting and Special Symbols
- Enhanced text mode is default. Use special characters for superscript (^), subscript (_), phantom (@), and others.
- Turn off markup with keyword noenhanced: 
  - Example: set title 'filename_noenhanced' noenhanced
- Use set encoding utf8 for UTF-8 support.

## Troubleshooting and Common Issues
- Check for misaligned axis labels by using numbered labels if set ylabel norotate misbehaves.
- If fonts fail in qt terminal sessions, verify terminal type with set terminal and update configuration accordingly.
- For incomplete output files, ensure to unset output after plotting (e.g., gnuplot> unset output).
- For replot issues in multiplot, verify that configuration commands such as set multiplot are correctly issued.

## Attribution and Data Size
- Data size obtained during crawl: 4797206 bytes
- Source URL: https://gnuplot.sourceforge.net/documentation.html
- Crawled on: 2023-10-04


## Attribution
- Source: Gnuplot Documentation
- URL: https://gnuplot.sourceforge.net/documentation.html
- License: License: GPL
- Crawl Date: 2025-05-02T05:47:17.285Z
- Data Size: 4797206 bytes
- Links Found: 4351

## Retrieved
2025-05-02
