Plan: Update SOURCES.md and create library documents

Problem
SOURCES.md is empty; the mission requires curated references about JavaScript expression parsing, Math functions, SVG polyline/viewBox, PNG rendering (sharp), Node fs, and CSV format. These must be captured as library documents in library/ so the implementation and agents have precise technical references.

Approach
1. Research and add 3-8 high-quality URLs to SOURCES.md covering: Function constructor, Math object, SVG polyline/viewBox, Sharp (SVG->PNG), Node fs file writes, RFC4180 CSV.
2. Fetch each URL and extract technical details: syntax, parameter lists, return types, exact configuration options, and implementation patterns.
3. Produce one library document per source in SCREAMING_SNAKECASE.md inside library/ following extraction guidelines.
4. Update TODO tracking and mark progress.

Todos
- update-sources: Add curated URLs to SOURCES.md and commit (status: in_progress)
- fetch-sources: Download each source and save content for extraction (status: pending)
- create-library-docs: Extract and write library/*.md files (status: pending)

Notes
Plan created to satisfy the agentic-lib plan_mode requirement and to make the workflow auditable.
