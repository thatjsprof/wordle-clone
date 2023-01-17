import cx from "classnames";
import React, { memo } from "react";
import { REVEAL_TIME } from "constants/data";
import { CellStatuses } from "interfaces/cell";

interface CellProps {
  value: string;
  position?: number;
  submitted?: boolean;
  status?: CellStatuses;
}

const Cell = memo(
  ({
    value,
    submitted,
    position = 0,
    status = CellStatuses.dormant,
  }: CellProps) => {
    const animationDelay = `${position * REVEAL_TIME}ms`;

    return (
      <p
        style={{ animationDelay }}
        className={cx(
          `flex items-center text-white justify-center border rounded border-gray-500 w-16 h-16`,
          {
            "bg-emerald-700": status === CellStatuses.correct,
            "bg-transparent": status === CellStatuses.dormant,
            "bg-yellow-500": status === CellStatuses.inWord,
            "bg-gray-800": status === CellStatuses.wrong,
            "cell-fill-animation": value && !submitted,
          }
        )}
      >
        {value}
      </p>
    );
  }
);

export default Cell;
