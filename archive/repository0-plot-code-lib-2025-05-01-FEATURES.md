features/PLOT_ENGINE.md
# features/PLOT_ENGINE.md
# OVERVIEW
This update enhances the core Plot Engine functionality by retaining all previous improvements (advanced stroke styling, marker customization, extended gradient configurations, smooth curve generation, and dynamic configuration merging) and adding explicit SVG accessibility enhancements. The new accessibility features ensure that the generated SVGs are compliant with best practices for assistive technology support.

# ACCESSIBILITY ENHANCEMENTS
- A new <title> element is injected as the first child of the SVG. The title element includes a unique identifier (generated using a timestamp or similar approach) and contains descriptive text provided via an optional parameter (e.g., svgTitle).
- Optionally, a <desc> element can be added when a descriptive text parameter (e.g., svgDesc) is provided. This description aids screen readers further.
- The SVG element is updated to include an aria-labelledby attribute that references the IDs of the <title> (and <desc> if available), ensuring that screen readers can correctly announce the purpose and content of the plot.
- These accessibility improvements are integrated without affecting the existing customizations such as dynamic stroke attributes, marker definitions, color gradients, and smoothing capabilities.

# IMPLEMENTATION DETAILS
- Modify the createSvgPlot function to prepend a <title> element with a unique id to the SVG output. Optionally add a <desc> element if a description is provided through CLI or configuration.
- Update the SVG tag to include an aria-labelledby attribute referencing the title (and description) IDs.
- Ensure the new accessibility elements are inserted before other SVG child elements (such as <defs> or shape elements) to adhere to SVG best practices.
- Maintain backward compatibility so that if no accessibility parameters are provided, the SVG remains unchanged except for the inclusion of a default title element.

# IMPACT
- Improves accessibility compliance for users with visual impairments and ensures that the plots are announced correctly by screen readers.
- Aligns the plot output with industry best practices as outlined in SVG accessibility guidelines, contributing to a more inclusive user experience.features/CONFIG_ENGINE.md
# features/CONFIG_ENGINE.md
# OVERVIEW
This feature enhances the configuration management of the library by optimizing environment variable interpolation, configuration file parsing, and merging CLI options with file-based settings using strict validation. The updated configuration engine leverages Zod schemas for precise validation and supports fallback defaults through interpolation syntax, ensuring that users can reliably provide dynamic settings through configuration files (JSON/YAML) and CLI flags.

# IMPLEMENTATION
- Refactor and update the existing loadConfig and interpolateEnv functions in the source file to handle deeply nested configuration objects with environment variable placeholders and fallback defaults.
- Improve error messaging with detailed validation errors from Zod, especially for numeric values required for plot resolution and dimensions. Log and output full error details if a configuration value fails substitution.
- Merge CLI options with configuration file settings. CLI parameters override file options. Use adjustments in the Zod schema to capture not only top-level keys but nested keys (e.g. display dimensions) as well.
- Update documentation and tests to reflect the enhanced configuration handling. Ensure tests cover interpolation, fallback default usage, and error generation for invalid numeric or incorrectly formatted configuration entries without adding new files.

# IMPACT
- Users gain greater control over plot generation configuration, easing deployment in varied environments. 
- Reduced configuration-related runtime errors by enforcing robust validation.
- Streamlined process for dynamically adjusting plot parameters via environment variables, configuration files, or CLI overrides, directly supporting the mission to be the go-to plot library.
- Enhanced developer feedback reduces troubleshooting time, boosting overall library reliability.