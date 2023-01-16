export const makeArray = (length, callback = () => null) =>
  Array.from({ length }, callback);

export const defaultToString = () => "";

export const cellStatuses = {
  dormant: "DORMANT",
  correct: "CORRECT",
  inWord: "INWORD",
  wrong: "WRONG",
};

export const createHashMap = (wordArray) => {
  const hashMap = {};

  wordArray.forEach((letter) => {
    if (hashMap[letter]) hashMap[letter]++;
    else hashMap[letter] = 1;
  });

  return hashMap;
};

export const determineStatus = (value, correctWord, correctWordHashMap) => {
  const wordHashMap = createHashMap(value);
  let status = "wrong";
  const statuses = [];

  value.forEach((letter, index) => {
    if (correctWord[index] === letter) {
      status = cellStatuses.correct;
    } else if (
      correctWord.includes(letter) &&
      wordHashMap[letter] > correctWordHashMap[letter]
    ) {
      wordHashMap[letter]--;
      status = cellStatuses.wrong;
    } else if (correctWord.includes(letter)) {
      status = cellStatuses.inWord;
    } else {
      status = cellStatuses.wrong;
    }

    statuses.push(status);
  });

  return statuses;
};
