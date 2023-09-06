"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./pages.module.css";
import profileimg from "../../../Assets/images/profileimg.png";
import Image from "next/image";
import { GrMore } from "react-icons/gr";
import { getSinglePost } from "@/app/context/Actions/Actions";
import { usePostValue } from "@/app/context/postContext";
import { PostTypes } from "@/app/Types/reducerTypes";

const DetailsComp = () => {
  let params = useParams();
  //console.log(params);
  const { poststate, postdispatch } = usePostValue();

  const fetchPost = async () => {
    let data = await getSinglePost(params.id as string);

    if (postdispatch) {
      postdispatch({
        type: PostTypes.GetSinglePost,
        payload: data,
      });
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
  console.log(poststate);
  return (
    <div className={styles.pageWrapper}>
      <h1>{poststate?.singlepost?.title}</h1>
      <div className={styles.authorInfo}>
        <div>
          <Image
            src={profileimg}
            className={styles.profileImg}
            width={50}
            height={50}
            alt="user-profile-image"
          />
        </div>
        <div className={styles.namedetails}>
          <div>
            <h5 className={styles.anonname}>
              {poststate?.singlepost?.author?.anonname}
            </h5>
          </div>
          <div>
            <p className={styles.dateStyle}>
              {new Date(poststate?.singlepost?.createdAt)?.toDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.moreicon}>
        <GrMore />
      </div>
      <section className={styles.mainsection}>
        <div>
          <Image
            src={profileimg}
            className={styles.blogimage}
            alt="user-profile-image"
          />
        </div>
        <div className={styles.mainContent}>
          <p>{poststate.singlepost.content}</p>
        </div>
      </section>
    </div>
  );
};

export default DetailsComp;
