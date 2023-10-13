"use client";
import BookmarkCard from "@/app/components/BookmarkCard/BookmarkCard";
import styles from "./page.module.css";
import { useBookmarkValue } from "@/app/context/bookmarkContext";
import EmptyState from "@/app/components/EmptyState/EmptyState";
import { postType } from "@/app/Types/posts";

const Bookmarks = () => {
  const { bookmarkstate, bookmarkdispatch } = useBookmarkValue();

  return (
    <div className={styles.bookmarkWrapper}>
      <div>
        <h3>Your Bookmarks</h3>

        {bookmarkstate?.data?.length === 0 ? (
          <EmptyState
            heading="No Bookmarks Yet"
            description="Save your favourite posts here for future references."
          />
        ) : (
          <div className={styles.cardWrapper}>
            {bookmarkstate &&
              bookmarkstate?.data?.map((post) => (
                <div key={post.id}>
                  <BookmarkCard
                    key={post.id}
                    id={post.id}
                    title={post.post.title}
                    author={post.post.author}
                    excerpts={`${post.post.content?.slice(0, 80)}...`}
                    createdAt={post.post.createdAt}
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
