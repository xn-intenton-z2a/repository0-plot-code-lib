#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import express from "express";

const app = express();

app.get("/plot", (req, res) => {
  const accepted = req.accepts(["image/svg+xml", "image/png", "application/json"]);
  res.vary("Accept");
  if (!accepted) {
    return res.status(406).send("Not Acceptable");
  }
  switch (accepted) {
    case "image/svg+xml":
      res
        .type("image/svg+xml")
        .send(
          '<?xml version="1.0" encoding="UTF-8"?>'<+><svg xmlns="http://www.w3.org/2000/svg"></svg>
        );
      break;
    case "image/png": {
      const pngBase64 =
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";
      const img = Buffer.from(pngBase64, "base64");
      res.type("image/png").send(img);
      break;
    }
    case "application/json":
      res.json({ data: [] });
      break;
    default:
      res.status(406).send("Not Acceptable");
  }
});

export function main(args = process.argv.slice(2)) {
  if (args.includes("--serve")) {
    app.listen(3000, () => {
      console.log("Server listening on :3000");
    });
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

export { app };

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}