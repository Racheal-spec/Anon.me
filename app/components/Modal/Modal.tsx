import React, { ReactElement, ReactNode } from "react";
import styles from "./modal.module.css";
import { UseClickOutside } from "@/hooks/ClickOutside";

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
        <a href="#" className={styles.modalclose} onClick={handleClose}>
          &times;
        </a>
      </div>
    </div>
  );
};

export default Modal;
