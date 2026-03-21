PNG_SPEC

Table of contents
- PNG file signature (magic bytes)
- Chunk structure and key chunk types (IHDR, PLTE, IDAT, IEND)
- IHDR fields and constraints (width, height, bit depth, color type)
- Verifying PNG files and detecting PNG outputs
- Reference signatures and exact bytes to check
- Detailed digest and retrieval metadata
- Attribution

Normalised extract (key technical points)
- PNG files begin with an 8-byte signature, exact bytes in hexadecimal: 89 50 4E 47 0D 0A 1A 0A. This signature must match exactly to identify a PNG file.
- The basic structure after the signature is a sequence of chunks. Each chunk consists of a 4-byte length (big-endian), a 4-byte chunk type (ASCII), length bytes of chunk data, and a 4-byte CRC.
- Critical chunks include IHDR (image header, first chunk after signature), PLTE (palette, when present), IDAT (image data, one or more), and IEND (image trailer, final chunk).
- The IHDR chunk data contains: width (4 bytes, unsigned), height (4 bytes, unsigned), bit depth (1 byte), color type (1 byte), compression method (1 byte), filter method (1 byte), interlace method (1 byte).

Supplementary details (implementation specifics)
- To verify a PNG buffer in Node.js check first eight bytes against Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]). If they match, further parsing can be performed by reading subsequent chunk headers.
- When producing PNG via canvas or sharp, the produced Buffer should start with the PNG signature; test by checking buffer.slice(0,8).
- For basic validation it is sufficient to check the signature and presence of IHDR and IEND in the chunk stream; full validation requires CRC checks per chunk as specified by the standard.

Reference details (exact bytes and checks)
- PNG signature (hex): 89 50 4E 47 0D 0A 1A 0A
- In Node.js: signature buffer: [0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]
- Chunk layout: 4-byte length (uint32 big-endian) | 4-byte type (ASCII) | length bytes data | 4-byte CRC (uint32)
- IHDR layout (13 bytes data): width (4) | height (4) | bit depth (1) | color type (1) | compression method (1) | filter method (1) | interlace method (1)

Concrete best practices and troubleshooting
- When verifying PNG output from a renderer, first ensure outputBuffer.length >= 8 and compare the first 8 bytes to the signature. If mismatch, the output is not a PNG or is corrupted.
- If signature matches but image fails to open, inspect IHDR and IDAT chunk ordering and run CRC checks for corrupted chunks.

Detailed digest (content retrieved)
Source: https://www.w3.org/TR/PNG/
Retrieved: 2026-03-21
Downloaded bytes: 656574
Extract: The PNG specification describes the signature, chunked file format, IHDR fields, and CRC-based integrity checks; the signature bytes and chunk layout are authoritative for PNG detection and basic validation.

Attribution
- Source URL: https://www.w3.org/TR/PNG/
- Data size (bytes) fetched during crawl: 656574
