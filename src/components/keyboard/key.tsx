import cx from "classnames";
import { CellStatuses } from "interfaces/cell";
import { determineColorClass } from "utils/helper";

interface Props {
  value: string;
  normal?: boolean;
  color?: CellStatuses;
  isDisabled?: boolean;
  letter: string | React.ReactNode;
  handleClick: (value: string) => void;
}

const Key = ({ color, value, letter, handleClick, normal = true }: Props) => {
  console.log(determineColorClass(color as CellStatuses), value);
  return (
    <div
      onClick={() => handleClick(value)}
      className={cx(
        `flex items-center text-white justify-center rounded cursor-pointer h-16 ${determineColorClass(
          color as CellStatuses
        )}`,
        {
          "w-10": normal,
          "w-16": !normal,
        }
      )}
    >
      {letter}
    </div>
  );
};

export default Key;
