import React from "react";
import Cell from "components/cell/cell";
import { determineCellStatus } from "utils/helper";

interface Props {
  valid: boolean;
  value: string[];
  correctWord: string;
  correctWordHashMap: Record<string, number>;
}

const FilledRow = ({
  value,
  valid,
  correctWord,
  correctWordHashMap,
}: Props) => {
  const statuses = determineCellStatus(value, correctWord, correctWordHashMap);

  return (
    <div className="flex gap-2">
      {value.map((val, index) => {
        return (
          <Cell
            value={val}
            key={index}
            valid={valid}
            status={statuses[index]}
          />
        );
      })}
    </div>
  );
};

export default FilledRow;
