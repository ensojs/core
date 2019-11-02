# @ensojs/cli

CLI for the Enso framework

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@ensojs/cli.svg)](https://npmjs.org/package/@ensojs/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@ensojs/cli.svg)](https://npmjs.org/package/@ensojs/cli)
[![License](https://img.shields.io/npm/l/@ensojs/cli.svg)](https://github.com/1a35e1/cli/blob/master/package.json)

<!-- toc -->
* [@ensojs/cli](#ensojscli)
<!-- tocstop -->

## Usage

<!-- usage -->
```sh-session
$ npm install -g @ensojs/cli
$ enso COMMAND
running command...
$ enso (-v|--version|version)
@ensojs/cli/0.7.1 darwin-x64 node-v13.0.1
$ enso --help [COMMAND]
USAGE
  $ enso COMMAND
...
```
<!-- usagestop -->
## Commands

<!-- commands -->
* [`enso hello [FILE]`](#enso-hello-file)
* [`enso help [COMMAND]`](#enso-help-command)

## `enso hello [FILE]`

describe the command here

```
USAGE
  $ enso hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ enso hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/1a35e1/cli/blob/v0.7.1/src/commands/hello.ts)_

## `enso help [COMMAND]`

display help for enso

```
USAGE
  $ enso help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_
<!-- commandsstop -->
