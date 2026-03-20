WIKIPEDIA_PNG

NORMALISED EXTRACT
- Portable Network Graphics (PNG) is a raster-graphics file format supporting lossless data compression and a superset of GIF features without patent restrictions.
- PNG supports palette-based (indexed) images, grayscale (with optional alpha), truecolor RGB, and truecolor with alpha (RGBA).
- PNG encodes image data in one or more IDAT chunks containing compressed image scanlines; compression uses the zlib/deflate algorithm.
- PNG supports optional interlacing using the Adam7 scheme, enabling progressive rendering.
- PNG files are built from a fixed 8-byte signature followed by a series of length-prefixed chunks: each chunk is [length(4)][type(4)][data(length)][CRC(4)].
- Critical chunk types: IHDR (header), PLTE (palette), IDAT (image data), IEND (image trailer). Ancillary chunks include tEXt/iTXt/zTXt (textual metadata), gAMA (gamma), pHYs (pixel dimensions), sRGB (rendering intent), iCCP (ICC profile), etc.
- PNG replaced GIF for non-patented lossless imagery and is widely used for web graphics requiring lossless, alpha-capable images.

TABLE OF CONTENTS
1. Overview and format purpose
2. Image types and color modes
3. File structure (signature and chunks)
4. IHDR chunk layout and fields
5. Compression, filtering, and interlacing (Adam7)
6. Common chunk types and semantics
7. Implementation notes and best practices

DETAILED INFORMATION
1. Overview and format purpose
- PNG is designed for lossless compression of raster images with support for full alpha transparency and a palette mode for indexed images.

2. Image types and color modes
- Color types and interpretation:
  - 0: Grayscale. Sample depth: 1,2,4,8,16 bits.
  - 2: Truecolor (RGB). Sample depths: 8 or 16 bits per sample.
  - 3: Indexed-color (palette). Samples are indices into PLTE; sample depth: 1,2,4,8 bits.
  - 4: Grayscale with alpha. Two samples per pixel: gray + alpha.
  - 6: Truecolor with alpha (RGBA).
- Bit depth applies per channel; valid combinations are constrained by color type (see IHDR reference below).

3. File structure (signature and chunks)
- PNG Signature (8 bytes): 89 50 4E 47 0D 0A 1A 0A.
- Chunk structure (repeated):
  - Length: 4-byte unsigned integer (big-endian) indicating the number of data bytes in the chunk.
  - Type: 4 ASCII bytes identifying the chunk (case matters: uppercase = critical, lowercase = ancillary conventions).
  - Data: Length bytes of chunk-specific data.
  - CRC: 4-byte CRC (IEEE 802.3 CRC32) computed over the Type and Data fields.
- Chunks must appear in a specific order for interpreters: IHDR must be first, IEND last; IDAT chunks may be multiple and must appear after PLTE if PLTE is present.

4. IHDR chunk layout and fields (13 bytes of data)
- Width: 4 bytes (unsigned integer, big-endian)
- Height: 4 bytes (unsigned integer, big-endian)
- Bit depth: 1 byte
- Color type: 1 byte (values: 0,2,3,4,6)
- Compression method: 1 byte (must be 0; zlib/deflate)
- Filter method: 1 byte (must be 0; adaptive filtering per scanline)
- Interlace method: 1 byte (0 = no interlace, 1 = Adam7 interlace)

5. Compression, filtering, and interlacing
- Image data is filtered per scanline before compression; PNG defines five filter types (0: None, 1: Sub, 2: Up, 3: Average, 4: Paeth) chosen per scanline to improve compressibility.
- After filtering, scanline data is compressed with zlib/deflate to produce the IDAT stream(s).
- Adam7 interlacing arranges image data in seven passes to allow progressive rendering; with interlace=1 the decoder reconstructs final image from the passes.

6. Common chunk types and semantics
- IHDR: Image header (must be first, 13 bytes data)
- PLTE: Palette (present for color type 3; length is 3 * number of palette entries)
- IDAT: Image data (may be split across multiple consecutive IDAT chunks; concatenated before zlib/deflate decompression)
- IEND: Image trailer (0 bytes data; marks end of file)
- tEXt/iTXt/zTXt: Textual metadata (plain, compressed, or internationalized text)
- gAMA: Image gamma
- pHYs: Pixel dimensions (pixels per unit, unit specifier)
- sRGB: Standard RGB rendering intent
- iCCP: Embedded ICC color profile (compressed)

7. Implementation notes and best practices
- Validate the PNG signature before parsing chunks.
- Read chunk length and type, then read exact data length and CRC; verify CRC for chunk integrity.
- For large images, stream IDAT chunk data and feed into incremental zlib inflater rather than loading entire image.
- When writing PNGs, choose appropriate bit depth and color type to minimize size (e.g., use indexed palette for small-color images) and consider palette optimization.
- Respect interlace and filtering options when encoding to ensure compatibility with decoders.

REFERENCE DETAILS (SPECIFICATIONS & FORMATS)
- PNG Signature bytes: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
- Chunk format: [length: uint32 BE][type: 4 ASCII bytes][data: length bytes][crc: uint32 BE]
- IHDR data (13 bytes): width:uint32 BE, height:uint32 BE, bit_depth:uint8, color_type:uint8, compression_method:uint8, filter_method:uint8, interlace_method:uint8
- Compression: zlib/deflate over filtered scanlines. Filters: 0..4 (None, Sub, Up, Average, Paeth).
- Critical chunks (must be understood to decode): IHDR, PLTE (if present for indexed images), IDAT, IEND.

DETAILED DIGEST
- Source: https://en.wikipedia.org/wiki/PNG (redirect from Portable_Network_Graphics)
- Retrieved: 2026-03-20
- Crawl method: Wikipedia API extracts (plain text) used for concise extraction
- Bytes downloaded during crawl (API payload): ~44 KB

ATTRIBUTION
- Content extracted from: "PNG" article on Wikipedia (en.wikipedia.org)
- Retrieved: 2026-03-20
- URL: https://en.wikipedia.org/wiki/PNG

DATA SIZE OBTAINED DURING CRAWL
- Approximate bytes: 44,000 bytes (plain-text extract from Wikipedia API)

END OF DOCUMENT
