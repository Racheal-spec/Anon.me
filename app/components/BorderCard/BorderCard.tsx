import React, { FC, useEffect, useState } from "react";
import styles from "./BorderCard.module.css";
import Image from "next/image";
import profileimg from "../../Assets/images/profileimg.png";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentAlt } from "react-icons/lia";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { useBookmarkValue } from "@/app/context/bookmarkContext";
import { bookmarkType } from "@/app/Types/posts";
import { BookmarkTypes } from "@/app/Types/reducerTypes";
import Link from "next/link";
import { POSTDETAILS } from "@/app/Routes/RoutesUrl";
import { FormatDate } from "@/app/services/formatDate";
import emptypost from "../../Assets/images/emptypost.png";

const BorderCard = ({
  title,
  excerpts,
  id,
  postimage,
  author,
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
            author,
            createdAt,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (bookmarkstate?.data.length !== 0) {
      let bmList = bookmarkstate?.data?.find((val) => {
        return val.id === id;
      });
      if (bmList) {
        setBookmarked(true);
      }
    }
  }, [bookmarkstate]);

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardDiv}>
        <div className={styles.imgDiv}>
          <Image
            src={postimage ?? emptypost}
            priority={true}
            width="100"
            height="20"
            className={styles.blogimg}
            alt="blog-image"
          />
        </div>
        <div className={styles.descWrapper}>
          <Link href={POSTDETAILS(id as string)}>
            <div className={styles.descDiv}>
              <p>{FormatDate(createdAt)}</p>
              <h5>{title}</h5>
              <p>{excerpts}</p>
            </div>
          </Link>
          <hr className={styles.hrstyles} />
          <div className={styles.subElementsDiv}>
            <div>
              <p>By: {author}</p>
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
