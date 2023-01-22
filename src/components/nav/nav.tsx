import cx from "classnames";
import {
  Cog8ToothIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import React, { useState } from "react";
import Modal from "components/modal/modal";
import { CellStatuses } from "interfaces/cell";
import ToggleInner from "components/toggle/toggle";

const Example = ({
  status,
  value,
}: {
  status: CellStatuses;
  value: string;
}) => {
  return (
    <p
      className={cx(
        `flex items-center text-white justify-center  border rounded border-gray-500 w-10 h-10`,
        {
          "bg-emerald-700": status === CellStatuses.correct,
          "bg-yellow-400": status === CellStatuses.inWord,
          "bg-gray-300": status === CellStatuses.dormant,
          "bg-gray-800": status === CellStatuses.wrong,
        }
      )}
    >
      {value}
    </p>
  );
};

const firstWord = [
  { letter: "W", status: CellStatuses.correct },
  { letter: "E", status: CellStatuses.dormant },
  { letter: "A", status: CellStatuses.dormant },
  { letter: "R", status: CellStatuses.dormant },
  { letter: "Y", status: CellStatuses.dormant },
];

const secondWord = [
  { letter: "P", status: CellStatuses.dormant },
  { letter: "I", status: CellStatuses.inWord },
  { letter: "L", status: CellStatuses.dormant },
  { letter: "L", status: CellStatuses.dormant },
  { letter: "S", status: CellStatuses.dormant },
];

const thirdWord = [
  { letter: "V", status: CellStatuses.dormant },
  { letter: "A", status: CellStatuses.dormant },
  { letter: "G", status: CellStatuses.dormant },
  { letter: "U", status: CellStatuses.wrong },
  { letter: "E", status: CellStatuses.dormant },
];

const Nav = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showHowTo, setShowHowTo] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const onCheck = () => setChecked((prevChecked) => !prevChecked);

  const onClick = (modal: "settings" | "howToPlay", type = false) => {
    if (modal === "settings") setShowSettings(type);
    else if (modal === "howToPlay") setShowHowTo(type);
  };

  return (
    <nav className="border-b flex text-white justify-between p-5 items-center border-gray-500">
      <div className="menu w-20"></div>
      <div className="logo w-20">Word Play</div>
      <div className="options flex justify-end gap-3 w-20">
        <span onClick={() => onClick("howToPlay", true)}>
          <InformationCircleIcon className="h-6 w-6 cursor-pointer" />
        </span>
        <span onClick={() => onClick("settings", true)}>
          <Cog8ToothIcon className="h-6 w-6 cursor-pointer" />
        </span>
      </div>
      <Modal
        size="sm"
        title="Settings"
        id="settingsModal"
        show={showSettings}
        onClose={() => onClick("settings")}
        footerContent={
          <div className="flex justify-between items-center w-full">
            <p className="text-slate-400">&copy; 2023 Word Play</p>
            <p>With Love, David.</p>
          </div>
        }
      >
        <div className="flex justify-between items-center">
          <p>Dark Theme</p>
          <ToggleInner label="" checked={checked} onChange={onCheck} />
        </div>
      </Modal>
      <Modal
        size="md"
        show={showHowTo}
        title="How To Play"
        id="howToPlayModal"
        onClose={() => onClick("howToPlay")}
        footerContent={
          <div className="flex justify-between items-center">
            <p>
              Have Feedback? Reach me on{" "}
              <a
                className="text-sky-500"
                href="https://twitter.com/aj_davetech"
              >
                Twitter
              </a>
            </p>
          </div>
        }
      >
        <div>
          <h3 className="font-semibold">Guess the word in 6 tries</h3>
          <ul className="ml-5 mt-3 list-disc list-outside">
            <li>Each guess must be a valid 5 letter word</li>
            <li>
              The color of the tiles will change to show how close your guess
              was to the word
            </li>
          </ul>
          <div className="mt-5">
            <h3 className="mb-4 font-semibold">Examples</h3>
            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                {firstWord.map(({ letter, status }, index) => {
                  return <Example key={index} status={status} value={letter} />;
                })}
              </div>
              W is in the word and in the correct spot
            </div>
            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                {secondWord.map(({ letter, status }, index) => {
                  return <Example key={index} status={status} value={letter} />;
                })}
              </div>
              I is in the word but in the wrong spot
            </div>
            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                {thirdWord.map(({ letter, status }, index) => {
                  return <Example key={index} status={status} value={letter} />;
                })}
              </div>
              U is not in the word and in any spot
            </div>
          </div>
          <div className="mt-10">
            A new puzzle is released at midnight. Enjoy :{")"}
          </div>
        </div>
      </Modal>
    </nav>
  );
};

export default Nav;
