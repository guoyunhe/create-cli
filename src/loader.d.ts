// Declare types for esbuild loaders
declare module '*.txt' {
  const content: string;
  export default content;
}
