import { makeArray } from "helper";
import { GuessesType } from "interfaces/board";

export const WORD_LENGTH = 5;
export const ROW_LENGTH = 6;

export const WORD = "FLEES";

export const guessesState = makeArray(ROW_LENGTH).reduce((acc, _, index) => {
  return {
    ...acc,
    [index + 1]: {
      wordArray: [],
      submitted: false,
    },
  };
}, {} as GuessesType);
