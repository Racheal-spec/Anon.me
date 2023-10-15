import React from "react";
import styles from "./Trending.module.css";
import { bookmarkType } from "@/app/Types/posts";

const Trending = ({ title, author, createdAt }: bookmarkType) => {
  return (
    <div className={styles.trendingCardWrapper}>
      <h4>Trending Stories</h4>
      <div className={styles.subDiv}>
        <h5>{title}</h5>
        <div className={styles.smalldiv}>
          <div>
            <p>{author}</p>
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
