import Image from "next/image";
import React from "react";
import styles from "./EmptyState.module.css";
import empty_state from "../../Assets/images/empty_state.svg";
import { EmptyStateProp } from "@/app/Types/global";

const EmptyState = ({ heading, description }: EmptyStateProp) => {
  return (
    <div className={styles.emptystatewrapper}>
      <div className={styles.emptystateImgDiv}>
        <Image
          src={empty_state}
          className={styles.emptystateImg}
          alt="empty_blog"
        />
        <h2>{heading}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
