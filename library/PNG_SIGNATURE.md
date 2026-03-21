PNG_SIGNATURE

Table of contents
- PNG file signature (magic bytes)
- Quick validation procedure
- IHDR note

Normalised extract
- Every PNG file begins with an 8-byte signature in this exact order (hex): 89 50 4E 47 0D 0A 1A 0A
- Programs should check these first 8 bytes to quickly detect PNG files and reject non-PNG input.

Reference details (exact bytes)
- Signature bytes (hex): 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
- Signature bytes (decimal): 137 80 78 71 13 10 26 10

Quick validation (Node.js example pattern)
- Read first 8 bytes: const sig = fs.readFileSync(path).slice(0,8)
- Compare to Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A])
- If equal, file is PNG; if not, reject.

IHDR note
- Immediately after the signature, PNG files contain an IHDR chunk describing width, height and bit-depth; full validation requires parsing chunks, but signature check is sufficient for quick detection.

Detailed digest (source and retrieval)
Source: W3C PNG specification (PNG file signature section)
Retrieved: 2026-03-21
Crawled bytes: 656574
Attribution: https://www.w3.org/TR/PNG/#5PNG-file-signature
