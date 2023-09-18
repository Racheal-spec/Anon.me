import React from "react";
import styles from "./Mainbody.module.css";
import Profile from "../profile/page";

const Mainbody = () => {
  return (
    <div className={styles.mainbodyStyles}>
      <Profile />
    </div>
  );
};

export default Mainbody;
