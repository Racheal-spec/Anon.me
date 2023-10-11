"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./pages.module.css";
import profileimg from "../../../Assets/images/profileimg.png";
import Image from "next/image";
import { GrMore } from "react-icons/gr";
import { getSinglePost, likePost } from "@/app/context/Actions/Actions";
import SearchLoader from "@/app/components/SearchLoader/SearchLoader";
import { changeTextFromHTML } from "@/app/services/HtmltoText";
import { postType } from "@/app/Types/posts";
import { AiOutlineLike } from "react-icons/ai";
import { userValue } from "@/app/context/userContext";
import Modal from "@/app/components/Modal/Modal";
import Button from "@/app/uikits/Button/button";
import { LOGIN } from "@/app/Routes/RoutesUrl";
import LogoComp from "@/app/components/LogoComp/LogoComp";
import { PostLikeProp } from "@/app/Types/global";
import { useChannel } from "ably/react";
import Commentmodal from "@/app/components/Commentmodal/Commentmodal";
import { LiaCommentAlt } from "react-icons/lia";
import SigninModal from "@/app/components/SigninModal/SigninModal";
const DetailsComp = () => {
  let params = useParams();

  const { state } = userValue();
  //console.log(params);
  const [singlepost, setSinglePost] = useState<postType | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [likedata, setLikeData] = useState<PostLikeProp | null>(null);
  const [likemodal, setLikemodal] = useState(false);

  const [likesCount, setLikesCount] = useState(singlepost?.likes?.length);
  const [toggle, setToggle] = useState(false);

  const handleclick = () => {
    setToggle(!toggle);
  };

  let active = toggle ? styles.open : styles.close;

  const fetchPost = async () => {
    setLoading(true);
    let data = await getSinglePost(params.id as string);
    if (data) {
      setSinglePost(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [likesCount]);
  // console.log(singlepost);
  const { channel } = useChannel("update", (message: any) => {
    const likecount = message.data;
    // console.log(likecount.data);
    setLikeData(likecount.data);
    setLikesCount(likecount.data.count);
  });
  // console.log(likesCount);

  const handleLike = async () => {
    if (state?.user === undefined) {
      setLikemodal(true);
    }
    let data = await likePost({
      user: state.user ? state.user?.data.id : "",
      post: params.id as string,
    });

    if (data) {
      setLikeData(data);
      channel.publish("update", { data });
      return data;
    }
  };
  const handleLoginModal = () => {
    setLikemodal(false);
  };

  // console.log(likedata);
  // console.log(singlepost?.likes);
  return (
    <div className={styles.pageWrapper}>
      {!isLoading ? (
        <>
          <h1>{singlepost?.title}</h1>
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
                  {singlepost?.author?.anonname}
                </h5>
              </div>
              <div>
                <p className={styles.dateStyle}>
                  {new Date(singlepost?.createdAt!)?.toDateString()}
                </p>
              </div>
            </div>
          </div>
          <div>
            <hr className={styles.hrstyles} />
            <div className={styles.flexcommentdiv}>
              <div
                className={
                  likedata?.isLiked === false ? styles.flex : styles.nocolor
                }
              >
                <AiOutlineLike onClick={handleLike} />
                <p>
                  {/* {singlepost?.likes?.length === 0 ? 0 : singlepost?.likes?.length}{" "} */}
                  {likesCount} likes
                </p>
              </div>
              <div>
                <LiaCommentAlt
                  onClick={handleclick}
                  className={styles.flexicon}
                />
              </div>
            </div>
            <SigninModal
              modalstate={likemodal}
              handlefunction={handleLoginModal}
            />

            <hr className={styles.hrstyles} />
          </div>
          <div className={styles.moreicon}>
            <GrMore />
          </div>

          <section className={styles.mainsection}>
            {!isLoading ? (
              <Image
                src={singlepost?.postimage ?? profileimg}
                width={400}
                height={200}
                className={
                  singlepost?.postimage ? styles.blogimage : styles.imgnone
                }
                alt={singlepost?.postimage ? "user-content-image" : ""}
              />
            ) : (
              <SearchLoader />
            )}
            <div className={styles.mainContent}>
              <p>{changeTextFromHTML(singlepost ? singlepost?.content : "")}</p>
            </div>
          </section>
          {toggle && (
            <Commentmodal
              handleclick={handleclick}
              toggle={toggle}
              active={active}
              postId={params?.id as string}
            />
          )}
        </>
      ) : (
        <SearchLoader />
      )}
    </div>
  );
};

export default DetailsComp;
