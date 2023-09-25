import React, { ReactElement, ReactNode } from "react";
import styles from "./SmallModal.module.css";
import { UseClickOutside } from "@/hooks/ClickOutside";
import { postType } from "@/app/Types/posts";

type SmallModalProp = {
  handlefunction: () => void;
  children: ReactNode;
  modalitem: postType;
};
const SmallModal = ({
  handlefunction,
  children,

  modalitem,
}: SmallModalProp) => {
  const ref = UseClickOutside(handlefunction);
  return (
    <>
      <div className={styles.modalDiv} ref={ref}>
        {children}
      </div>
    </>
  );
};

export default SmallModal;
