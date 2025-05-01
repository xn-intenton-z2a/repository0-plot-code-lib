# GRAPHVIZ_DOC

## Crawl Summary
DOT language grammar with explicit syntax rules; command line interface with flags (-G, -N, -E, -K, -T, -V); build and installation instructions (./configure, make, make install); platform-specific installation (Linux, Windows, Mac, Solaris); detailed dependency versions and build tools required for compiling Graphviz.

## Normalised Extract
Table of Contents:
1. DOT LANGUAGE SPECIFICATION
   - Grammar definitions: graph, stmt_list, stmt, attr_stmt, attr_list, a_list, edge_stmt, edgeRHS, node_stmt, node_id, port, subgraph, compass_pt.
   - Keywords and ID specifications, comment styles, and edge operators (->, --).
2. COMMAND LINE INTERFACE
   - Common invocation: cmd [ flags ] [ input files ].
   - Flags:
     G flag: Set graph attributes (e.g. -Gfontcolor=red).
     N flag: Set node attributes (e.g. -Nshape=rect).
     E flag: Set edge attributes (e.g. -Earrowhead=diamond).
     K flag: Override default layout engine (e.g. -Kneato).
     T flag: Output format specifier with optional renderer and formatter (e.g. -Tpng:cairo:gd).
     V flag: Version information.
     llibrary flag: Inject device-dependent library text.
     n flag: No-op for positioned nodes in neato.
3. BUILD & INSTALLATION PROCEDURES
   - Standard commands: ./configure, make, make install.
   - For Git builds: ./autogen.sh followed by ./configure, make, make install.
   - Options available via ./configure --help.
4. INSTALLATION DETAILS
   - Platform specific commands: Use apt, dnf, or package installers for Windows; MacPorts/Homebrew for macOS.
5. DEPENDENCIES & TOOLS
   - Required libraries: cairo 1.10.0, expat 2.0.0, freetype 2.1.10, gd 2.0.34, fontconfig 2.3.95, glib 2.36.0, libpng 1.2.10, pango 1.22.0, zlib 1.2.3, GTS.
   - Build tools: autoconf, automake, bison, flex, gcc, libtool, pkg-config, swig.

Each section provides detailed parameters and exact flags that enable direct implementation without modification.

## Supplementary Details
DOT Language Parameters:
- graph: Optional 'strict' keyword, type specification (graph or digraph), optional ID, must enclose stmt_list in {}.
- attr_stmt: Accepts graph, node, or edge followed by attr_list where a_list assigns attribute key-value pairs separated by ; or ,.

Command Line Configuration Options:
- -Gname[=value]: Overrides default graph attribute; default value true if unspecified.
- -Nname[=value]: Overrides default node attribute; e.g., -Nfontcolor=red, -Nshape=rect.
- -Ename[=value]: Overrides default edge attribute; e.g., -Ecolor=red, -Earrowhead=diamond.
- -Klayout: Sets layout engine, e.g., -Kneato forces usage of neato.
- -Tformat[:renderer[:formatter]]: Specifies output format; renderer and formatter options available based on installation (e.g., png output via cairo or GD).

Build Process Steps:
1. Run ./configure with options (./configure --help for list).
2. Execute make to compile source.
3. Execute make install to install binaries.
For Git clones, execute ./autogen.sh before configuring.

Dependencies Exact Versions:
- cairo 1.10.0, expat 2.0.0, freetype 2.1.10, gd 2.0.34, fontconfig 2.3.95, glib 2.36.0, libpng 1.2.10, pango 1.22.0, zlib 1.2.3, with additional tools autoconf 2.61, automake 1.9.6, bison 3.0, flex 2.5.4a, gcc 4.8.1, libtool 1.5.22, pkg-config 0.20, swig 1.3.29.

Installation on Windows: Use provided EXE installers or ZIP archives for specific versions (e.g., graphviz-12.2.1).
Installation on macOS: Use MacPorts (sudo port install graphviz) or Homebrew (brew install graphviz).
Troubleshooting Build Issues: Check dependency versions and ensure they match minimum requirements. Use command ./configure --help for build options and review output logs for missing dependencies.

## Reference Details
API Specifications and Command Line Method Signatures:
- DOT Language Grammar: 
   graph: Optional strict flag, type (graph|digraph), optional ID, followed by '{' stmt_list '}'.
   stmt_list: Recursive list with optional ';' separator.
   node_stmt: node_id with optional attr_list.
   edge_stmt: (node_id | subgraph) followed by edgeRHS and optional attr_list.
- Command Line Flags:
   Function: setGraphAttr(name: string, value?: string) => void; invoked via -Gflag.
   Function: setNodeAttr(name: string, value?: string) => void; invoked via -Nflag.
   Function: setEdgeAttr(name: string, value?: string) => void; invoked via -Eflag.
   Function: chooseLayout(engine: string) => void; invoked via -K flag.
   Function: setOutputFormat(format: string, renderer?: string, formatter?: string) => void; invoked via -T flag.
   Version: getVersion() returns string; invoked via -V flag.

SDK Method Signature Examples (Pseudo-code):
   function renderGraph(input: string, options: {
       graphAttributes?: { [key: string]: string },
       nodeAttributes?: { [key: string]: string },
       edgeAttributes?: { [key: string]: string },
       layoutEngine?: string,
       outputFormat?: { format: string, renderer?: string, formatter?: string }
   }): Buffer

Code Example (Commented):
   // Set graph attributes
   renderGraph('digraph { a -> b }', {
       graphAttributes: { fontcolor: 'red', label: 'My favorite letters' },
       nodeAttributes: { fontcolor: 'red', shape: 'rect' },
       edgeAttributes: { color: 'red', arrowhead: 'diamond' },
       layoutEngine: 'dot',
       outputFormat: { format: 'svg' }
   });

Configuration Options with Effects:
   -G sets global graph attributes; -N sets default node styling; -E sets default edge styling; -K forces a layout algorithm; -T selects the output language and renderer.

Best Practices:
   - Always specify explicit attribute overrides to ensure consistency.
   - Use subgraphs with cluster naming (cluster*) to group nodes.
   - Validate your DOT file with Graphviz's built-in parser to avoid syntax issues.

Troubleshooting Procedures:
   1. Run: ./configure --help to list options.
   2. Execute: make clean && make to recompile from scratch.
   3. Check dependency versions using package manager queries (e.g., apt list --installed | grep cairo).
   4. Use -v flag (e.g., dot -v) to print active format, renderer and formatter details.
   5. Examine build logs for missing libraries or mismatches in version numbers.

Return Types: All command line tools exit with 0 on success, non-zero on error; API methods return either output buffers or error messages as applicable.

## Information Dense Extract
DOT: graph=[strict] (graph|digraph) [ID] '{' stmt_list '}'; stmt_list: recursive; attr_stmt: (graph|node|edge) attr_list; edge operators: '->' or '--'; IDs: alphanumeric, quoted, or HTML. CLI: cmd [flags] [files]; Flags: -G (graph attr), -N (node attr), -E (edge attr), -K (layout engine), -T (output format with optional renderer:formatter), -V (version), -llibrary, -n flag. Build: ./configure, make, make install, or ./autogen.sh for git clones. Dependencies: cairo 1.10.0, expat 2.0.0, freetype 2.1.10, gd 2.0.34, fontconfig 2.3.95, glib 2.36.0, libpng 1.2.10, pango 1.22.0, zlib 1.2.3, GTS; tools: autoconf 2.61, automake 1.9.6, bison 3.0, flex 2.5.4a, gcc 4.8.1, libtool 1.5.22, pkg-config 0.20, swig 1.3.29. API: renderGraph(input:string, options:{graphAttributes, nodeAttributes, edgeAttributes, layoutEngine, outputFormat}) => Buffer; version retrieval via -V.

## Sanitised Extract
Table of Contents:
1. DOT LANGUAGE SPECIFICATION
   - Grammar definitions: graph, stmt_list, stmt, attr_stmt, attr_list, a_list, edge_stmt, edgeRHS, node_stmt, node_id, port, subgraph, compass_pt.
   - Keywords and ID specifications, comment styles, and edge operators (->, --).
2. COMMAND LINE INTERFACE
   - Common invocation: cmd [ flags ] [ input files ].
   - Flags:
     G flag: Set graph attributes (e.g. -Gfontcolor=red).
     N flag: Set node attributes (e.g. -Nshape=rect).
     E flag: Set edge attributes (e.g. -Earrowhead=diamond).
     K flag: Override default layout engine (e.g. -Kneato).
     T flag: Output format specifier with optional renderer and formatter (e.g. -Tpng:cairo:gd).
     V flag: Version information.
     llibrary flag: Inject device-dependent library text.
     n flag: No-op for positioned nodes in neato.
3. BUILD & INSTALLATION PROCEDURES
   - Standard commands: ./configure, make, make install.
   - For Git builds: ./autogen.sh followed by ./configure, make, make install.
   - Options available via ./configure --help.
4. INSTALLATION DETAILS
   - Platform specific commands: Use apt, dnf, or package installers for Windows; MacPorts/Homebrew for macOS.
5. DEPENDENCIES & TOOLS
   - Required libraries: cairo 1.10.0, expat 2.0.0, freetype 2.1.10, gd 2.0.34, fontconfig 2.3.95, glib 2.36.0, libpng 1.2.10, pango 1.22.0, zlib 1.2.3, GTS.
   - Build tools: autoconf, automake, bison, flex, gcc, libtool, pkg-config, swig.

Each section provides detailed parameters and exact flags that enable direct implementation without modification.

## Original Source
Graphviz Documentation
https://graphviz.org/documentation/

## Digest of GRAPHVIZ_DOC

# DOT LANGUAGE SPECIFICATION (Retrieved: 2024-11-26)

This section defines the abstract grammar for Graphviz DOT language.

graph : [ strict ] (graph | digraph) [ ID ] '{' stmt_list '}'
stmt_list : [ stmt [ ';' ] stmt_list ]
stmt : node_stmt | edge_stmt | attr_stmt | ID '=' ID | subgraph
attr_stmt : (graph | node | edge) attr_list
attr_list : '[' [ a_list ] ']' [ attr_list ]
a_list : ID '=' ID [ (';' | ',') ] [ a_list ]
edge_stmt : (node_id | subgraph) edgeRHS [ attr_list ]
edgeRHS : edgeop (node_id | subgraph) [ edgeRHS ]
node_stmt : node_id [ attr_list ]
node_id : ID [ port ]
port : ':' ID [ ':' compass_pt ] | ':' compass_pt
subgraph : [ subgraph [ ID ] ] '{' stmt_list '}'
compass_pt : n | ne | e | se | s | sw | w | nw | c | _

Keywords: node, edge, graph, digraph, subgraph, strict (case-independent).

IDs: String of alphabets, underscores or digits (not starting with a digit), numerals, double-quoted strings, or HTML strings (e.g. <...>). Comments: C++ style (/* ... */ and //) and lines starting with '#' are ignored.

Edge operations: Use '->' for directed graphs and '--' for undirected graphs.

# COMMAND LINE USAGE

All Graphviz programs share a similar invocation pattern:

cmd [ flags ] [ input files ]

Examples:
1. Read from file: dot -Tsvg input.dot
2. Read from standard input: echo 'digraph { a -> b }' | dot -Tsvg > output.svg

Flags include:
-Gname[=value] : Sets a graph attribute (default value true).
-Nname[=value] : Sets a default node attribute (e.g., fontcolor, shape).
-Ename[=value] : Sets a default edge attribute (e.g., color, arrowhead).
-Klayout : Specifies the default layout engine, overriding the command name (e.g., -Kneato is equivalent to running neato).
-Tformat[:renderer[:formatter]] : Sets output format. Example: -Tpng:cairo or -Tpng:cairo:gd. The flag -Tformat: lists available renderers.
-V : Outputs version information, e.g., dot -V returns version details such as "dot - graphviz version 2.47.1 (20210417.1919)".
-llibrary : Supplies device-dependent library text for inclusion in certain outputs.
-n[num] : Sets neato no-op flag assuming nodes already have pos attributes.

# SOURCE CODE BUILD AND INSTALLATION

Typical source installation commands:

./configure
make
make install

For customization, run ./configure --help to see available options. When building from a Git clone, after autogen.sh:

./autogen.sh
./configure
make
make install

# INSTALLATION & PACKAGE DETAILS

Graphviz is available for multiple platforms:

Linux: Use distributions repositories (e.g., apt install graphviz or dnf install graphviz).
Windows: Provided EXE installers and ZIP archives with specific version numbers (e.g. graphviz-12.2.1 for 64-bit and 32-bit).
Mac: Install via MacPorts or Homebrew (e.g., sudo port install graphviz or brew install graphviz).
Solaris and other Unix systems: Packages available with names such as graphviz, graphvizgd, etc.

# BUILD DEPENDENCIES & TOOLS

Minimum dependencies include:
- cairo (v1.10.0 recommended)
- expat (v2.0.0)
- freetype (v2.1.10)
- gd (v2.0.34, deprecated)
- fontconfig (v2.3.95)
- glib (v2.36.0)
- libpng (v1.2.10)
- pango (v1.22.0)
- zlib (v1.2.3)
- GTS

Tools recommended for building from Git:
- autoconf (v2.61)
- automake (v1.9.6)
- bison (v3.0)
- flex (v2.5.4a)
- gcc (v4.8.1)
- libtool (v1.5.22)
- pkg-config (v0.20)
- swig (v1.3.29)

# ATTRIBUTION & DATA SIZE

Data Size: 353647 bytes
Links Found: 40385
Last Modified on Documentation: September 17, 2022 and other subsequent dates noted in the source.

## Attribution
- Source: Graphviz Documentation
- URL: https://graphviz.org/documentation/
- License: EPL
- Crawl Date: 2025-05-01T21:46:04.111Z
- Data Size: 353647 bytes
- Links Found: 40385

## Retrieved
2025-05-01
