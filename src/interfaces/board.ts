interface WordInterface {
  wordArray: string[];
  submitted: boolean;
}

export type GuessesType = Record<number, WordInterface>;
