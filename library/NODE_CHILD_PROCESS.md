NODE_CHILD_PROCESS

Normalised extract

Table of contents
- Primary APIs: spawn, exec, execFile, fork
- Synchronous variants: spawnSync, execSync, execFileSync
- Options (common and important fields)
- ChildProcess events and methods
- Return/Result shapes for sync functions
- Troubleshooting and best practices

Details
Primary APIs and exact signatures
- spawn(command[, args][, options]) -> ChildProcess
  - command: string (executable or shell command when options.shell is set)
  - args: Array<string> optional
  - options: object optional (see options section)
  - returns: ChildProcess instance with properties pid, stdin, stdout, stderr and methods kill(signal) and send(...)
- exec(command[, options][, callback]) -> ChildProcess
  - command: string executed inside a shell (use exec only for small output)
  - options: object supports cwd, env, shell, timeout, encoding, maxBuffer, killSignal, uid, gid
  - callback signature: (error, stdout, stderr) => void where stdout and stderr are strings or Buffers depending on options.encoding
- execFile(file[, args][, options][, callback]) -> ChildProcess
  - Executes a file directly without a shell; use this to avoid shell interpretation and to pass arguments safely
- fork(modulePath[, args][, options]) -> ChildProcess
  - Spawns a new Node process running the specified module with IPC channel enabled by default when silent is set to true/false as appropriate; options includes execArgv, cwd, env, silent, stdio

Synchronous variants and return shapes
- spawnSync(command[, args][, options]) -> { pid, output, stdout, stderr, status, signal, error }
- execSync(command[, options]) -> Buffer|string depending on options.encoding
- execFileSync(file[, args][, options]) -> Buffer|string
- spawnSync and execSync block the event loop until the child completes; prefer async APIs in production code.

Options (common and important fields)
- cwd: string - working directory for the child process
- env: Object - environment key/value pairs
- stdio: string | Array - stdio configuration, common values 'pipe', 'inherit', ['ignore', 'pipe', 'pipe'] etc
- shell: boolean | string - run command inside a shell when true or using provided shell string
- encoding: string | 'buffer' - controls whether exec/execFile return strings or Buffers; default typically 'utf8' for exec callbacks and Buffer for sync variants unless set
- timeout: number - maximum execution time in milliseconds; child will be killed with killSignal on timeout
- maxBuffer: number - maximum allowed stdout+stderr for exec/execFile before the child is terminated and an error is returned; increase or use spawn for streaming output
- detached: boolean - if true, child will be in a separate process group
- uid/gid: number - set user/group identity for the child (POSIX only)

ChildProcess events and methods
- Events emitted by ChildProcess instances:
  'spawn' - emitted when the child process has spawned
  'error' - emitted if the process could not be spawned or killed
  'message' - emitted on IPC messages (forked processes)
  'exit' - emitted with (code, signal) when the process exits
  'close' - emitted when stdio streams are closed, with (code, signal)
- Important methods and properties:
  child.pid -> number
  child.kill([signal]) -> boolean
  child.send(message[, sendHandle[, options]][, callback]) -> boolean (when IPC channel exists)
  child.stdin, child.stdout, child.stderr -> stream objects for piping data

Troubleshooting and best practices
- Use spawn when streaming data or when child outputs are large; use exec only for short commands producing small output to avoid maxBuffer problems.
- For cross-platform predictable behaviour, avoid shell-specific features unless options.shell is explicitly set and accounted for on Windows.
- To capture full output reliably, pipe stdout/stderr and consume them rather than relying on exec callback buffers.
- If exec returns 'maxBuffer exceeded' increase maxBuffer or switch to spawn for streaming.
- When using fork for Node modules, use the returned IPC channel for structured messages; forked processes communicate via child.send and 'message' events.

Reference details (concrete signatures)
- spawn(command: string, args?: string[], options?: object) -> ChildProcess
- exec(command: string, options?: object, callback?: (error: Error|null, stdout: string|Buffer, stderr: string|Buffer) => void) -> ChildProcess
- execFile(file: string, args?: string[], options?: object, callback?: (error: Error|null, stdout: string|Buffer, stderr: string|Buffer) => void) -> ChildProcess
- fork(modulePath: string, args?: string[], options?: object) -> ChildProcess
- spawnSync(command: string, args?: string[], options?: object) -> { pid, output, stdout, stderr, status, signal, error }
- execSync(command: string, options?: object) -> Buffer | string

Detailed digest
- Source: https://nodejs.org/api/child_process.html
- Retrieved: 2026-03-20
- Bytes obtained (HTTP content-length): 449494
- Extract (condensed): Node.js child_process exposes spawn/exec/execFile/fork plus synchronous variants; spawn streams I/O and returns ChildProcess with pid and stdio streams; exec buffers output via callback and is limited by maxBuffer; fork is specialized for Node-to-Node IPC; options include cwd, env, stdio, shell, timeout, maxBuffer, detached, uid/gid; events include spawn, error, message, exit, close.

Attribution
- Source URL: https://nodejs.org/api/child_process.html
- Retrieved: 2026-03-20
- Bytes fetched: 449494
