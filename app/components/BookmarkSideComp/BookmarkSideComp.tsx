import React, { FC } from "react";
import styles from "./BookmarkSideComp.module.css";
import Button from "../Button/button";
import { BOOKMARKS } from "@/app/RoutesUrl";
import { useRouter } from "next/navigation";

const BookmarkSideComp: FC = ({ title, name }) => {
  let Router = useRouter();
  const handleRoute = () => {
    Router.push(BOOKMARKS);
  };
  return (
    <div className={styles.bookmarkCardWrapper}>
      <h4>Your Bookmarks</h4>
      <div className={styles.subDiv}>
        <h5>{title}</h5>
        <div className={styles.smalldiv}>
          <div>
            <p>By {name}</p>
          </div>
        </div>
      </div>
      <div>
        <Button pinkOutline onClick={handleRoute}>
          See all bookmarks
        </Button>
      </div>
    </div>
  );
};

export default BookmarkSideComp;
