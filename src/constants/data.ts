import { makeArray } from "utils/helper";
import { GuessesType } from "interfaces/board";

export const WORD_LENGTH = 5;
export const ROW_LENGTH = 6;
export const REVEAL_TIME = 5;

export const WORD = "FLEES";

export const guessesState = makeArray(ROW_LENGTH).reduce((acc, _, index) => {
  return {
    ...acc,
    [index + 1]: {
      valid: false,
      wordArray: [],
      submitted: false,
    },
  };
}, {} as GuessesType);

export const keyboardKeys = {
  firstRow: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  secondRow: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  thirdRow: ["Z", "X", "C", "V", "B", "N", "M"],
};
