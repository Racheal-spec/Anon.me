"use client";
import BookmarkCard from "@/app/components/BookmarkCard/BookmarkCard";
import styles from "./page.module.css";
import { useBookmarkValue } from "@/app/context/bookmarkContext";
const Bookmarks = () => {
  const { bookmarkstate, bookmarkdispatch } = useBookmarkValue();
  console.log(bookmarkstate.data);
  return (
    <div className={styles.bookmarkWrapper}>
      <div>
        <h3>Your Bookmarks</h3>
        <div className={styles.cardWrapper}>
          {bookmarkstate?.data.map((post) => (
            <div key={post.id}>
              <BookmarkCard
                key={post.id}
                title={post.title}
                authorId={post.authorId}
                excerpts={post.excerpts}
                createdAt={post.createdAt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
