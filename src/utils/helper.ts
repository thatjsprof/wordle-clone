import { GuessesType } from "interfaces/board";
import { CellStatuses } from "interfaces/cell";

export const makeArray = (length: number, callback?: () => string) =>
  Array.from({ length }, callback ? callback : () => null);

export const defaultToString = () => "";

export const createHashMap = (wordArray: string[]) => {
  const hashMap: Record<string, number> = {};

  wordArray.forEach((letter) => {
    if (hashMap[letter]) hashMap[letter]++;
    else hashMap[letter] = 1;
  });

  return hashMap;
};

export const determineCellStatus = (
  value: string[],
  correctWord: string,
  correctWordHashMap: Record<string, number>
) => {
  const wordHashMap = createHashMap(value);
  let status = CellStatuses.wrong;
  const statuses: CellStatuses[] = [];

  value.forEach((letter, index) => {
    if (correctWord[index] === letter) {
      status = CellStatuses.correct;
    } else if (
      correctWord.includes(letter) &&
      wordHashMap[letter] > correctWordHashMap[letter]
    ) {
      wordHashMap[letter]--;
      status = CellStatuses.wrong;
    } else if (correctWord.includes(letter)) {
      status = CellStatuses.inWord;
    } else {
      status = CellStatuses.wrong;
    }

    statuses.push(status);
  });

  return statuses;
};

export const mapKeyColors = (
  guesses: GuessesType,
  correctWord: string,
  correctWordHashMap: Record<string, number>
) => {
  const keyObject: Record<string, CellStatuses> = {};

  Object.values(guesses).forEach(({ wordArray, submitted, valid }) => {
    if (submitted && valid) {
      const cellStatuses = determineCellStatus(
        wordArray,
        correctWord,
        correctWordHashMap
      );

      wordArray.forEach(
        (letter, index) => (keyObject[letter] = cellStatuses[index])
      );
    }
  });

  return keyObject;
};

export const determineColorClass = (status: CellStatuses) => {
  switch (status) {
    case CellStatuses.correct:
      return "bg-emerald-700";
    case CellStatuses.dormant:
      return "bg-transparent";
    case CellStatuses.inWord:
      return "bg-yellow-400";
    case CellStatuses.wrong:
      return "bg-gray-800";
    default:
      return "bg-gray-400";
  }
};

export const validLetterCode = (letter: string) => {
  const letterCode = letter.charCodeAt(0);
  return letterCode >= 65 && letterCode <= 90;
};
