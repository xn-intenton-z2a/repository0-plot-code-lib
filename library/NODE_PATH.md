NODE_PATH

NORMALISED EXTRACT
- The Node.js 'path' module provides utilities for handling and transforming file system paths in a platform-independent way.
- For determining output format the primary function is path.extname(path) which returns the extension (including leading dot) or '' if none.
- path.parse(path) returns an object { root, dir, base, ext, name } useful for inferring filename components.

TABLE OF CONTENTS
1. Purpose and use
2. Key APIs for filename handling
3. Behavior notes (platform differences)
4. Implementation patterns for CLI tools

DETAILS
1. Purpose and use
- Use 'path' to work with file system paths without string-manipulating platform separators.

2. Key APIs
- path.extname(path: string) -> string
  - Returns the extension of the path from the last occurrence of '.' to end of string in the last portion of the path; returns an empty string if there is no '.' in the last portion.
  - Example extracted behavior: extname('index.html') -> '.html'; extname('archive.tar.gz') -> '.gz'.
- path.basename(path: string, ext?: string) -> string
  - Returns last portion of a path, optionally stripping a provided extension.
- path.join([...paths]: string[]) -> string
  - Joins path segments and normalizes the result.
- path.parse(path: string) -> { root, dir, base, ext, name }
  - Use parse to consistently retrieve name and ext components.

3. Behavior notes
- On Windows, path separators are backslashes in returned or joined paths unless using path.posix/path.win32 variants.
- extname includes the leading '.' in returned extension.

4. Implementation patterns for CLI tools
- Infer output format: ext = path.extname(outputPath).toLowerCase(); if ext === '.svg' use SVG writer; if ext === '.png' use PNG renderer; otherwise error or default to SVG.
- Use path.parse(file).name to derive default base names for auto-generated output.

DETAILED DIGEST (source: https://nodejs.org/api/path.html#path_extname_path)
- Retrieved: 2026-03-20
- Crawl size: 95923 bytes
- Content digested: Node.js path module reference entries for extname, basename, join and parse; semantics for extname and platform behaviour.

ATTRIBUTION
- Source: https://nodejs.org/api/path.html#path_extname_path
- Retrieved: 2026-03-20
- Bytes downloaded during crawl: 95923
