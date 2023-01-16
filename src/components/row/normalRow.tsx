import Cell from "components/cell/cell";
import React, { memo } from "react";

interface Props {
  value: string[];
}

const NormalRow = memo(({ value }: Props) => {
  const blockValues = [...value, ...Array(5 - value.length).fill("")];

  return (
    <div className="flex gap-2">
      {blockValues.map((val, index) => (
        <Cell value={val} key={index} />
      ))}
    </div>
  );
});

export default NormalRow;
