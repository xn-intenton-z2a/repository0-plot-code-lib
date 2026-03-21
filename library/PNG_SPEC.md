Normalised extract

This file condenses the Portable Network Graphics (PNG) specification essentials required for encoder/decoder implementations: file signature, chunk structure, critical chunks (IHDR, PLTE, IDAT, IEND), filtering, interlace (Adam7), and CRC handling.

Table of contents

- Normalised extract
- Scope & intent
- File structure and signatures
- Chunk layout and processing rules
- Image encoding: filtering and compression
- Interlacing (Adam7)
- Metadata and ancillary chunks
- Supplementary details
- Reference details (API signatures)
- Detailed digest and retrieval
- Attribution

Scope & intent

PNG is a lossless bitmap format using zlib/deflate for compressed image data streams. This digest focuses on on-disk/stream structure and canonical decoding/encoding steps.

File structure and signatures

- PNG files begin with an 8-byte signature: 89 50 4E 47 0D 0A 1A 0A
- After the signature the file contains sequential chunks until IEND.

Chunk layout and processing rules

Each chunk: length(4) | type(4 ASCII) | data(length) | CRC(4)
- length: big-endian unsigned int; CRC computed on type+data using CRC-32 (ISO 3309)
- chunk types are case-sensitive; critical chunks have uppercase type letters.
- Critical chunks order: IHDR must appear first, then optional PLTE (for indexed color), then one or more IDAT chunks, then IEND final.

IHDR (image header)

- IHDR data fields (13 bytes): width (4), height (4), bit depth (1), color type (1), compression (1), filter (1), interlace (1)
- Common color types: 0 (grayscale), 2 (truecolor), 3 (indexed), 4 (grayscale with alpha), 6 (truecolor with alpha)

Image encoding: filtering and compression

- Each scanline is prefixed with a filter type byte (0-4): None, Sub, Up, Average, Paeth
- Filter is applied per byte and aims to improve zlib compression ratio; decoder must reverse filter before reconstructing pixels
- IDAT chunks carry the zlib-compressed concatenated filtered scanlines; decoders concatenate IDAT data before decompressing

Interlacing (Adam7)

- Adam7 defines seven passes producing progressive rendering; encoder decomposes image into passes and encodes each pass as scanlines like non-interlaced data
- Decoder reconstructs pixels by reversing the pass layout

Metadata and ancillary chunks

- tEXt/zTXt/iTXt for textual metadata; sRGB, gAMA, cHRM for color profile hints; pHYs for pixel aspect ratio; tIME indicates modification time
- Ancillary chunks may be safely ignored by strict decoders but preserved by encoders when possible

Supplementary details

- Compression settings: typical encoders use deflate with compression-level tradeoffs; PNG allows any zlib-compatible stream
- CRC handling and robust parsing: decoders should validate CRC but can be configured to accept corrupted streams for performance or legacy compatibility

Reference details (API signatures)

- parsePNG(buffer: Buffer): { width:number, height:number, data:Uint8Array, colorType:number }
- encodePNG(imageData: Uint8Array, options?: { width:number, height:number, colorType?:number, bitDepth?:number, compressionLevel?:number }): Buffer
- chunk structure: writeChunk(type:string, data:Buffer): Buffer

Detailed digest (retrieval)

- Retrieval date: 2026-03-21
- Crawl size: 671.1 KB
- Digest: Derived from the PNG specification (RFC/ISO references), libpng docs and canonical encoder/decoder literature.

Attribution

Sources: PNG specification, libpng documentation, zlib RFC and implementation notes. Condensed for implementers and reviewers.