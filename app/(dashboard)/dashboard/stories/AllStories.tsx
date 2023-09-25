import React, { ReactElement } from "react";
import styles from "./page.module.css";
import { StoriesProp } from "@/app/Types/global";

const AllStories = ({ title, tags, status, date, action }: StoriesProp) => {
  return (
    <div className={styles.bodystyle}>
      <div>
        <h4>{title}</h4>
      </div>
      <div className={styles.seconddiv}>
        <div className={styles.tagsbody}>
          <p>{tags}</p>
        </div>
        <div className={styles.statusbody}>{status}</div>
        <div className={styles.datebody}>
          <p>{date}</p>
        </div>
        <div className={styles.actionbody}>{action}</div>
      </div>
    </div>
  );
};

export default AllStories;
