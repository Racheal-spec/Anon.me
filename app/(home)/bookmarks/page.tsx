"use client";
import BookmarkCard from "@/app/components/BookmarkCard/BookmarkCard";
import styles from "./page.module.css";
import { useBookmarkValue } from "@/app/context/bookmarkContext";
import Image from "next/image";
import empty_state from "../../Assets/images/empty_state.svg";
const Bookmarks = () => {
  const { bookmarkstate, bookmarkdispatch } = useBookmarkValue();
  console.log(bookmarkstate.data);
  return (
    <div className={styles.bookmarkWrapper}>
      <div>
        <h3>Your Bookmarks</h3>

        {bookmarkstate.data.length === 0 ? (
          <div className={styles.emptystateImgDiv}>
            <div>
              <Image
                src={empty_state}
                className={styles.emptystateImg}
                alt="empty_blog"
              />
            </div>
            <div>
              <h2>No Bookmarks Yet</h2>
              <p>Save your favourite posts here for future references.</p>
            </div>
          </div>
        ) : (
          <div className={styles.cardWrapper}>
            {bookmarkstate &&
              bookmarkstate?.data?.map((post) => (
                <div key={post.id}>
                  <BookmarkCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    author={post.author}
                    excerpts={post.excerpts}
                    createdAt={post.createdAt}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
