import React, { FC } from "react";
import styles from "./LoggedInComp.module.css";

const LoggedInBorderComp: FC = ({ title, description }) => {
  return (
    <div className={styles.compBorderWrapper}>
      <div className={styles.compDiv}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default LoggedInBorderComp;
