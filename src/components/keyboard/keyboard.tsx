import { WORD_LENGTH } from "constants/data";
import React, { useEffect, useCallback } from "react";

interface Props {
  onEnter: () => void;
  onDelete: () => void;
  currentWordLength: number;
  onChar: (letter: string) => void;
}

const Keyboard = ({ currentWordLength, onEnter, onChar, onDelete }: Props) => {
  const onClick = () => {};

  const listener = useCallback(
    ({ key }: KeyboardEvent) => {
      const letter = key.toUpperCase();
      const letterCode = letter.charCodeAt(0);
      const validLetterCode = letterCode >= 65 && letterCode <= 90;

      if (letter === "ENTER" && currentWordLength === WORD_LENGTH) {
        onEnter();
      } else if (letter === "BACKSPACE") {
        onDelete();
      } else if (
        validLetterCode &&
        letter.length === 1 &&
        currentWordLength < WORD_LENGTH
      ) {
        onChar(letter);
      }
    },
    [onEnter, onDelete, onChar, currentWordLength]
  );

  useEffect(() => {
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [listener]);

  return (
    <div className="mt-10">
      <p>Keyboard</p>
    </div>
  );
};

export default Keyboard;
