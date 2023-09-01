"use client";
import React from "react";
import styles from "./BookmarkCard.module.css";
import Image from "next/image";
import profileimg from "../../Assets/profileimg.png";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentAlt } from "react-icons/lia";
import { bookmarkType } from "@/app/Types/posts";

const BookmarkCard = ({
  excerpts,
  title,
  createdAt,
  authorId,
}: bookmarkType) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.profileWrapper}>
        <div>
          {!profileimg ? (
            <div className={styles.profile_img}>
              <BsFillPersonFill />
            </div>
          ) : (
            <Image
              className={styles.profile_img}
              src={profileimg}
              width={40}
              height={40}
              alt="profile-icon"
            />
          )}
        </div>
        <div className={styles.nameDiv}>
          <h4>{authorId}</h4>
          <p>{createdAt}</p>
        </div>
      </div>
      <h4 className={styles.mainHeading}>{title}</h4>
      <p className={styles.desc}>{excerpts}</p>

      <div className={styles.secondSubDiv}>
        <div className={styles.flex}>
          <LiaCommentAlt />
          <p> 0 comments</p>
        </div>
        <div className={styles.flex}>
          <AiOutlineLike />
          <p>likes</p>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
