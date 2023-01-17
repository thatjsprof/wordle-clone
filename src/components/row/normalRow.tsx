import React, { memo } from "react";
import Cell from "components/cell/cell";

interface Props {
  value: string[];
  submitted: boolean;
}

const NormalRow = memo(({ value, submitted }: Props) => {
  const blockValues = [...value, ...Array(5 - value.length).fill("")];

  return (
    <div className="flex gap-2">
      {blockValues.map((val, index) => (
        <Cell value={val} key={index} position={index} submitted={submitted} />
      ))}
    </div>
  );
});

export default NormalRow;
