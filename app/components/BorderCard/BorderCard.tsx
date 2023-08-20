import React, { FC } from "react";
import styles from "./BorderCard.module.css";
import Image from "next/image";
import profileimg from "../../Assets/profileimg.png";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentAlt } from "react-icons/lia";

const BorderCard: FC = ({ title, description }) => {
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
            <p>Date</p>
            <h5>{title}</h5>
            <p>{description}</p>
          </div>
          <hr className={styles.hrstyles} />
          <div className={styles.subElementsDiv}>
            <div>
              <p>Name</p>
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
                <BsBookmark />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorderCard;
