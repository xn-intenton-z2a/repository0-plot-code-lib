# Overview

Automate the patch release process for version 1.2.0 by updating the project version, maintaining a structured changelog, and providing a reproducible npm script to generate, commit, and tag the patch release.

# Implementation

1. Update package.json
   - Change the version field in package.json from 1.2.0-0 to 1.2.0.
   - Add a new npm script "release:patch" under scripts:
     - "release:patch": "npx conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md package.json && git commit -m 'chore(release): 1.2.0 [skip ci]' && git tag v1.2.0"
2. Maintain CHANGELOG.md
   - Create or update a top-level CHANGELOG.md file.
   - Add a new section:
     ## [1.2.0] - YYYY-MM-DD
     ### Bug Fixes
       - Describe each bug or issue fixed in this patch release.
     ### Maintenance
       - List any internal cleanup, dependency upgrades or documentation updates.
3. Ensure idempotency
   - The release:patch script should be safe to run multiple times without duplicating entries or failing if the tag already exists.

# Testing

- Add a unit test in tests/unit/release-patch.test.js:
  - Mock fs.promises to simulate an existing CHANGELOG.md and package.json.
  - Invoke the npm script command via child_process.spawnSync.
  - Verify that:
    - package.json version field updates to 1.2.0.
    - CHANGELOG.md contains a section for 1.2.0.
    - git commit and git tag calls are executed with correct messages (using a mock or spy).

# Documentation Updates

- Update README.md:
  - Add a "Changelog & Release" section describing the release:patch script and linking to CHANGELOG.md.
  - Provide an example of running npm run release:patch and inspecting the changelog and tag.