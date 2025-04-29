# EXPRESS_PERFORMANCE

## Crawl Summary
Express production guidelines include code improvements such as using gzip compression middleware (or handling at reverse proxy level), avoiding synchronous functions by using asynchronous alternatives and flags like --trace-sync-io, structured logging with debug or Pino, and robust error handling using try-catch and promise rejection propagation. Environment setup recommendations cover NODE_ENV production settings, automatic restart via systemd or process managers like PM2, clustering for scalability, caching strategies, load balancing, and reverse proxy configurations.

## Normalised Extract
Table of Contents:
  1. Code Best Practices
    a. Gzip Compression: Use compression middleware (app.use(compression())) and consider reverse proxy settings in Nginx.
    b. Avoid Synchronous Functions: Always choose asynchronous APIs; use --trace-sync-io for detection.
    c. Logging: Use debug module for debugging and Pino for production logging.
    d. Exception Handling: Implement try-catch for synchronous operations and use async/await with error propagation via next(err) for asynchronous code.

  2. Environment Configuration
    a. NODE_ENV Production: Set NODE_ENV to production to enable caching and reduce error verbosity; use systemd unit file "Environment=NODE_ENV=production".
    b. Auto Restart: Use process managers/PM2 or systemd to automatically restart the app on crashes with appropriate commands.

  3. Scalability and Performance
    a. Clustering: Use Node’s cluster module or PM2's cluster mode (e.g., pm2 start npm --name my-app -i max -- start) to run multiple instances.
    b. Caching: Implement caching via Varnish or Nginx to store request responses.
    c. Load Balancing & Reverse Proxy: Use load balancers (e.g., Nginx/HAProxy) for distributing incoming traffic and offloading tasks from Express.

Each section provides concrete code examples and configuration snippets that developers can directly incorporate into production-level Express applications.

## Supplementary Details
Gzip Compression Implementation:
  - Code: const compression = require('compression'); app.use(compression());
  - Reverse proxy alternative using Nginx (refer to ngx_http_gzip_module documentation).

NODE_ENV Configuration:
  - Set environment variable in systemd unit file: Environment=NODE_ENV=production
  - Benefits: caches view templates, CSS files, and reduces verbose error messages. Improves performance by up to 3x.

Automatic Restart and Cluster Setup:
  - Process Manager Example (PM2):
      Command: pm2 start npm --name my-app -i max -- start
      Scaling Commands: pm2 scale my-app +3 or pm2 scale my-app 2
  - Systemd Unit File Example provided with ExecStart and Restart=always.

Error Handling Patterns:
  - Synchronous Code: Use try-catch around JSON.parse operations.
  - Asynchronous Code: Use async/await with proper error forwarding via next(err).

Logging Best Practices:
  - Use logging libraries like Pino for asynchronous logging to file or external systems.

Avoiding Synchronous Pitfalls:
  - Avoid synchronous methods on modules and use asynchronous alternatives to maintain high throughput in production.

## Reference Details
API Specifications and Code Examples:

1. Compression Middleware
   - Method: app.use(compression())
   - Parameter: No parameters; middleware compresses HTTP response bodies.
   - Return: Middleware function to process requests.

2. Error Handling in Routes
   - Synchronous Example:
       Route: app.get('/search', handler)
       Handler Code:
         setImmediate(() => {
           const jsonStr = req.query.params
           try {
             const jsonObj = JSON.parse(jsonStr)
             res.send('Success')
           } catch (e) {
             res.status(400).send('Invalid JSON string')
           }
         })
       - Pattern: Use try-catch for synchronous exceptions.

   - Asynchronous Example:
       Route: app.get('/', async (req, res, next) => {
         const data = await userData()  // userData returns a Promise
         res.send(data)
       })
       Error Middleware:
         app.use((err, req, res, next) => {
           res.status(err.status ?? 500).send({ error: err.message })
         })

3. PM2 Cluster Mode Commands
   - Start Cluster Mode:
         pm2 start npm --name my-app -i max -- start
   - Scale Up:
         pm2 scale my-app +3
   - Scale to specific count:
         pm2 scale my-app 2

4. Systemd Unit File Specification
   - File: /etc/systemd/system/myservice.service
   - Contents:
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
   - Effect: Ensures app auto-restarts and runs under production settings.

5. Logging Library Example
   - For debugging: Install debug (npm install debug) and use as follows:
         const debug = require('debug')('app:startup')
         debug('Debugging message');
   - For production: Use Pino (npm install pino) to initialize asynchronous logging.

Troubleshooting Procedures:
   - Use --trace-sync-io flag to detect synchronous I/O operations:
         node --trace-sync-io app.js
   - If using PM2, check logs with:
         pm2 logs my-app
   - For systemd managed services, view status with:
         systemctl status myservice.service
         journalctl -u myservice.service

6. SDK Method Signatures (Express API):
   - app.METHOD(path, callback):
         METHOD: get, post, put, delete etc.
         path: string route
         callback: function(req: Request, res: Response, next?: Function) => void
   - Error Handling Middleware Signature:
         function(err: any, req: Request, res: Response, next: Function): void

All above code examples and configurations are exact and complete for implementation without further reference.

## Information Dense Extract
Express Production Best Practices: Use compression middleware (app.use(compression())) or reverse proxy (Nginx with ngx_http_gzip_module); avoid synchronous functions, use async APIs with --trace-sync-io for detection; logging with debug/Pino; error handling via try-catch for sync and async/await with next(err) for async; set NODE_ENV=production (systemd: Environment=NODE_ENV=production) for caching and performance boost; auto restart via process managers or systemd (unit file sample provided); clustering using Node cluster module or PM2 (commands: pm2 start npm --name my-app -i max -- start, pm2 scale my-app +3); caching with Varnish/Nginx; load balancing and reverse proxy for distribution; API signatures: app.METHOD(path, callback) and error middleware function(err, req, res, next); complete systemd unit file and troubleshooting commands (pm2 logs, systemctl status, journalctl).

## Sanitised Extract
Table of Contents:
  1. Code Best Practices
    a. Gzip Compression: Use compression middleware (app.use(compression())) and consider reverse proxy settings in Nginx.
    b. Avoid Synchronous Functions: Always choose asynchronous APIs; use --trace-sync-io for detection.
    c. Logging: Use debug module for debugging and Pino for production logging.
    d. Exception Handling: Implement try-catch for synchronous operations and use async/await with error propagation via next(err) for asynchronous code.

  2. Environment Configuration
    a. NODE_ENV Production: Set NODE_ENV to production to enable caching and reduce error verbosity; use systemd unit file 'Environment=NODE_ENV=production'.
    b. Auto Restart: Use process managers/PM2 or systemd to automatically restart the app on crashes with appropriate commands.

  3. Scalability and Performance
    a. Clustering: Use Nodes cluster module or PM2's cluster mode (e.g., pm2 start npm --name my-app -i max -- start) to run multiple instances.
    b. Caching: Implement caching via Varnish or Nginx to store request responses.
    c. Load Balancing & Reverse Proxy: Use load balancers (e.g., Nginx/HAProxy) for distributing incoming traffic and offloading tasks from Express.

Each section provides concrete code examples and configuration snippets that developers can directly incorporate into production-level Express applications.

## Original Source
Express.js Best Practices for Production
https://expressjs.com/en/advanced/best-practice-performance.html

## Digest of EXPRESS_PERFORMANCE

# Express Performance and Production Best Practices

Retrieved Date: 2023-10-24

## Code Best Practices

### Use Gzip Compression
- Install compression middleware: require('compression')
- Middleware usage:
  const compression = require('compression')
  const express = require('express')
  const app = express()

  app.use(compression())

Notes:
- For high-traffic systems, enable compression at the reverse proxy (e.g., Nginx via ngx_http_gzip_module) to reduce overhead.

### Avoid Synchronous Functions
- Always use asynchronous versions of Node functions to prevent blocking the event loop.
- Use the command-line flag `--trace-sync-io` during testing/development to detect inadvertent synchronous calls.

### Correct Logging Techniques
- For debugging: use a specialized module (e.g., debug) instead of console.log.
- For production logging: use asynchronous logging libraries like Pino to log API calls and application events.

### Exception Handling
- Employ try-catch for synchronous code such as JSON parsing:
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

- For asynchronous operations, use promises or async/await with error propagation via next(err):
  app.get('/', async (req, res, next) => {
    const data = await userData()
    res.send(data)
  })

- Central error handling middleware example:
  app.use((err, req, res, next) => {
    res.status(err.status ?? 500).send({ error: err.message })
  })

### What Not To Do
- Do not attach listeners to the uncaughtException event or use domains, as these practices can lead to unstable state.

## Environment and Ops Best Practices

### Setting NODE_ENV to "production"
- Set environment variable NODE_ENV=production to enable:
  - View templates caching
  - CSS file caching
  - Reduced error verbosity
- Example using systemd:
  In /etc/systemd/system/myservice.service:

    [Service]
    Environment=NODE_ENV=production

### Ensure Automatic Restart
- Use process managers (e.g., PM2) or init systems (systemd) to restart the app when it crashes.
- Example systemd unit file:

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

### Running in a Cluster

#### Using Node’s cluster module:
- Fork worker processes for each CPU core. Restart workers on crash with cluster.fork().

#### Using PM2:
- Start in cluster mode:
  $ pm2 start npm --name my-app -i max -- start
- Scale dynamically:
  $ pm2 scale my-app +3
  $ pm2 scale my-app 2

### Cache Request Results
- Utilize caching solutions like Varnish or Nginx caching to store common responses.

### Using a Load Balancer and Reverse Proxy
- Set up a load balancer (e.g., using Nginx or HAProxy) to distribute load across multiple app instances.
- Use a reverse proxy to handle compression, error pages, caching and serve static content, thereby offloading from Express.

## Additional Implementation Details

### Express Application Starter Code Example

    const express = require('express')
    const app = express()
    const port = 3000

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })

This code is the base for an Express app running in production settings after applying the above best practices.

## Attribution

- Source: Express.js Best Practices for Production (https://expressjs.com/en/advanced/best-practice-performance.html)
- Data Size: 2242690 bytes


## Attribution
- Source: Express.js Best Practices for Production
- URL: https://expressjs.com/en/advanced/best-practice-performance.html
- License: MIT License
- Crawl Date: 2025-04-29T18:52:02.683Z
- Data Size: 2242690 bytes
- Links Found: 8252

## Retrieved
2025-04-29
