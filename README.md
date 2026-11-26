# PetarByte Beats

A music studio for Android and iOS where the beat is also code. Build a pattern on the grid and
the song is written as C# right next to it; edit the code and the grid follows.

This is the mobile version of [PetarByte Beats](https://pstoyanov.net/studio/beats/), the
in-browser studio on pstoyanov.net.

> **Status: early development.** The project foundation is in place (tooling, tests, CI). The
> studio features below are being ported from the web version.

## Roadmap

- [x] Song model, read from and written as C# code exactly as the web studio does
- [ ] Two-way sync between the grid and the code
- [ ] Audio engine: synthesized drums and instruments, sampled grand piano
- [ ] Channel rack and step sequencer with swing
- [ ] Piano roll with scales, chords and velocity
- [ ] Mixer: volume, pan, reverb, delay, filter and sidechain
- [ ] Patterns and song arrangement
- [x] Built-in example songs
- [ ] Code view in other programming languages
- [ ] Undo and redo
- [ ] In-app coach

## Tech stack

- [Expo](https://expo.dev) SDK 58 and React Native 0.88
- TypeScript in strict mode
- [React Native Audio API](https://docs.swmansion.com/react-native-audio-api/) for the sound engine
- Jest with [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- ESLint and Prettier

## Getting started

Requirements: Node.js 22 (see `.nvmrc`), npm, and Android Studio or Xcode.

The sound engine is native code, so the app runs as a
[development build](https://docs.expo.dev/develop/development-builds/introduction/), not in Expo
Go. The first run builds it and installs it on a connected device or emulator:

```bash
npm install
npx expo run:android   # or: npx expo run:ios
```

After that, `npm start` is enough until a native dependency changes.

## Scripts

| Command                | What it does                           |
| ---------------------- | -------------------------------------- |
| `npm start`            | Start the Expo dev server              |
| `npm test`             | Run the test suite                     |
| `npm run typecheck`    | Type-check the project with TypeScript |
| `npm run lint`         | Lint with ESLint                       |
| `npm run format`       | Format all files with Prettier         |
| `npm run format:check` | Check formatting without changing it   |
| `npm run lint:secrets` | Scan the whole project for secrets     |

## Differences from the web studio

The app mirrors the web studio. Where it differs, it is on purpose:

- **The master bus has a soft clipper instead of a compressor.** React Native Audio API has no
  `DynamicsCompressorNode` yet, so the web studio's glue compressor is left out and its limiter is
  replaced by a wave shaper that bends peaks under full scale. Dense mixes sound a little less
  glued together.
- **The sidechain duck starts from where the last one has got to.** The web studio reads the level
  when it schedules a kick, a little ahead of time, so a kick that lands while the last duck is
  still swelling back can click there.
- **Durations round before they are split**, so 59.6 seconds reads 1:00, not 0:60.

## Quality and security

- **Pre-commit hook:** every commit is scanned for secrets with
  [secretlint](https://github.com/secretlint/secretlint), and staged files are linted and
  formatted.
- **CI:** type checking, linting, format check and tests run on every push and pull request.
- **Secret scanning in CI:** [gitleaks](https://github.com/gitleaks/gitleaks) scans the full git
  history on every push and once a week.
- **No secrets in the repository.** Configuration comes from environment variables; see
  `.env.example`.

## License

The source code is licensed under the [MIT License](./LICENSE).

## Author

Petar Stoyanov · [pstoyanov.net](https://pstoyanov.net)
