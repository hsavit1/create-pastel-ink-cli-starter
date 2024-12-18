# hello-world CLI application with commander, ink, and pastel

> A terminal application that captures keyboard input records the key presses

## Install

```bash
# fetch packages
$ npm i

# build
$ npm run build

# run in watch mode to collect keyboard input
$ npm run start

# test
# this will format the code, build the project, and run the tests
$ npm run test
```

## Features

- Real-time keyboard input detection (without echo)
- ASCII character output to terminal
- Terminal screen clearing
- Support for special keys (Q, UP, LEFT, DOWN, RETURN, etc.)

## CLI

```
$ hello-world --help

  Usage
    $ hello-world

  Options
    --raw     Enable raw keyboard input mode

  Examples
    $ hello-world
    [Starts in raw input mode, ready for keyboard input]
```

## Key Controls

- Any printable ASCII character: Displays in terminal
- CTRL+C: Exit application
- q: Quit application
