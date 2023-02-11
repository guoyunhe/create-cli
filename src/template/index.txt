export interface Options {
  repeat?: number;
}

export function action(word: string, { repeat = 1 }: Options) {
  for (let i = 0; i < Number(repeat); i++) {
    console.log(word);
  }
}
