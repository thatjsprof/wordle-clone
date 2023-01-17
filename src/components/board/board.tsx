import { createHashMap } from "helper";
import { useState, useEffect } from "react";
import EmptyRow from "components/row/emptyRow";
import FilledRow from "components/row/filledRow";
import NormalRow from "components/row/normalRow";
import Keyboard from "components/keyboard/keyboard";
import { guessesState, ROW_LENGTH, WORD_LENGTH } from "constants/data";

const Board = () => {
  const [correctWordHashMap, setCorrectWordHashMap] = useState({});
  const [guesses, setGuesses] = useState(guessesState);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [correctWord, setCorrectWord] = useState("");

  const onCompleted = () => {};

  const onEnter = () => {
    const currentWordArray = guesses[currentIndex].wordArray;
    const word = currentWordArray.join("");
    const wordGuessed = word.toLowerCase() === correctWord.toLowerCase();

    setGuesses((prevState) => ({
      ...prevState,
      [currentIndex]: {
        ...prevState[currentIndex],
        submitted: true,
      },
    }));

    if (wordGuessed) {
      onCompleted();
    } else {
      if (currentIndex < ROW_LENGTH) {
        setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);
      }
    }
  };

  const onChar = (letter: string) => {
    setGuesses((prevState) => ({
      ...prevState,
      [currentIndex]: {
        ...prevState[currentIndex],
        wordArray: [...prevState[currentIndex].wordArray, letter],
      },
    }));
  };

  const onDelete = () => {
    setGuesses((prevState) => {
      const currentWordArray = [...prevState[currentIndex].wordArray];
      currentWordArray.pop();

      const updatedState = {
        ...prevState,
        [currentIndex]: {
          ...prevState[currentIndex],
          wordArray: currentWordArray,
        },
      };

      return updatedState;
    });
  };

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(`${process.env.REACT_APP_WORD_URL}`);
      const { word } = await response.json();
      setCorrectWord(word.toUpperCase());
    };

    fetchWord();
  }, []);

  useEffect(() => {
    const hashMap = createHashMap(correctWord.split(""));
    setCorrectWordHashMap(hashMap);
  }, [correctWord]);

  return (
    <div className="container flex flex-col py-16 mx-auto">
      <div className="flex text-white flex-col items-center gap-2">
        {Object.entries(guesses).map(([key, { wordArray, submitted }]) => {
          if (wordArray.length === 0) {
            return <EmptyRow key={key} />;
          } else if (wordArray.length === WORD_LENGTH && submitted) {
            return (
              <FilledRow
                key={key}
                value={wordArray}
                submitted={submitted}
                correctWord={correctWord}
                correctWordHashMap={correctWordHashMap}
              />
            );
          }

          return (
            <NormalRow key={key} value={wordArray} submitted={submitted} />
          );
        })}
      </div>
      <div className="flex justify-center">
        <Keyboard
          onChar={onChar}
          onEnter={onEnter}
          onDelete={onDelete}
          currentWordLength={guesses[currentIndex].wordArray.length}
        />
      </div>
    </div>
  );
};

export default Board;
