interface WordInterface {
  wordArray: string[];
  submitted: boolean;
  valid: boolean;
}

export type GuessesType = Record<number, WordInterface>;
