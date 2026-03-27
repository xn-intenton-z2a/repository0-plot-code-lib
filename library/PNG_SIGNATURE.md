PNG_SIGNATURE

Table of contents
1. PNG file signature (magic bytes)
2. Exact hex sequence and ASCII representation
3. Use in validation checks
4. Example detection algorithm
5. Supplementary details
6. Reference details
7. Detailed digest
8. Attribution

Normalised extract
PNG file signature
- The PNG file format begins with an 8-byte signature (magic bytes) that identifies the file as PNG.

Exact sequence (hex and ASCII)
- Hex bytes: 89 50 4E 47 0D 0A 1A 0A
- ASCII (for readability): \x89 P N G \r \n \x1A \n
- In escaped form: \x89PNG\r\n\x1A\n
Use in validation checks
- To validate a PNG file, read the first 8 bytes and compare them to the exact sequence above. If any byte differs, the file is not a valid PNG (or is corrupted).

Example detection algorithm (procedural)
1. Open file in binary mode.
2. Read first 8 bytes into a buffer B.
3. Compare B to [0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A].
4. If equal, accept as PNG; otherwise reject.

Supplementary details
- The PNG signature protects against systems that may treat files as text by ensuring a non-ASCII leading byte (0x89).
- Many image libraries expose convenience checks that perform this test internally.

Reference details
- Exact signature provided above; used by PNG decoders worldwide.

Detailed digest
- Source: Wikipedia "Portable Network Graphics" (PNG)
- URL: https://en.wikipedia.org/wiki/Portable_Network_Graphics
- Retrieved: 2026-03-27
- Data size obtained during crawl: approximately 386 KB

Attribution
- Source: Wikipedia. Use the exact 8-byte sequence to validate PNG output.