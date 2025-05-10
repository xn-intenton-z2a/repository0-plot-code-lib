# NPM_PUBLISH

## Crawl Summary
Usage: npm publish [<pkg-spec>] [--tag <tag>=latest] [--access <public|restricted>=public] [--dry-run=false] [--otp <code>] [--workspace <pattern>] [--workspaces] [--include-workspace-root=false] [--provenance=false] [--provenance-file <path>]
Publishes folder|tarball|url|name@version|name@tag|git-url. Fails if version exists. Sends sha1 and sha512 sums. Defaults: access=public (scoped=restricted), tag=latest.  dry-run reports only. Ignored files: .npmignore/.gitignore, never-include patterns, symlinks. Workspaces options filter projects.  provenance links CI/CD. provenance-file uses existing bundle. OTP required for 2FA registries.

## Normalised Extract
Table of Contents:
 1. Command Usage
 2. Publish Targets
 3. Integrity Submission
 4. File Inclusion Rules
 5. Configuration Options
 6. Workspace Behavior
 7. Provenance Controls
 8. Error Codes & Remedies

1. Command Usage
 npm publish [<folder>|<.tgz>|<url>|<name>@<version>|<name>@<tag>|<git-url>] [--tag <tag>] [--access <public|restricted>] [--dry-run] [--otp <code>] [--workspace <pattern>] [--workspaces] [--include-workspace-root] [--provenance] [--provenance-file <path>]

2. Publish Targets
 - Folder: must contain package.json
 - Tarball: gzipped .tgz
 - URL: points to tarball
 - name@version: exact published version
 - name@tag: resolves tag to version
 - git-url: clone and publish

3. Integrity Submission
 - sha1sum and integrity (sha512) fields sent in HTTP PUT
 - Registry expects both; install uses highest algorithm

4. File Inclusion Rules
 - Default include all except ignored by .npmignore
 - Files list in package.json overrides default
 - .npmignore > .gitignore
 - Never-include patterns: *.log, .*rc, test/, coverage/, .travis.yml
 - Symlinks excluded

5. Configuration Options
 tag: String=latest
 access: public|restricted|null=public
 dry-run: Boolean=false
 otp: String|null
 workspace: String[]
 workspaces: Boolean|null
 include-workspace-root: Boolean=false
 provenance: Boolean=false
 provenance-file: Path|null

6. Workspace Behavior
 - --workspace=NAME filters to matching workspaces
 - --workspaces=true runs on all configured workspaces
 - include-workspace-root adds root to workspace commands
 - none of these export env to child processes

7. Provenance Controls
 - --provenance attaches CI build link
 - --provenance-file uploads existing SBOM bundle
 - cannot combine --provenance and --provenance-file

8. Error Codes & Remedies
 EPUTALREADYEXISTS: version exists; bump version
 E403 OTP_REQUIRED: supply --otp <code>
 EISDIR: invalid target, supply tarball or folder
 EPERM ignored file: review .npmignore


## Supplementary Details
Implementation Steps:
1. Bump version in package.json
2. Run npm pack --dry-run to verify included files
3. Verify .npmignore or files list for exclusions
4. Run npm publish --tag beta --access restricted --otp=123456
5. Verify remote dist-tag with npm dist-tag ls

Checksum Fields:
- sha1: Content-SHA1 header
- integrity: sha512 in request body metadata

Mutual Exclusion:
--provenance vs --provenance-file: tool validates arguments before tarball upload

Workspace Sequence:
- npm config set workspace=name OR --workspace=name
- npx lerna publish (optional) to manage multi-package releases


## Reference Details
Full Command Signature:
 npm publish [<target>] [--tag <string>] [--access <string>] [--dry-run] [--otp <string>] [--workspace <string>] [--workspaces] [--include-workspace-root] [--provenance] [--provenance-file <path>]

Parameters:
 <target>: String|URL|Path|Specifier
 --tag: String; defaults to 'latest'
 --access: 'public'|'restricted'|null
 --dry-run: Boolean
 --otp: 6-digit TOTP string
 --workspace: workspace name or path; can repeat
 --workspaces: Boolean
 --include-workspace-root: Boolean
 --provenance: Boolean
 --provenance-file: filesystem path

Returns:
 HTTP 201 Created on success; prints uploaded package URL and tag details
 Exits with code !=0 on error

Examples:
```
# Publish with custom tag
npm publish --tag next

# Dry run to preview
npm publish --dry-run

# Publish scoped package privately
npm publish --access restricted

# Publish specific folder
npm publish ./dist/my-lib

# Publish with 2FA code
npm publish --otp 123456
```

Best Practices:
- Use npm version [major|minor|patch] to bump version and tag commit
- Validate package contents with npm pack
- Automate publish in CI: npm ci && npm test && npm publish --access public --tag $CI_COMMIT_REF_SLUG

Troubleshooting:
# OTP challenge
> npm publish
npm ERR! code EOTP
npm ERR! Need to provide one-time password via --otp

# File missing
> npm publish
npm ERR! manifest has no field for 'main'; add 'main' to package.json


## Information Dense Extract
npm publish [target] options
Options: tag=latest(String), access=public|restricted|null, dry-run=false(Boolean), otp(String), workspace:Array<String>, workspaces(null|Boolean), include-workspace-root=false(Boolean), provenance=false(Boolean), provenance-file=Path|null
Targets: folder|.tgz|url|name@version|name@tag|git-url
Files: include all except .npmignore patterns, never-include defaults; override via package.json 'files'
Checksums: send sha1sum and sha512 integrity; registry verifies
Error codes: EPUTALREADYEXISTS, EOTP, EPERM
Examples: npm publish --tag beta --access restricted --otp=123456
CI Pattern: npm ci && npm test && npm publish --access public --tag $CI_BRANCH


## Sanitised Extract
Table of Contents:
 1. Command Usage
 2. Publish Targets
 3. Integrity Submission
 4. File Inclusion Rules
 5. Configuration Options
 6. Workspace Behavior
 7. Provenance Controls
 8. Error Codes & Remedies

1. Command Usage
 npm publish [<folder>|<.tgz>|<url>|<name>@<version>|<name>@<tag>|<git-url>] [--tag <tag>] [--access <public|restricted>] [--dry-run] [--otp <code>] [--workspace <pattern>] [--workspaces] [--include-workspace-root] [--provenance] [--provenance-file <path>]

2. Publish Targets
 - Folder: must contain package.json
 - Tarball: gzipped .tgz
 - URL: points to tarball
 - name@version: exact published version
 - name@tag: resolves tag to version
 - git-url: clone and publish

3. Integrity Submission
 - sha1sum and integrity (sha512) fields sent in HTTP PUT
 - Registry expects both; install uses highest algorithm

4. File Inclusion Rules
 - Default include all except ignored by .npmignore
 - Files list in package.json overrides default
 - .npmignore > .gitignore
 - Never-include patterns: *.log, .*rc, test/, coverage/, .travis.yml
 - Symlinks excluded

5. Configuration Options
 tag: String=latest
 access: public|restricted|null=public
 dry-run: Boolean=false
 otp: String|null
 workspace: String[]
 workspaces: Boolean|null
 include-workspace-root: Boolean=false
 provenance: Boolean=false
 provenance-file: Path|null

6. Workspace Behavior
 - --workspace=NAME filters to matching workspaces
 - --workspaces=true runs on all configured workspaces
 - include-workspace-root adds root to workspace commands
 - none of these export env to child processes

7. Provenance Controls
 - --provenance attaches CI build link
 - --provenance-file uploads existing SBOM bundle
 - cannot combine --provenance and --provenance-file

8. Error Codes & Remedies
 EPUTALREADYEXISTS: version exists; bump version
 E403 OTP_REQUIRED: supply --otp <code>
 EISDIR: invalid target, supply tarball or folder
 EPERM ignored file: review .npmignore

## Original Source
CI/CD and Release Automation Tools
https://docs.npmjs.com/cli/v10/commands/npm-publish

## Digest of NPM_PUBLISH

# npm publish

## Synopsis

```
npm publish [<package-spec>] [--tag <tag>] [--access <public|restricted>] [--dry-run] [--otp <one-time-password>] [--workspace <pattern>] [--workspaces] [--include-workspace-root] [--provenance] [--provenance-file <path>]
```

## Description

Publishes a package to the registry so it can be installed by name.  Accepts:

- Folder with package.json
- .tgz tarball
- URL to tarball
- name@version
- name@tag
- git remote URL

Fails if name@version exists or was previously published.  Submits sha1 and sha512 integrity checksums.

## Files included

Run `npm pack --dry-run` to list included files.  Defaults include all except:

- Ignored by .npmignore / .gitignore
- Files matching never-include patterns ( e.g. *.log, *.ts ) unless whitelisted
- Symbolic links are excluded

## Configuration options

| Option                | Default     | Type                      | Description                                           |
|-----------------------|-------------|---------------------------|-------------------------------------------------------|
| tag                   | latest      | String                    | Dist-tag to apply                                      |
| access                | public      | public, restricted, null  | Package visibility                                     |
| dry-run               | false       | Boolean                   | Show actions without publishing                        |
| otp                   | null        | String                    | Two-factor one-time password                           |
| workspace             | -           | String[]                  | Filter and run command in specified workspaces         |
| workspaces            | null        | Boolean                   | Run in all workspaces                                  |
| include-workspace-root| false       | Boolean                   | Include root project when using workspaces             |
| provenance            | false       | Boolean                   | Link published package to CI/CD provenance             |
| provenance-file       | null        | Path                      | Use existing provenance bundle                         |

## Defaults & Effects

- `--access=restricted` only valid for scoped packages
- `--dry-run` does not affect remote commands like `dist-tag`
- `--workspace` and `--workspaces` not exported to child processes
- `--provenance` and `--provenance-file` are mutually exclusive

## Integrity

On publish npm@>=5 sends both sha1sum and sha512 integrity to registry.  Installs verify downloads using strongest algorithm.

## Troubleshooting - Common Errors

- E403 whet OTP missing: `npm publish --otp=123456`
- EPUTALREADYEXISTS if name@version exists
- EPERM file ignored: check .npmignore patterns

_Retrieved: 2024-08-13_  
_Data Size: 197470 bytes_  
_Attribution: npm CLI documentation_

## Attribution
- Source: CI/CD and Release Automation Tools
- URL: https://docs.npmjs.com/cli/v10/commands/npm-publish
- License: License: MIT / CC0
- Crawl Date: 2025-05-10T07:02:17.617Z
- Data Size: 197470 bytes
- Links Found: 12375

## Retrieved
2025-05-10
