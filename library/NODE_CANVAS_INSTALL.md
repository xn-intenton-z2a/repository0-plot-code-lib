NODE_CANVAS_INSTALL

NORMALISED EXTRACT

Table of contents
- Purpose
- Debian/Ubuntu install steps (apt packages)
- macOS Homebrew steps
- Windows notes
- Docker and CI recommendations
- Common build failures and fixes

Purpose
- node-canvas is a native implementation of the HTML Canvas 2D API. Installing it requires native graphics libraries (cairo, pango, libpng, libjpeg, giflib and related headers). For CI and production builds, the necessary system packages must be present prior to npm install.

Debian/Ubuntu (recommended apt package set)
- Typical package install sequence that satisfies node-canvas build requirements:
  - sudo apt-get update && sudo apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev pkg-config
- Additional packages that can be relevant: libpng-dev, fontconfig, libfreetype6-dev
- Ensure pkg-config is installed so node-gyp can locate native libraries and headers.

macOS (Homebrew)
- brew install pkg-config cairo pango libpng jpeg giflib librsvg
- Ensure Xcode command-line tools are installed for native compilation (xcode-select --install)

Windows
- Prefer using prebuilt binary releases when available. If building from source, install Windows build tools and ensure dependencies are available (MSYS2 or vcpkg can provide native libraries). Consult node-canvas Windows documentation for exact steps and supported Node versions.

Docker and CI recommendations
- On GitHub Actions (ubuntu-latest) add an early step that installs the same apt packages to the runner before npm install:
  - name: Install canvas system deps
    run: sudo apt-get update && sudo apt-get install -y libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev pkg-config
- For reproducible CI builds consider using a Docker image that already bundles the required native libraries or use a prebuilt base image maintained by the project or upstream images with Cairo preinstalled.

Common failures and fixes
- Missing headers: error messages referencing cairo or pango headers indicate missing -dev packages; install the appropriate -dev package for your distribution.
- pkg-config not found: ensure pkg-config is installed so node-gyp finds libraries.
- Text rendering issues: ensure system fonts are available; register fonts manually or install fontconfig packages as needed.

DETAILED DIGEST
- Source: https://github.com/Automattic/node-canvas/wiki/Installation:-Linux
- Retrieval date: 2026-03-20
- Bytes downloaded during crawl: 240753 bytes
- Extracted facts: canonical apt packages list, Homebrew equivalents, CI install snippet, common troubleshooting steps.

ATTRIBUTION
- Original source: node-canvas project wiki (Automattic)
- Retrieved: 2026-03-20
