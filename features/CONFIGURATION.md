# Overview
Load configuration via environment variables using dotenv for default plotting parameters across CLI and HTTP API.

# Environment Variable Loading
- Import and invoke dotenv.config in src/lib/main.js before argument parsing.
- Support custom path via DOTENV_CONFIG_PATH and override control via DOTENV_CONFIG_OVERRIDE.

# Configuration Schema and Defaults
- Define a ConfigSchema using zod with fields:
  - PLOT_COLOR default black
  - PLOT_WIDTH default 800
  - PLOT_HEIGHT default 600
  - PLOT_BG default white
  - PLOT_DPI default 72
- Validate process.env against schema and apply defaults in a central config module.

# CLI Integration
- Extend zod flag definitions in main.js to use config values as defaults for flags color, width, height, bg, dpi.
- Allow CLI flags to override environment defaults while maintaining validation.

# HTTP API Integration
- In the express server startup, import configuration and apply settings to plot generation logic.
- Reflect configured defaults in response content headers when serving plots.

# Testing
- Add tests/tests/unit/config.test.js to verify config loading, default values, and override behavior via environment variables and CLI flags.

# Documentation Updates
- Update README.md to include examples of setting defaults via .env and overriding via CLI flags.
- Enhance docs/USAGE.md with a Configuration section illustrating environment variable usage.