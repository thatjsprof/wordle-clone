import React from "react";
import Cell from "components/cell/cell";
import { WORD_LENGTH } from "constants/data";
import { defaultToString, makeArray } from "helper";

const EmptyRow = () => {
  const emptyArray = makeArray(WORD_LENGTH, defaultToString);

  return (
    <div className="flex gap-2">
      {emptyArray.map((val, index) => {
        return <Cell value={val as string} key={index} />;
      })}
    </div>
  );
};

export default EmptyRow;
