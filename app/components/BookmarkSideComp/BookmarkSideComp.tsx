import React, { FC } from "react";
import styles from "./BookmarkSideComp.module.css";
import Button from "../../uikits/Button/button";
import { BOOKMARKS } from "@/app/Routes/RoutesUrl";
import Link from "next/link";
import { useBookmarkValue } from "@/app/context/bookmarkContext";

const BookmarkSideComp = () => {
  const { bookmarkstate } = useBookmarkValue();

  return (
    <div className={styles.bookmarkCardWrapper}>
      <h4>Your Bookmarks</h4>
      {bookmarkstate?.data?.length === 0 ? (
        <p className={styles.emptybookmarks}>No available bookmarks</p>
      ) : (
        <div className={styles.subDiv}>
          {bookmarkstate &&
            bookmarkstate?.data
              ?.map((post) => (
                <div key={post?.post?.id}>
                  <h5>{post?.post?.title}</h5>
                  <div className={styles.smalldiv}>
                    <div>
                      <p>By {post?.user?.anonname}</p>
                    </div>
                  </div>
                </div>
              ))
              .slice(0, 4)}
        </div>
      )}
      <div>
        <Button pinkOutline>
          <Link href={BOOKMARKS}> See all bookmarks</Link>
        </Button>
      </div>
    </div>
  );
};

export default BookmarkSideComp;
