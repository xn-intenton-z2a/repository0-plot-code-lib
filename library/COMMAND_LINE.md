# COMMAND_LINE

## Crawl Summary
Bash basics including reading man pages, using text editors (nano, vim, Emacs), file redirection (> , >>, <, 2>&1), globbing and quoting, job control (using &, ctrl-z, jobs, fg/bg), history and alias management, and shell scripting best practices (set -euo pipefail, trap, variable expansion). Also detailed commands for processing files (find, grep, awk, sed), system debugging (top, htop, iostat, vmstat, netstat, ss, lsof), and handling OS specific toolsets for macOS and Windows. Includes exact SSH configuration parameters and command examples for troubleshooting.

## Normalised Extract
Table of Contents:
1. Bash Basics
   - Use of man bash, text editors (nano, vim, Emacs) with examples.
2. Redirection and Expansion
   - Operators: >, >>, <, 2>&1; file globbing with *, quoting, variable expansion (${var:-default}).
3. Job and Process Management
   - Commands: &, ctrl-z, jobs, fg, bg, kill, pgrep, pkill, process substitution example: diff /etc/hosts <(ssh somehost cat /etc/hosts).
4. Command History and Aliases
   - Usage: history, !n, !$, !!; alias definition: alias ll='ls -latr'.
5. Shell Scripting Practices
   - Strict mode commands: set -euo pipefail; trap "echo 'error: Script failed: see failed command above'" ERR; examples of variable and arithmetic expansion.
6. Data Processing and Command Chaining
   - Use of find, grep, xargs (with options -L, -P, -I{}), awk for column summing, and sort/uniq for set operations.
7. System Debugging
   - Tools: top, htop, iostat, vmstat, free, dstat, glances; network tools: netstat, ss, lsof; debugging with strace, ltrace, gdb, examining /proc files, and dmesg.
8. One-Liners
   - Examples include summing columns with awk, diffing JSON with jq and colordiff, and recursive file listings with find -ls.
9. OS Specific Sections
   - macOS: Homebrew, pbcopy/pbpaste, open, mdfind; Windows: Cygwin, WSL, MinGW commands for Unix environments.

Detailed Technical Information:
- Bash command usage: man, type, help, apropos.
- Redirection: example command: some-command >logfile 2>&1, with optional </dev/null.
- Variable expansion: ${name:?error message}, ${name:-default}, arithmetic: i=$(( (i+1)%5 )).
- Process substitution: diff /etc/hosts <(ssh host cat /etc/hosts).
- SSH configuration: TCPKeepAlive=yes, ServerAliveInterval=15, ServerAliveCountMax=6, Compression=yes, ControlMaster auto, ControlPath /tmp/%r@%h:%p, ControlPersist yes.
- Script debugging: include set -x, set -e, set -u, and trap usage.
- Xargs examples: find . -name '*.py' | xargs grep some_function, cat hosts | xargs -I{} ssh root@{} hostname.
- One-liner for summing third column: awk '{ x += $3 } END { print x }' myfile.
- Set operations using sort and uniq commands with proper flags.
- Binary file and encoding tools: hd, hexdump, xxd, iconv, uconv.
- OS-specific adaptations for macOS and Windows environments.

## Supplementary Details
Supplementary Technical Specifications:
- SSH Config Options:
   TCPKeepAlive: yes
   ServerAliveInterval: 15 (seconds)
   ServerAliveCountMax: 6
   Compression: yes
   ControlMaster: auto
   ControlPath: /tmp/%r@%h:%p
   ControlPersist: yes
- Bash Strict Mode Script:
   set -euo pipefail
   trap "echo 'error: Script failed: see failed command above'" ERR
- Redirection Examples:
   Standard output and error: some-command >logfile 2>&1
   Use of process substitution: diff /etc/hosts <(ssh somehost cat /etc/hosts)
- Variable and Arithmetic Expansion:
   Existence check: ${var:?Error message if unset}
   Default usage: ${var:-default}
   Arithmetic: i=$(( (i + 1) % 5 ))
- Xargs Command with Options:
   find . -name '*.py' | xargs -L 1 -P 4 -I{} grep 'pattern' {}
- One-Liner Examples:
   Summing a column: awk '{ x += $3 } END { print x }' myfile
   JSON diff: diff <(jq --sort-keys . file1.json) <(jq --sort-keys . file2.json) | colordiff

## Reference Details
Reference Technical Specifications:
- API-like Commands for Shell Scripting:
   Function: taocl()
     Purpose: Retrieves a random tip from the command line guide.
     Implementation:
       curl -s https://raw.githubusercontent.com/jlevy/the-art-of-command-line/master/README.md |
       sed '/cowsay[.]png/d' |
       pandoc -f markdown -t html |
       xmlstarlet fo --html --dropdtd |
       xmlstarlet sel -t -v "(html/body/ul/li[count(p)>0])[RANDOM mod last()+1]" |
       xmlstarlet unesc |
       fmt -80 |
       iconv -t US
     Parameters: None, returns formatted command tip string.
- Full Shell Command Specifications:
   - Redirection:
         Command: some-command >logfile 2>&1
         Description: Redirects both stdout and stderr to logfile; use </dev/null to detach from terminal.
   - Process Substitution:
         Command: diff /etc/hosts <(ssh somehost cat /etc/hosts)
         Description: Compares a local file with remote file output via ssh.
   - Strict Mode in Bash:
         Script Header:
            set -euo pipefail
            trap "echo 'error: Script failed: see failed command above'" ERR
         Return: Script aborts on first error, prints custom error message.
   - Xargs Options:
         Command: find . -name '*.py' | xargs -L 1 -P 4 -I{} grep 'pattern' {}
         Options:
            -L: Number of lines per execution
            -P: Number of parallel processes
            -I{}: Placeholder substitution
   - SSH Config Sample:
         Settings:
            TCPKeepAlive=yes
            ServerAliveInterval=15
            ServerAliveCountMax=6
            Compression=yes
            ControlMaster auto
            ControlPath /tmp/%r@%h:%p
            ControlPersist yes
         Effect: Maintains persistent, compressed connections with auto-reconnection.
- Troubleshooting Procedures:
   - Use dmesg to check system messages: dmesg | tail
   - Use lsof to identify deleted file handles: lsof | grep deleted
   - Use strace to trace system calls: strace -p <pid>
   - Use diffstat with rsync for file synchronization issues: rsync -r --delete source/ destination/ && diff -r source/ destination/ | diffstat
- Best Practices:
   - Always quote variables: e.g., "$VAR"
   - Use null-delimited file lists with -print0 and xargs -0 in find commands for spaces in filenames.
   - Implement robust error handling in scripts using strict mode and trap.
   - Regularly update SSH configurations for secure and stable remote sessions.

## Information Dense Extract
man bash; nano/vim/emacs; man, apropos, help, type; redirection: >, >>, 2>&1, </dev/null; globbing: *, quoting; variable expansion: ${var:?}, ${var:-default}; arithmetic: $(( (i+1)%5 )); process substitution: diff /etc/hosts <(ssh host cat /etc/hosts); job control: &, ctrl-z, jobs, fg, bg, kill, pgrep, pkill; history: history, !n, !$, !!; alias: alias ll='ls -latr'; xargs: -L 1, -P, -I{}; SSH config: TCPKeepAlive=yes, ServerAliveInterval=15, ServerAliveCountMax=6, Compression=yes, ControlMaster auto, ControlPath /tmp/%r@%h:%p, ControlPersist yes; strict mode: set -euo pipefail, trap "echo 'error: Script failed'" ERR; awk summing: awk '{ x += $3 } END { print x }'; JSON diff: diff <(jq --sort-keys . file1.json) <(jq --sort-keys . file2.json) | colordiff; troubleshooting: dmesg, lsof, strace; OS-specific: macOS (brew, pbcopy, open), Windows (Cygwin, WSL, MinGW)

## Sanitised Extract
Table of Contents:
1. Bash Basics
   - Use of man bash, text editors (nano, vim, Emacs) with examples.
2. Redirection and Expansion
   - Operators: >, >>, <, 2>&1; file globbing with *, quoting, variable expansion (${var:-default}).
3. Job and Process Management
   - Commands: &, ctrl-z, jobs, fg, bg, kill, pgrep, pkill, process substitution example: diff /etc/hosts <(ssh somehost cat /etc/hosts).
4. Command History and Aliases
   - Usage: history, !n, !$, !!; alias definition: alias ll='ls -latr'.
5. Shell Scripting Practices
   - Strict mode commands: set -euo pipefail; trap 'echo 'error: Script failed: see failed command above'' ERR; examples of variable and arithmetic expansion.
6. Data Processing and Command Chaining
   - Use of find, grep, xargs (with options -L, -P, -I{}), awk for column summing, and sort/uniq for set operations.
7. System Debugging
   - Tools: top, htop, iostat, vmstat, free, dstat, glances; network tools: netstat, ss, lsof; debugging with strace, ltrace, gdb, examining /proc files, and dmesg.
8. One-Liners
   - Examples include summing columns with awk, diffing JSON with jq and colordiff, and recursive file listings with find -ls.
9. OS Specific Sections
   - macOS: Homebrew, pbcopy/pbpaste, open, mdfind; Windows: Cygwin, WSL, MinGW commands for Unix environments.

Detailed Technical Information:
- Bash command usage: man, type, help, apropos.
- Redirection: example command: some-command >logfile 2>&1, with optional </dev/null.
- Variable expansion: ${name:?error message}, ${name:-default}, arithmetic: i=$(( (i+1)%5 )).
- Process substitution: diff /etc/hosts <(ssh host cat /etc/hosts).
- SSH configuration: TCPKeepAlive=yes, ServerAliveInterval=15, ServerAliveCountMax=6, Compression=yes, ControlMaster auto, ControlPath /tmp/%r@%h:%p, ControlPersist yes.
- Script debugging: include set -x, set -e, set -u, and trap usage.
- Xargs examples: find . -name '*.py' | xargs grep some_function, cat hosts | xargs -I{} ssh root@{} hostname.
- One-liner for summing third column: awk '{ x += $3 } END { print x }' myfile.
- Set operations using sort and uniq commands with proper flags.
- Binary file and encoding tools: hd, hexdump, xxd, iconv, uconv.
- OS-specific adaptations for macOS and Windows environments.

## Original Source
The Art of Command Line
https://github.com/jlevy/the-art-of-command-line

## Digest of COMMAND_LINE

# The Art of Command Line
Retrieved on: 2023-10-30
Data Size: 1079626 bytes

# Basics
- Use man bash for detailed Bash documentation.
- Text editors: nano, vim, Emacs. Vim example: 'vi filename'.
- Documentation access: man, apropos, help for bash builtins, type command to check executability.

# Redirection and Expansion
- Redirection operators: > (overwrite), >> (append), < for input, 2>&1 to combine stdout and stderr.
- File globbing: use * for matching, quoting (" vs '), variable expansion (${var:-default}).
- Brace and arithmetic expansion: Example: {1..10}, arithmetic i=$(( (i + 1) % 5 )).

# Job and Process Management
- Background jobs: use &, ctrl-z, jobs, fg, bg, kill, pgrep, pkill.
- Process substitution: diff /etc/hosts <(ssh somehost cat /etc/hosts).

# Command History and Aliases
- History commands: history, !n, !$, !!.
- Alias creation: alias ll='ls -latr'.

# Shell Scripting Practices
- Strict modes: set -euo pipefail with trap on ERR, e.g.,
  set -euo pipefail
  trap "echo 'error: Script failed: see failed command above'" ERR
- Variable expansions: ${name:?error}, ${var%suffix} and ${var#prefix}.

# Data Processing and Command Chaining
- Commands: find, grep, awk, sed. Example: find . -name '*.py' | xargs grep some_function.
- Use xargs with options: -L for items per line, -P for parallelism, -I{} for placeholders.

# System Debugging
- Monitoring: top, htop, iostat, vmstat, free, dstat, glances.
- Networking: netstat -lntp, ss, lsof -iTCP -sTCP:LISTEN -P -n.
- Debugging tools: strace, ltrace, gdb, /proc files, dmesg.

# One-Liners and Text Processing
- Set operations with sort/uniq: union, intersection, difference.
- JSON normalization: diff <(jq --sort-keys . file1.json) <(jq --sort-keys . file2.json) | colordiff.
- Example awk summing: awk '{ x += $3 } END { print x }' myfile.

# OS Specific Sections
- macOS: Use brew/port, pbcopy/pbpaste, open, mdfind.
- Windows: Cygwin, WSL, MinGW, Cash; commands like ping, ipconfig, tracert.

# Advanced Usage and Troubleshooting
- SSH configuration example:
      TCPKeepAlive=yes
      ServerAliveInterval=15
      ServerAliveCountMax=6
      Compression=yes
      ControlMaster auto
      ControlPath /tmp/%r@%h:%p
      ControlPersist yes
- Handling long argument lists: use find and xargs when encountering "Argument list too long" error.
- Binary file commands: hd, hexdump, xxd.
- Text encoding conversions: iconv, uconv.

# Attribution
Source: The Art of Command Line by jlevy; retrieved from https://github.com/jlevy/the-art-of-command-line

## Attribution
- Source: The Art of Command Line
- URL: https://github.com/jlevy/the-art-of-command-line
- License: License: CC BY-SA 3.0
- Crawl Date: 2025-04-23T04:50:28.278Z
- Data Size: 1079626 bytes
- Links Found: 5720

## Retrieved
2025-04-23
