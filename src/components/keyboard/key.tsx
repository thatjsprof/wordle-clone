import cx from "classnames";

interface Props {
  value: string;
  normal?: boolean;
  handleClick: (value: string) => void;
  letter: string | React.ReactNode;
}

const Key = ({ letter, normal = true, handleClick, value }: Props) => {
  return (
    <div
      className={cx(
        "flex items-center text-white justify-center rounded cursor-pointer bg-gray-500 h-16",
        {
          "w-10": normal,
          "w-16": !normal,
        }
      )}
      onClick={() => handleClick(value)}
    >
      {letter}
    </div>
  );
};

export default Key;
