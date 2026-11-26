# PetarByte Beats

A music studio for Android and iOS where the beat is also code. Build a pattern on the grid and
the song is written as C# right next to it; edit the code and the grid follows.

This is the mobile version of [PetarByte Beats](https://pstoyanov.net/studio/beats/), the
in-browser studio on pstoyanov.net.

> **Status: early development.** The project foundation is in place (tooling, tests, CI). The
> studio features below are being ported from the web version.

## Roadmap

- [ ] Song model with two-way sync between the grid and the C# code
- [ ] Audio engine: synthesized drums and instruments, sampled grand piano
- [ ] Channel rack and step sequencer with swing
- [ ] Piano roll with scales, chords and velocity
- [ ] Mixer: volume, pan, reverb, delay, filter and sidechain
- [ ] Patterns and song arrangement
- [ ] Built-in example songs
- [ ] Code view in other programming languages
- [ ] Undo and redo
- [ ] In-app coach

## Tech stack

- [Expo](https://expo.dev) SDK 58 and React Native 0.88
- TypeScript in strict mode
- Jest with [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- ESLint and Prettier

## Getting started

Requirements: Node.js 22 (see `.nvmrc`) and npm.

```bash
npm install
npm start
```

Then open the app on a device or simulator from the Expo CLI menu.

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

The original songs and loops are not code. They are licensed under
[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/): free to share and adapt for
non-commercial use with credit, and commercial use needs the author's written permission. Each
folder with such content has a `LICENSE.md` that lists its files. The classical pieces are
public-domain compositions.

## Author

Petar Stoyanov · [pstoyanov.net](https://pstoyanov.net)
