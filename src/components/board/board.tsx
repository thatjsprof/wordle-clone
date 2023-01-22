import toaster from "utils/toast";
import { useState, useEffect } from "react";
import { createHashMap, mapKeyColors } from "utils/helper";
import { WORDS } from "constants/validWords";
import EmptyRow from "components/row/emptyRow";
import { GuessesType } from "interfaces/board";
import FilledRow from "components/row/filledRow";
import NormalRow from "components/row/normalRow";
import Keyboard from "components/keyboard/keyboard";
import { guessesState, ROW_LENGTH, WORD_LENGTH } from "constants/data";
import { CellStatuses } from "interfaces/cell";

const Board = () => {
  const [keyColors, setKeyColors] = useState<Record<string, CellStatuses>>({});
  const [correctWordHashMap, setCorrectWordHashMap] = useState<
    Record<string, number>
  >({});
  const [guesses, setGuesses] = useState<GuessesType>(guessesState);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [correctWord, setCorrectWord] = useState<string>("");

  const passWord = () => {
    setGuesses((prevState) => ({
      ...prevState,
      [currentIndex]: {
        ...prevState[currentIndex],
        submitted: true,
        valid: true,
      },
    }));
  };

  const reset = () => {
    setTimeout(() => {
      setGuesses(guessesState);
      setCurrentIndex(1);
    }, 1000);
  };

  const onCompleted = () => {
    passWord();
    toaster({ message: "Haha you guessed the word :)", type: "success" });
    reset();
  };

  const onEnter = () => {
    const currentWordArray = guesses[currentIndex].wordArray;
    const word = currentWordArray.join("");
    const wordGuessed = word.toLowerCase() === correctWord.toLowerCase();

    if (wordGuessed) {
      onCompleted();
    } else {
      if (WORDS.includes(word.toLowerCase())) {
        passWord();

        if (currentIndex < ROW_LENGTH) {
          setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);
        } else {
          toaster({
            message: "Haha you couldn't guess the word :)",
            type: "error",
          });
          reset();
        }
      } else {
        setGuesses((prevState) => ({
          ...prevState,
          [currentIndex]: {
            ...prevState[currentIndex],
            submitted: true,
            valid: false,
          },
        }));

        toaster({ message: "Word is not valid", type: "error" });
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
    const keyColors = mapKeyColors(guesses, correctWord, correctWordHashMap);
    setKeyColors(keyColors);
  }, [guesses, correctWord, correctWordHashMap]);

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
        {Object.entries(guesses).map(
          ([key, { wordArray, submitted, valid }]) => {
            if (wordArray.length === 0) {
              return <EmptyRow key={key} />;
            } else if (wordArray.length === WORD_LENGTH && submitted && valid) {
              return (
                <FilledRow
                  key={key}
                  valid={valid}
                  value={wordArray}
                  correctWord={correctWord}
                  correctWordHashMap={correctWordHashMap}
                />
              );
            }

            return <NormalRow key={key} valid={valid} value={wordArray} />;
          }
        )}
      </div>
      <div className="flex justify-center">
        <Keyboard
          onChar={onChar}
          onEnter={onEnter}
          guesses={guesses}
          onDelete={onDelete}
          keyColors={keyColors}
          currentWordLength={guesses[currentIndex].wordArray.length}
        />
      </div>
    </div>
  );
};

export default Board;
