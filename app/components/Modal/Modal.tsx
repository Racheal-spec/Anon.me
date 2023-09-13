import React from "react";
import styles from "./modal.module.css";

const Modal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalcontent}>
        <a href="#" className={styles.modalclose}>
          &times;
        </a>
      </div>
    </div>
  );
};

export default Modal;
