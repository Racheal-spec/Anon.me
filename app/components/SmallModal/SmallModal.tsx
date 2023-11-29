import React, { ReactElement, ReactNode } from "react";
import styles from "./SmallModal.module.css";
import { UseClickOutside } from "@/app/hooks/ClickOutside";
import { postType } from "@/app/Types/posts";
import { SmallModalProp } from "@/app/Types/global";

const SmallModal = ({ handlefunction, children }: SmallModalProp) => {
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
