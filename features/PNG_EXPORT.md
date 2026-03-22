# PNG_EXPORT

Summary
Provide PNG export capability for generated plots using an optional external image library, with the chosen approach documented in README.md.

Specification
- Provide exportPng(svgString, outputPath, options) exported from src/lib/main.js.
- Implement PNG conversion using an optional dependency such as sharp or a canvas-based library; document the chosen dependency and installation steps in README.md.
- Ensure that exportPng writes a .png file that begins with the PNG magic bytes 89 50 4E 47 0D 0A 1A 0A.
- Keep PNG conversion optional so that users without the dependency can still use SVG output; exportPng should throw a clear error instructing how to install the dependency if it is missing.

Files to change
- Implement exportPng in src/lib/main.js and document optional dependency in README.md and package.json when implementing.
- Add unit tests tests/unit/png.test.js that create a temporary png and verify its magic bytes.

Acceptance Criteria
- Calling exportPng writes a .png file whose first eight bytes equal 89 50 4E 47 0D 0A 1A 0A.
- When the optional dependency is missing, exportPng throws a clear error instructing the user how to install the dependency.
