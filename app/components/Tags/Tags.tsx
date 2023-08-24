import React from "react";
import styles from "./Tags.module.css";

export const tagsArray = ["tech", "domestic abuse", "monday", "ambassador"];
const Tags = () => {
  return (
    <section>
      <div>
        <h6 className={styles.tagsHeader}>TAGS</h6>
      </div>
      <p className={styles.desc}>All your set tags will appear here.</p>
      <div className={styles.tagWrapper}>
        {tagsArray.map((tag, index) => (
          <div className={styles.tagdiv} key={index}>
            <p>{tag}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tags;
