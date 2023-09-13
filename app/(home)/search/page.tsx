import React from "react";
import styles from "./page.module.css";
import SearchComp from "./SearchComp";

const Search = () => {
  return (
    <div className={styles.searchWrapper}>
      <SearchComp />
    </div>
  );
};

export default Search;
