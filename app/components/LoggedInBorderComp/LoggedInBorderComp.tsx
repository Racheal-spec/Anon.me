import React, { FC } from "react";
import styles from "./LoggedInComp.module.css";

type LoggedInBorderType = {
  title: string;
  description: string;
};
const LoggedInBorderComp = ({ title, description }: LoggedInBorderType) => {
  return (
    <div className={styles.compBorderWrapper}>
      <div className={styles.compDiv}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default LoggedInBorderComp;
