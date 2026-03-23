PNG_SIGNATURE

NORMALISED EXTRACT
Table of contents:
- PNG file signature (magic bytes)
- How to detect a PNG file reliably
- Brief PNG file structure after signature

PNG file signature (magic bytes):
- Exact 8-byte signature (hex): 89 50 4E 47 0D 0A 1A 0A
- ASCII representation: 0x89 'P' 'N' 'G' CR LF SUB LF
- Decimal bytes: 137 80 78 71 13 10 26 10

How to detect a PNG file reliably:
- Read the first 8 bytes of the file and compare against the exact sequence above.
- Detection pseudocode: read buffer[0..7]; compare each byte to the expected values in order; if all equal, file is PNG.
- Do not rely solely on file extension: verify magic bytes when validating PNG input.

Brief PNG file structure after signature:
- After the 8-byte signature the file contains a sequence of chunks, each chunk structure is: 4-byte length (big-endian), 4-byte chunk type (ASCII), data (length bytes), 4-byte CRC (big-endian).
- The first critical chunk must be IHDR (image header) which specifies image dimensions, bit depth, color type and compression method.

SUPPLEMENTARY DETAILS
- The signature was chosen to aid detection on text-only transports and to catch common file truncation and newline conversion errors.
- When validating: check signature first, then parse IHDR and check reasonable dimensions before processing large payloads.

REFERENCE DETAILS
- Signature bytes: [0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]
- Chunk format: 4-byte length (unsigned big-endian), 4-byte ASCII chunk type, data, 4-byte CRC (IEEE CRC-32)

DETAILED DIGEST
Source: https://en.wikipedia.org/wiki/Portable_Network_Graphics#File_signature
Retrieved: 2026-03-23
Bytes fetched: 375609

ATTRIBUTION
Source origin: Wikipedia / PNG specification references
