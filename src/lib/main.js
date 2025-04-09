// File: src/lib/main.js

export function resolveNaNAliases() {
  const strict = process.env.STRICT_NAN_MODE === "true";
  if (strict) {
    return ["nan"];
  }

  if (process.env.LOCALE_NAN_OVERRIDE) {
    // Override defaults completely
    return process.env.LOCALE_NAN_OVERRIDE.split(",")
      .map(alias => alias.trim())
      .filter(alias => alias.length > 0);
  }

  const defaultAliases = ["nan", "notanumber", "undefined"];

  if (process.env.LOCALE_NAN_ALIASES) {
    const customAliases = process.env.LOCALE_NAN_ALIASES.split(",")
      .map(alias => alias.trim().toLowerCase())
      .filter(alias => alias.length > 0);
    // Merge custom aliases with defaults, deduplicating
    const merged = new Set([...defaultAliases, ...customAliases]);
    return Array.from(merged);
  }

  return defaultAliases;
}

export function main(args) {
  // Resolve and log NaN aliases for diagnostic purposes
  const naNAliases = resolveNaNAliases();
  console.log("NaN Aliases:", naNAliases);

  if (args.includes("--help") || args.length === 0) {
    console.log("Usage: node src/lib/main.js [outputFile] [plotSpec]");
    console.log("   or: node src/lib/main.js --interactive");
    console.log("   or: node src/lib/main.js --serve");
    return;
  }

  if (args.includes("--interactive")) {
    console.log("Interactive mode activated. Please enter your formula:");
    // Stub for interactive prompt functionality.
    return;
  }

  if (args.includes("--serve")) {
    console.log("Starting web interface...");
    (async () => {
      const { default: express } = await import("express");
      const app = express();
      app.get("/", (req, res) => {
        res.send("Welcome to repository0-plot-code-lib Plotting Web Interface");
      });
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`Web interface running on http://localhost:${port}`);
      });
    })();
    return;
  }

  if (args.length >= 2) {
    const outputFile = args[0];
    const plotSpec = args[1];
    console.log(`Generating plot as ${outputFile} with spec ${plotSpec}`);
    // Insert actual plotting logic here if needed.
    return;
  }

  console.error("Invalid arguments. Use --help for usage information.");
}
