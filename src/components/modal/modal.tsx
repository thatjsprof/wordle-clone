import ReactDOM from "react-dom";
import React, { useEffect, useRef } from "react";
import { Modal, ModalProps } from "flowbite-react";

type ModalMainProps = React.PropsWithChildren<{}>;
type ModalInnerProps = React.PropsWithChildren<
  {
    title?: string;
    closeIcon?: boolean;
    footerContent?: React.ReactElement;
  } & ModalProps
>;

const ModalMain = ({ children }: ModalMainProps) => {
  const documentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    documentRef.current = document.body;
  });

  if (!documentRef.current) return null;

  return ReactDOM.createPortal(children, documentRef.current);
};

const ModalInner = ({
  title,
  children,
  footerContent,
  closeIcon = false,
  ...props
}: ModalInnerProps) => {
  return (
    <ModalMain>
      <Modal {...props}>
        {title && (
          <Modal.Header>
            <span>{title}</span>
          </Modal.Header>
        )}

        <Modal.Body className="p-5">{children}</Modal.Body>

        {footerContent && <Modal.Footer>{footerContent}</Modal.Footer>}
      </Modal>
    </ModalMain>
  );
};

export default ModalInner;
