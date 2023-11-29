import React, { ReactElement, ReactNode } from "react";
import styles from "./modal.module.css";
import { UseClickOutside } from "@/app/hooks/ClickOutside";

type ModalProp = {
  children: ReactNode;
  handlefunction: () => void;
};
const Modal = ({ children, handlefunction }: ModalProp) => {
  const ref = UseClickOutside(handlefunction);
  const handleClose = () => {
    handlefunction();
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modalcontent} ref={ref}>
        {children}
        <div className={styles.modalclose} onClick={handleClose}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default Modal;
