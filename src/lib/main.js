// File: src/lib/main.js

// Helper function to normalize an alias by trimming and converting to lower case
function normalizeAlias(alias) {
  return alias.trim().toLowerCase();
}

export function resolveNaNAliases() {
  const strict = process.env.STRICT_NAN_MODE === "true";
  if (strict) {
    // In strict mode, only the canonical alias 'nan' is accepted
    return ["nan"];
  }

  if (process.env.LOCALE_NAN_OVERRIDE) {
    // If LOCALE_NAN_OVERRIDE is set, override defaults completely
    // and return normalized aliases using both comma and semicolon as delimiters
    return process.env.LOCALE_NAN_OVERRIDE.split(/[;,]/)
      .map(normalizeAlias)
      .filter(alias => alias.length > 0);
  }

  // Define default aliases and normalize them
  const defaultAliases = ["nan", "notanumber", "undefined"].map(normalizeAlias);

  if (process.env.LOCALE_NAN_ALIASES) {
    // Merge custom aliases with defaults, ensuring deduplication
    const customAliases = process.env.LOCALE_NAN_ALIASES.split(/[;,]/)
      .map(normalizeAlias)
      .filter(alias => alias.length > 0);
    return Array.from(new Set([...defaultAliases, ...customAliases]));
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
