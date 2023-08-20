import React, { FC } from "react";
import styles from "./Trending.module.css";

const Trending: FC = ({ title, name, date }) => {
  return (
    <div className={styles.trendingCardWrapper}>
      <h4>Trending Stories</h4>
      <div className={styles.subDiv}>
        <h5>{title}</h5>
        <div className={styles.smalldiv}>
          <div>
            <p>{name}</p>
          </div>
          <div className={styles.dateDiv}>
            <p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
