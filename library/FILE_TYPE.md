FILE_TYPE

NORMALISED EXTRACT
- Purpose: Detect binary file types by inspecting magic numbers (file signature bytes) at the start of the file/stream.
- Detection is best-effort and returns the probable extension and MIME type when recognized; otherwise returns undefined.
- This package focuses on binary formats; text-based formats such as CSV or SVG are not reliably identified by magic numbers.

TABLE OF CONTENTS
1. Overview
2. Installation and ESM notes
3. Primary API functions
4. Parameter types and return shapes
5. Streaming and async usage patterns
6. Security and robustness considerations
7. Example usage and recommendations

1. Overview
- Name: file-type (sindresorhus/file-type)
- Method: inspect the initial bytes (magic numbers) of a buffer/stream to identify known binary file formats (png, jpg, mp4, etc.).
- Not a validator: detection does not guarantee file integrity.

2. Installation and ESM notes
- npm install file-type
- This package is ESM-only; projects must be configured for ESM to import it directly.

3. Primary API functions
- fileTypeFromBuffer(buffer: Uint8Array | ArrayBuffer, options?): Promise<{ext: string, mime: string} | undefined>
- fileTypeFromFile(filePath: string, options?): Promise<{ext: string, mime: string} | undefined>
- fileTypeFromStream(stream: ReadableStream | NodeJS.ReadableStream, options?): Promise<{ext: string, mime: string} | undefined>
- fileTypeFromBlob(blob: Blob, options?): Promise<{ext: string, mime: string} | undefined>
- fileTypeFromTokenizer(tokenizer, options?): Promise<{ext: string, mime: string} | undefined>
- fileTypeStream(readableStream): returns an object stream wrapper that exposes a fileType property and pipes through the (possibly modified) stream; used to detect type while streaming.

4. Parameter types and return shapes
- buffer: Uint8Array | ArrayBuffer that contains the beginning bytes of the file (best with entire file but may succeed with initial segment).
- stream: Node.js stream.Readable or Web ReadableStream; engine compatibility notes apply.
- Returns: Promise resolving to { ext: string, mime: string } or undefined if unknown.

5. Streaming and async usage patterns
- fileTypeFromStream can accept remote streams (e.g., got.stream(url) or fetch(response.body)).
- fileTypeStream wraps a stream and reads the necessary initial bytes to detect the type, then exposes fileType on the returned stream wrapper.

6. Security and robustness considerations
- Detection is based on magic numbers and is not a security validator; when handling untrusted files, enforce file size limits and process in a worker or with timeouts.
- Do not assume detection == validity; always validate content for downstream processing (e.g., parse PNG with a robust parser if relying on PNG structure).

7. Example usage (canonical signatures)
- import {fileTypeFromBuffer} from 'file-type';
- const result = await fileTypeFromBuffer(buffer); // result -> {ext:'png', mime:'image/png'} | undefined

DETAILED DIGEST
- Source: https://github.com/sindresorhus/file-type (README)
- Retrieved: 2026-03-20
- Digest: API signatures and usage patterns for detecting file types from buffers, files and streams; ESM-only note and security guidance extracted from README.

ATTRIBUTION
- Source: sindresorhus/file-type README (raw): https://raw.githubusercontent.com/sindresorhus/file-type/main/readme.md (retrieved 2026-03-20)

DATA SIZE FETCHED: ~34 KB (raw README)
