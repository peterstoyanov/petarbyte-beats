# Contributing

Thanks for your interest in PetarByte Beats. This guide describes how changes are made in this
repository.

## Workflow

1. Create a branch from `main`, named after the change: `feat/piano-roll`, `fix/swing-timing`,
   `docs/readme-setup`.
2. Make small, focused commits.
3. Open a pull request into `main`. Direct pushes to `main` are blocked.
4. The pull request can be merged once the CI and secret-scan checks pass.

## Commit messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>: <summary in the imperative, lowercase, no period>

<optional body: why the change was made>
```

Common types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`.

Each commit should do one thing and leave the project in a working state.

## Code

- TypeScript in strict mode. Avoid `any` and type assertions.
- Install packages with `npx expo install <package>` so their versions match the Expo SDK.
- Never commit secrets. Configuration comes from environment variables; see `.env.example`.

## Tests

Tests live next to the code they cover, named `<file>.test.ts` or `<file>.test.tsx`. Import the
test APIs explicitly from `@jest/globals`.

Before opening a pull request, run:

```bash
npm run typecheck
npm run lint
npm run format:check
npm test
```

The pre-commit hook scans staged files for secrets and lints and formats them automatically.
