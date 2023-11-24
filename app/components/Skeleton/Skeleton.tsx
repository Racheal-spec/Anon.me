import React from "react";
import styles from "./Skeleton.module.css";
import classNames from "classnames";
const Skeleton = () => {
  return (
    <div className={styles.skeletonBorder}>
      <div className={styles.firstMainDiv}>
        <div className={classNames(styles.imageDiv, styles.skeleton)}></div>
        <div className={styles.descWrapper}>
          <div className={classNames(styles.skeleton, styles.date)}></div>
          <div className={classNames(styles.skeleton, styles.title)}></div>
          <div className={classNames(styles.skeleton, styles.desc)}></div>
          <div className={classNames(styles.skeleton, styles.desc)}></div>
          <div className={classNames(styles.skeleton, styles.desc)}></div>
          <div className={styles.divider}></div>
          <div className={styles.bottomDesc}>
            <div className={classNames(styles.skeleton, styles.name)}></div>
            <div className={styles.rightsideStyle}>
              <div
                className={classNames(styles.skeleton, styles.comments)}
              ></div>
              <div className={classNames(styles.skeleton, styles.likes)}></div>
              <div
                className={classNames(styles.skeleton, styles.bookmark)}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
