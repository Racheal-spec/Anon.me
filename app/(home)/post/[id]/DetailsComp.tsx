"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./pages.module.css";
import profileimg from "../../../Assets/images/profileimg.png";
import Image from "next/image";
import { GrMore } from "react-icons/gr";
import { getSinglePost, likePost } from "@/app/context/Actions/Actions";
import SearchLoader from "@/app/components/SearchLoader/SearchLoader";
import { postType } from "@/app/Types/posts";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { userValue } from "@/app/context/userContext";
import { PostLikeProp } from "@/app/Types/global";
import Commentmodal from "@/app/components/Commentmodal/Commentmodal";
import { LiaCommentAlt } from "react-icons/lia";
import SigninModal from "@/app/components/SigninModal/SigninModal";
import { toast } from "react-toastify";
import { changeTextFromHTML } from "@/app/services/HtmltoText";

 export const dynamic = "force-dynamic";

const DetailsComp = () => {
  let params = useParams();


  const { state } = userValue();
  //console.log(params);
  const [singlepost, setSinglePost] = useState<postType | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [likedata, setLikeData] = useState<PostLikeProp | null>(null);
  const [likemodal, setLikemodal] = useState(false);
  const [liked, setLiked] = useState(likedata || false);
  const [likesCount, setLikesCount] = useState(
    singlepost?.likes?.length ? singlepost?.likes?.length : 0
  );
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
  }, []);

  const handleLike = async () => {
    if (state?.user === undefined) {
      setLikemodal(true);
    }
    if (state?.user !== undefined && liked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setLiked(!liked);
    try {
      let data = await likePost({
        user: state.user ? state.user?.data.id : "",
        post: singlepost?.id as string,
      });
      if (data?.status === 200) {
        setLikeData(data?.isLiked);
        return data;
      }
    } catch (error: any) {
      toast.error(`Error: ${JSON.stringify(error.message)}`);
    }
  };

  const handleLoginModal = () => {
    setLikemodal(false);
  };

  useEffect(() => {
    singlepost?.likes?.find((val: any) => {
      if (val.userId === state?.user?.data?.id) {
        setLiked(true);
      }
    });
  }, [singlepost?.likes]);
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
                {liked ? (
                  <AiFillLike color="rgb(255, 112, 176)" onClick={handleLike} />
                ) : (
                  <AiOutlineLike onClick={handleLike} />
                )}
                <p>
                  {/* {singlepost?.likes?.length === 0 ? 0 : singlepost?.likes?.length}{" "} */}
                  {likesCount ? likesCount : singlepost?.likes?.length}
                </p>
              </div>
              <div className={styles.flex}>
                <LiaCommentAlt
                  onClick={handleclick}
                  className={styles.flexicon}
                />
                <p> {singlepost?.comments?.length}</p>
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
