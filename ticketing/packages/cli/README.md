cli
===



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cli.svg)](https://npmjs.org/package/cli)
[![Downloads/week](https://img.shields.io/npm/dw/cli.svg)](https://npmjs.org/package/cli)
[![License](https://img.shields.io/npm/l/cli.svg)](https://github.com/guillermocorrea/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @tinis/cli
$ tinis-cli COMMAND
running command...
$ tinis-cli (-v|--version|version)
@tinis/cli/0.0.1 darwin-x64 node-v12.18.3
$ tinis-cli --help [COMMAND]
USAGE
  $ tinis-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`tinis-cli hello [NAME]`](#tinis-cli-hello-name)
* [`tinis-cli help [COMMAND]`](#tinis-cli-help-command)
* [`tinis-cli package [FILE]`](#tinis-cli-package-file)

## `tinis-cli hello [NAME]`

describe the command here

```
USAGE
  $ tinis-cli hello [NAME]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ tinis-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/guillermocorrea/MicroservicesWorkspace/blob/v0.0.1/src/commands/hello.ts)_

## `tinis-cli help [COMMAND]`

display help for tinis-cli

```
USAGE
  $ tinis-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `tinis-cli package [FILE]`

describe the command here

```
USAGE
  $ tinis-cli package [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/package.ts](https://github.com/guillermocorrea/MicroservicesWorkspace/blob/v0.0.1/src/commands/package.ts)_
<!-- commandsstop -->
