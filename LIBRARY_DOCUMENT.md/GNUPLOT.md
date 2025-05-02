# GNUPLOT

## Crawl Summary
Gnuplot supports both 2D and 3D data visualization with commands for plotting functions and data sets. Key aspects include installation via configure/make, detailed command syntax for plots (set terminal, set output, replot, unset output), multiple data input methods (named blocks, inline data), extensive customization of appearance (colors, linetypes, margins, multiplot layout), advanced plotting techniques (animations, filled curves, data filtering via pipes), and text formatting with enhanced text mode and UTF-8 support. Various troubleshooting commands (show version long) and debugging procedures are documented.

## Normalised Extract
Table of Contents: GENERAL_INFORMATION, INSTALLATION, PLOTTING_COMMANDS, DATA_INPUT, CUSTOMIZATION, TEXT_FORMATTING, ADVANCED_TECHNIQUES, TROUBLESHOOTING
GENERAL_INFORMATION: Version 5.4 stable, 5.5 development; platform support; command-driven interface; licensing and free distribution details.
INSTALLATION: Linux: ./configure [--prefix=<dir>], make, make install; Development: run ./prepare then ./configure; Windows: use appropriate makefile in config directory.
PLOTTING_COMMANDS: plot sin(x); set terminal pdf/pdfcairo with options (transparent, enhanced, fontscale 0.5, size 5.00in, 3.00in); set output "filename"; replot; unset output; use push/pop terminal commands.
DATA_INPUT: Named data blocks using $DATABLOCK << EOD ... EOD; inline data with plot "-" followed by data lines and terminator 'e'.
CUSTOMIZATION: set color, set monochrome, set linetype, set palette (e.g., cubehelix), set pointsize; margin settings (set lmargin, bmargin, rmargin, tmargin using at screen <value>);
TEXT_FORMATTING: Enhanced text with commands (^ for superscript, _ for subscript, {} for font changes), disable markup (noenhanced), set encoding utf8.
ADVANCED_TECHNIQUES: Animated plots with set terminal gif animate; filled curves between functions using pseudo file '+'; 2D projection using set view map/projection xz/yz; running data through external filter using popen() mechanism.
TROUBLESHOOTING: Use show version long to list build options; check command output if plot elements are missing; verify data block syntax; ensure proper closing of output file with unset output; examine error messages on compilation output.

## Supplementary Details
Installation details: Linux: ./configure [--prefix=$HOME/usr], make, make install; Windows: use config/mingw or config/msvc makefiles. Plotting: 'set terminal pdfcairo transparent enhanced fontscale 0.5 size 5.00in, 3.00in' changes terminal; 'set output "file.pdf"' directs output to a file; 'unset output' closes file. Data input: Named block: $DATABLOCK << EOD ... EOD; Inline: plot "-" with data lines ending with 'e'. Customization commands: 'set lmargin at screen 0.05', 'set bmargin at screen 0.05', 'set rmargin at screen 0.95', 'set tmargin at screen 0.95'; multiplot: 'set multiplot layout <rows>, <columns>' or manual positioning using set origin and set size. Text formatting: Enhanced text mode supports superscript (a^x), subscript (a_x), phantom boxes (a@^b_{cd}), and font changes using {/FontName text}. Use 'noenhanced' to disable markup. Troubleshooting: Verify configuration options with 'show version long'; check terminal type with 'set terminal'; ensure proper closure of file outputs.

## Reference Details
API Specifications and Command Syntax:
1. Plot Command:
   Syntax: plot <datafile> [using <col_spec>] with <style> [options]
   Example: plot 'data.dat' using 1:2 with lines
2. Terminal Setup:
   Command: set terminal <type> [options]
   Example: set terminal pdfcairo transparent enhanced fontscale 0.5 size 5.00in, 3.00in
   Return: Terminal type change confirmation
3. Output Redirection:
   Command: set output "filename"
   Example: set output "sin.pdf"
   Followed by: replot, then unset output
4. Data Input Methods:
   a. Named Data Block:
      Syntax: $DATABLOCK << EOD
              <data lines>
              EOD
      Use in Plot: plot $DATABLOCK using 2:3:1 with labels
   b. Inline Data:
      Syntax: plot "-"
              <data lines>
              e
5. Customization:
   a. Margin Setting:
      Commands: set lmargin at screen <value>, set bmargin at screen <value>, etc.
      Example: set lmargin at screen 0.05
   b. Multiplot:
      Command: set multiplot layout <rows>, <columns>
      Example: set multiplot layout 2,2
6. Enhanced Text Mode:
   Markup Symbols:
      ^ for superscript (e.g., a^x), _ for subscript (e.g., a_x), {} for font changes (e.g., {/Times Bold text})
      Disable with: set title 'text' noenhanced
7. Additional Commands:
   - set hidden3d: Enables hidden line removal for 3D plots with lines
   - set pm3d depthorder: Orders plots for pm3d rendering
   - set encoding utf8: Enables UTF-8 encoding for special characters
8. Troubleshooting:
   - Command: show version long (displays all compiled options and terminal types)
   - If output is incomplete, check: unset output, verify terminal settings, and review error messages
Full Example Workflow:
# Plot to PDF
gnuplot> plot sin(x)
gnuplot> set terminal pdfcairo transparent enhanced fontscale 0.5 size 5.00in, 3.00in
gnuplot> set output "sin.pdf"
gnuplot> replot
gnuplot> unset output
gnuplot> unset terminal
This sequence is critical for ensuring the PDF output matches interactive display.
Best Practices: Always verify terminal and output settings; use named data blocks for reusability; use push/pop terminal commands to preserve interactive settings.
Detailed Troubleshooting: If a plot is not rendered correctly, verify using 'show version long', then re-run with minimal commands to isolate errors. Check environment variable settings for locale and encoding if UTF-8 characters do not display.

## Information Dense Extract
Gnuplot v5.4 stable, v5.5 dev; Linux: ./configure [--prefix], make, make install; Windows: use config/mingw/msvc; Plot: plot sin(x); Terminal: set terminal pdfcairo transparent enhanced fontscale 0.5 size 5.00in,3.00in; Output: set output "file.pdf", replot, unset output; Data block: $DATABLOCK << EOD ... EOD; Inline data: plot "-"; Customization: set lmargin at screen 0.05, bmargin 0.05, rmargin 0.95, tmargin 0.95; Multiplot: set multiplot layout <rows>,<cols>; Enhanced text: a^x, a_x, {/Font text}, disable with noenhanced; Encoding: set encoding utf8; API commands: show version long, set terminal, set output; Troubleshooting: check terminal settings, use minimal commands; Best practices: validate configuration options; Use external pipes for data filtering; Animation: set terminal gif animate {delay} {loop} {optimize}; Filled curves: plot '+' using 1:(f($1)):(g($1)) with filledcurves.

## Sanitised Extract
Table of Contents: GENERAL_INFORMATION, INSTALLATION, PLOTTING_COMMANDS, DATA_INPUT, CUSTOMIZATION, TEXT_FORMATTING, ADVANCED_TECHNIQUES, TROUBLESHOOTING
GENERAL_INFORMATION: Version 5.4 stable, 5.5 development; platform support; command-driven interface; licensing and free distribution details.
INSTALLATION: Linux: ./configure [--prefix=<dir>], make, make install; Development: run ./prepare then ./configure; Windows: use appropriate makefile in config directory.
PLOTTING_COMMANDS: plot sin(x); set terminal pdf/pdfcairo with options (transparent, enhanced, fontscale 0.5, size 5.00in, 3.00in); set output 'filename'; replot; unset output; use push/pop terminal commands.
DATA_INPUT: Named data blocks using $DATABLOCK << EOD ... EOD; inline data with plot '-' followed by data lines and terminator 'e'.
CUSTOMIZATION: set color, set monochrome, set linetype, set palette (e.g., cubehelix), set pointsize; margin settings (set lmargin, bmargin, rmargin, tmargin using at screen <value>);
TEXT_FORMATTING: Enhanced text with commands (^ for superscript, _ for subscript, {} for font changes), disable markup (noenhanced), set encoding utf8.
ADVANCED_TECHNIQUES: Animated plots with set terminal gif animate; filled curves between functions using pseudo file '+'; 2D projection using set view map/projection xz/yz; running data through external filter using popen() mechanism.
TROUBLESHOOTING: Use show version long to list build options; check command output if plot elements are missing; verify data block syntax; ensure proper closing of output file with unset output; examine error messages on compilation output.

## Original Source
Gnuplot Documentation
https://gnuplot.sourceforge.net/documentation.html

## Digest of GNUPLOT

# GNUPLOT DOCUMENTATION DIGEST

Retrieved: 2023-10-26

# GENERAL INFORMATION
Gnuplot is a command-driven plotting program for visualizing scientific data in 2D and 3D. It supports interactive sessions and batch scripting, extensive customization, and is available on Windows, Linux, Unix, OSX and legacy systems (VMS, OS/2, MS-DOS). The stable release is version 5.4 and the development version is 5.5.

# INSTALLATION & COMPILATION
- For Linux systems: Run ./configure (or ./configure --prefix=$HOME/usr), then make, then make install. Review output for required support libraries.
- For development source builds: Run ./prepare prior to ./configure.
- For Windows: Use provided makefiles in config/mingw, config/msvc, config/watcom, or config/cygwin.

# WORKING WITH GNU PLOT
## Getting Help
- Command: help <keyword> (e.g. help plot, help set)
- Use online resources and mailing lists for additional support.

## Plotting Commands
- Basic plot:  gnuplot> plot sin(x)
- Changing output: 
  gnuplot> set terminal pdf             (e.g., pdfcairo with options: transparent, enhanced, fontscale 0.5, size 5.00in, 3.00in)
  gnuplot> set output "filename.pdf"
  gnuplot> replot
  gnuplot> unset output
  gnuplot> unset terminal
- Using push/pop terminal states:
  gnuplot> set terminal push
  gnuplot> set terminal pdf
  gnuplot> set output 'file.pdf'
  gnuplot> replot
  gnuplot> unset output
  gnuplot> set terminal pop

## Data Input Techniques
- Using named data blocks:
  gnuplot> $DATABLOCK << EOD
     cats 4 2
     dogs 1 4
  EOD
  gnuplot> plot $DATABLOCK using 2:3:1 with labels
- Inline data using "-":
  gnuplot> plot "-"
  1 1
  2 4
  3 9
  e

## Customizing Appearance
- Change default colors, line types, and point properties:
  - set color / set monochrome
  - set linetype (to change or add new properties)
  - set palette (e.g., set palette cubehelix for printing)
  - set pointsize adjusts the scaling of points.
- Hidden surface removal:
  - Use set hidden3d for 3D plots with lines
  - Use set pm3d depthorder for pm3d mode plots
- Axis and margin configuration:
  gnuplot> set lmargin at screen 0.05
  gnuplot> set bmargin at screen 0.05
  gnuplot> set rmargin at screen 0.95
  gnuplot> set tmargin at screen 0.95
- Multi-plot arrangement:
  gnuplot> set multiplot layout <rows>, <columns>
  Or use set origin and set size commands for manual positioning.

# TEXT FORMATTING & SPECIAL SYMBOLS
- Enhanced text mode supports:
  - Superscript: a^x
  - Subscript: a_x
  - Phantom box with @: a@^b_{cd}
  - Font changes: {/Times abc}, {/Times*2 abc}, {/Times:Italic abc}, {/Arial:Bold=20 abc}
- Disabling markup: append 'noenhanced' (e.g., set title 'file_1.dat' noenhanced)
- UTF-8 encoding: set encoding utf8

# ADVANCED PLOTTING TECHNIQUES
## Specialized Plot Types
- Animations: set terminal gif animate {delay <time>} {loop <N>} {optimize} (development version supports webp)
- Filling between two functions:
  f(x)=cos(x); g(x)=sin(x)
  set xrange [0:pi]
  plot '+' using 1:(f($1)):(g($1)) with filledcurves
- 2D projections of 3D data: use set view map, or set view projection xz/yz

## Data Filtering & Scripting
- Pipe external command: plot "< sort +2 file.in" for sorting before plotting
- Combining commands and data in one file is supported with named blocks and inline data

# TROUBLESHOOTING & DEBUGGING
- Incomplete output: Confirm proper termination of output with unset output
- Check build options with: show version long and set terminal
- Verify installation by comparing output from interactive and batch mode

# ATTRIBUTION & CRAWL DETAILS
Data Size: 4820335 bytes; 4545 links identified; No errors during crawl.

## Attribution
- Source: Gnuplot Documentation
- URL: https://gnuplot.sourceforge.net/documentation.html
- License: License: GPL
- Crawl Date: 2025-05-02T17:47:26.702Z
- Data Size: 4820335 bytes
- Links Found: 4545

## Retrieved
2025-05-02
