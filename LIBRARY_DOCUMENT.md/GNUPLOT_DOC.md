# GNUPLOT_DOC

## Crawl Summary
Gnuplot provides command-line driven plotting with support for 2D/3D graphs, multiple terminal types (pdf, svg, gif, etc.), and scripting. Key commands include configuration of terminals (set terminal, set output), plot commands (plot, splot), and customization commands (set lmargin, set multiplot layout). Advanced features include data block definitions, enhanced text formatting using markup, and use of pipes for filtering data. It also covers installation instructions with ./configure, make, and platform-specific guidelines.

## Normalised Extract
Table of Contents:
1. Installation & Compilation
   - Use './configure --prefix=$HOME/usr', 'make', and 'make install' for release builds.
   - For development sources, run './prepare' before './configure'.
2. Command Usage & Scripting
   - Help: 'help keyword'
   - Interactive plotting: 'plot sin(x)', data input with inline '-' or named blocks ($DATABLOCK << EOD ... EOD).
3. Terminal Configuration
   - Setting terminals: 'set terminal pdfcairo enhanced fontscale 0.5 size 5.00in,3.00in'
   - Switching output: 'set output "filename"' and 'replot', then 'unset output'.
4. Plot Customization
   - Adjust colors, linetypes: 'set color', 'set linetype', 'set pointsize'.
   - Margin setup: 'set lmargin at screen 0.05', 'set rmargin at screen 0.95'.
   - Multiplot layout: 'set multiplot layout <rows>, <columns>' and positioning with 'set origin' and 'set size'.
5. Advanced Plot Types
   - Implicit defined graphs using contour extraction from surface plots.
   - Filled curves: 'plot "+" using 1:(f($1)):(g($1)) with filledcurves [above/below]'.
   - 3D to 2D projection: 'set view map', 'set view projection xz/yz'.
6. Text Formatting & Enhanced Mode
   - Superscript: use '^' (e.g., a^x)
   - Subscript: use '_' (e.g., a_x)
   - Font changes: '{/Times abc}', size adjustments with '{/Times*2 abc}', and toggle with 'noenhanced'.
7. Troubleshooting & Best Practices
   - Check configuration: 'show version long', 'set terminal' for checking compiled options.
   - Use minimal command sets for error reproduction.
   - Verify proper use of inline data and filter mechanism with popen commands.

## Supplementary Details
Installation: ./configure --prefix=$HOME/usr; make; make install. Development: ./prepare then ./configure. Terminal configuration commands include setting pdf output with 'set terminal pdfcairo enhanced fontscale 0.5 size 5.00in,3.00in' and output redirection using 'set output "file.pdf"' followed by 'replot'. Customization of plots using 'set color', 'set linetype', 'set pointsize'; margin specification using 'set lmargin at screen 0.05', etc. Inline data definitions: use $DATABLOCK << EOD ... EOD for reusable data blocks. For interactive scripting, combine 'plot', 'splot', and piping filters with '< sort +2 file.in'. Troubleshooting involves using 'show version long' and verifying terminal types with 'set terminal'.

## Reference Details
Command API and SDK-like Usage Specifications:

1. Installation Commands:
  - Release Build:
    Command: ./configure --prefix=$HOME/usr
    Follow with: make
    Then: make install
  - Development Build:
    Command: ./prepare
    Then: ./configure, make, and make install

2. Terminal Setup and Output Redirection:
  - Set terminal to PDF with Cairo:
    Command: set terminal pdfcairo enhanced fontscale 0.5 size 5.00in,3.00in
    Returns: Terminal set to pdfcairo with specified options
  - Redirect Output:
    Command: set output "sin.pdf"
    Followed by: replot
    Then: unset output (to close file)

3. Plotting Examples:
  - Basic Plotting:
    Command: plot sin(x)
  - Multiplot:
    Command: set multiplot layout 2,2
    Then plot each graph with appropriate 'set origin' and 'set size'
  - Data Block Example:
    Command: $DATABLOCK << EOD
             cats 4 2
             dogs 1 4
             EOD
    Usage: plot $DATABLOCK using 2:3:1 with labels

4. Customization Commands:
  - Change margins:
    set lmargin at screen 0.05
    set rmargin at screen 0.95
  - Control point size:
    set pointsize 1.5
  - Hidden Surface Removal:
    set hidden3d
    For pm3d: set pm3d depthorder

5. Text Formatting and Enhanced Mode:
  - Enable enhanced text (default in v5): text markup using symbols:
    Superscript: a^x
    Subscript: a_x
    Use custom fonts: {/Times abc}
  - Disable enhanced text for file names:
    set title 'file_1.dat and file_2.dat' noenhanced
  - UTF-8 encoding setup:
    set encoding utf8

6. Troubleshooting Procedures:
  - Check build options: show version long
  - Verify terminal types: set terminal
  - For missing fonts or mis-scaled graphs, adjust with set size square and replot
  - Sample diagnostic session:
    gnuplot> show version long
    Expected output: List of compiled options including terminal types, library details.

7. Best Practices:
  - Always use named data blocks for reusable data.
  - Pair set terminal with set output and reset with unset output to avoid file locks.
  - Use minimal reproducible command sequences when reporting bugs.
  - For web-driven plots, use gnuplot in a pipe with proper buffering.

8. SDK Method-like Signature (Pseudo-code):
  function plotGraph(command: string, terminal: string, outputFile: string): boolean
  // command: the plotting command (e.g., 'plot sin(x)')
  // terminal: terminal type (e.g., 'pdfcairo') with options
  // outputFile: destination file for the plot
  // Returns true on success, false otherwise

Example Usage:
  set terminal pdfcairo enhanced fontscale 0.5 size 5.00in,3.00in
  set output "plot.pdf"
  plot sin(x)
  unset output
  unset terminal

Detailed commands are directly executable in a gnuplot session.

## Information Dense Extract
Gnuplot v5: Compile with ./configure --prefix=$HOME/usr; make; make install. Development: ./prepare then ./configure. Terminal: set terminal pdfcairo enhanced fontscale 0.5 size 5.00in,3.00in; output redirection with set output "file.pdf", replot, unset output. Plot commands: plot sin(x), splot with 3D; data blocks via $DATABLOCK << EOD ... EOD. Customization: set color, set linetype, set pointsize, set lmargin at screen 0.05, set multiplot layout. Text formatting: enhanced mode supports a^x, a_x, {/Times abc}, disable with noenhanced, set encoding utf8. Troubleshooting: show version long, set terminal verification. API-like pseudo method: plotGraph(command:string, terminal:string, outputFile:string): boolean. Full commands and options explicitly specified.

## Sanitised Extract
Table of Contents:
1. Installation & Compilation
   - Use './configure --prefix=$HOME/usr', 'make', and 'make install' for release builds.
   - For development sources, run './prepare' before './configure'.
2. Command Usage & Scripting
   - Help: 'help keyword'
   - Interactive plotting: 'plot sin(x)', data input with inline '-' or named blocks ($DATABLOCK << EOD ... EOD).
3. Terminal Configuration
   - Setting terminals: 'set terminal pdfcairo enhanced fontscale 0.5 size 5.00in,3.00in'
   - Switching output: 'set output 'filename'' and 'replot', then 'unset output'.
4. Plot Customization
   - Adjust colors, linetypes: 'set color', 'set linetype', 'set pointsize'.
   - Margin setup: 'set lmargin at screen 0.05', 'set rmargin at screen 0.95'.
   - Multiplot layout: 'set multiplot layout <rows>, <columns>' and positioning with 'set origin' and 'set size'.
5. Advanced Plot Types
   - Implicit defined graphs using contour extraction from surface plots.
   - Filled curves: 'plot '+' using 1:(f($1)):(g($1)) with filledcurves [above/below]'.
   - 3D to 2D projection: 'set view map', 'set view projection xz/yz'.
6. Text Formatting & Enhanced Mode
   - Superscript: use '^' (e.g., a^x)
   - Subscript: use '_' (e.g., a_x)
   - Font changes: '{/Times abc}', size adjustments with '{/Times*2 abc}', and toggle with 'noenhanced'.
7. Troubleshooting & Best Practices
   - Check configuration: 'show version long', 'set terminal' for checking compiled options.
   - Use minimal command sets for error reproduction.
   - Verify proper use of inline data and filter mechanism with popen commands.

## Original Source
Gnuplot Documentation
https://gnuplot.sourceforge.net/documentation.html

## Digest of GNUPLOT_DOC

# GNUPLOT DOC

Retrieved: 2023-10-11

# Overview
Gnuplot is a command-driven plotting tool designed for scientific data visualization. It supports 2D and 3D plotting, multiple output formats (PDF, SVG, PNG, etc.), scripting with conditional statements, and interactive sessions.

# Installation and Compilation
To compile from a release, use:

./configure --prefix=$HOME/usr
make
make install

For development sources:

./prepare
./configure
make

On Windows, use the makefiles in config/mingw, config/msvc, config/watcom, and config/cygwin.

# Command Usage and Scripting
Key commands include:

- Help: `help keyword` displays documentation for commands.
- Plot: `plot sin(x)` for quick visualization; use `set terminal pdf` and `set output "file.pdf"` to generate file outputs.
- Data blocks: Define inline data blocks using $DATABLOCK << EOD ... EOD.

# Terminal and Output Configuration
- To set a terminal type: `set terminal pdfcairo` with options like transparent, enhanced, fontscale, and size (e.g., `set terminal pdfcairo enhanced fontscale 0.5 size 5.00in,3.00in`).
- To print, use: `set output "filename"` then `replot` and reset with `unset output`.

# Plot Customization
Customize plots with:

- Colors, line types and points: Use `set color`, `set linetype`, and `set pointsize`.
- Margins (e.g., `set lmargin at screen 0.05`, `set rmargin at screen 0.95`).
- Multiplot: `set multiplot layout <rows>, <columns>`.

# Advanced Plot Types and Data Handling
- Implicit plots: Define f(x,y) and extract contour line using table mode.
- Filled curves: `plot '+' using 1:(f($1)):(g($1)) with filledcurves`.
- 3D data: Use `splot` with `set view map` or `set view projection xz`/`yz`.

# Text Formatting and Special Symbols
- Enhanced text mode allows markup:
  - Superscript: a^x
  - Subscript: a_x
  - Font changes: {/Times abc} or {/Arial:Bold=20 abc}

- To disable markup use: `noenhanced` as in `set title 'filename' noenhanced`.
- UTF-8 encoding: Enable with `set encoding utf8`.

# Troubleshooting and Best Practices
- Check compiled options with: `show version long` and view terminal types with `set terminal`.
- For issues with output files or small numbers, verify terminal settings and scaling commands (e.g., `set size square`).
- Use clear minimal command sets when reporting errors.

# Attribution and Data Size
Data size during crawl: 4820335 bytes, with 4545 links scanned.

## Attribution
- Source: Gnuplot Documentation
- URL: https://gnuplot.sourceforge.net/documentation.html
- License: License: GPL
- Crawl Date: 2025-05-02T09:47:06.911Z
- Data Size: 4820335 bytes
- Links Found: 4545

## Retrieved
2025-05-02
