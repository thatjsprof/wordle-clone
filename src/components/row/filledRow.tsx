import React from "react";
import Cell from "components/cell/cell";
import { determineCellStatus } from "helper";

interface Props {
  value: string[];
  correctWord: string;
  correctWordHashMap: Record<string, number>;
}

const FilledRow = ({ value, correctWord, correctWordHashMap }: Props) => {
  const statuses = determineCellStatus(value, correctWord, correctWordHashMap);

  return (
    <div className="flex gap-2">
      {value.map((val, index) => {
        return <Cell value={val} key={index} status={statuses[index]} />;
      })}
    </div>
  );
};

export default FilledRow;
