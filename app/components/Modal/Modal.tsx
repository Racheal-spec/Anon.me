import React from "react";
import styles from "./modal.module.css";

const Modal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalcontent}>
        <h1>CSS Only Modal</h1>
        <p>
          You can use the :target pseudo-class to create a modals with Zero
          JavaScript. Enjoy!
        </p>
        <a href="#" className={styles.modalclose}>
          &times;
        </a>
      </div>
    </div>
  );
};

export default Modal;
