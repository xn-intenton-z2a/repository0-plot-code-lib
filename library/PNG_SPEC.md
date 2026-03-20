PNG_SPEC

TABLE OF CONTENTS:
1. PNG file signature
2. PNG chunk format and ordering
3. IHDR chunk layout (fields and sizes)
4. Critical chunk types and meanings (IHDR, PLTE, IDAT, IEND)
5. Color types and bit-depth mapping
6. CRC computation
7. Best practices for generating PNG from canvas/buffers
8. Detailed digest and retrieval metadata

NORMALISED EXTRACT:
- PNG file signature (first 8 bytes, hex): 89 50 4E 47 0D 0A 1A 0A
- Chunk format: each chunk is: length (4 bytes, big-endian unsigned int) | type (4 ASCII bytes) | data (length bytes) | CRC (4 bytes, big-endian unsigned int). Length counts only data, not type or CRC.
- IHDR chunk (must be first) layout (13 bytes total data):
  - width: 4 bytes (unsigned int, big-endian)
  - height: 4 bytes (unsigned int, big-endian)
  - bit depth: 1 byte
  - color type: 1 byte
  - compression method: 1 byte (0 = deflate/inflate)
  - filter method: 1 byte (0 = adaptive filtering with five basic filter types)
  - interlace method: 1 byte (0 = no interlace, 1 = Adam7)
- Critical chunks (minimum): IHDR, IDAT, IEND. PLTE is required for indexed color types; tEXt/zTXt, gAMA, etc. are ancillary.
- Color types and typical mappings:
  - 0: Grayscale
  - 2: Truecolor (RGB)
  - 3: Indexed-color (uses PLTE)
  - 4: Grayscale with alpha
  - 6: Truecolor with alpha (RGBA) — common output for canvas/png with alpha.
- CRC: CRC-32 of chunk type and chunk data (4 bytes). Use standard CRC-32 (IEEE 802.3 polynomial 0x04C11DB7) algorithm over the type+data bytes.

SUPPLEMENTARY DETAILS:
- For canvas-generated images use IHDR bit depth 8 and color type 6 for RGBA output; write IDAT(s) with zlib/deflate-compressed image data.
- When validating PNG bytes check the 8-byte signature and then iterate chunk-by-chunk verifying lengths and CRCs.
- For minimal PNG to be accepted by viewers, include IHDR, at least one IDAT, and IEND.

REFERENCE DETAILS (exact values and field sizes):
- Signature: 8 bytes: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
- Chunk header: length: 4 bytes BE unsigned int; type: 4 ASCII bytes; data: length bytes; CRC: 4 bytes BE unsigned int
- IHDR data order and sizes (in bytes): width(4) height(4) bit_depth(1) color_type(1) compression_method(1) filter_method(1) interlace_method(1)
- CRC algorithm: CRC-32 (ISO 3309) computed on the concatenation of chunk type and chunk data; represented as 4-byte big-endian unsigned int.

IMPLEMENTATION NOTES & TROUBLESHOOTING:
- If PNG viewers reject a file, verify signature and IHDR fields first; incorrect width/height or corrupted IDATs commonly cause failures.
- For Node-based PNG generation prefer using existing libraries (canvas, sharp) which produce correct IHDR/IDAT/CRC headers; when composing PNG by hand ensure correct zlib compression of IDAT payload.

DETAILED DIGEST (extracted/normalised from W3C PNG spec and supporting materials, retrieved 2026-03-20):
- PNG is a chunked, zlib-compressed format with a fixed 8-byte signature and a sequence of typed chunks. IHDR is the first chunk and contains image dimensions and interpretation. CRC-32 protects each chunk’s type+data.

ATTRIBUTION:
Primary spec: https://www.w3.org/TR/PNG/ — retrieved 2026-03-20. Data size fetched during crawl: 656574 bytes.
Secondary reference: https://en.wikipedia.org/wiki/Portable_Network_Graphics (conceptual summary).
