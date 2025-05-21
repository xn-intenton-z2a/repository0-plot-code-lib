# Mission Statement

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

**plot-code-lib** is a JavaScript library and CLI tool designed to:
- Transform and given range and a simple expression syntax for (pick an existing open standard) to time series data.
- Read and write the time series data in a standard format (pick an existing open standard).
- Make use of libraries for formula parsing, time series generation, plotting, and persistence in image formats.
- Generate SVG and PNG plots from the time series data and save these as files.
- Variations on this example: `node run start -- --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1" --file output.svg` .
- Showcase all the features of the library via a CLI by dry running tp generate example commands and output in the README.md file.

`plot-code-lib` facilitate the creation of plots from mathematical expressions and time series data. It will take a
mathematical expression and a range of values and generate a plot in SVG or PNG format.
## Maintain Feature at 2025-05-21T23:54:44.475Z

Maintained feature TIME_SERIES_GENERATION.

Feature spec:

# Overview

Implement core functionality to parse a mathematical expression and generate time series data over a specified range of input values, in a standard JSON format.

# CLI Interface

The command-line tool will support the following options:

- --expression, -e  : A required argument specifying a mathematical formula in a familiar open syntax (for example, supported by mathjs).
- --range, -r       : A required argument specifying the input range in the form x=start:end[:steps], where steps is optional (default 100).
- --output-format   : An optional argument to specify output format; currently only 'json' is supported (default).
- --file, -f        : An optional argument specifying the path to write the output; defaults to stdout.

# Implementation Details

- Add mathjs as a runtime dependency to parse expressions into an evaluable function.
- Parse the --range option into start, end, and optional step count.
- Generate an array of points by evaluating the parsed function at uniform intervals.
- Structure output as a JSON array of objects, each with x and y numeric properties.
- Wire this logic into src/lib/main.js, replacing the placeholder console output when invoked from the CLI.

# Testing

- Create unit tests in tests/unit/plot-generation.test.js to verify:
  - Correct parsing of range strings and default step count behavior.
  - Accurate computation of y values for standard expressions like y = sin(x).
  - Proper JSON output structure.

# Documentation

- Update README.md and USAGE.md to include examples of:
  - Generating a simple sine wave series: repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.283" --file output.json
  - Custom step counts and output redirection.



Git diff:

```diff
diff --git a/package-lock.json b/package-lock.json
index 6bbd692f..b1386a71 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -12,33 +12,32 @@
         "dotenv": "^16.5.0",
         "ejs": "^3.1.10",
         "js-yaml": "^4.1.0",
-        "mathjs": "^11.8.0",
         "minimatch": "^10.0.1",
         "openai": "^4.95.1",
-        "zod": "^3.24.4"
+        "zod": "^3.24.3"
       },
       "bin": {
         "repository0-plot-code-lib": "src/lib/main.js"
       },
       "devDependencies": {
         "@microsoft/eslint-formatter-sarif": "^3.1.0",
-        "@vitest/coverage-v8": "^3.1.4",
+        "@vitest/coverage-v8": "^3.1.2",
         "eslint": "^9.25.1",
         "eslint-config-google": "^0.14.0",
-        "eslint-config-prettier": "^10.1.5",
+        "eslint-config-prettier": "^10.1.2",
         "eslint-plugin-import": "^2.31.0",
         "eslint-plugin-prettier": "^5.2.6",
         "eslint-plugin-promise": "^7.2.1",
         "eslint-plugin-react": "^7.37.5",
         "eslint-plugin-security": "^3.0.1",
         "eslint-plugin-sonarjs": "^3.0.2",
-        "express": "^5.1.0",
+        "express": "^4.21.2",
         "js-yaml": "^4.1.0",
         "markdown-it": "^14.1.0",
         "markdown-it-github": "^0.5.0",
-        "npm-check-updates": "^18.0.1",
+        "npm-check-updates": "^17.1.18",
         "prettier": "^3.5.3",
-        "vitest": "^3.1.4"
+        "vitest": "^3.1.2"
       },
       "engines": {
         "node": ">=20.0.0"
@@ -94,15 +93,6 @@
         "node": ">=6.0.0"
       }
     },
-    "node_modules/@babel/runtime": {
-      "version": "7.27.1",
-      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.27.1.tgz",
-      "integrity": "sha512-1x3D2xEk2fRo3PAhwQwu5UubzgiVWSXTBfWpVd2Mx2AzRqJuDJCsgaDVZ7HB5iGzDW1Hl1sWN2mFyKjmR9uAog==",
-      "license": "MIT",
-      "engines": {
-        "node": ">=6.9.0"
-      }
-    },
     "node_modules/@babel/types": {
       "version": "7.27.1",
       "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.27.1.tgz",
@@ -1750,37 +1740,14 @@
       }
     },
     "node_modules/accepts": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/accepts/-/accepts-2.0.0.tgz",
-      "integrity": "sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/6ao+6Y7gu/RCwRuAhGEzh5B4KlszSuTLgZYuqFqo5bImjNKng==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "mime-types": "^3.0.0",
-        "negotiator": "^1.0.0"
-      },
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/accepts/node_modules/mime-db": {
-      "version": "1.54.0",
-      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
-      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/accepts/node_modules/mime-types": {
-      "version": "3.0.1",
-      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.1.tgz",
-      "integrity": "sha512-xRc4oEhT6eaBpU1XF7AjpOFD+xQmXNB5OVKwp4tqCuBpHLS/ZbBDrc07mYTDqVMg6PfxUjjNp85O6Cd2Z/5HWA==",
+      "version": "1.3.8",
+      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
+      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "mime-db": "^1.54.0"
+        "mime-types": "~2.1.34",
+        "negotiator": "0.6.3"
       },
       "engines": {
         "node": ">= 0.6"
@@ -1890,6 +1857,13 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/array-flatten": {
+      "version": "1.1.1",
+      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
+      "integrity": "sha512-PCVAQswWemu6UdxsDFFX/+gVeYqKAod3D3UVm91jHwynguOwAvYPhx8nNlM++NqRcK6CxxpUafjmhIdKiHibqg==",
+      "dev": true,
+      "license": "MIT"
+    },
     "node_modules/array-includes": {
       "version": "3.1.8",
       "resolved": "https://registry.npmjs.org/array-includes/-/array-includes-3.1.8.tgz",
@@ -2086,26 +2060,47 @@
       "license": "MIT"
     },
     "node_modules/body-parser": {
-      "version": "2.2.0",
-      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-2.2.0.tgz",
-      "integrity": "sha512-02qvAaxv8tp7fBa/mw1ga98OGm+eCbqzJOKoRt70sLmfEEi+jyBYVTDGfCL/k06/4EMk/z01gCe7HoCH/f2LTg==",
+      "version": "1.20.3",
+      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.3.tgz",
+      "integrity": "sha512-7rAxByjUMqQ3/bHJy7D6OGXvx/MMc4IqBn/X0fcM1QUcAItpZrBEYhWGem+tzXH90c+G01ypMcYJBO9Y30203g==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "bytes": "^3.1.2",
-        "content-type": "^1.0.5",
-        "debug": "^4.4.0",
-        "http-errors": "^2.0.0",
-        "iconv-lite": "^0.6.3",
-        "on-finished": "^2.4.1",
-        "qs": "^6.14.0",
-        "raw-body": "^3.0.0",
-        "type-is": "^2.0.0"
+        "bytes": "3.1.2",
+        "content-type": "~1.0.5",
+        "debug": "2.6.9",
+        "depd": "2.0.0",
+        "destroy": "1.2.0",
+        "http-errors": "2.0.0",
+        "iconv-lite": "0.4.24",
+        "on-finished": "2.4.1",
+        "qs": "6.13.0",
+        "raw-body": "2.5.2",
+        "type-is": "~1.6.18",
+        "unpipe": "1.0.0"
       },
       "engines": {
-        "node": ">=18"
+        "node": ">= 0.8",
+        "npm": "1.2.8000 || >= 1.4.16"
+      }
+    },
+    "node_modules/body-parser/node_modules/debug": {
+      "version": "2.6.9",
+      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
+      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "ms": "2.0.0"
       }
     },
+    "node_modules/body-parser/node_modules/ms": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
+      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
+      "dev": true,
+      "license": "MIT"
+    },
     "node_modules/brace-expansion": {
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.1.tgz",
@@ -2280,19 +2275,6 @@
         "node": ">= 0.8"
       }
     },
-    "node_modules/complex.js": {
-      "version": "2.4.2",
-      "resolved": "https://registry.npmjs.org/complex.js/-/complex.js-2.4.2.tgz",
-      "integrity": "sha512-qtx7HRhPGSCBtGiST4/WGHuW+zeaND/6Ld+db6PbrulIB1i2Ev/2UPiqcmpQNPSyfBKraC0EOvOKCB5dGZKt3g==",
-      "license": "MIT",
-      "engines": {
-        "node": "*"
-      },
-      "funding": {
-        "type": "github",
-        "url": "https://github.com/sponsors/rawify"
-      }
-    },
     "node_modules/concat-map": {
       "version": "0.0.1",
       "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
@@ -2300,9 +2282,9 @@
       "license": "MIT"
     },
     "node_modules/content-disposition": {
-      "version": "1.0.0",
-      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-1.0.0.tgz",
-      "integrity": "sha512-Au9nRL8VNUut/XSzbQA38+M78dzP4D+eqg3gfJHMIHHYa3bg067xj1KxMUWj+VULbiZMowKngFFbKczUrNJ1mg==",
+      "version": "0.5.4",
+      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
+      "integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
@@ -2333,14 +2315,11 @@
       }
     },
     "node_modules/cookie-signature": {
-      "version": "1.2.2",
-      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.2.2.tgz",
-      "integrity": "sha512-D76uU73ulSXrD1UXF4KE2TMxVVwhsnCgfAyTg9k8P6KGZjlXKrOLe4dJQKI3Bxi5wjesZoFXJWElNWBjPZMbhg==",
+      "version": "1.0.6",
+      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.6.tgz",
+      "integrity": "sha512-QADzlaHc8icV8I7vbaJXJwod9HWYp8uCqf1xa4OfNu1T7JVxQIrUgOWtHdNDtPiywmFbiS12VjotIXLrKM3orQ==",
       "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">=6.6.0"
-      }
+      "license": "MIT"
     },
     "node_modules/cross-spawn": {
       "version": "7.0.6",
@@ -2429,12 +2408,6 @@
         }
       }
     },
-    "node_modules/decimal.js": {
-      "version": "10.5.0",
-      "resolved": "https://registry.npmjs.org/decimal.js/-/decimal.js-10.5.0.tgz",
-      "integrity": "sha512-8vDa8Qxvr/+d94hSh5P3IJwI5t8/c0KsMp+g8bNw9cY2icONa5aPfvKeieW1WlG0WQYwwhJ7mjui2xtiePQSXw==",
-      "license": "MIT"
-    },
     "node_modules/deep-eql": {
       "version": "5.0.2",
       "resolved": "https://registry.npmjs.org/deep-eql/-/deep-eql-5.0.2.tgz",
@@ -2507,6 +2480,17 @@
         "node": ">= 0.8"
       }
     },
+    "node_modules/destroy": {
+      "version": "1.2.0",
+      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.2.0.tgz",
+      "integrity": "sha512-2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">= 0.8",
+        "npm": "1.2.8000 || >= 1.4.16"
+      }
+    },
     "node_modules/doctrine": {
       "version": "2.1.0",
       "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
@@ -2830,12 +2814,6 @@
       "dev": true,
       "license": "MIT"
     },
-    "node_modules/escape-latex": {
-      "version": "1.2.0",
-      "resolved": "https://registry.npmjs.org/escape-latex/-/escape-latex-1.2.0.tgz",
-      "integrity": "sha512-nV5aVWW1K0wEiUIEdZ4erkGGH8mDxGyxSeqPzRNtWP7ataw+/olFObw7hujFWlVjNsaDFw5VZ5NzVSIqRgfTiw==",
-      "license": "MIT"
-    },
     "node_modules/escape-string-regexp": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
@@ -3406,70 +3384,68 @@
       }
     },
     "node_modules/express": {
-      "version": "5.1.0",
-      "resolved": "https://registry.npmjs.org/express/-/express-5.1.0.tgz",
-      "integrity": "sha512-DT9ck5YIRU+8GYzzU5kT3eHGA5iL+1Zd0EutOmTE9Dtk+Tvuzd23VBU+ec7HPNSTxXYO55gPV/hq4pSBJDjFpA==",
+      "version": "4.21.2",
+      "resolved": "https://registry.npmjs.org/express/-/express-4.21.2.tgz",
+      "integrity": "sha512-28HqgMZAmih1Czt9ny7qr6ek2qddF4FclbMzwhCREB6OFfH+rXAnuNCwo1/wFvrtbgsQDb4kSbX9de9lFbrXnA==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "accepts": "^2.0.0",
-        "body-parser": "^2.2.0",
-        "content-disposition": "^1.0.0",
-        "content-type": "^1.0.5",
-        "cookie": "^0.7.1",
-        "cookie-signature": "^1.2.1",
-        "debug": "^4.4.0",
-        "encodeurl": "^2.0.0",
-        "escape-html": "^1.0.3",
-        "etag": "^1.8.1",
-        "finalhandler": "^2.1.0",
-        "fresh": "^2.0.0",
-        "http-errors": "^2.0.0",
-        "merge-descriptors": "^2.0.0",
-        "mime-types": "^3.0.0",
-        "on-finished": "^2.4.1",
-        "once": "^1.4.0",
-        "parseurl": "^1.3.3",
-        "proxy-addr": "^2.0.7",
-        "qs": "^6.14.0",
-        "range-parser": "^1.2.1",
-        "router": "^2.2.0",
-        "send": "^1.1.0",
-        "serve-static": "^2.2.0",
-        "statuses": "^2.0.1",
-        "type-is": "^2.0.1",
-        "vary": "^1.1.2"
-      },
-      "engines": {
-        "node": ">= 18"
+        "accepts": "~1.3.8",
+        "array-flatten": "1.1.1",
+        "body-parser": "1.20.3",
+        "content-disposition": "0.5.4",
+        "content-type": "~1.0.4",
+        "cookie": "0.7.1",
+        "cookie-signature": "1.0.6",
+        "debug": "2.6.9",
+        "depd": "2.0.0",
+        "encodeurl": "~2.0.0",
+        "escape-html": "~1.0.3",
+        "etag": "~1.8.1",
+        "finalhandler": "1.3.1",
+        "fresh": "0.5.2",
+        "http-errors": "2.0.0",
+        "merge-descriptors": "1.0.3",
+        "methods": "~1.1.2",
+        "on-finished": "2.4.1",
+        "parseurl": "~1.3.3",
+        "path-to-regexp": "0.1.12",
+        "proxy-addr": "~2.0.7",
+        "qs": "6.13.0",
+        "range-parser": "~1.2.1",
+        "safe-buffer": "5.2.1",
+        "send": "0.19.0",
+        "serve-static": "1.16.2",
+        "setprototypeof": "1.2.0",
+        "statuses": "2.0.1",
+        "type-is": "~1.6.18",
+        "utils-merge": "1.0.1",
+        "vary": "~1.1.2"
+      },
+      "engines": {
+        "node": ">= 0.10.0"
       },
       "funding": {
         "type": "opencollective",
         "url": "https://opencollective.com/express"
       }
     },
-    "node_modules/express/node_modules/mime-db": {
-      "version": "1.54.0",
-      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
-      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
+    "node_modules/express/node_modules/debug": {
+      "version": "2.6.9",
+      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
+      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
       "dev": true,
       "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
+      "dependencies": {
+        "ms": "2.0.0"
       }
     },
-    "node_modules/express/node_modules/mime-types": {
-      "version": "3.0.1",
-      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.1.tgz",
-      "integrity": "sha512-xRc4oEhT6eaBpU1XF7AjpOFD+xQmXNB5OVKwp4tqCuBpHLS/ZbBDrc07mYTDqVMg6PfxUjjNp85O6Cd2Z/5HWA==",
+    "node_modules/express/node_modules/ms": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
+      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
       "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "mime-db": "^1.54.0"
-      },
-      "engines": {
-        "node": ">= 0.6"
-      }
+      "license": "MIT"
     },
     "node_modules/fast-deep-equal": {
       "version": "3.1.3",
@@ -3559,23 +3535,41 @@
       }
     },
     "node_modules/finalhandler": {
-      "version": "2.1.0",
-      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-2.1.0.tgz",
-      "integrity": "sha512-/t88Ty3d5JWQbWYgaOGCCYfXRwV1+be02WqYYlL6h0lEiUAMPM8o8qKGO01YIkOHzka2up08wvgYD0mDiI+q3Q==",
+      "version": "1.3.1",
+      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.3.1.tgz",
+      "integrity": "sha512-6BN9trH7bp3qvnrRyzsBz+g3lZxTNZTbVO2EV1CS0WIcDbawYVdYvGflME/9QP0h0pYlCDBCTjYa9nZzMDpyxQ==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "debug": "^4.4.0",
-        "encodeurl": "^2.0.0",
-        "escape-html": "^1.0.3",
-        "on-finished": "^2.4.1",
-        "parseurl": "^1.3.3",
-        "statuses": "^2.0.1"
+        "debug": "2.6.9",
+        "encodeurl": "~2.0.0",
+        "escape-html": "~1.0.3",
+        "on-finished": "2.4.1",
+        "parseurl": "~1.3.3",
+        "statuses": "2.0.1",
+        "unpipe": "~1.0.0"
       },
       "engines": {
         "node": ">= 0.8"
       }
     },
+    "node_modules/finalhandler/node_modules/debug": {
+      "version": "2.6.9",
+      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
+      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "ms": "2.0.0"
+      }
+    },
+    "node_modules/finalhandler/node_modules/ms": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
+      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
+      "dev": true,
+      "license": "MIT"
+    },
     "node_modules/find-up": {
       "version": "5.0.0",
       "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
@@ -3691,27 +3685,14 @@
         "node": ">= 0.6"
       }
     },
-    "node_modules/fraction.js": {
-      "version": "4.3.4",
-      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.4.tgz",
-      "integrity": "sha512-pwiTgt0Q7t+GHZA4yaLjObx4vXmmdcS0iSJ19o8d/goUGgItX9UZWKWNnLHehxviD8wU2IWRsnR8cD5+yOJP2Q==",
-      "license": "MIT",
-      "engines": {
-        "node": "*"
-      },
-      "funding": {
-        "type": "patreon",
-        "url": "https://github.com/sponsors/rawify"
-      }
-    },
     "node_modules/fresh": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/fresh/-/fresh-2.0.0.tgz",
-      "integrity": "sha512-Rx/WycZ60HOaqLKAi6cHRKKI7zxWbJ31MhntmtwMoaTeF7XFH9hhBp8vITaMidfljRQ6eYWCKkaTK+ykVJHP2A==",
+      "version": "0.5.2",
+      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
+      "integrity": "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==",
       "dev": true,
       "license": "MIT",
       "engines": {
-        "node": ">= 0.8"
+        "node": ">= 0.6"
       }
     },
     "node_modules/fs.realpath": {
@@ -4068,13 +4049,13 @@
       }
     },
     "node_modules/iconv-lite": {
-      "version": "0.6.3",
-      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
-      "integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
+      "version": "0.4.24",
+      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
+      "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "safer-buffer": ">= 2.1.2 < 3.0.0"
+        "safer-buffer": ">= 2.1.2 < 3"
       },
       "engines": {
         "node": ">=0.10.0"
@@ -4404,13 +4385,6 @@
         "node": ">=8"
       }
     },
-    "node_modules/is-promise": {
-      "version": "4.0.0",
-      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-4.0.0.tgz",
-      "integrity": "sha512-hvpoI6korhJMnej285dSg6nu1+e6uxs7zG3BYAm5byqDsgJNWwxzM6z6iZiAgQR4TJ30JmBTOwqZUw3WlyH3AQ==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/is-regex": {
       "version": "1.2.1",
       "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.2.1.tgz",
@@ -4698,12 +4672,6 @@
         "node": "*"
       }
     },
-    "node_modules/javascript-natural-sort": {
-      "version": "0.7.1",
-      "resolved": "https://registry.npmjs.org/javascript-natural-sort/-/javascript-natural-sort-0.7.1.tgz",
-      "integrity": "sha512-nO6jcEfZWQXDhOiBtG2KvKyEptz7RVbpGP4vTD2hLBdmNQSsCiicO2Ioinv6UI4y9ukqnBpy+XZ9H6uLNgJTlw==",
-      "license": "MIT"
-    },
     "node_modules/js-tokens": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
@@ -4971,29 +4939,6 @@
         "node": ">= 0.4"
       }
     },
-    "node_modules/mathjs": {
-      "version": "11.12.0",
-      "resolved": "https://registry.npmjs.org/mathjs/-/mathjs-11.12.0.tgz",
-      "integrity": "sha512-UGhVw8rS1AyedyI55DGz9q1qZ0p98kyKPyc9vherBkoueLntPfKtPBh14x+V4cdUWK0NZV2TBwqRFlvadscSuw==",
-      "license": "Apache-2.0",
-      "dependencies": {
-        "@babel/runtime": "^7.23.2",
-        "complex.js": "^2.1.1",
-        "decimal.js": "^10.4.3",
-        "escape-latex": "^1.2.0",
-        "fraction.js": "4.3.4",
-        "javascript-natural-sort": "^0.7.1",
-        "seedrandom": "^3.0.5",
-        "tiny-emitter": "^2.1.0",
-        "typed-function": "^4.1.1"
-      },
-      "bin": {
-        "mathjs": "bin/cli.js"
-      },
-      "engines": {
-        "node": ">= 14"
-      }
-    },
     "node_modules/mdurl": {
       "version": "2.0.0",
       "resolved": "https://registry.npmjs.org/mdurl/-/mdurl-2.0.0.tgz",
@@ -5002,28 +4947,48 @@
       "license": "MIT"
     },
     "node_modules/media-typer": {
-      "version": "1.1.0",
-      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-1.1.0.tgz",
-      "integrity": "sha512-aisnrDP4GNe06UcKFnV5bfMNPBUw4jsLGaWwWfnH3v02GnBuXX2MCVn5RbrWo0j3pczUilYblq7fQ7Nw2t5XKw==",
+      "version": "0.3.0",
+      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
+      "integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
       "dev": true,
       "license": "MIT",
       "engines": {
-        "node": ">= 0.8"
+        "node": ">= 0.6"
       }
     },
     "node_modules/merge-descriptors": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-2.0.0.tgz",
-      "integrity": "sha512-Snk314V5ayFLhp3fkUREub6WtjBfPdCPY1Ln8/8munuLuiYhsABgBVWsozAG+MWMbVEvcdcpbi9R7ww22l9Q3g==",
+      "version": "1.0.3",
+      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.3.tgz",
+      "integrity": "sha512-gaNvAS7TZ897/rVaZ0nMtAyxNyi/pdbjbAwUpFQpN70GqnVfOiXpeUUMKRBmzXaSQ8DdTX4/0ms62r2K+hE6mQ==",
       "dev": true,
       "license": "MIT",
-      "engines": {
-        "node": ">=18"
-      },
       "funding": {
         "url": "https://github.com/sponsors/sindresorhus"
       }
     },
+    "node_modules/methods": {
+      "version": "1.1.2",
+      "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
+      "integrity": "sha512-iclAHeNqNm68zFtnZ0e+1L2yUIdvzNoauKU4WBA3VvH/vPFieF7qfRlwUZU+DA9P9bPXIS90ulxoUoCH23sV2w==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">= 0.6"
+      }
+    },
+    "node_modules/mime": {
+      "version": "1.6.0",
+      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
+      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==",
+      "dev": true,
+      "license": "MIT",
+      "bin": {
+        "mime": "cli.js"
+      },
+      "engines": {
+        "node": ">=4"
+      }
+    },
     "node_modules/mime-db": {
       "version": "1.52.0",
       "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
@@ -5113,9 +5078,9 @@
       "license": "MIT"
     },
     "node_modules/negotiator": {
-      "version": "1.0.0",
-      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-1.0.0.tgz",
-      "integrity": "sha512-8Ofs/AUQh8MaEcrlq5xOX0CQ9ypTF5dl78mjlMNfOK08fzpgTHQRQPBxcPlEtIw0yRpws+Zo/3r+5WRby7u3Gg==",
+      "version": "0.6.3",
+      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
+      "integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
       "dev": true,
       "license": "MIT",
       "engines": {
@@ -5163,9 +5128,9 @@
       }
     },
     "node_modules/npm-check-updates": {
-      "version": "18.0.1",
-      "resolved": "https://registry.npmjs.org/npm-check-updates/-/npm-check-updates-18.0.1.tgz",
-      "integrity": "sha512-MO7mLp/8nm6kZNLLyPgz4gHmr9tLoU+pWPLdXuGAx+oZydBHkHWN0ibTonsrfwC2WEQNIQxuZagYwB67JQpAuw==",
+      "version": "17.1.18",
+      "resolved": "https://registry.npmjs.org/npm-check-updates/-/npm-check-updates-17.1.18.tgz",
+      "integrity": "sha512-bkUy2g4v1i+3FeUf5fXMLbxmV95eG4/sS7lYE32GrUeVgQRfQEk39gpskksFunyaxQgTIdrvYbnuNbO/pSUSqw==",
       "dev": true,
       "license": "Apache-2.0",
       "bin": {
@@ -5506,14 +5471,11 @@
       }
     },
     "node_modules/path-to-regexp": {
-      "version": "8.2.0",
-      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-8.2.0.tgz",
-      "integrity": "sha512-TdrF7fW9Rphjq4RjrW0Kp2AW0Ahwu9sRGTkS6bvDi0SCwZlEZYmcfDbEsTz8RVk0EHIS/Vd1bv3JhG+1xZuAyQ==",
+      "version": "0.1.12",
+      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.12.tgz",
+      "integrity": "sha512-RA1GjUVMnvYFxuqovrEqZoxxW5NUZqbwKtYz/Tt7nXerk0LbLblQmrsgdeOxV5SFHf0UDggjS/bSeOZwt1pmEQ==",
       "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">=16"
-      }
+      "license": "MIT"
     },
     "node_modules/pathe": {
       "version": "2.0.3",
@@ -5677,13 +5639,13 @@
       }
     },
     "node_modules/qs": {
-      "version": "6.14.0",
-      "resolved": "https://registry.npmjs.org/qs/-/qs-6.14.0.tgz",
-      "integrity": "sha512-YWWTjgABSKcvs/nWBi9PycY/JiPJqOD4JA6o9Sej2AtvSGarXxKC3OQSk4pAarbdQlKAh5D4FCQkJNkW+GAn3w==",
+      "version": "6.13.0",
+      "resolved": "https://registry.npmjs.org/qs/-/qs-6.13.0.tgz",
+      "integrity": "sha512-+38qI9SOr8tfZ4QmJNplMUxqjbe7LKvvZgWdExBOmd+egZTtjLB67Gu0HRX3u/XOq7UU2Nx6nsjvS16Z9uwfpg==",
       "dev": true,
       "license": "BSD-3-Clause",
       "dependencies": {
-        "side-channel": "^1.1.0"
+        "side-channel": "^1.0.6"
       },
       "engines": {
         "node": ">=0.6"
@@ -5724,15 +5686,15 @@
       }
     },
     "node_modules/raw-body": {
-      "version": "3.0.0",
-      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-3.0.0.tgz",
-      "integrity": "sha512-RmkhL8CAyCRPXCE28MMH0z2PNWQBNk2Q09ZdxM9IOOXwxwZbN+qbWaatPkdkWIKL2ZVDImrN/pK5HTRz2PcS4g==",
+      "version": "2.5.2",
+      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.5.2.tgz",
+      "integrity": "sha512-8zGqypfENjCIqGhgXToC8aB2r7YrBX+AQAfIPs/Mlk+BtPTztOvTS01NRW/3Eh60J+a48lt8qsCzirQ6loCVfA==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
         "bytes": "3.1.2",
         "http-errors": "2.0.0",
-        "iconv-lite": "0.6.3",
+        "iconv-lite": "0.4.24",
         "unpipe": "1.0.0"
       },
       "engines": {
@@ -5972,23 +5934,6 @@
         "fsevents": "~2.3.2"
       }
     },
-    "node_modules/router": {
-      "version": "2.2.0",
-      "resolved": "https://registry.npmjs.org/router/-/router-2.2.0.tgz",
-      "integrity": "sha512-nLTrUKm2UyiL7rlhapu/Zl45FwNgkZGaCpZbIHajDYgwlJCOzLSk+cIPAnsEqV955GjILJnKbdQC1nVPz+gAYQ==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "debug": "^4.4.0",
-        "depd": "^2.0.0",
-        "is-promise": "^4.0.0",
-        "parseurl": "^1.3.3",
-        "path-to-regexp": "^8.0.0"
-      },
-      "engines": {
-        "node": ">= 18"
-      }
-    },
     "node_modules/run-parallel": {
       "version": "1.2.0",
       "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
@@ -6121,12 +6066,6 @@
         "node": "^14.0.0 || >=16.0.0"
       }
     },
-    "node_modules/seedrandom": {
-      "version": "3.0.5",
-      "resolved": "https://registry.npmjs.org/seedrandom/-/seedrandom-3.0.5.tgz",
-      "integrity": "sha512-8OwmbklUNzwezjGInmZ+2clQmExQPvomqjL7LFqOYqtmuxRgQYqOD3mHaU+MvZn5FLUeVxVfQjwLZW/n/JFuqg==",
-      "license": "MIT"
-    },
     "node_modules/semver": {
       "version": "6.3.1",
       "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
@@ -6138,65 +6077,71 @@
       }
     },
     "node_modules/send": {
-      "version": "1.2.0",
-      "resolved": "https://registry.npmjs.org/send/-/send-1.2.0.tgz",
-      "integrity": "sha512-uaW0WwXKpL9blXE2o0bRhoL2EGXIrZxQ2ZQ4mgcfoBxdFmQold+qWsD2jLrfZ0trjKL6vOw0j//eAwcALFjKSw==",
+      "version": "0.19.0",
+      "resolved": "https://registry.npmjs.org/send/-/send-0.19.0.tgz",
+      "integrity": "sha512-dW41u5VfLXu8SJh5bwRmyYUbAoSB3c9uQh6L8h/KtsFREPWpbX1lrljJo186Jc4nmci/sGUZ9a0a0J2zgfq2hw==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "debug": "^4.3.5",
-        "encodeurl": "^2.0.0",
-        "escape-html": "^1.0.3",
-        "etag": "^1.8.1",
-        "fresh": "^2.0.0",
-        "http-errors": "^2.0.0",
-        "mime-types": "^3.0.1",
-        "ms": "^2.1.3",
-        "on-finished": "^2.4.1",
-        "range-parser": "^1.2.1",
-        "statuses": "^2.0.1"
+        "debug": "2.6.9",
+        "depd": "2.0.0",
+        "destroy": "1.2.0",
+        "encodeurl": "~1.0.2",
+        "escape-html": "~1.0.3",
+        "etag": "~1.8.1",
+        "fresh": "0.5.2",
+        "http-errors": "2.0.0",
+        "mime": "1.6.0",
+        "ms": "2.1.3",
+        "on-finished": "2.4.1",
+        "range-parser": "~1.2.1",
+        "statuses": "2.0.1"
       },
       "engines": {
-        "node": ">= 18"
+        "node": ">= 0.8.0"
       }
     },
-    "node_modules/send/node_modules/mime-db": {
-      "version": "1.54.0",
-      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
-      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
+    "node_modules/send/node_modules/debug": {
+      "version": "2.6.9",
+      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
+      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
       "dev": true,
       "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
+      "dependencies": {
+        "ms": "2.0.0"
       }
     },
-    "node_modules/send/node_modules/mime-types": {
-      "version": "3.0.1",
-      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.1.tgz",
-      "integrity": "sha512-xRc4oEhT6eaBpU1XF7AjpOFD+xQmXNB5OVKwp4tqCuBpHLS/ZbBDrc07mYTDqVMg6PfxUjjNp85O6Cd2Z/5HWA==",
+    "node_modules/send/node_modules/debug/node_modules/ms": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
+      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
+      "dev": true,
+      "license": "MIT"
+    },
+    "node_modules/send/node_modules/encodeurl": {
+      "version": "1.0.2",
+      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-1.0.2.tgz",
+      "integrity": "sha512-TPJXq8JqFaVYm2CWmPvnP2Iyo4ZSM7/QKcSmuMLDObfpH5fi7RUGmd/rTDf+rut/saiDiQEeVTNgAmJEdAOx0w==",
       "dev": true,
       "license": "MIT",
-      "dependencies": {
-        "mime-db": "^1.54.0"
-      },
       "engines": {
-        "node": ">= 0.6"
+        "node": ">= 0.8"
       }
     },
     "node_modules/serve-static": {
-      "version": "2.2.0",
-      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-2.2.0.tgz",
-      "integrity": "sha512-61g9pCh0Vnh7IutZjtLGGpTA355+OPn2TyDv/6ivP2h/AdAVX9azsoxmg2/M6nZeQZNYBEwIcsne1mJd9oQItQ==",
+      "version": "1.16.2",
+      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.16.2.tgz",
+      "integrity": "sha512-VqpjJZKadQB/PEbEwvFdO43Ax5dFBZ2UECszz8bQ7pi7wt//PWe1P6MN7eCnjsatYtBT6EuiClbjSWP2WrIoTw==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "encodeurl": "^2.0.0",
-        "escape-html": "^1.0.3",
-        "parseurl": "^1.3.3",
-        "send": "^1.2.0"
+        "encodeurl": "~2.0.0",
+        "escape-html": "~1.0.3",
+        "parseurl": "~1.3.3",
+        "send": "0.19.0"
       },
       "engines": {
-        "node": ">= 18"
+        "node": ">= 0.8.0"
       }
     },
     "node_modules/set-function-length": {
@@ -6712,12 +6657,6 @@
       "dev": true,
       "license": "MIT"
     },
-    "node_modules/tiny-emitter": {
-      "version": "2.1.0",
-      "resolved": "https://registry.npmjs.org/tiny-emitter/-/tiny-emitter-2.1.0.tgz",
-      "integrity": "sha512-NB6Dk1A9xgQPMoGqC5CVXn123gWyte215ONT5Pp5a0yt4nlEoO1ZWeCwpncaekPHXO60i47ihFnZPiRPjRMq4Q==",
-      "license": "MIT"
-    },
     "node_modules/tinybench": {
       "version": "2.9.0",
       "resolved": "https://registry.npmjs.org/tinybench/-/tinybench-2.9.0.tgz",
@@ -6835,38 +6774,14 @@
       }
     },
     "node_modules/type-is": {
-      "version": "2.0.1",
-      "resolved": "https://registry.npmjs.org/type-is/-/type-is-2.0.1.tgz",
-      "integrity": "sha512-OZs6gsjF4vMp32qrCbiVSkrFmXtG/AZhY3t0iAMrMBiAZyV9oALtXO8hsrHbMXF9x6L3grlFuwW2oAz7cav+Gw==",
+      "version": "1.6.18",
+      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
+      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "content-type": "^1.0.5",
-        "media-typer": "^1.1.0",
-        "mime-types": "^3.0.0"
-      },
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/type-is/node_modules/mime-db": {
-      "version": "1.54.0",
-      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
-      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/type-is/node_modules/mime-types": {
-      "version": "3.0.1",
-      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.1.tgz",
-      "integrity": "sha512-xRc4oEhT6eaBpU1XF7AjpOFD+xQmXNB5OVKwp4tqCuBpHLS/ZbBDrc07mYTDqVMg6PfxUjjNp85O6Cd2Z/5HWA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "mime-db": "^1.54.0"
+        "media-typer": "0.3.0",
+        "mime-types": "~2.1.24"
       },
       "engines": {
         "node": ">= 0.6"
@@ -6950,15 +6865,6 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
-    "node_modules/typed-function": {
-      "version": "4.2.1",
-      "resolved": "https://registry.npmjs.org/typed-function/-/typed-function-4.2.1.tgz",
-      "integrity": "sha512-EGjWssW7Tsk4DGfE+5yluuljS1OGYWiI1J6e8puZz9nTMM51Oug8CD5Zo4gWMsOhq5BI+1bF+rWTm4Vbj3ivRA==",
-      "license": "MIT",
-      "engines": {
-        "node": ">= 18"
-      }
-    },
     "node_modules/typescript": {
       "version": "5.8.3",
       "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.8.3.tgz",
@@ -7032,6 +6938,16 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/utils-merge": {
+      "version": "1.0.1",
+      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
+      "integrity": "sha512-pMZTvIkT1d+TFGvDOqodOclx0QWkkgi6Tdoa8gC8ffGAAqz9pzPTZWAybbsHHoED/ztMtkv/VoYTYyShUn81hA==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">= 0.4.0"
+      }
+    },
     "node_modules/vary": {
       "version": "1.1.2",
       "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",\n\n// New [features/TIME_SERIES_GENERATION.md]:\n# Overview

Implement core functionality to parse a mathematical expression and generate time series data over a specified range of input values, in a standard JSON format.

# CLI Interface

The command-line tool will support the following options:

- --expression, -e  : A required argument specifying a mathematical formula in a familiar open syntax (for example, supported by mathjs).
- --range, -r       : A required argument specifying the input range in the form x=start:end[:steps], where steps is optional (default 100).
- --output-format   : An optional argument to specify output format; currently only 'json' is supported (default).
- --file, -f        : An optional argument specifying the path to write the output; defaults to stdout.

# Implementation Details

- Add mathjs as a runtime dependency to parse expressions into an evaluable function.
- Parse the --range option into start, end, and optional step count.
- Generate an array of points by evaluating the parsed function at uniform intervals.
- Structure output as a JSON array of objects, each with x and y numeric properties.
- Wire this logic into src/lib/main.js, replacing the placeholder console output when invoked from the CLI.

# Testing

- Create unit tests in tests/unit/plot-generation.test.js to verify:
  - Correct parsing of range strings and default step count behavior.
  - Accurate computation of y values for standard expressions like y = sin(x).
  - Proper JSON output structure.

# Documentation

- Update README.md and USAGE.md to include examples of:
  - Generating a simple sine wave series: repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.283" --file output.json
  - Custom step counts and output redirection.
```

LLM API Usage:

```json
{"prompt_tokens":4297,"completion_tokens":1007,"total_tokens":5304,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":576,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Feature to Issue at 2025-05-21T23:55:46.892Z

Generated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3114 with title:

Implement TIME_SERIES_GENERATION Core Functionality: Expression and Range Parsing with JSON Output

And description:

Background:
The TIME_SERIES_GENERATION feature should allow users to input a mathematical expression and an input range via CLI flags, then output a JSON array of {x, y} points evaluated at uniform intervals. Currently, main.js only logs the raw args.

Scope:
- Add mathjs as a runtime dependency in package.json for expression parsing.
- Enhance src/lib/main.js to:
  1. Parse CLI args using a minimal parser (e.g., yargs or custom) for:
     - `--expression, -e` (required)
     - `--range, -r` (required), format `x=start:end[:steps]` (steps default to 100).
     - `--output-format` (optional, default `json`).
     - `--file, -f` (optional, default stdout).
  2. Validate and interpret the range string:
     - Extract start, end, steps (if provided).
     - Compute an array of x values from start to end inclusive.
  3. Use mathjs to compile the expression into a function of x, evaluate y for each x.
  4. Build the JSON array of `{ x: number, y: number }`.
  5. Write output (stringified JSON) to stdout or file if `--file` is provided.

Testing:
- Update tests/unit/plot-generation.test.js to cover:
  - Parsing of `x=0:10` and default `steps=100`, and custom steps.
  - Correct y values for known expressions (e.g., `sin(x)`, `x^2`).
  - JSON structure and length matches expected.
- Remove redundant main.test.js or adjust to cover new behavior minimally.

Documentation:
- USAGE.md: Add a section for time series generation with examples:
  - `repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.283" --file output.json`
  - Custom steps: `--range "x=0:1:5"`.
- README.md: Summarize the new CLI flags and output.

Verification:
1. Run `npm install` and confirm `mathjs` is added.
2. Execute:
   ```bash
   repository0-plot-code-lib -e "x^2" -r "x=0:2:3"
   ```
   Expect JSON with three points: 0, 1, 4.
3. Run `npm test` and ensure all new and existing tests pass.

Deliverables:
- Modified package.json dependencies.
- Revised src/lib/main.js implementing the described logic.
- Updated tests/unit/plot-generation.test.js (and optionally main.test.js).
- Updated USAGE.md and README.md with examples.

This issue, once resolved, will complete the core TIME_SERIES_GENERATION capability.

LLM API Usage:

```json
{"prompt_tokens":4985,"completion_tokens":803,"total_tokens":5788,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":128,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Issue to enhanced Issue at 2025-05-21T23:56:42.069Z

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:

Title: Implement TIME_SERIES_GENERATION Core Functionality: Expression and Range Parsing with JSON Output

Description:
The TIME_SERIES_GENERATION feature should enable users to provide a mathematical expression and an input range via CLI flags and receive a JSON array of { x, y } points evaluated at uniform intervals.

Acceptance Criteria:
1. CLI Argument Parsing
   - Given the flags `--expression <expr>` (or `-e <expr>`) and `--range <range>` (or `-r <range>`), the tool must parse them successfully and exit with an error if either is missing.
   - The `--output-format` flag defaults to `json` and rejects unsupported formats with a clear error.
   - The `--file` flag directs output to the specified path; if omitted, output goes to stdout.
2. Range Interpretation
   - Accept range strings in the form `x=start:end[:steps]`. When `steps` is omitted, default to 100 intervals.
   - Compute an array of `steps + 1` uniformly spaced x values from `start` to `end` inclusive.
   - Handle floating-point start and end values correctly.
3. Expression Evaluation
   - Use mathjs to compile the expression string into a function of `x`.
   - Evaluate `y` for each generated `x` point.
   - For known expressions (e.g., `sin(x)`, `x^2`), the `y` values must match expected results within a small tolerance (e.g., 1e-12).
4. Output Structure
   - Build an array of objects: `[{ x: number, y: number }, …]` of length `steps + 1`.
   - Serialize the array to JSON and write to stdout or to the provided file.
5. Testing
   - Unit tests verify: parsing of default and custom ranges, correct evaluation for `sin(x)` and `x^2`, length and structure of the output array, and file writing.
   - Ensure `npm test` passes without errors after implementation.
6. Documentation
   - USAGE.md contains examples:
     • `repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.283" --file output.json`
     • `repository0-plot-code-lib --expression "x^2" --range "x=0:2:3"`
   - README.md summarizes CLI flags, defaults, and sample commands.

Deliverables:
- Updated `package.json` with `mathjs` dependency.
- Revised `src/lib/main.js` implementing the above logic.
- Expanded `tests/unit/plot-generation.test.js` (and adjusted `main.test.js`) to cover new behaviors.
- Updated `USAGE.md` and `README.md` with usage examples.


LLM API Usage:

```json
{"prompt_tokens":5189,"completion_tokens":1932,"total_tokens":7121,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1280,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Issue to Code at 2025-05-21T23:59:43.688Z

fixApplied: true

Implement time series generation CLI parsing tests documentation and add mathjs dependency

Git Diff:

```
diff --git a/package-lock.json b/package-lock.json
index 6bbd692f..c5671969 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -12,33 +12,33 @@
         "dotenv": "^16.5.0",
         "ejs": "^3.1.10",
         "js-yaml": "^4.1.0",
-        "mathjs": "^11.8.0",
+        "mathjs": "^11.12.0",
         "minimatch": "^10.0.1",
         "openai": "^4.95.1",
-        "zod": "^3.24.4"
+        "zod": "^3.24.3"
       },
       "bin": {
         "repository0-plot-code-lib": "src/lib/main.js"
       },
       "devDependencies": {
         "@microsoft/eslint-formatter-sarif": "^3.1.0",
-        "@vitest/coverage-v8": "^3.1.4",
+        "@vitest/coverage-v8": "^3.1.2",
         "eslint": "^9.25.1",
         "eslint-config-google": "^0.14.0",
-        "eslint-config-prettier": "^10.1.5",
+        "eslint-config-prettier": "^10.1.2",
         "eslint-plugin-import": "^2.31.0",
         "eslint-plugin-prettier": "^5.2.6",
         "eslint-plugin-promise": "^7.2.1",
         "eslint-plugin-react": "^7.37.5",
         "eslint-plugin-security": "^3.0.1",
         "eslint-plugin-sonarjs": "^3.0.2",
-        "express": "^5.1.0",
+        "express": "^4.21.2",
         "js-yaml": "^4.1.0",
         "markdown-it": "^14.1.0",
         "markdown-it-github": "^0.5.0",
-        "npm-check-updates": "^18.0.1",
+        "npm-check-updates": "^17.1.18",
         "prettier": "^3.5.3",
-        "vitest": "^3.1.4"
+        "vitest": "^3.1.2"
       },
       "engines": {
         "node": ">=20.0.0"
@@ -1750,37 +1750,14 @@
       }
     },
     "node_modules/accepts": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/accepts/-/accepts-2.0.0.tgz",
-      "integrity": "sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/6ao+6Y7gu/RCwRuAhGEzh5B4KlszSuTLgZYuqFqo5bImjNKng==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "mime-types": "^3.0.0",
-        "negotiator": "^1.0.0"
-      },
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/accepts/node_modules/mime-db": {
-      "version": "1.54.0",
-      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
-      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/accepts/node_modules/mime-types": {
-      "version": "3.0.1",
-      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.1.tgz",
-      "integrity": "sha512-xRc4oEhT6eaBpU1XF7AjpOFD+xQmXNB5OVKwp4tqCuBpHLS/ZbBDrc07mYTDqVMg6PfxUjjNp85O6Cd2Z/5HWA==",
+      "version": "1.3.8",
+      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
+      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "mime-db": "^1.54.0"
+        "mime-types": "~2.1.34",
+        "negotiator": "0.6.3"
       },
       "engines": {
         "node": ">= 0.6"
@@ -1890,6 +1867,13 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/array-flatten": {
+      "version": "1.1.1",
+      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
+      "integrity": "sha512-PCVAQswWemu6UdxsDFFX/+gVeYqKAod3D3UVm91jHwynguOwAvYPhx8nNlM++NqRcK6CxxpUafjmhIdKiHibqg==",
+      "dev": true,
+      "license": "MIT"
+    },
     "node_modules/array-includes": {
       "version": "3.1.8",
       "resolved": "https://registry.npmjs.org/array-includes/-/array-includes-3.1.8.tgz",
@@ -2086,26 +2070,47 @@
       "license": "MIT"
     },
     "node_modules/body-parser": {
-      "version": "2.2.0",
-      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-2.2.0.tgz",
-      "integrity": "sha512-02qvAaxv8tp7fBa/mw1ga98OGm+eCbqzJOKoRt70sLmfEEi+jyBYVTDGfCL/k06/4EMk/z01gCe7HoCH/f2LTg==",
+      "version": "1.20.3",
+      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.3.tgz",
+      "integrity": "sha512-7rAxByjUMqQ3/bHJy7D6OGXvx/MMc4IqBn/X0fcM1QUcAItpZrBEYhWGem+tzXH90c+G01ypMcYJBO9Y30203g==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "bytes": "^3.1.2",
-        "content-type": "^1.0.5",
-        "debug": "^4.4.0",
-        "http-errors": "^2.0.0",
-        "iconv-lite": "^0.6.3",
-        "on-finished": "^2.4.1",
-        "qs": "^6.14.0",
-        "raw-body": "^3.0.0",
-        "type-is": "^2.0.0"
+        "bytes": "3.1.2",
+        "content-type": "~1.0.5",
+        "debug": "2.6.9",
+        "depd": "2.0.0",
+        "destroy": "1.2.0",
+        "http-errors": "2.0.0",
+        "iconv-lite": "0.4.24",
+        "on-finished": "2.4.1",
+        "qs": "6.13.0",
+        "raw-body": "2.5.2",
+        "type-is": "~1.6.18",
+        "unpipe": "1.0.0"
       },
       "engines": {
-        "node": ">=18"
+        "node": ">= 0.8",
+        "npm": "1.2.8000 || >= 1.4.16"
       }
     },
+    "node_modules/body-parser/node_modules/debug": {
+      "version": "2.6.9",
+      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
+      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "ms": "2.0.0"
+      }
+    },
+    "node_modules/body-parser/node_modules/ms": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
+      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
+      "dev": true,
+      "license": "MIT"
+    },
     "node_modules/brace-expansion": {
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.1.tgz",
@@ -2300,9 +2305,9 @@
       "license": "MIT"
     },
     "node_modules/content-disposition": {
-      "version": "1.0.0",
-      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-1.0.0.tgz",
-      "integrity": "sha512-Au9nRL8VNUut/XSzbQA38+M78dzP4D+eqg3gfJHMIHHYa3bg067xj1KxMUWj+VULbiZMowKngFFbKczUrNJ1mg==",
+      "version": "0.5.4",
+      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
+      "integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
@@ -2333,14 +2338,11 @@
       }
     },
     "node_modules/cookie-signature": {
-      "version": "1.2.2",
-      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.2.2.tgz",
-      "integrity": "sha512-D76uU73ulSXrD1UXF4KE2TMxVVwhsnCgfAyTg9k8P6KGZjlXKrOLe4dJQKI3Bxi5wjesZoFXJWElNWBjPZMbhg==",
+      "version": "1.0.6",
+      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.6.tgz",
+      "integrity": "sha512-QADzlaHc8icV8I7vbaJXJwod9HWYp8uCqf1xa4OfNu1T7JVxQIrUgOWtHdNDtPiywmFbiS12VjotIXLrKM3orQ==",
       "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">=6.6.0"
-      }
+      "license": "MIT"
     },
     "node_modules/cross-spawn": {
       "version": "7.0.6",
@@ -2507,6 +2509,17 @@
         "node": ">= 0.8"
       }
     },
+    "node_modules/destroy": {
+      "version": "1.2.0",
+      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.2.0.tgz",
+      "integrity": "sha512-2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">= 0.8",
+        "npm": "1.2.8000 || >= 1.4.16"
+      }
+    },
     "node_modules/doctrine": {
       "version": "2.1.0",
       "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
@@ -3406,70 +3419,68 @@
       }
     },
     "node_modules/express": {
-      "version": "5.1.0",
-      "resolved": "https://registry.npmjs.org/express/-/express-5.1.0.tgz",
-      "integrity": "sha512-DT9ck5YIRU+8GYzzU5kT3eHGA5iL+1Zd0EutOmTE9Dtk+Tvuzd23VBU+ec7HPNSTxXYO55gPV/hq4pSBJDjFpA==",
+      "version": "4.21.2",
+      "resolved": "https://registry.npmjs.org/express/-/express-4.21.2.tgz",
+      "integrity": "sha512-28HqgMZAmih1Czt9ny7qr6ek2qddF4FclbMzwhCREB6OFfH+rXAnuNCwo1/wFvrtbgsQDb4kSbX9de9lFbrXnA==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "accepts": "^2.0.0",
-        "body-parser": "^2.2.0",
-        "content-disposition": "^1.0.0",
-        "content-type": "^1.0.5",
-        "cookie": "^0.7.1",
-        "cookie-signature": "^1.2.1",
-        "debug": "^4.4.0",
-        "encodeurl": "^2.0.0",
-        "escape-html": "^1.0.3",
-        "etag": "^1.8.1",
-        "finalhandler": "^2.1.0",
-        "fresh": "^2.0.0",
-        "http-errors": "^2.0.0",
-        "merge-descriptors": "^2.0.0",
-        "mime-types": "^3.0.0",
-        "on-finished": "^2.4.1",
-        "once": "^1.4.0",
-        "parseurl": "^1.3.3",
-        "proxy-addr": "^2.0.7",
-        "qs": "^6.14.0",
-        "range-parser": "^1.2.1",
-        "router": "^2.2.0",
-        "send": "^1.1.0",
-        "serve-static": "^2.2.0",
-        "statuses": "^2.0.1",
-        "type-is": "^2.0.1",
-        "vary": "^1.1.2"
+        "accepts": "~1.3.8",
+        "array-flatten": "1.1.1",
+        "body-parser": "1.20.3",
+        "content-disposition": "0.5.4",
+        "content-type": "~1.0.4",
+        "cookie": "0.7.1",
+        "cookie-signature": "1.0.6",
+        "debug": "2.6.9",
+        "depd": "2.0.0",
+        "encodeurl": "~2.0.0",
+        "escape-html": "~1.0.3",
+        "etag": "~1.8.1",
+        "finalhandler": "1.3.1",
+        "fresh": "0.5.2",
+        "http-errors": "2.0.0",
+        "merge-descriptors": "1.0.3",
+        "methods": "~1.1.2",
+        "on-finished": "2.4.1",
+        "parseurl": "~1.3.3",
+        "path-to-regexp": "0.1.12",
+        "proxy-addr": "~2.0.7",
+        "qs": "6.13.0",
+        "range-parser": "~1.2.1",
+        "safe-buffer": "5.2.1",
+        "send": "0.19.0",
+        "serve-static": "1.16.2",
+        "setprototypeof": "1.2.0",
+        "statuses": "2.0.1",
+        "type-is": "~1.6.18",
+        "utils-merge": "1.0.1",
+        "vary": "~1.1.2"
       },
       "engines": {
-        "node": ">= 18"
+        "node": ">= 0.10.0"
       },
       "funding": {
         "type": "opencollective",
         "url": "https://opencollective.com/express"
       }
     },
-    "node_modules/express/node_modules/mime-db": {
-      "version": "1.54.0",
-      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
-      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
+    "node_modules/express/node_modules/debug": {
+      "version": "2.6.9",
+      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
+      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
       "dev": true,
       "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
+      "dependencies": {
+        "ms": "2.0.0"
       }
     },
-    "node_modules/express/node_modules/mime-types": {
-      "version": "3.0.1",
-      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.1.tgz",
-      "integrity": "sha512-xRc4oEhT6eaBpU1XF7AjpOFD+xQmXNB5OVKwp4tqCuBpHLS/ZbBDrc07mYTDqVMg6PfxUjjNp85O6Cd2Z/5HWA==",
+    "node_modules/express/node_modules/ms": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
+      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
       "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "mime-db": "^1.54.0"
-      },
-      "engines": {
-        "node": ">= 0.6"
-      }
+      "license": "MIT"
     },
     "node_modules/fast-deep-equal": {
       "version": "3.1.3",
@@ -3559,23 +3570,41 @@
       }
     },
     "node_modules/finalhandler": {
-      "version": "2.1.0",
-      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-2.1.0.tgz",
-      "integrity": "sha512-/t88Ty3d5JWQbWYgaOGCCYfXRwV1+be02WqYYlL6h0lEiUAMPM8o8qKGO01YIkOHzka2up08wvgYD0mDiI+q3Q==",
+      "version": "1.3.1",
+      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.3.1.tgz",
+      "integrity": "sha512-6BN9trH7bp3qvnrRyzsBz+g3lZxTNZTbVO2EV1CS0WIcDbawYVdYvGflME/9QP0h0pYlCDBCTjYa9nZzMDpyxQ==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "debug": "^4.4.0",
-        "encodeurl": "^2.0.0",
-        "escape-html": "^1.0.3",
-        "on-finished": "^2.4.1",
-        "parseurl": "^1.3.3",
-        "statuses": "^2.0.1"
+        "debug": "2.6.9",
+        "encodeurl": "~2.0.0",
+        "escape-html": "~1.0.3",
+        "on-finished": "2.4.1",
+        "parseurl": "~1.3.3",
+        "statuses": "2.0.1",
+        "unpipe": "~1.0.0"
       },
       "engines": {
         "node": ">= 0.8"
       }
     },
+    "node_modules/finalhandler/node_modules/debug": {
+      "version": "2.6.9",
+      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
+      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "ms": "2.0.0"
+      }
+    },
+    "node_modules/finalhandler/node_modules/ms": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
+      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
+      "dev": true,
+      "license": "MIT"
+    },
     "node_modules/find-up": {
       "version": "5.0.0",
       "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
@@ -3705,13 +3734,13 @@
       }
     },
     "node_modules/fresh": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/fresh/-/fresh-2.0.0.tgz",
-      "integrity": "sha512-Rx/WycZ60HOaqLKAi6cHRKKI7zxWbJ31MhntmtwMoaTeF7XFH9hhBp8vITaMidfljRQ6eYWCKkaTK+ykVJHP2A==",
+      "version": "0.5.2",
+      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
+      "integrity": "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==",
       "dev": true,
       "license": "MIT",
       "engines": {
-        "node": ">= 0.8"
+        "node": ">= 0.6"
       }
     },
     "node_modules/fs.realpath": {
@@ -4068,13 +4097,13 @@
       }
     },
     "node_modules/iconv-lite": {
-      "version": "0.6.3",
-      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
-      "integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
+      "version": "0.4.24",
+      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
+      "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "safer-buffer": ">= 2.1.2 < 3.0.0"
+        "safer-buffer": ">= 2.1.2 < 3"
       },
       "engines": {
         "node": ">=0.10.0"
@@ -4404,13 +4433,6 @@
         "node": ">=8"
       }
     },
-    "node_modules/is-promise": {
-      "version": "4.0.0",
-      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-4.0.0.tgz",
-      "integrity": "sha512-hvpoI6korhJMnej285dSg6nu1+e6uxs7zG3BYAm5byqDsgJNWwxzM6z6iZiAgQR4TJ30JmBTOwqZUw3WlyH3AQ==",
-      "dev": true,
-      "license": "MIT"
-    },
     "node_modules/is-regex": {
       "version": "1.2.1",
       "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.2.1.tgz",
@@ -5002,28 +5024,48 @@
       "license": "MIT"
     },
     "node_modules/media-typer": {
-      "version": "1.1.0",
-      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-1.1.0.tgz",
-      "integrity": "sha512-aisnrDP4GNe06UcKFnV5bfMNPBUw4jsLGaWwWfnH3v02GnBuXX2MCVn5RbrWo0j3pczUilYblq7fQ7Nw2t5XKw==",
+      "version": "0.3.0",
+      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
+      "integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
       "dev": true,
       "license": "MIT",
       "engines": {
-        "node": ">= 0.8"
+        "node": ">= 0.6"
       }
     },
     "node_modules/merge-descriptors": {
-      "version": "2.0.0",
-      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-2.0.0.tgz",
-      "integrity": "sha512-Snk314V5ayFLhp3fkUREub6WtjBfPdCPY1Ln8/8munuLuiYhsABgBVWsozAG+MWMbVEvcdcpbi9R7ww22l9Q3g==",
+      "version": "1.0.3",
+      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.3.tgz",
+      "integrity": "sha512-gaNvAS7TZ897/rVaZ0nMtAyxNyi/pdbjbAwUpFQpN70GqnVfOiXpeUUMKRBmzXaSQ8DdTX4/0ms62r2K+hE6mQ==",
       "dev": true,
       "license": "MIT",
-      "engines": {
-        "node": ">=18"
-      },
       "funding": {
         "url": "https://github.com/sponsors/sindresorhus"
       }
     },
+    "node_modules/methods": {
+      "version": "1.1.2",
+      "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
+      "integrity": "sha512-iclAHeNqNm68zFtnZ0e+1L2yUIdvzNoauKU4WBA3VvH/vPFieF7qfRlwUZU+DA9P9bPXIS90ulxoUoCH23sV2w==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">= 0.6"
+      }
+    },
+    "node_modules/mime": {
+      "version": "1.6.0",
+      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
+      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==",
+      "dev": true,
+      "license": "MIT",
+      "bin": {
+        "mime": "cli.js"
+      },
+      "engines": {
+        "node": ">=4"
+      }
+    },
     "node_modules/mime-db": {
       "version": "1.52.0",
       "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
@@ -5113,9 +5155,9 @@
       "license": "MIT"
     },
     "node_modules/negotiator": {
-      "version": "1.0.0",
-      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-1.0.0.tgz",
-      "integrity": "sha512-8Ofs/AUQh8MaEcrlq5xOX0CQ9ypTF5dl78mjlMNfOK08fzpgTHQRQPBxcPlEtIw0yRpws+Zo/3r+5WRby7u3Gg==",
+      "version": "0.6.3",
+      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
+      "integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
       "dev": true,
       "license": "MIT",
       "engines": {
@@ -5163,9 +5205,9 @@
       }
     },
     "node_modules/npm-check-updates": {
-      "version": "18.0.1",
-      "resolved": "https://registry.npmjs.org/npm-check-updates/-/npm-check-updates-18.0.1.tgz",
-      "integrity": "sha512-MO7mLp/8nm6kZNLLyPgz4gHmr9tLoU+pWPLdXuGAx+oZydBHkHWN0ibTonsrfwC2WEQNIQxuZagYwB67JQpAuw==",
+      "version": "17.1.18",
+      "resolved": "https://registry.npmjs.org/npm-check-updates/-/npm-check-updates-17.1.18.tgz",
+      "integrity": "sha512-bkUy2g4v1i+3FeUf5fXMLbxmV95eG4/sS7lYE32GrUeVgQRfQEk39gpskksFunyaxQgTIdrvYbnuNbO/pSUSqw==",
       "dev": true,
       "license": "Apache-2.0",
       "bin": {
@@ -5506,14 +5548,11 @@
       }
     },
     "node_modules/path-to-regexp": {
-      "version": "8.2.0",
-      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-8.2.0.tgz",
-      "integrity": "sha512-TdrF7fW9Rphjq4RjrW0Kp2AW0Ahwu9sRGTkS6bvDi0SCwZlEZYmcfDbEsTz8RVk0EHIS/Vd1bv3JhG+1xZuAyQ==",
+      "version": "0.1.12",
+      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.12.tgz",
+      "integrity": "sha512-RA1GjUVMnvYFxuqovrEqZoxxW5NUZqbwKtYz/Tt7nXerk0LbLblQmrsgdeOxV5SFHf0UDggjS/bSeOZwt1pmEQ==",
       "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">=16"
-      }
+      "license": "MIT"
     },
     "node_modules/pathe": {
       "version": "2.0.3",
@@ -5677,13 +5716,13 @@
       }
     },
     "node_modules/qs": {
-      "version": "6.14.0",
-      "resolved": "https://registry.npmjs.org/qs/-/qs-6.14.0.tgz",
-      "integrity": "sha512-YWWTjgABSKcvs/nWBi9PycY/JiPJqOD4JA6o9Sej2AtvSGarXxKC3OQSk4pAarbdQlKAh5D4FCQkJNkW+GAn3w==",
+      "version": "6.13.0",
+      "resolved": "https://registry.npmjs.org/qs/-/qs-6.13.0.tgz",
+      "integrity": "sha512-+38qI9SOr8tfZ4QmJNplMUxqjbe7LKvvZgWdExBOmd+egZTtjLB67Gu0HRX3u/XOq7UU2Nx6nsjvS16Z9uwfpg==",
       "dev": true,
       "license": "BSD-3-Clause",
       "dependencies": {
-        "side-channel": "^1.1.0"
+        "side-channel": "^1.0.6"
       },
       "engines": {
         "node": ">=0.6"
@@ -5724,15 +5763,15 @@
       }
     },
     "node_modules/raw-body": {
-      "version": "3.0.0",
-      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-3.0.0.tgz",
-      "integrity": "sha512-RmkhL8CAyCRPXCE28MMH0z2PNWQBNk2Q09ZdxM9IOOXwxwZbN+qbWaatPkdkWIKL2ZVDImrN/pK5HTRz2PcS4g==",
+      "version": "2.5.2",
+      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.5.2.tgz",
+      "integrity": "sha512-8zGqypfENjCIqGhgXToC8aB2r7YrBX+AQAfIPs/Mlk+BtPTztOvTS01NRW/3Eh60J+a48lt8qsCzirQ6loCVfA==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
         "bytes": "3.1.2",
         "http-errors": "2.0.0",
-        "iconv-lite": "0.6.3",
+        "iconv-lite": "0.4.24",
         "unpipe": "1.0.0"
       },
       "engines": {
@@ -5972,23 +6011,6 @@
         "fsevents": "~2.3.2"
       }
     },
-    "node_modules/router": {
-      "version": "2.2.0",
-      "resolved": "https://registry.npmjs.org/router/-/router-2.2.0.tgz",
-      "integrity": "sha512-nLTrUKm2UyiL7rlhapu/Zl45FwNgkZGaCpZbIHajDYgwlJCOzLSk+cIPAnsEqV955GjILJnKbdQC1nVPz+gAYQ==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "debug": "^4.4.0",
-        "depd": "^2.0.0",
-        "is-promise": "^4.0.0",
-        "parseurl": "^1.3.3",
-        "path-to-regexp": "^8.0.0"
-      },
-      "engines": {
-        "node": ">= 18"
-      }
-    },
     "node_modules/run-parallel": {
       "version": "1.2.0",
       "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
@@ -6138,65 +6160,71 @@
       }
     },
     "node_modules/send": {
-      "version": "1.2.0",
-      "resolved": "https://registry.npmjs.org/send/-/send-1.2.0.tgz",
-      "integrity": "sha512-uaW0WwXKpL9blXE2o0bRhoL2EGXIrZxQ2ZQ4mgcfoBxdFmQold+qWsD2jLrfZ0trjKL6vOw0j//eAwcALFjKSw==",
+      "version": "0.19.0",
+      "resolved": "https://registry.npmjs.org/send/-/send-0.19.0.tgz",
+      "integrity": "sha512-dW41u5VfLXu8SJh5bwRmyYUbAoSB3c9uQh6L8h/KtsFREPWpbX1lrljJo186Jc4nmci/sGUZ9a0a0J2zgfq2hw==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "debug": "^4.3.5",
-        "encodeurl": "^2.0.0",
-        "escape-html": "^1.0.3",
-        "etag": "^1.8.1",
-        "fresh": "^2.0.0",
-        "http-errors": "^2.0.0",
-        "mime-types": "^3.0.1",
-        "ms": "^2.1.3",
-        "on-finished": "^2.4.1",
-        "range-parser": "^1.2.1",
-        "statuses": "^2.0.1"
+        "debug": "2.6.9",
+        "depd": "2.0.0",
+        "destroy": "1.2.0",
+        "encodeurl": "~1.0.2",
+        "escape-html": "~1.0.3",
+        "etag": "~1.8.1",
+        "fresh": "0.5.2",
+        "http-errors": "2.0.0",
+        "mime": "1.6.0",
+        "ms": "2.1.3",
+        "on-finished": "2.4.1",
+        "range-parser": "~1.2.1",
+        "statuses": "2.0.1"
       },
       "engines": {
-        "node": ">= 18"
+        "node": ">= 0.8.0"
       }
     },
-    "node_modules/send/node_modules/mime-db": {
-      "version": "1.54.0",
-      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
-      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
+    "node_modules/send/node_modules/debug": {
+      "version": "2.6.9",
+      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
+      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
       "dev": true,
       "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
+      "dependencies": {
+        "ms": "2.0.0"
       }
     },
-    "node_modules/send/node_modules/mime-types": {
-      "version": "3.0.1",
-      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.1.tgz",
-      "integrity": "sha512-xRc4oEhT6eaBpU1XF7AjpOFD+xQmXNB5OVKwp4tqCuBpHLS/ZbBDrc07mYTDqVMg6PfxUjjNp85O6Cd2Z/5HWA==",
+    "node_modules/send/node_modules/debug/node_modules/ms": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
+      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
+      "dev": true,
+      "license": "MIT"
+    },
+    "node_modules/send/node_modules/encodeurl": {
+      "version": "1.0.2",
+      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-1.0.2.tgz",
+      "integrity": "sha512-TPJXq8JqFaVYm2CWmPvnP2Iyo4ZSM7/QKcSmuMLDObfpH5fi7RUGmd/rTDf+rut/saiDiQEeVTNgAmJEdAOx0w==",
       "dev": true,
       "license": "MIT",
-      "dependencies": {
-        "mime-db": "^1.54.0"
-      },
       "engines": {
-        "node": ">= 0.6"
+        "node": ">= 0.8"
       }
     },
     "node_modules/serve-static": {
-      "version": "2.2.0",
-      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-2.2.0.tgz",
-      "integrity": "sha512-61g9pCh0Vnh7IutZjtLGGpTA355+OPn2TyDv/6ivP2h/AdAVX9azsoxmg2/M6nZeQZNYBEwIcsne1mJd9oQItQ==",
+      "version": "1.16.2",
+      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.16.2.tgz",
+      "integrity": "sha512-VqpjJZKadQB/PEbEwvFdO43Ax5dFBZ2UECszz8bQ7pi7wt//PWe1P6MN7eCnjsatYtBT6EuiClbjSWP2WrIoTw==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "encodeurl": "^2.0.0",
-        "escape-html": "^1.0.3",
-        "parseurl": "^1.3.3",
-        "send": "^1.2.0"
+        "encodeurl": "~2.0.0",
+        "escape-html": "~1.0.3",
+        "parseurl": "~1.3.3",
+        "send": "0.19.0"
       },
       "engines": {
-        "node": ">= 18"
+        "node": ">= 0.8.0"
       }
     },
     "node_modules/set-function-length": {
@@ -6835,38 +6863,14 @@
       }
     },
     "node_modules/type-is": {
-      "version": "2.0.1",
-      "resolved": "https://registry.npmjs.org/type-is/-/type-is-2.0.1.tgz",
-      "integrity": "sha512-OZs6gsjF4vMp32qrCbiVSkrFmXtG/AZhY3t0iAMrMBiAZyV9oALtXO8hsrHbMXF9x6L3grlFuwW2oAz7cav+Gw==",
+      "version": "1.6.18",
+      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
+      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
       "dev": true,
       "license": "MIT",
       "dependencies": {
-        "content-type": "^1.0.5",
-        "media-typer": "^1.1.0",
-        "mime-types": "^3.0.0"
-      },
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/type-is/node_modules/mime-db": {
-      "version": "1.54.0",
-      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
-      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
-      "dev": true,
-      "license": "MIT",
-      "engines": {
-        "node": ">= 0.6"
-      }
-    },
-    "node_modules/type-is/node_modules/mime-types": {
-      "version": "3.0.1",
-      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.1.tgz",
-      "integrity": "sha512-xRc4oEhT6eaBpU1XF7AjpOFD+xQmXNB5OVKwp4tqCuBpHLS/ZbBDrc07mYTDqVMg6PfxUjjNp85O6Cd2Z/5HWA==",
-      "dev": true,
-      "license": "MIT",
-      "dependencies": {
-        "mime-db": "^1.54.0"
+        "media-typer": "0.3.0",
+        "mime-types": "~2.1.24"
       },
       "engines": {
         "node": ">= 0.6"
@@ -7032,6 +7036,16 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/utils-merge": {
+      "version": "1.0.1",
+      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
+      "integrity": "sha512-pMZTvIkT1d+TFGvDOqodOclx0QWkkgi6Tdoa8gC8ffGAAqz9pzPTZWAybbsHHoED/ztMtkv/VoYTYyShUn81hA==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">= 0.4.0"
+      }
+    },
     "node_modules/vary": {
       "version": "1.1.2",
       "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
diff --git a/package.json b/package.json
index d53d00bd..5d94926e 100644
--- a/package.json
+++ b/package.json
@@ -29,7 +29,8 @@
     "ejs": "^3.1.10",
     "js-yaml": "^4.1.0",
     "minimatch": "^10.0.1",
-    "zod": "^3.24.3"
+    "zod": "^3.24.3",
+    "mathjs": "^11.12.0"
   },
   "devDependencies": {
     "@microsoft/eslint-formatter-sarif": "^3.1.0",
@@ -58,4 +59,4 @@
   "publishConfig": {
     "registry": "https://npm.pkg.github.com"
   }
-}
+}
\ No newline at end of file
diff --git a/src/lib/main.js b/src/lib/main.js
index 3cdd4e2a..983b2df1 100755
--- a/src/lib/main.js
+++ b/src/lib/main.js
@@ -1,13 +1,127 @@
 #!/usr/bin/env node
-// src/lib/main.js
-
+import fs from "fs/promises";
 import { fileURLToPath } from "url";
+import * as math from "mathjs";
 
+/**
+ * Main library function to generate time series points from expression and range.
+ * @param {string[]} args - CLI arguments array
+ * @returns {object|undefined} Returns an object containing points array and options, or undefined if no args
+ */
 export function main(args) {
-  console.log(`Run with: ${JSON.stringify(args)}`);
+  if (!args || args.length === 0) {
+    return;
+  }
+  const options = parseArgs(args);
+  const { expression, range, outputFormat, file } = options;
+  const { start, end, steps } = parseRange(range);
+
+  // Compile the expression
+  const node = math.parse(expression);
+  const code = node.compile();
+
+  // Generate points
+  const points = [];
+  const stepSize = (end - start) / steps;
+  for (let i = 0; i <= steps; i++) {
+    const x = start + stepSize * i;
+    const y = code.evaluate({ x });
+    points.push({ x, y });
+  }
+  return { points, outputFormat, file };
 }
 
-if (process.argv[1] === fileURLToPath(import.meta.url)) {
-  const args = process.argv.slice(2);
-  main(args);
+/**
+ * Parses CLI arguments into options
+ * @param {string[]} args
+ * @returns {{expression:string,range:string,outputFormat:string,file:string|null}}
+ */
+function parseArgs(args) {
+  const options = {
+    expression: null,
+    range: null,
+    outputFormat: "json",
+    file: null,
+  };
+  for (let i = 0; i < args.length; i++) {
+    const arg = args[i];
+    if (arg === "--expression" || arg === "-e") {
+      i++;
+      options.expression = args[i];
+    } else if (arg.startsWith("--expression=")) {
+      options.expression = arg.split("=")[1];
+    } else if (arg === "--range" || arg === "-r") {
+      i++;
+      options.range = args[i];
+    } else if (arg.startsWith("--range=")) {
+      options.range = arg.split("=")[1];
+    } else if (arg === "--output-format") {
+      i++;
+      options.outputFormat = args[i];
+    } else if (arg.startsWith("--output-format=")) {
+      options.outputFormat = arg.split("=")[1];
+    } else if (arg === "--file" || arg === "-f") {
+      i++;
+      options.file = args[i];
+    } else if (arg.startsWith("--file=")) {
+      options.file = arg.split("=")[1];
+    } else {
+      throw new Error(`Unknown argument: ${arg}`);
+    }
+  }
+  if (!options.expression) {
+    throw new Error("Missing required --expression");
+  }
+  if (!options.range) {
+    throw new Error("Missing required --range");
+  }
+  return options;
 }
+
+/**
+ * Parses a range string of form x=start:end[:steps]
+ * @param {string} rangeStr
+ * @returns {{start:number,end:number,steps:number}}
+ */
+function parseRange(rangeStr) {
+  // match x=0:1 or x=0:1:10
+  const m = rangeStr.match(/^[xy]=([^:]+):([^:]+)(?::(\d+))?$/);
+  if (!m) {
+    throw new Error(`Invalid range format: ${rangeStr}`);
+  }
+  const start = parseFloat(m[1]);
+  const end = parseFloat(m[2]);
+  const steps = m[3] !== undefined ? parseInt(m[3], 10) : 100;
+  if (Number.isNaN(start) || Number.isNaN(end) || Number.isNaN(steps)) {
+    throw new Error(`Invalid range values in: ${rangeStr}`);
+  }
+  return { start, end, steps };
+}
+
+// CLI invocation
+if (process.argv[1] === fileURLToPath(import.meta.url)) {
+  (async () => {
+    try {
+      const cliArgs = process.argv.slice(2);
+      const result = main(cliArgs);
+      if (!result) {
+        // nothing to do
+        return;
+      }
+      const { points, outputFormat, file } = result;
+      if (outputFormat !== "json") {
+        console.error(`Unsupported output format: ${outputFormat}`);
+        process.exit(1);
+      }
+      const output = JSON.stringify(points, null, 2);
+      if (file) {
+        await fs.writeFile(file, output);
+      } else {
+        console.log(output);
+      }
+    } catch (err) {
+      console.error(err.message);
+      process.exit(1);
+    }
+  })();
+}
\ No newline at end of file
diff --git a/tests/unit/plot-generation.test.js b/tests/unit/plot-generation.test.js
index 19a4042c..bf2a2a24 100644
--- a/tests/unit/plot-generation.test.js
+++ b/tests/unit/plot-generation.test.js
@@ -1,16 +1,42 @@
 import { describe, test, expect } from "vitest";
-import * as mainModule from "@src/lib/main.js";
 import { main } from "@src/lib/main.js";
 
-describe("Main Module Import", () => {
-  test("should be non-null", () => {
-    expect(mainModule).not.toBeNull();
+describe("Main Module", () => {
+  test("should be defined", () => {
+    expect(main).toBeDefined();
   });
-});
 
-describe("Default main", () => {
-  test("should terminate without error", () => {
-    process.argv = ["node", "src/lib/main.js"];
-    main();
+  test("should return undefined when called without args", () => {
+    expect(main()).toBeUndefined();
   });
 });
+
+describe("Time Series Generation", () => {
+  test("default steps should be 100 and default y=x", () => {
+    const result = main(["-e", "x", "-r", "x=0:1"]);
+    expect(Array.isArray(result.points)).toBe(true);
+    expect(result.points).toHaveLength(101);
+    expect(result.points[0]).toEqual({ x: 0, y: 0 });
+    expect(result.points[100]).toEqual({ x: 1, y: 1 });
+  });
+
+  test("custom steps should match x^2 series", () => {
+    const result = main(["--expression", "x^2", "--range", "x=0:3:3"]);
+    const pts = result.points;
+    expect(pts).toHaveLength(4);
+    expect(pts[0]).toEqual({ x: 0, y: 0 });
+    expect(pts[1]).toEqual({ x: 1, y: 1 });
+    expect(pts[2]).toEqual({ x: 2, y: 4 });
+    expect(pts[3]).toEqual({ x: 3, y: 9 });
+  });
+
+  test("sin(x) values approximate correctly", () => {
+    const result = main(["-e", "sin(x)", "-r", "x=0:3:3"]);
+    const pts = result.points;
+    expect(pts).toHaveLength(4);
+    expect(pts[0].y).toBeCloseTo(Math.sin(0), 12);
+    expect(pts[1].y).toBeCloseTo(Math.sin(1), 12);
+    expect(pts[2].y).toBeCloseTo(Math.sin(2), 12);
+    expect(pts[3].y).toBeCloseTo(Math.sin(3), 12);
+  });
+});
\ No newline at end of file\n\n// New [USAGE.md]:\n# Usage

## Time Series Generation

The CLI tool can generate a JSON time series of points from a mathematical expression over a specified range.

### Examples

- Generate a sine wave series and write to file:

  ```bash
  repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.283" --file output.json
  ```

- Generate an x squared series with custom steps:

  ```bash
  repository0-plot-code-lib -e "x^2" -r "x=0:2:3"
  ```

- Output to stdout (default):

  ```bash
  repository0-plot-code-lib -e "sin(x)" -r "x=0:3"
  ```
```
mainOutput:
```

> @xn-intenton-z2a/repository0-plot-code-lib@1.2.0-0 start
> node src/lib/main.js

```
[for issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3114 with title: ""]

LLM API Usage:

```json
{"prompt_tokens":24621,"completion_tokens":7634,"total_tokens":32255,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":4672,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

