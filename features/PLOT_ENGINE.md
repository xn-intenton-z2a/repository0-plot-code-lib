# Overview
Enhance the existing plot engine feature to support rich chart customization options including chart title, axis labels, grid toggling, and axis scaling modes. These additions apply to both the CLI `plot` subcommand and the HTTP `/plot` endpoint, allowing users to tailor the appearance and scale of generated plots.

# CLI Customization Flags
Introduce the following new flags to `runPlotCli`:

- --title <text>               Add a chart title displayed at the top.
- --x-label <text>             Label for the horizontal (x) axis.
- --y-label <text>             Label for the vertical (y) axis.
- --grid <true|false>          Show or hide grid lines (default: true).
- --x-log <true|false>         Use logarithmic scale on x axis (default: false).
- --y-log <true|false>         Use logarithmic scale on y axis (default: false).

Behavior:
1. Parse new flags alongside existing plot parameters.
2. Convert boolean flags (`grid`, `x-log`, `y-log`) to true/false.
3. Integrate into the QuickChart `chartConfig.options` object:
   - Set `options.plugins.title.text` to title string when provided.
   - Set `options.scales.x.title.text` and `options.scales.y.title.text` for axis labels.
   - Set `options.scales.x.grid.display` and `options.scales.y.grid.display` according to `grid` flag.
   - Set `options.scales.x.type` to `logarithmic` when `x-log` is true, otherwise `linear`.
   - Set `options.scales.y.type` similarly based on `y-log`.
4. Send updated `chartConfig` to QuickChart as before.

# HTTP `/plot` Query Parameters
Extend the HTTP endpoint to accept equivalent query parameters:

- title            Chart title.
- xLabel           Horizontal axis label.
- yLabel           Vertical axis label.
- grid             "true" or "false" for grid lines.
- xLog             "true" or "false" for logarithmic x axis.
- yLog             "true" or "false" for logarithmic y axis.

Ensure parameters are validated via Zod schema and merged into `chartConfig.options` as described for CLI.

# Testing
Add tests to `tests/unit/plot-generation.test.js`:

## CLI Unit Tests
- Verify that `--title`, `--x-label`, `--y-label`, `--grid=false`, `--x-log=true`, `--y-log=true` produce a chartConfig containing:
  - plugins.title.text set to the title.
  - scales.x.title.text and scales.y.title.text matching labels.
  - scales.x.grid.display and scales.y.grid.display false when grid=false.
  - scales.x.type and scales.y.type set to `logarithmic` when flags are true.
- Mock `fetch` to intercept request body and assert `chartConfig.options` correct.

## HTTP Integration Tests
- GET `/plot` with query parameters title and labels returns 200 and correct content type.
- Mock QuickChart upstream via `vi.spyOn(fetch)` to return fixed SVG, then assert grid and axis settings appear in request body options.

# Documentation Updates
Update USAGE.md and README.md:

- Under `plot` flags section, document new flags with descriptions and defaults.
- Add CLI example:
  `repository0-plot-code-lib plot --expression "y=x" --range "x=0:10" --format svg --title "Linear Trend" --x-label "Time" --y-label "Value" --grid false --x-log true`
- Add HTTP example:
  `curl "http://localhost:3000/plot?expression=y%3Dx&range=x%3D0:10&format=svg&title=MyPlot&xLabel=Time&yLabel=Value&grid=false&xLog=true&yLog=false"`
- Illustrate how these options map to chart appearance.