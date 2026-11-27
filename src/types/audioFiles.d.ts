/** An audio file bundled with the app: Metro gives it an asset id, which the decoder resolves. */
declare module '*.mp3' {
  const asset: number;
  export default asset;
}
