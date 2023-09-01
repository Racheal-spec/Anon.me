import React, { FC } from "react";
import styles from "./Trending.module.css";
import { bookmarkType } from "@/app/Types/posts";

const Trending = ({ title, authorId, createdAt }: bookmarkType) => {
  return (
    <div className={styles.trendingCardWrapper}>
      <h4>Trending Stories</h4>
      <div className={styles.subDiv}>
        <h5>{title}</h5>
        <div className={styles.smalldiv}>
          <div>
            <p>{authorId}</p>
          </div>
          <div className={styles.dateDiv}>
            <p>{createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
