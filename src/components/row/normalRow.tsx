import React, { memo } from "react";
import Cell from "components/cell/cell";

interface Props {
  valid: boolean;
  value: string[];
  submitted: boolean;
}

const NormalRow = memo(({ value, valid, submitted }: Props) => {
  const blockValues = [...value, ...Array(5 - value.length).fill("")];

  if (submitted && !valid) {
    console.log("Word is not valid");
  }

  return (
    <div className="flex gap-2">
      {blockValues.map((val, index) => (
        <Cell value={val} key={index} position={index} valid={valid} />
      ))}
    </div>
  );
});

export default NormalRow;
