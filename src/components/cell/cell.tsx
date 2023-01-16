import cx from "classnames";
import React, { memo } from "react";
import { CellStatuses } from "interfaces/cell";

interface CellProps {
  value: string;
  status?: CellStatuses;
}

const Cell = memo(({ value, status = CellStatuses.dormant }: CellProps) => {
  return (
    <p
      className={cx(
        "flex items-center text-white justify-center border rounded border-gray-500 w-16 h-16",
        {
          "bg-emerald-700": status === CellStatuses.correct,
          "bg-transparent": status === CellStatuses.dormant,
          "bg-yellow-500": status === CellStatuses.inWord,
          "bg-gray-800": status === CellStatuses.wrong,
        }
      )}
    >
      {value}
    </p>
  );
});

export default Cell;
