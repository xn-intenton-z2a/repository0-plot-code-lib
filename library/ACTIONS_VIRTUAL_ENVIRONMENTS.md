ACTIONS_VIRTUAL_ENVIRONMENTS

NORMALISED EXTRACT

Table of contents
- Purpose and scope
- Hosted runner choices and what they include
- Installing extra system dependencies on runners (example steps)
- Example GitHub Actions snippet for node-canvas/sharp native deps
- Best practices for CI builds that require native libraries

Purpose and scope
- The GitHub Actions virtual-environments repository documents the software and packages preinstalled on GitHub-hosted runners (ubuntu-latest, windows-latest, macos-latest). Use it to confirm whether required system packages are already present and to plan CI steps to install missing packages.

Hosted runner choices and preinstalled software
- Common recommendation: use runs-on: ubuntu-latest for Linux builds; check the virtual-environments repo page for package lists and OS images.
- Even when many packages are preinstalled, native libraries required by node-canvas or sharp may still need explicit installation in the job or require different package names across distributions.

Installing extra system dependencies on runners (example)
- Example job step to install required packages before npm install:
  - name: Install system dependencies
    run: |
      sudo apt-get update
      sudo apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev pkg-config

Example GitHub Actions workflow snippet (conceptual)
- jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install system deps
        run: sudo apt-get update && sudo apt-get install -y libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev pkg-config
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '24'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

Best practices for CI builds requiring native libraries
- Install system dependencies in a dedicated step before running npm ci; this ensures native modules can compile or prebuilt binaries are used.
- Pin runner OS versions when reproducibility matters (e.g., ubuntu-22.04) and check the virtual-environments README for the pinned image details.
- For deterministic builds, use a Docker image that already contains the native libraries or build an image that installs the dependencies and use runs-on: ubuntu-latest with container: option to run inside that image.

DETAILED DIGEST
- Source: https://github.com/actions/virtual-environments
- Retrieval date: 2026-03-20
- Bytes downloaded during crawl: 403897 bytes
- Extracted technical points: runner selection guidance, apt install snippet, recommendation to install native deps before npm install, and Docker-based reproducible build pattern.

ATTRIBUTION
- Original source: GitHub Actions virtual-environments repository
- Retrieved: 2026-03-20
