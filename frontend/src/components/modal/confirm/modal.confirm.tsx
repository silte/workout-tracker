import React, { useState } from "react";
import Modal from "../modal";
import ModalConfirmActions from "./modal.confirm.actions";
import ModalConfirmHeader from "./modal.confirm.header";

interface IProps {
  accentColor?: "pink" | "red" | "green" | "blue";
  children?: string | React.ReactNode | Element;
  label: string;
  modalOpenButtonLabel: string;
  onConfirm(): void | boolean | Promise<boolean>;
  submitButtonLabel: string;
}

const ModalConfirm = ({
  children,
  label,
  modalOpenButtonLabel,
  onConfirm,
  submitButtonLabel,
  accentColor,
}: IProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => setIsOpen(!isOpen);
  const handleConfirm = async () => {
    if ((await onConfirm()) === false) return;
    handleToggleOpen();
  };
  return (
    <Modal
      modalOpenButtonLabel={modalOpenButtonLabel}
      toggleOpen={handleToggleOpen}
      isOpen={isOpen}
      accentColor={accentColor}
    >
      <ModalConfirmHeader label={label}>{children}</ModalConfirmHeader>
      <ModalConfirmActions
        submitButtonLabel={submitButtonLabel}
        onCancel={handleToggleOpen}
        onConfirm={handleConfirm}
      />
    </Modal>
  );
};

export default ModalConfirm;
