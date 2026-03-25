NORMALISED_EXTRACT

Table of contents:
- API signature and parameters
- Options object fields and defaults
- Data types accepted and binary vs text considerations
- Common error conditions and handling

API signature
- fs.promises.writeFile(path, data[, options]) -> Promise<void>
  - path: string | Buffer | URL
  - data: string | Buffer | TypedArray | DataView
  - options: string specifying encoding or an object { encoding?: string | null, mode?: number, flag?: string }

Options and defaults
- encoding: default 'utf8' for string data; when writing binary provide a Buffer or set encoding to null.
- mode: file mode (permission bits) default 0o666 modified by process umask.
- flag: file system flag default 'w' (open for writing, truncate if exists); common flags include 'a' (append), 'wx' (fail if exists).

Binary vs text writes
- For PNG output use Buffer data, do not provide an encoding string; call await fs.promises.writeFile(path, buffer) which writes raw bytes.
- For SVG or other text formats use UTF-8 encoded strings and optionally pass { encoding: 'utf8' } explicitly.

Common error conditions
- EACCES: permission denied writing to destination.
- ENOENT: parent directory does not exist (mkdir or ensure directory before writing).
- ENOSPC: no space left on device.
- EISDIR: path is a directory.

Implementation checklist for saving plots
1. Ensure destination directory exists; create with fs.promises.mkdir(dir, { recursive: true }) if necessary.
2. Determine value type: if value is Buffer -> write as-is; if string -> write with UTF-8 encoding.
3. Use await fs.promises.writeFile(filePath, data, { mode: 0o666, flag: 'w' }) and handle promise rejection to catch I/O errors.

DETAILED_DIGEST

Source: https://nodejs.org/api/fs.html#fspromiseswritefile
Date retrieved: 2026-03-25
Data captured: ~915.4 KB

Extracted technical points used above: exact function signature, options object fields and default behaviors, and common filesystem error codes to handle.

ATTRIBUTION
Node.js fs.promises documentation.