import React from "react";
import styles from "./page.module.css";
import { UseResizeScreen } from "@/hooks/ResizeScreen";
import { StoriesProp } from "@/app/Types/global";

const TableTitle = ({ title, tags, status, date, action }: StoriesProp) => {
  const isMobile = UseResizeScreen();
  return (
    <div>
      <div className={isMobile ? styles.display : styles.tableheader}>
        <div>
          <h5>{title}</h5>
        </div>
        <div className={styles.secondheaderdiv}>
          <div className={styles.tagsheaderdiv}>
            <h5>{tags}</h5>
          </div>
          <div className={styles.statusheaderdiv}>
            <h5>{status}</h5>
          </div>
          <div className={styles.dateheaderdiv}>
            <h5>{date}</h5>
          </div>
          <div>
            <h5>{action}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableTitle;
