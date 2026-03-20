NORMALISED EXTRACT

Table of Contents
1. Overview
2. Creating and allocating Buffers
3. Core static methods and signatures
4. Instance methods for reading and writing binary data
5. Common usage patterns (file IO, encoding conversion, PNG magic detection)

1. Overview
- Buffer is a global class in Node.js for handling raw binary data. It implements a fixed-size sequence of bytes and provides methods for creating, reading, writing, slicing and concatenating binary data.
- Buffers are instances of Uint8Array and include additional Node-specific methods.

2. Creating and allocating Buffers
- Buffer.from(string[, encoding]) -> Buffer
  - string: String containing encoded data
  - encoding: optional string; defaults to 'utf8'. Common values: 'utf8', 'ascii', 'latin1', 'base64', 'hex'.
  - Returns a new Buffer containing the bytes decoded from the input string using the specified encoding.

- Buffer.from(arrayBuffer[, byteOffset[, length]]) -> Buffer
  - arrayBuffer: an ArrayBuffer or SharedArrayBuffer
  - byteOffset: optional integer offset into the ArrayBuffer
  - length: optional integer indicating number of bytes
  - Returns a Buffer view over the given ArrayBuffer region.

- Buffer.from(array) -> Buffer
  - array: an Array of byte values (numbers 0..255)
  - Returns a new Buffer copied from the provided array.

- Buffer.alloc(size[, fill[, encoding]]) -> Buffer
  - size: integer number of bytes to allocate
  - fill: optional fill value (Number, Buffer, or string). Defaults to 0.
  - encoding: when fill is a string, encoding specifies its encoding.
  - Returns a zero-filled Buffer of the specified length.

- Buffer.allocUnsafe(size) -> Buffer and Buffer.allocUnsafeSlow(size) -> Buffer
  - Faster allocation that does not zero-fill memory. Content is uninitialized and must be overwritten before use.

3. Core static methods and signatures
- Buffer.isBuffer(obj) -> Boolean
- Buffer.byteLength(string[, encoding]) -> Number
  - Returns the number of bytes required to represent the string using the specified encoding.
- Buffer.concat(list[, totalLength]) -> Buffer
  - list: Array of Buffer instances
  - totalLength: optional overall length to allocate; if omitted, the method sums the lengths in list
  - Returns a single Buffer containing the concatenated bytes.
- Buffer.compare(buf1, buf2) -> Number
  - Returns negative if buf1<buf2, 0 if equal, positive if buf1>buf2 (lexicographic unsigned comparison).
- Buffer.isEncoding(encoding) -> Boolean

4. Instance methods for reading and writing binary data (selected)
- buf.toString([encoding[, start[, end]]]) -> String
  - encoding defaults to 'utf8'. start and end default to 0 and buf.length.
- buf.copy(targetBuffer[, targetStart = 0[, sourceStart = 0[, sourceEnd = buf.length]]]) -> Number of bytes copied
- buf.write(string[, offset = 0[, length[, encoding]]]) -> Number of bytes written
- Typed readers (non-exhaustive):
  - buf.readUInt8(offset) -> Number
  - buf.readUInt16BE(offset) -> Number
  - buf.readUInt16LE(offset) -> Number
  - buf.readUInt32BE(offset) -> Number
  - buf.readUInt32LE(offset) -> Number
  - Signed variants: readInt8, readInt16BE/LE, readInt32BE/LE
- Typed writers (non-exhaustive):
  - buf.writeUInt8(value, offset)
  - buf.writeUInt16BE(value, offset)
  - buf.writeUInt16LE(value, offset)
  - buf.writeUInt32BE(value, offset)
  - buf.writeUInt32LE(value, offset)

5. Common usage patterns
- File IO: Use fs.readFile to obtain a Buffer and fs.writeFile to write a Buffer directly. Stream pipes operate with Buffer chunks.
- Encoding conversion: Convert between encodings with Buffer.from(str, 'encoding') and buf.toString('encoding'). For base64: Buffer.from(binary).toString('base64') and Buffer.from(base64String, 'base64').
- PNG magic bytes detection: read the first 8 bytes and match the PNG signature: 89 50 4E 47 0D 0A 1A 0A (hex). Example check: compare buffer.slice(0,8) to Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]) or check specific bytes with buf[0] === 0x89 && buf[1] === 0x50 ... etc.

SUPPLEMENTARY DETAILS
- Performance: prefer Buffer.allocUnsafe for high-throughput short-lived buffers if immediately overwritten to avoid zeroing cost. Use Buffer.alloc for security-sensitive or long-lived buffers.
- Memory: Buffers are backed by the Node.js internal memory pool for small sizes; large allocations may be outside the pool. Avoid keeping many large Buffers alive to reduce memory pressure and GC churn.
- Interoperability: Buffer instances are Uint8Array subclasses and can be used directly where typed arrays are expected.

REFERENCE DETAILS (exact signatures and behaviors)
- Buffer.from(string[, encoding]) -> Buffer
- Buffer.from(arrayBuffer[, byteOffset[, length]]) -> Buffer
- Buffer.from(array) -> Buffer
- Buffer.alloc(size[, fill[, encoding]]) -> Buffer
- Buffer.allocUnsafe(size) -> Buffer
- Buffer.allocUnsafeSlow(size) -> Buffer
- Buffer.byteLength(string[, encoding]) -> Number
- Buffer.concat(list[, totalLength]) -> Buffer
- Buffer.isBuffer(obj) -> Boolean
- Buffer.compare(buf1, buf2) -> Number
- buf.toString([encoding[, start[, end]]]) -> String
- buf.write(string[, offset[, length[, encoding]]]) -> Number
- buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
- Typed read/write methods: readUInt8, readUInt16BE/LE, readUInt32BE/LE, readInt* variants, writeUInt* variants.

Concrete best practices
- Validate external data lengths before allocating: if input claims to contain N bytes, bound-check N against a safe maximum before allocating with Buffer.alloc.
- When detecting PNG: check the first eight bytes exactly as specified in the PNG spec to avoid false positives.
- When converting large binary files to base64 for in-memory processing, be aware memory grows ~4/3 for base64-encoded strings. Prefer streaming to transform data when possible.

DETAILED DIGEST
- Source: Node.js Buffer API documentation
- Retrieved: 2026-03-20
- Source URL: https://nodejs.org/api/buffer.html
- Bytes fetched: 1071852

ATTRIBUTION
- Content extracted and condensed from the Node.js Buffer API documentation (see source URL). Data retrieved and condensed to actionable API signatures, usage patterns and best practices.