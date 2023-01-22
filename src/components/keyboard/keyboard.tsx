import { keyboardKeys, WORD_LENGTH } from "constants/data";
import { BackspaceIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useCallback } from "react";
import { validLetterCode } from "utils/helper";
import { CellStatuses } from "interfaces/cell";
import { GuessesType } from "interfaces/board";
import Key from "./key";

interface Props {
  onEnter: () => void;
  guesses: GuessesType;
  onDelete: () => void;
  currentWordLength: number;
  onChar: (letter: string) => void;
  keyColors: Record<string, CellStatuses>;
}

const Keyboard = ({
  onChar,
  onEnter,
  onDelete,
  keyColors,
  currentWordLength,
}: Props) => {
  const { firstRow, secondRow, thirdRow } = keyboardKeys;

  const onClick = (letter: string) => {
    if (letter === "ENTER" && currentWordLength === WORD_LENGTH) {
      onEnter();
    } else if (letter === "BACKSPACE") {
      onDelete();
    } else if (
      validLetterCode(letter) &&
      letter.length === 1 &&
      currentWordLength < WORD_LENGTH
    ) {
      onChar(letter);
    }
  };

  const listener = useCallback(
    ({ key }: KeyboardEvent) => {
      const letter = key.toUpperCase();

      if (letter === "ENTER" && currentWordLength === WORD_LENGTH) {
        onEnter();
      } else if (letter === "BACKSPACE") {
        onDelete();
      } else if (
        validLetterCode(letter) &&
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
    <div className="keyboard flex flex-col gap-2 items-center mt-10">
      <div className="flex gap-2">
        {firstRow.map((char) => {
          return (
            <Key
              key={char}
              value={char}
              letter={char}
              handleClick={onClick}
              color={keyColors?.[char]}
            />
          );
        })}
      </div>
      <div className="flex gap-2">
        {secondRow.map((char) => {
          return (
            <Key
              key={char}
              value={char}
              letter={char}
              handleClick={onClick}
              color={keyColors?.[char]}
            />
          );
        })}
      </div>
      <div className="flex gap-2">
        <Key
          value="ENTER"
          letter="ENTER"
          normal={false}
          handleClick={onClick}
        />
        {thirdRow.map((char) => {
          return (
            <Key
              key={char}
              value={char}
              letter={char}
              handleClick={onClick}
              color={keyColors?.[char]}
            />
          );
        })}
        <Key
          normal={false}
          value="BACKSPACE"
          handleClick={onClick}
          letter={<BackspaceIcon className="h-6 w-6" />}
        />
      </div>
    </div>
  );
};

export default Keyboard;
