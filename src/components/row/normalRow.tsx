import React, { memo } from "react";
import Cell from "components/cell/cell";

interface Props {
  valid: boolean;
  value: string[];
}

const NormalRow = memo(({ value, valid }: Props) => {
  const blockValues = [...value, ...Array(5 - value.length).fill("")];

  return (
    <div className="flex gap-2">
      {blockValues.map((val, index) => (
        <Cell value={val} key={index} position={index} valid={valid} />
      ))}
    </div>
  );
});

export default NormalRow;
