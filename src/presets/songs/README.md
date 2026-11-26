# Built-in songs

The C# code of the 27 songs built into the
[web studio](https://pstoyanov.net/studio/beats/), exported with the web studio's own code
generator. The app imports each file as text and lists it in [`catalog.ts`](../catalog.ts).

They are also golden files: reading each one with `parseSongCode` and writing it back with
`writeSongCode` must give the exact same text, character for character. That proves the app reads
and writes songs the same way the web studio does.

See [LICENSE.md](./LICENSE.md) for the license of each song.
