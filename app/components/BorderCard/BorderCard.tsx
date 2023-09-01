import React, { FC, useEffect, useState } from "react";
import styles from "./BorderCard.module.css";
import Image from "next/image";
import profileimg from "../../Assets/profileimg.png";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentAlt } from "react-icons/lia";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { useBookmarkValue } from "@/app/context/bookmarkContext";
import { bookmarkType } from "@/app/Types/posts";
import { BookmarkTypes } from "@/app/Types/reducerTypes";

const BorderCard = ({
  title,
  excerpts,
  id,
  authorId,
  createdAt,
}: bookmarkType) => {
  const { bookmarkstate, bookmarkdispatch } = useBookmarkValue();
  const [bookmarked, setBookmarked] = useState(false);

  const handleDispatch = () => {
    if (bookmarkdispatch) {
      bookmarkdispatch({
        type: BookmarkTypes.SetBookmarks,
        payload: {
          data: {
            title,
            excerpts,
            id,
            authorId,
            createdAt,
          },
        },
      });
    }
    console.log("reacheddd");
  };

  useEffect(() => {
    let bmList = bookmarkstate.data.find((val) => {
      return val.id === id;
    });
    if (bmList) {
      setBookmarked(true);
    }
  }, []);

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardDiv}>
        <div className={styles.imgDiv}>
          <Image
            src={profileimg}
            priority={true}
            className={styles.blogimg}
            alt="blog-image"
          />
        </div>
        <div className={styles.descWrapper}>
          <div className={styles.descDiv}>
            <p>{createdAt}</p>
            <h5>{title}</h5>
            <p>{excerpts}</p>
          </div>
          <hr className={styles.hrstyles} />
          <div className={styles.subElementsDiv}>
            <div>
              <p>By: {authorId}</p>
            </div>
            <div className={styles.secondSubDiv}>
              <div className={styles.flex}>
                <LiaCommentAlt />
                <p> 0 comments</p>
              </div>
              <div className={styles.flex}>
                <AiOutlineLike />
                <p>likes</p>
              </div>
              <div className={styles.flex}>
                {bookmarked ? (
                  <BsFillBookmarkCheckFill
                    className={styles.disabledBookmark}
                  />
                ) : (
                  <BsBookmark onClick={handleDispatch} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorderCard;
