import {
  makeArray,
  cellStatuses,
  defaultToString,
  determineStatus,
  createHashMap,
} from "./helper";
import "./App.css";
import cx from "classnames";
import React, { useState, memo, useEffect, useCallback } from "react";

const WORD_LENGTH = 5;
const ROW_LENGTH = 6;

const Cell = memo(({ value, status = cellStatuses.dormant }) => {
  return (
    <p
      className={cx(
        "flex items-center text-white justify-center border rounded border-gray-500 w-16 h-16",
        {
          "bg-emerald-700": status === cellStatuses.correct,
          "bg-transparent": status === cellStatuses.dormant,
          "bg-yellow-500": status === cellStatuses.inWord,
          "bg-gray-800": status === cellStatuses.wrong,
        }
      )}
    >
      {value}
    </p>
  );
});

const FilledBlock = ({ value, correctWord, correctWordHashMap }) => {
  const statuses = determineStatus(value, correctWord, correctWordHashMap);

  return (
    <div className="flex gap-2">
      {value.map((val, index) => {
        return <Cell value={val} key={index} status={statuses[index]} />;
      })}
    </div>
  );
};

const EmptyBlock = () => {
  const emptyArray = makeArray(WORD_LENGTH, defaultToString);

  return (
    <div className="flex gap-2">
      {emptyArray.map((val, index) => {
        return <Cell value={val} key={index} />;
      })}
    </div>
  );
};

const Block = memo(({ value }) => {
  const blockValues = [...value, ...Array(5 - value.length).fill("")];

  return (
    <div className="flex gap-2">
      {blockValues.map((val, index) => (
        <Cell value={val} key={index} />
      ))}
    </div>
  );
});

const guessesState = makeArray(ROW_LENGTH).reduce((acc, _, index) => {
  return {
    ...acc,
    [index + 1]: {
      wordArray: [],
      submitted: false,
    },
  };
}, {});

const WORD = "FLEES";

function App() {
  const [correctWordHashMap, setCorrectWordHashMap] = useState({});
  const [guesses, setGuesses] = useState(guessesState);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [correctWord, setCorrectWord] = useState("");

  const handleUpdate = useCallback(
    ({ key }) => {
      const letter = key.toUpperCase();
      const currentWordArray = guesses[currentIndex].wordArray;

      if (currentWordArray.length < WORD_LENGTH) {
        // Refactor and abstract to it's own function
        setGuesses((prevState) => ({
          ...prevState,
          [currentIndex]: {
            ...prevState[currentIndex],
            wordArray: [...prevState[currentIndex].wordArray, letter],
          },
        }));
      } else if (letter === "ENTER") {
        // Abstract to it's own function
        setGuesses((prevState) => ({
          ...prevState,
          [currentIndex]: {
            ...prevState[currentIndex],
            submitted: true,
          },
        }));
        const word = currentWordArray.join("");

        if (word.toLowerCase() === correctWord.toLowerCase()) {
          // Set game to completed
        } else {
          setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);
        }
      }
    },
    [guesses, currentIndex, correctWord]
  );

  useEffect(() => {
    setCorrectWord(WORD);
  }, []);

  useEffect(() => {
    const hashMap = createHashMap(correctWord.split(""));

    setCorrectWordHashMap(hashMap);
  }, [correctWord]);

  // Move to a different component
  useEffect(() => {
    window.addEventListener("keydown", handleUpdate);

    return () => {
      window.removeEventListener("keydown", handleUpdate);
    };
  }, [handleUpdate]);

  return (
    <div className="App">
      <div className="flex text-white flex-col items-center gap-2">
        {Object.entries(guesses).map(([key, { wordArray, submitted }]) => {
          if (wordArray.length === 0) {
            return <EmptyBlock key={key} />;
          } else if (wordArray.length === WORD_LENGTH && submitted) {
            return (
              <FilledBlock
                key={key}
                value={wordArray}
                correctWord={correctWord}
                correctWordHashMap={correctWordHashMap}
              />
            );
          }

          return <Block key={key} value={wordArray} />;
        })}
      </div>
    </div>
  );
}

export default App;
