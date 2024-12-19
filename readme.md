# Basic hello-world CLI application with commander, ink, and pastel

> A terminal application that captures keyboard input records the key presses

# Packages used

- [commander](https://www.npmjs.com/package/commander)
- [ink](https://www.npmjs.com/package/ink)
- [pastel](https://www.npmjs.com/package/pastel)
- [zod](https://www.npmjs.com/package/zod)
- [ink-testing-library](https://github.com/vadimdemedes/ink-testing-library)
- [ink-ui](https://github.com/vadimdemedes/ink-ui)
- [ink-big-text](https://github.com/vadimdemedes/ink-big-text)
- [ink-gradient](https://github.com/vadimdemedes/ink-gradient)
- [typescript](https://www.npmjs.com/package/typescript)
- [ava](https://www.npmjs.com/package/ava)
- [eslint](https://www.npmjs.com/package/eslint)
- [prettier](https://www.npmjs.com/package/prettier)
- [rimraf](https://www.npmjs.com/package/rimraf)

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

## Key Controls

- Any printable ASCII character: Displays in terminal
- CTRL+C: Exit application
- q: Quit application
- c: Clear terminal screen
