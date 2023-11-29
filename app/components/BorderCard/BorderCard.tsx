import React, { FC, useEffect, useState } from "react";
import styles from "./BorderCard.module.css";
import Image from "next/image";
import profileimg from "../../Assets/images/profileimg.png";
import { BsBookmark } from "react-icons/bs";

import { LiaCommentAlt } from "react-icons/lia";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { useBookmarkValue } from "@/app/context/bookmarkContext";
import { bookmarkType } from "@/app/Types/posts";
import { BookmarkTypes } from "@/app/Types/reducerTypes";
import Link from "next/link";
import { POSTDETAILS } from "@/app/Routes/RoutesUrl";
import { FormatDate } from "@/app/services/formatDate";
import emptypost from "../../Assets/images/emptypost.png";
import { likePost, toggleBookmark } from "@/app/context/Actions/Actions";
import { userValue } from "@/app/context/userContext";
import { toast } from "react-toastify";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import SigninModal from "../SigninModal/SigninModal";
import { PostLikeProp } from "@/app/Types/global";

const BorderCard = React.memo(
  ({
    title,
    excerpts,
    id,
    postimage,
    author,
    createdAt,
    likes,
  }: bookmarkType) => {
    const { bookmarkstate } = useBookmarkValue();
    const { state } = userValue();
    const [bookmarked, setBookmarked] = useState(false);
    const [prevBookmark, setPrevBookmark] = useState(bookmarked);

    const [bookmarkmodal, setBookmarkmodal] = useState(false);

    const handleLoginModal = () => {
      setBookmarkmodal(false);
    };

    const handleDispatch = async () => {
      if (state?.user === undefined) {
        setBookmarkmodal(true);
      }
      setPrevBookmark((prev) => !prev);

      if (prevBookmark) {
        toast.success("You have removed story");
      } else {
        toast.success("Story bookmarked");
      }
      try {
        let bookmarkData = await toggleBookmark({
          user: state?.user?.data.id ?? "",
          post: id ?? "",
        });

        if (bookmarkData?.status === 200) {
          setBookmarked(bookmarkData?.isBookmarked);
        }
      } catch (error: any) {
        toast.error(`Error: ${JSON.stringify(error.message)}`);
      }
    };

    useEffect(() => {
      setPrevBookmark(bookmarked);
    }, [bookmarked]);

    useEffect(() => {
      bookmarkstate?.data?.find((val: any) => {
        if (val.postId === id) {
          setBookmarked(true);
        }
      });
    }, [bookmarkstate, likes]);

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
                <h4>{title}</h4>
                <p>{excerpts}</p>
              </div>
            </Link>
            <div className={styles.divider}></div>
            <div className={styles.subElementsDiv}>
              <div>
              {
                author !== undefined && (
                    <p>By: {author}</p>
                )
              }
              </div>
              <div className={styles.secondSubDiv}>
                <div className={styles.flex}>
                  <LiaCommentAlt />
                  <p> 0 comments</p>
                </div>
                <div className={styles.flex}>
                  <p>{likes?.length} likes</p>
                </div>
                <div className={styles.flex}>
                  {prevBookmark ? (
                    <BsFillBookmarkCheckFill
                      color="#334155"
                      onClick={handleDispatch}
                    />
                  ) : (
                    <BsBookmark onClick={handleDispatch} />
                  )}
                </div>
                <SigninModal
                  modalstate={bookmarkmodal}
                  handlefunction={handleLoginModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default BorderCard;
