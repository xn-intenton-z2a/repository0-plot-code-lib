# NPM_DOCS

## Crawl Summary
The npm documentation details the three main components (website, CLI, registry) along with explicit CLI commands for user authentication, account management, and two-factor authentication. It includes precise details on account creation, password requirements, 2FA configuration methods (using security keys or TOTP), billing procedures, and troubleshooting commands such as generating npm-debug.log files.

## Normalised Extract
## Table of Contents

1. CLI Usage and Commands
   - npm login, npm whoami, npm publish, npm unpublish
2. Account Management
   - Creating an account (username, email, password requirements)
   - Testing account with `npm login` and verifying with `npm whoami`
3. Two-Factor Authentication (2FA)
   - Enabling 2FA (auth-and-writes vs auth-only)
   - Disabling 2FA
   - Configuring 2FA from the command line using commands like `npm profile enable-2fa auth-and-writes` and the use of OTP with `--otp=<code>`
4. Billing and Receipts
   - Upgrading, viewing billing history, editing payment information
5. Troubleshooting
   - Generating npm-debug.log with commands: `npm install --timing`, `npm publish --timing`
   - Common issues such as broken installations, permissions errors, and ENOENT errors

### Detailed Technical Sections

**1. CLI Usage and Commands**
- Login: `npm login` (prompts for username, password, email, and OTP if needed).
- WhoAMI: `npm whoami` returns the current logged in username.
- Publish: `npm publish [<tarball>|<folder>] [--tag <tag>]` with optional OTP appended as `--otp=123456`.
- Profile Management: `npm profile get` to retrieve settings, and `npm profile set <prop> <value>` to update.

**2. Account Management**
- Account creation requires a lowercase username (with hyphens/numerals allowed), a public email, and a password that is >10 characters and not similar to the username.
- Verification step: After signup, verify via the account verification email.

**3. Two-Factor Authentication (2FA)**
- Enabling 2FA:
  - Command (auth-and-writes): `npm profile enable-2fa auth-and-writes`
  - Command (auth-only): `npm profile enable-2fa auth-only`
- Disabling 2FA: `npm profile disable-2fa`
- Use OTP with commands by appending `--otp=<code>` as in: `npm publish --otp=123456`.

**4. Billing and Receipts**
- Upgrade Plan: Initiated via the Billing Info page by selecting "Upgrade Plan ($7/User)".
- Enter required billing fields: Email, Name, Address, Credit Card details (card number, expiry, CVC), with an option to "Remember me".
- Viewing receipts: Access via "View Billing History" and options to view, download (PDF), or email receipts.

**5. Troubleshooting**
- Generating debug logs: Use `npm install --timing` or `npm publish --timing` to create `npm-debug.log`.
- Common troubleshooting commands:
  - Clean cache: `npm cache clean`
  - Verify cache location: `npm config get cache`
  - Address permissions errors by ensuring correct directory permissions (e.g., on Windows, ensure `C:\Users\<user>\AppData\Roaming\npm` exists and is writable).


## Supplementary Details
### Technical Specifications and Implementation Details

- **npm CLI Commands**:
  - `npm login`: Prompts for credentials; if 2FA is enabled, also requires OTP input.
  - `npm whoami`: Returns the authenticated username.
  - `npm profile set <prop> <value>`: Updates user profile; properties include `email`, `fullname`, `password`, etc.
  - `npm profile enable-2fa auth-and-writes`: Enables 2FA for both authorization and destructive actions (publishing, token creation, etc.).
  - `npm profile enable-2fa auth-only`: Enables 2FA for sensitive commands only.
  - `npm profile disable-2fa`: Disables 2FA after confirming with the user password and OTP.

- **Configuration Options**:
  - **Password Requirements**: Must be >10 characters, not include username, and not be compromised.
  - **OTP Use**: Example usage is appending `--otp=123456` to commands that require secondary authentication.
  - **Billing**: Critical fields include credit card number, expiration date (MM/YY), and CVC; defaults typically require manual entry unless "Remember me" is selected.

- **Implementation Steps**:
  1. Create account via the npm website by filling out the form.
  2. Verify the account through email confirmation.
  3. Log in using `npm login` from the command line.
  4. For enhanced security, enable 2FA using `npm profile enable-2fa auth-and-writes` or `npm profile enable-2fa auth-only`.
  5. Use OTP values with commands that require them (e.g., `npm publish --otp=123456`).
  6. For troubleshooting, generate debug logs via `npm install --timing` and check the `.npm` cache directory.


## Reference Details
### Complete API Specifications and Command Signatures

#### npm login

- **Signature:** `npm login`
- **Parameters:**
  - Prompts for: username (string), password (string), email (string).
  - Optional: OTP (string) if 2FA is enabled.
- **Return Type:** Outputs login status to stdout and logs errors to stderr.

#### npm whoami

- **Signature:** `npm whoami`
- **Parameters:** None
- **Return Type:** String (username) printed to stdout.

#### npm profile get

- **Signature:** `npm profile get`
- **Parameters:** None
- **Return Type:** JSON or plain text representation of user profile settings.

#### npm profile set

- **Signature:** `npm profile set <prop> <value>`
- **Parameters:**
  - `<prop>` (string): Name of the property (e.g., email, fullname, password).
  - `<value>` (string): New value for the property.
- **Return Type:** Confirmation message; prompts for current password and OTP if 2FA is enabled.

#### npm profile enable-2fa

- **Signature:** `npm profile enable-2fa <mode>`
- **Parameters:**
  - `<mode>` (string): Must be either `auth-and-writes` or `auth-only`.
- **Return Type:** Success message confirming 2FA activation; returns instructions for scanning QR code or entering OTP.

#### npm profile disable-2fa

- **Signature:** `npm profile disable-2fa`
- **Parameters:** None (prompts for password and current OTP if applicable).
- **Return Type:** Confirmation of 2FA deactivation.

#### Example Code Snippets

```bash
# Login with npm
npm login

# Enable 2FA for both authorization and writes
npm profile enable-2fa auth-and-writes

# Publish a package with OTP parameter
npm publish ./my-package --tag latest --otp=123456

# Update user email
npm profile set email newemail@example.com
```

#### Troubleshooting Commands

```bash
# Generate debug log during installation
npm install --timing

# Get the npm cache directory (where debug log might be located)
npm config get cache

# Clean npm cache if experiencing random errors
npm cache clean
```

### Detailed Instructional Material

- **Best Practices**:
  - Always verify your npm user account after creation by using `npm login` followed by `npm whoami`.
  - Use a strong, unique password and enable 2FA immediately after account creation.
  - When publishing, ensure you append the OTP parameter to avoid authentication errors.

- **Step-by-Step Guide for Enabling 2FA from CLI**:
  1. Log in via `npm login`.
  2. Run `npm profile enable-2fa auth-and-writes` for full protection.
  3. Follow the on-screen instructions to scan the QR code using a TOTP app.
  4. Enter the OTP generated by your authenticator in the CLI prompt.
  5. Test the setup by publishing a test package using `npm publish --otp=123456`.

- **Detailed Troubleshooting Procedure**:
  - If encountering a "cb() never called!" error, first run `npm cache clean` and then retry the command with `--verbose` flag to obtain detailed logs.
  - For permission errors, ensure that the npm directory (e.g., `C:\Users\<user>\AppData\Roaming\npm` on Windows) exists and has proper write permissions.
  - If the npm installation appears broken, reinstall npm via `npm install -g npm@latest` (or reinstall Node.js on Windows using the official installer).


## Original Source
NPM Documentation
https://docs.npmjs.com/

## Digest of NPM_DOCS

# NPM Documentation Digest

**Retrieved:** 2023-10-27

## npm Components

- **Website**: Discover packages, set up profiles, manage organizations.
- **CLI**: Command line interface to interact with npm (e.g., npm login, npm whoami, npm publish).
- **Registry**: Public database of JavaScript packages and metadata.

## Getting Started

### Creating an Account

1. Navigate to the signup page (http://www.npmjs.com/~yourusername).
2. Fill in the user signup form:
   - **Username**: Lowercase, may include hyphens and numerals.
   - **Email address**: Public email, used for metadata and notifications.
   - **Password**: Must be longer than 10 characters, unique (avoid using username or compromised passwords).
3. Agree to the End User License Agreement and Privacy Policy and click "Create An Account".
4. Verify your email using the verification email sent by npm.

### Testing Your Account

- Command: `npm login`
- Enter username, password, and email when prompted. For 2FA, provide the one-time password (OTP).
- Verify login by running: `npm whoami`.

## CLI Commands and Options

### Basic Commands

- **Login**: `npm login`
- **WhoAMI**: `npm whoami`
- **Publish**: `npm publish [<tarball>|<folder>] [--tag <tag>]`
- **Unpublish**: `npm unpublish [<@scope>/]<pkg>[@<version>]`

### Profile and Account Settings

- **View Profile**: `npm profile get`
- **Update Profile**: `npm profile set <prop> <value>`
- **Set Password**: `npm profile set password` (prompts for current and new password)

### Two-Factor Authentication (2FA)

- **Enable 2FA (auth-and-writes)**: `npm profile enable-2fa auth-and-writes`
- **Enable 2FA (auth-only)**: `npm profile enable-2fa auth-only`
- **Disable 2FA**: `npm profile disable-2fa`
- **Using OTP with commands**: Append `--otp=123456` to commands (e.g., `npm publish --otp=123456`)

## Security and Best Practices

- **Password Guidelines**:
  - Password > 10 characters
  - Avoid using parts of the username
  - Use a password manager (e.g., 1Password)
  - Check against breach databases

- **Two-Factor Authentication**:
  - Use security keys (Yubikey, Apple Touch ID, Face ID) or TOTP via Google Authenticator, Authy, etc.
  - Recovery codes must be stored securely; regenerate them if compromised.

## Billing and Account Management

- **Upgrading Account**:
  - Navigate to "Billing Info" from profile menu and click "Upgrade Plan ($7/User)".
  - Enter billing details including email, name, address, and credit card information.
  - Command line and web interfaces available for billing management.

- **Viewing and Downloading Receipts**:
  - From Billing Info page, select "View Billing History".
  - Options to view, download (PDF), or email receipts.

## Troubleshooting

### Generating npm-debug.log

- For installs: `npm install --timing`
- For publishing: `npm publish --timing`
- Logs are located in the `.npm` directory. Use `npm config get cache` to locate the directory.

### Common Errors and Remedies

- **Broken npm installation**: Reinstall npm (Mac/Linux) or reinstall Node.js (Windows).
- **Random Errors**: Run `npm cache clean` and retry.
- **Permissions Errors**: Follow guidelines for resolving EACCES errors when installing packages globally.
- **ENOENT Errors on Windows**: Ensure the folder `C:\Users\<user>\AppData\Roaming\npm` exists and is writable.

## CLI Reference Examples

```bash
# Logging into npm
npm login

# Enabling 2FA for both authorization and writes
npm profile enable-2fa auth-and-writes

# Publishing a package with OTP
npm publish --otp=123456

# Changing user profile property
npm profile set email newemail@example.com
```

---

*Attribution: Data size 155699 bytes, extracted from npm Docs crawl on 2023-10-27*

## Attribution
- Source: NPM Documentation
- URL: https://docs.npmjs.com/
- License: N/A
- Crawl Date: 2025-04-21T03:07:44.892Z
- Data Size: 155699 bytes
- Links Found: 10951

## Retrieved
2025-04-21
