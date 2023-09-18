import React, { Suspense } from "react";
import styles from "./page.module.css";
import SearchComp from "./SearchComp";
import Loading from "../Loading";

const Search = () => {
  return (
    <div className={styles.searchWrapper}>
      <Suspense fallback={<Loading />}>
        <SearchComp />
      </Suspense>
    </div>
  );
};

export default Search;
