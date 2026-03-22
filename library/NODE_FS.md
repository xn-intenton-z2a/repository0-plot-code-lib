NODE_FS

Table of Contents:
1. Synchronous and asynchronous read APIs
2. CSV loading: exact parsing steps for time,value
3. Handling large files (streaming)
4. CSV quoting and robust parsing notes

1. Synchronous and asynchronous read APIs
- fs.readFileSync(path: string, options?: {encoding: string}) -> string | Buffer
  Example: const csv = fs.readFileSync(path, 'utf8')
- fs.readFile(path, options, callback(err, data)) -> callback-based async
- For Promise style: use fs.promises.readFile(path, 'utf8') -> Promise<string>

2. CSV loading: exact parsing steps and signature
Signature: loadCsvSync(path: string) -> Array<{time: number, value: number}>
Algorithm (synchronous):
  1. const raw = fs.readFileSync(path, 'utf8')
  2. const lines = raw.split(/\r?\n/).filter(Boolean)
  3. If first line contains headers (detect /time\s*,\s*value/i) then remove it
  4. For each line: fields = line.match(/("[^"]*"|[^,]+)(?=,|$)/g) to support simple quoted fields
     let t = fields[0].replace(/^"|"$/g, '').trim(); let v = fields[1].replace(/^"|"$/g, '').trim()
     let timeMs = Number(new Date(t).getTime()); let val = Number(v)
     if (!Number.isFinite(timeMs) || !Number.isFinite(val)) skip or record as NaN per policy
  5. return array of {time: timeMs, value: val}
Notes: the regex above handles basic double-quoted CSV fields and unquoted fields but not all RFC4180 edge cases (embedded newlines inside quoted fields). For full RFC4180 compliance use a CSV parser.

3. Handling large files (streaming)
- Use fs.createReadStream(path) and readline.createInterface({ input: stream }) to iterate lines without loading whole file.
- Signature (async): async function loadCsvStream(path: string): Promise<Array<{time:number, value:number}>> { const rs = fs.createReadStream(path); const rl = readline.createInterface({ input: rs }); for await (const line of rl) { parse line as above } }

4. CSV quoting and robust parsing notes
- For safety: trim fields and remove surrounding quotes before parsing.
- Accept ISO-8601 time strings and Unix timestamps (ms) as the time column; use Date.parse or new Date(str).

Detailed digest
Content retrieved from https://nodejs.org/api/fs.html on 2026-03-22. The Node fs API provides readFileSync, readFile and streams used to implement CSV loading; above are concrete reading and parsing steps to produce a time-series array usable by the plotting code.

Attribution
Source: https://nodejs.org/api/fs.html
Bytes retrieved: 935744
