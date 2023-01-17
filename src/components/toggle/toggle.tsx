import { ToggleSwitch, ToggleSwitchProps } from "flowbite-react";

type ToggleProps = ToggleSwitchProps & {};

const ToggleInner = ({ ...props }: ToggleProps) => {
  return <ToggleSwitch {...props} />;
};

export default ToggleInner;
