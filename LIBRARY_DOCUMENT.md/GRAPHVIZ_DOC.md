# GRAPHVIZ_DOC

## Crawl Summary
Key technical details extracted include the full DOT language grammar with precise production rules, exact command line flags (-G, -N, -E, -K, -T, -V, -l, -n) with examples, installation instructions with source package details, build steps (./configure, make, make install, ./autogen.sh for Git builds), minimum dependency versions, and usage patterns for library integration. These details facilitate immediate implementation in Graphviz projects.

## Normalised Extract
Table of Contents:
  1. DOT LANGUAGE SPECIFICATION
    - Grammar productions: graph, stmt_list, stmt, attr_stmt, attr_list, a_list, edge_stmt, edgeRHS, node_stmt, node_id, port, subgraph, compass_pt
    - Identifier forms: unquoted, numeral, double-quoted, HTML strings
    - Supported comments and escape sequences
  2. COMMAND LINE INTERFACE
    - Invocation format: cmd [ flags ] [ input files ]
    - Flag details:
       * -Gname[=value]: Set graph attributes; value defaults to true if omitted
       * -Nname[=value]: Set default node attributes
       * -Ename[=value]: Set default edge attributes
       * -Klayout: Specify layout engine (e.g., -Kneato)
       * -Tformat[:renderer[:formatter]]: Specify output format and optionally explicit renderer and formatter
       * -V: Version display
       * -llibrary: Include device-specific library contents for PostScript output
       * -n[num]: For neato, assume nodes already positioned with pos attributes
  3. INSTALLATION & BUILD PROCEDURES
    - Source package formats: .tar.gz, .tar.xz; version examples include 12.2.1, 12.2.0, etc
    - Build steps: ./configure, make, make install; for Git clones: ./autogen.sh, ./configure, make, make install
    - Dependency versions: cairo (1.10.0), expat (2.0.0), freetype (2.1.10), gd (2.0.34), fontconfig (2.3.95), glib (2.36.0), libpng (1.2.10), pango (1.22.0), zlib (1.2.3)
  4. LIBRARY USAGE & API
    - Usage example for integrating Graphviz as a library in C/C++ with functions: graph_new(), graph_add_node(), graph_add_edge(), render_graph()
  5. TROUBLESHOOTING & BEST PRACTICES
    - Use -v flag to determine active renderers and formatters
    - Confirm installation with dot -V command
    - Inherit attributes properly by setting defaults at the top-level graph
    - Use specific download packages matching system architecture

Each topic includes exact command syntax and configuration options for immediate developer application.

## Supplementary Details
Technical Specifications:
  • DOT Grammar Exact Productions: graph, stmt_list, stmt, attr_stmt, attr_list, a_list, edge_stmt, edgeRHS, node_stmt, node_id, port, subgraph, compass_pt; keywords are case-independent and edgeops are '->' and '--'.
  • Command Line Flags:
      -Gname[=value] : Graph attribute setting (default true)
      -Nname[=value] : Node attribute setting
      -Ename[=value] : Edge attribute setting
      -Klayout : Explicit layout engine guidance
      -Tformat[:renderer[:formatter]] : Output format specification with optional renderer and formatter
      -V : Version output
      -llibrary : Include external library preamble files
      -n[num] : For neato, disable repositioning if pos attribute is present
  • Installation Commands:
      Linux: sudo apt install graphviz or sudo dnf install graphviz
      Windows: Use provided EXE installers or ZIP archives (check sha256 values)
      Mac: sudo port install graphviz or brew install graphviz
  • Build process for source: ./configure, make, make install; for Git clone additional step: ./autogen.sh
  • Dependencies (minimum versions): cairo 1.10.0, expat 2.0.0, freetype 2.1.10, gd 2.0.34, fontconfig 2.3.95, glib 2.36.0, libpng 1.2.10, pango 1.22.0, zlib 1.2.3
  • Library API Example (pseudo C code):
         Graph *g = graph_new();
         graph_add_node(g, "A");
         graph_add_node(g, "B");
         graph_add_edge(g, "A", "B");
         render_graph(g, "dot", "output.svg");
  • Troubleshooting: Run 'dot -V' to output version and active rendering configuration; verify dependency versions if build errors occur.

## Reference Details
API Specifications and Command Signatures:
DOT Language Grammar:
  graph(): Optional 'strict' modifier; keyword must be graph/digraph; syntax: [ strict ] (graph | digraph) [ ID ] '{' stmt_list '}'
  stmt_list(): Zero or more statements terminated optionally with ';'
  stmt(): Can be node_stmt(), edge_stmt(), attr_stmt(), simple assignment (ID '=' ID), or subgraph()
  attr_stmt(target): target can be graph, node, or edge; followed by attr_list()
  attr_list(): '[' optionally an a_list then ']' optionally recurrent
  a_list(): Series of ID '=' ID pairs separated by ';' or ','
  edge_stmt(): Accepts (node_id | subgraph) followed by edgeRHS()
  edgeRHS(): Consists of an edge operator (edgeop) and subsequent (node_id | subgraph), may be recursive
  node_stmt(): node_id() followed by optional attr_list()
  node_id(): ID optionally with a port specification
  port(): ':' ID optionally with ':' compass_pt OR ':' compass_pt
  subgraph(): Optional keyword subgraph, optional ID, then '{' stmt_list '}'
  compass_pt(): One of: n, ne, e, se, s, sw, w, nw, c, _

Command Line Flag Examples:
  dot -Tsvg input.dot
  dot -Tsvg -Gfontcolor=red -Glabel="My favorite letters" input.dot
  dot -Tsvg -Nfontcolor=red -Nshape=rect input.dot
  dot -Tpng:cairo:gd input.dot
  dot -V

SDK/Library Method Signature Example in C (pseudo-code):
  Graph* graph_new(void);
  void graph_add_node(Graph *g, const char *node_id);
  void graph_add_edge(Graph *g, const char *source, const char *target);
  int render_graph(Graph *g, const char *engine, const char *output_file); // Returns 0 on success

Build Commands for Source Compilation:
  ./configure [--help]  // Lists all configuration options and default values
  make
  make install
  For Git sources: ./autogen.sh before ./configure

Configuration Options Summary:
  -G, -N, -E flags with syntax: flagName[=value] where value is string; default is true if omitted
  -T output: format specification with colon separated renderer and formatter
  -K: overrides the default layout engine

Best Practices and Troubleshooting:
  * Use -V to verify installation and active configuration
  * For dependency errors, check that libraries (cairo, expat, freetype, etc.) are at or above minimum versions
  * When using subgraphs, define attributes in parent graph to ensure inheritance; avoid redefinition conflicts
  * Example troubleshooting command: dot -V, expected output: "dot - graphviz version X.Y.Z (build date)"
  * Validate DOT files with known correct examples to isolate syntax errors

Detailed Implementation Pattern:
  1. Define graph in DOT file using explicit attribute settings (e.g., graph [fontsize=10]; node [shape=ellipse]; edge [color=black]).
  2. Invoke dot with appropriate flags depending on output format and layout engine.
  3. For library usage, call graph_new(), add nodes/edges, and call render_graph() with engine parameter ("dot", "neato", etc.).

These specifications and examples are directly usable by developers.

## Information Dense Extract
DOT: graph -> [strict] (graph|digraph)[ID]{stmt_list}; stmt: node_stmt|edge_stmt|attr_stmt|ID=ID|subgraph; attr_list: [a_list]; edgeop: '->' or '--'; IDs: unquoted/alphabetic/numeral/quoted/HTML. CLI: dot [flags] [files]; -G: graph attribute, -N: node attribute, -E: edge attribute, -K: layout engine, -T: output format with renderer:formatter, -V: version, -l: library inclusion, -n: no reposition in neato. Build: ./configure, make, make install; Git: ./autogen.sh then ./configure. Dependencies: cairo>=1.10.0, expat>=2.0.0, freetype>=2.1.10, gd>=2.0.34, fontconfig>=2.3.95, glib>=2.36.0, libpng>=1.2.10, pango>=1.22.0, zlib>=1.2.3. API (pseudo C): graph_new(), graph_add_node(Graph*, const char*), graph_add_edge(Graph*, const char*, const char*), render_graph(Graph*, const char*, const char*). Troubleshooting: dot -V; verify dependency versions; use correct flag syntax.

## Sanitised Extract
Table of Contents:
  1. DOT LANGUAGE SPECIFICATION
    - Grammar productions: graph, stmt_list, stmt, attr_stmt, attr_list, a_list, edge_stmt, edgeRHS, node_stmt, node_id, port, subgraph, compass_pt
    - Identifier forms: unquoted, numeral, double-quoted, HTML strings
    - Supported comments and escape sequences
  2. COMMAND LINE INTERFACE
    - Invocation format: cmd [ flags ] [ input files ]
    - Flag details:
       * -Gname[=value]: Set graph attributes; value defaults to true if omitted
       * -Nname[=value]: Set default node attributes
       * -Ename[=value]: Set default edge attributes
       * -Klayout: Specify layout engine (e.g., -Kneato)
       * -Tformat[:renderer[:formatter]]: Specify output format and optionally explicit renderer and formatter
       * -V: Version display
       * -llibrary: Include device-specific library contents for PostScript output
       * -n[num]: For neato, assume nodes already positioned with pos attributes
  3. INSTALLATION & BUILD PROCEDURES
    - Source package formats: .tar.gz, .tar.xz; version examples include 12.2.1, 12.2.0, etc
    - Build steps: ./configure, make, make install; for Git clones: ./autogen.sh, ./configure, make, make install
    - Dependency versions: cairo (1.10.0), expat (2.0.0), freetype (2.1.10), gd (2.0.34), fontconfig (2.3.95), glib (2.36.0), libpng (1.2.10), pango (1.22.0), zlib (1.2.3)
  4. LIBRARY USAGE & API
    - Usage example for integrating Graphviz as a library in C/C++ with functions: graph_new(), graph_add_node(), graph_add_edge(), render_graph()
  5. TROUBLESHOOTING & BEST PRACTICES
    - Use -v flag to determine active renderers and formatters
    - Confirm installation with dot -V command
    - Inherit attributes properly by setting defaults at the top-level graph
    - Use specific download packages matching system architecture

Each topic includes exact command syntax and configuration options for immediate developer application.

## Original Source
Graph Visualization Tools Documentation
https://graphviz.org/documentation/

## Digest of GRAPHVIZ_DOC

# GRAPHVIZ DOCUMENTATION
Date Retrieved: 2024-09-11

# DOT LANGUAGE
The DOT language provides an abstract grammar to define graphs. Key productions:

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

IDs can be an unquoted identifier, numeral, double-quoted string, or HTML string. Keywords (node, edge, graph, digraph, subgraph, strict) are case independent. Edge operators are '->' for directed graphs and '--' for undirected graphs. Comments (/* */ and //) and preprocessor lines (#) are supported.

# COMMAND LINE INTERFACE
Graphviz programs use similar invocations: 

cmd [ flags ] [ input files ]

Example: 
  dot -Tsvg input.dot

Standard flags:
-Gname[=value] : Set a graph attribute (default value true).
  Example: dot -Tsvg -Gfontcolor=red -Glabel="My favorite letters"
-Nname[=value] : Set default node attributes.
  Example: dot -Tsvg -Nfontcolor=red -Nshape=rect
-Ename[=value] : Set default edge attributes.
  Example: dot -Tsvg -Ecolor=red -Earrowhead=diamond
-Klayout : Override default layout engine.
  Example: dot -Kneato
-Tformat[:renderer[:formatter]] : Set output format. Renderer and formatter may be specified explicitly (e.g., -Tpng:cairo or -Tpng:cairo:gd).
-V : Emit version information and exit.
-llibrary : Include user-supplied library files for PostScript output preamble.
-n[num] : For neato, assume nodes have a pos attribute and adjust layout to remove node overlap.

# INSTALLATION & BUILD
Download Graphviz source packages (example: graphviz-12.2.1.tar.gz/ tar.xz) and perform the typical installation:
  ./configure
  make
  make install

For building from Git repositories:
  ./autogen.sh
  ./configure
  make
  make install

Minimum dependency versions (recommended latest available):
 - cairo: 1.10.0
 - expat: 2.0.0
 - freetype: 2.1.10
 - gd: 2.0.34
 - fontconfig: 2.3.95
 - glib: 2.36.0
 - libpng: 1.2.10
 - pango: 1.22.0
 - zlib: 1.2.3
 - GTS for sfdp layouts

# INSTALLATION PACKAGES
Multiple platforms available:
 Linux: Use apt (sudo apt install graphviz) or dnf (sudo dnf install graphviz) based on distro.
 Windows: Precompiled packages; choose EXE or ZIP archive for 32-bit/64-bit.
 Mac: Use MacPorts (sudo port install graphviz) or Homebrew (brew install graphviz).
 Solaris and Other Unixes: Use provided stable releases and package variants.

# LIBRARY & API USAGE
Graphviz can be used as a library. For example, using libgraph (C/C++):
  // Pseudocode example:
  Graph *g = graph_new();
  graph_add_node(g, "A");
  graph_add_node(g, "B");
  graph_add_edge(g, "A", "B");
  render_graph(g, "dot", "output.svg");

# ATTRIBUTES & CONFIGURATION
Graph, node, and edge attributes can be set using DEFAULT attribute statements or per-element attributes. In DOT, attributes inherit based on declaration order. A subgraph receives the current graph attributes at its time of definition.

# TROUGH DETAILS
For troubleshooting, use the -v flag to see used renderers and formatters. Verify installation by running:
  dot -V
Expected output: dot - graphviz version X.Y.Z (build date) etc.

# ATTRIBUTION & DATA SIZE
Data Size: 353647 bytes, 40385 links discovered, no errors reported during crawl.


## Attribution
- Source: Graph Visualization Tools Documentation
- URL: https://graphviz.org/documentation/
- License: EPL / Various
- Crawl Date: 2025-05-02T01:05:30.599Z
- Data Size: 353647 bytes
- Links Found: 40385

## Retrieved
2025-05-02
