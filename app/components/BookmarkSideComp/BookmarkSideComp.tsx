import React, { FC } from "react";
import styles from "./BookmarkSideComp.module.css";
import Button from "../Button/button";
import { BOOKMARKS } from "@/app/RoutesUrl";
import Link from "next/link";
import { useBookmarkValue } from "@/app/context/bookmarkContext";

const BookmarkSideComp = () => {
  const { bookmarkstate } = useBookmarkValue();

  return (
    <div className={styles.bookmarkCardWrapper}>
      <h4>Your Bookmarks</h4>
      <div className={styles.subDiv}>
        {bookmarkstate.data.map((post) => (
          <div key={post.id}>
            <h5>{post.title}</h5>
            <div className={styles.smalldiv}>
              <div>
                <p>By {post.authorId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Button pinkOutline>
          <Link href={BOOKMARKS}> See all bookmarks</Link>
        </Button>
      </div>
    </div>
  );
};

export default BookmarkSideComp;
