# EXPRESS_PERFORMANCE

## Crawl Summary
Express production performance guidelines emphasize using gzip compression (via middleware or reverse proxy), avoiding synchronous functions in favor of asynchronous operations, proper logging using asynchronous libraries (e.g., debug and Pino), robust error handling with try-catch and promise rejections, and environment setups that include setting NODE_ENV=production. Additionally, it recommends using process managers (PM2 or systemd) for automatic restart, clustering techniques either with Node's core cluster module or PM2 cluster mode, caching strategies using tools like Varnish, load balancing via reverse proxies such as Nginx, and precise configuration of system services.

## Normalised Extract
TABLE OF CONTENTS:
1. GZIP_COMPRESSION
   - Use compression middleware: require('compression'); app.use(compression()); Alternatively enable gzip in Nginx via ngx_http_gzip_module.
2. ASYNC_USAGE
   - Always use asynchronous functions; avoid fs.readFileSync and similar. Use --trace-sync-io flag to detect sync IO.
3. LOGGING
   - For debugging use debug module; for production use Pino. Avoid console.log for production logs.
4. ERROR_HANDLING
   - Synchronous errors: use try-catch. Example: JSON.parse inside try-catch in a route handler.
   - Asynchronous errors: use async function with try-catch or promise .catch(next). Express error middleware should catch via next(err).
5. ENVIRONMENT_CONFIG
   - Set process.env.NODE_ENV to 'production'. In systemd: Environment=NODE_ENV=production. Improves template caching and reduces verbosity.
6. PROCESS_RESTART
   - Use process managers such as PM2 or init systems like systemd. Example commands: pm2 start npm --name my-app -i max -- start
7. CLUSTERING
   - Use Node's cluster module. Master forks worker processes equal to number of CPU cores. Alternatively, use PM2 cluster mode: pm2 start npm --name my-app -i max -- start.
8. CACHING
   - Cache request results using a caching server like Varnish or enabling caching rules in Nginx.
9. LOAD_BALANCING
   - Employ load balancers (Nginx/HAProxy) to distribute traffic; configure session affinity if needed.
10. REVERSE_PROXY
    - Run Express behind a reverse proxy to handle static files, compression, error pages, caching, and load balancing.

FOR EACH TOPIC, IMPLEMENTATION DETAILS INCLUDE EXACT CODE EXAMPLES, CONFIGURATION FILES, COMMAND-LINE FLAGS, AND INIT SYSTEM SETUPS.

## Supplementary Details
GZIP_COMPRESSION: Install compression using npm: npm install compression. Code: const compression = require('compression'); app.use(compression());

ASYNC_USAGE: Use asynchronous alternatives. Flag: --trace-sync-io to reveal sync calls.

LOGGING: For debugging, install debug (npm install debug) and use DEBUG environment variable. For activity logs, install pino (npm install pino) and configure it in production.

ERROR_HANDLING:
- Synchronous: Use try-catch blocks around JSON.parse and other operations.
- Asynchronous: Use async functions with try-catch or promise.catch(next) to forward errors to the error-handling middleware.

ENVIRONMENT_CONFIG:
- Set NODE_ENV=production in your shell or within a systemd unit file using Environment=NODE_ENV=production. 
- Benefits include caching of view templates and static assets, and less verbose error messages.

PROCESS_RESTART:
- Use PM2 for process management: Commands such as pm2 start npm --name my-app -i (number of workers or max) -- start.
- Alternatively, configure a systemd unit file to auto-restart the process on failure.

CLUSTERING:
- Node Cluster: Use cluster.fork() in a master script to spawn worker processes. Monitor worker exit events and auto-fork new processes.
- PM2 Cluster Mode: Configure by setting exec_mode to cluster in ecosystem.config.js.

CACHING: Use a caching server (Varnish or Nginx caching rules) to store request responses.

LOAD_BALANCING: Set up and configure a load balancer (e.g., Nginx, HAProxy) to route traffic among multiple app instances. Ensure sticky sessions with Redis if required.

REVERSE_PROXY: Configure Nginx or similar as a reverse proxy to pass requests to the Express server while handling static content and performing additional optimizations.

## Reference Details
Express API Specifications:

1. app.get(path: string, callback: (req: Request, res: Response, next: NextFunction) => void): Express
   - Example: app.get('/', (req, res) => { res.send('Hello World!') })

2. Error handling middleware signature: (err: any, req: Request, res: Response, next: NextFunction) => void
   - Example: app.use((err, req, res, next) => { res.status(err.status || 500).send({ error: err.message }) })

3. Compression Middleware:
   - Module: compression
   - Use: const compression = require('compression'); app.use(compression());

4. Systemd Unit File Configuration (for production deployments):

[Unit]
Description=<Awesome Express App>

[Service]
Type=simple
ExecStart=/usr/local/bin/node /projects/myapp/index.js
WorkingDirectory=/projects/myapp
User=nobody
Group=nogroup
Environment=NODE_ENV=production
LimitNOFILE=infinity
LimitCORE=infinity
StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target

5. PM2 Commands for Clustering:
   - Start in cluster mode with auto-detection:
     pm2 start npm --name my-app -i max -- start
   - Scale workers:
     pm2 scale my-app +3  or pm2 scale my-app 2

6. Node Cluster Module Example:

const cluster = require('cluster')
const os = require('os')
if (cluster.isMaster) {
  const numCPUs = os.cpus().length
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died; spawning new process`)
    cluster.fork()
  })
} else {
  const express = require('express')
  const app = express()
  app.get('/', (req, res) => { res.send('Hello World!') })
  app.listen(3000, () => { console.log(`Worker listening on port 3000`) })
}

7. Troubleshooting Procedures:
   - Use --trace-sync-io to detect unwanted synchronous operations.
   - Test error handling by throwing errors in route handlers and verifying that the error middleware sends a correct status code and message.
   - Validate PM2 logs using: pm2 logs my-app
   - Check systemd status with: systemctl status myservice.service
   - For debugging cluster issues, monitor worker exits and auto-restart messages in the application logs.


## Information Dense Extract
gzip: require('compression'); app.use(compression()); async: use async/await, avoid sync I/O, flag --trace-sync-io; logging: use debug for dev, pino for production; error handling: try-catch for sync, async functions catch errors; env: NODE_ENV=production via systemd (Environment=NODE_ENV=production), caching view templates; restart: PM2 or systemd with Restart=always; cluster: Node cluster module or PM2 cluster mode (pm2 start npm --name my-app -i max -- start); caching: use Varnish/Nginx; load balancing: use Nginx/HAProxy with sticky sessions if needed; reverse proxy: offload static content and compression; API: app.get(path, (req, res) => {}), error middleware (err, req, res, next) => {}, systemd unit file detailed; PM2 scaling commands; troubleshooting via logs and --trace-sync-io.

## Sanitised Extract
TABLE OF CONTENTS:
1. GZIP_COMPRESSION
   - Use compression middleware: require('compression'); app.use(compression()); Alternatively enable gzip in Nginx via ngx_http_gzip_module.
2. ASYNC_USAGE
   - Always use asynchronous functions; avoid fs.readFileSync and similar. Use --trace-sync-io flag to detect sync IO.
3. LOGGING
   - For debugging use debug module; for production use Pino. Avoid console.log for production logs.
4. ERROR_HANDLING
   - Synchronous errors: use try-catch. Example: JSON.parse inside try-catch in a route handler.
   - Asynchronous errors: use async function with try-catch or promise .catch(next). Express error middleware should catch via next(err).
5. ENVIRONMENT_CONFIG
   - Set process.env.NODE_ENV to 'production'. In systemd: Environment=NODE_ENV=production. Improves template caching and reduces verbosity.
6. PROCESS_RESTART
   - Use process managers such as PM2 or init systems like systemd. Example commands: pm2 start npm --name my-app -i max -- start
7. CLUSTERING
   - Use Node's cluster module. Master forks worker processes equal to number of CPU cores. Alternatively, use PM2 cluster mode: pm2 start npm --name my-app -i max -- start.
8. CACHING
   - Cache request results using a caching server like Varnish or enabling caching rules in Nginx.
9. LOAD_BALANCING
   - Employ load balancers (Nginx/HAProxy) to distribute traffic; configure session affinity if needed.
10. REVERSE_PROXY
    - Run Express behind a reverse proxy to handle static files, compression, error pages, caching, and load balancing.

FOR EACH TOPIC, IMPLEMENTATION DETAILS INCLUDE EXACT CODE EXAMPLES, CONFIGURATION FILES, COMMAND-LINE FLAGS, AND INIT SYSTEM SETUPS.

## Original Source
Express.js Best Practices for Production
https://expressjs.com/en/advanced/best-practice-performance.html

## Digest of EXPRESS_PERFORMANCE

# Express Production Performance Best Practices

## Things to Do in Your Code

### GZIP_COMPRESSION
Use the compression middleware to gzip responses in production. Example:

const compression = require('compression')
const express = require('express')
const app = express()

app.use(compression())

Note: In high-traffic sites, consider implementing gzip at a reverse proxy level (e.g., Nginx with ngx_http_gzip_module) to offload compression.

### AVOID_SYNCHRONOUS_FUNCTIONS
Always use asynchronous APIs. Avoid synchronous functions which block the event loop. To detect synchronous IO, use the flag:

--trace-sync-io

Example: Replace fs.readFileSync with fs.readFile in production code.

### LOGGING
For debugging, use a module like debug to conditionally log messages controlled by the DEBUG environment variable. For production-level activity logging, use libraries like Pino. Avoid using console.log or console.error directly as these are synchronous when outputting to terminal or files.

### ERROR_HANDLING
Implement robust error handling using try-catch for synchronous code and promise rejection handlers for asynchronous code.

// Example using try-catch in synchronous code
app.get('/search', (req, res) => {
  setImmediate(() => {
    const jsonStr = req.query.params
    try {
      const jsonObj = JSON.parse(jsonStr)
      res.send('Success')
    } catch (e) {
      res.status(400).send('Invalid JSON string')
    }
  })
})

// Example using async/await with promise error handling
app.get('/', async (req, res, next) => {
  try {
    const data = await userData()
    res.send(data)
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message })
})

## Things to Do in Your Environment / Setup

### SET_NODE_ENV_TO_PRODUCTION
Set the environment variable NODE_ENV to 'production' to enable view and static file caching and less verbose error messages. Example with systemd unit file:

[Unit]
Description=<Awesome Express App>

[Service]
Type=simple
ExecStart=/usr/local/bin/node /projects/myapp/index.js
WorkingDirectory=/projects/myapp
User=nobody
Group=nogroup
Environment=NODE_ENV=production
LimitNOFILE=infinity
LimitCORE=infinity
StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target

### ENSURE_AUTOMATIC_RESTART
Use a process manager or init system to restart your application if it crashes. Tools such as PM2 or systemd are recommended.

Example PM2 commands:
pm install -g pm2
pm start npm --name "my-app" -i max -- start

### RUN_IN_CLUSTER
Leverage Node’s clustering or PM2 cluster mode to run multiple instances on multi-core systems. Code example using Node’s cluster module:

const cluster = require('cluster')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died; spawning a new process`)
    cluster.fork()
  })
} else {
  // Worker process: start the Express app
  const express = require('express')
  const app = express()
  app.listen(3000)
}

### CACHE_REQUEST_RESULTS
Implement caching for request responses to reduce processing overhead. Use proxies like Varnish or Nginx for caching HTTP responses.

### LOAD_BALANCING_AND_REVERSE_PROXY
Deploy load balancers (such as Nginx or HAProxy) to distribute traffic among multiple app instances. Use reverse proxy setups to handle static content, error pages, compression and caching.


## Attribution
- Source: Express.js Best Practices for Production
- URL: https://expressjs.com/en/advanced/best-practice-performance.html
- License: MIT License
- Crawl Date: 2025-04-29T04:49:49.835Z
- Data Size: 8600375 bytes
- Links Found: 20152

## Retrieved
2025-04-29
