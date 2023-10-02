import React from "react";
import styles from "./page.module.css";
import { UseResizeScreen } from "@/hooks/ResizeScreen";

type StatusProp = {
  allpost: number;
  published: number;
};
const StatusComp = ({ allpost, published }: StatusProp) => {
  const isMobile = UseResizeScreen();
  return (
    <div className={styles.secondheader}>
      <div className={styles.countsDiv}>
        <div className={styles.dividerWrapper}>
          <div>
            {" "}
            <p>All({allpost})</p>
          </div>
          <div>
            <hr className={styles.divider} />
          </div>
        </div>
        <div className={styles.dividerWrapper}>
          <div>
            <p>Published({published})</p>
          </div>
        </div>
      </div>
      <div className={isMobile ? styles.display : styles.statusDiv}>
        <div className={styles.colorDiv}>
          <div>
            <p>Status: &nbsp;</p>
          </div>
          <div className={styles.green}></div>
          <div>
            <p>Published</p>
          </div>
        </div>

        <hr className={styles.divider} />
        <div className={styles.colorDiv}>
          <div className={styles.orange}></div>
          <div>
            <p>Unpublished</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusComp;
