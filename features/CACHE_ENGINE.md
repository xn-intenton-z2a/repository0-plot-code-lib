# CACHE ENGINE

This feature introduces a caching mechanism to improve performance by storing and reusing computed plot data for identical requests. When a user submits a request via the HTTP endpoint or CLI, the system will first check if a valid cached result exists for the given query parameters (e.g. expression, range, smoothing, markers, gradient settings, etc.). If the result is found and is not expired, the stored result will be returned immediately. Otherwise, the system computes the plot data and output, stores it in cache, and then returns the result.

# Implementation

- Add a dependency on node-cache in the dependencies file (e.g. "node-cache": "^5.1.2").
- In the main source file, import NodeCache and create an instance with a sensible default TTL and check period (for example, TTL of 60 seconds and a check period of 120 seconds).
- In the HTTP endpoint (/plot) and in CLI execution paths, create a cache key based on the essential query parameters. This key can be generated using a JSON stringification of an object that contains the expression, range, and any other parameters that affect the output (like smoothing, markers or stroke styling parameters).
- Before executing computePlotData or createSvgPlot, check the cache for an existing output. If a cache hit occurs, return the cached output directly. If not, compute the answer, store it in the cache, and then return the response.
- Optionally include a header or log entry indicating a cache hit for debugging and performance monitoring purposes.

# Impact

- Reduces duplicate computations for repeated requests with the same parameters, which is especially beneficial on the HTTP endpoint under high load.
- Enhances responsiveness in both CLI and server modes when the same plot is requested multiple times.
- Ensures that the performance improvements are integrated into the core functionality, aligning with the mission to be the go-to plot library with high productivity and efficient resource usage.
