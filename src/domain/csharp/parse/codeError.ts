/** A mistake in the song's code, on a line counted from 1, with a message for the person writing it. */
export class CodeError extends Error {
  constructor(
    readonly line: number,
    message: string,
  ) {
    super(message);
    this.name = 'CodeError';
  }
}
