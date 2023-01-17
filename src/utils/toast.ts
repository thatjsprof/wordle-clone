import toast from "react-hot-toast";

type ToastTypes = "success" | "error";

interface Props {
  message: string;
  type: ToastTypes;
}

const toaster = ({ message, type }: Props) => {
  return toast[type](message);
};

export default toaster;
