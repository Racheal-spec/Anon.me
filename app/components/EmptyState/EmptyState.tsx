import Image from "next/image";
import React from "react";
import styles from "./EmptyState.module.css";
import empty_state from "../../Assets/images/empty_state.svg";

const EmptyState = () => {
  return (
    <div>
      <div className={styles.emptystateImgDiv}>
        <Image
          src={empty_state}
          className={styles.emptystateImg}
          alt="empty_blog"
        />
        <h2>No Available Post</h2>
        <p>
          There's no story available at the moment, kindly check back later!
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
