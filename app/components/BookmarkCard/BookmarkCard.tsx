"use client";
import React, { useState } from "react";
import styles from "./BookmarkCard.module.css";
import Image from "next/image";
import profileimg from "../../Assets/images/profileimg.png";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentAlt } from "react-icons/lia";
import { bookmarkType } from "@/app/Types/posts";
import Link from "next/link";
import { POSTDETAILS } from "@/app/Routes/RoutesUrl";
import { FormatDate } from "@/app/services/formatDate";
import { MdOutlineDelete } from "react-icons/md";
import { deleteBookmark } from "@/app/context/Actions/Actions";
import { userValue } from "@/app/context/userContext";
import { toast } from "react-toastify";

const BookmarkCard = ({
  excerpts,
  title,
  createdAt,
  author,
  id,
}: bookmarkType) => {
  const [show, setShow] = useState(false);
  const { state } = userValue();

  const handleDelete = async () => {
    let deletedBookmark = await deleteBookmark({
      user: state?.user?.data.id ?? "",
      post: id ?? "",
    });

    if (deletedBookmark?.status === 200) {
      toast.success("Story successfully deleted!");
    } else {
      toast.error(deletedBookmark?.message);
    }
  };

  return (
    <div
      className={styles.cardWrapper}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
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
          <h4>{author}</h4>
          <p>{FormatDate(createdAt)}</p>
        </div>
      </div>
      <Link href={POSTDETAILS(id as string)}>
        <h4 className={styles.mainHeading}>{title}</h4>
        <p className={styles.desc}>{excerpts && excerpts?.slice(0, 120)}</p>
      </Link>

      <div className={styles.secondSubDiv}>
        {show && (
          <div onClick={handleDelete}>
            <MdOutlineDelete
              className={styles.deleteicon}
              color="red"
              fontSize="large"
            />
          </div>
        )}
        <div className={styles.flex}>
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
    </div>
  );
};

export default BookmarkCard;
