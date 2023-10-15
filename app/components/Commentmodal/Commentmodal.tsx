"use client";
import React, { useEffect, useState } from "react";
import styles from "./Commentmodal.module.css";
import classNames from "classnames";
import { UseClickOutside } from "@/hooks/ClickOutside";
import Button from "@/app/uikits/Button/button";
import { userValue } from "@/app/context/userContext";
import Image from "next/image";
import profileimg from "../../Assets/images/profileimg.png";
import { useForm } from "react-hook-form";
import SigninModal from "../SigninModal/SigninModal";
import EmptyState from "../EmptyState/EmptyState";
import { GetPostComments, createComment } from "@/app/context/Actions/Actions";
import Loader from "../Loader/Loader";
import { commentProp, commentTypeProp } from "@/app/Types/posts";

const Commentmodal = ({
  active,
  handleclick,
  postId,
}: {
  active: string;
  handleclick: () => void;
  toggle: boolean;
  postId: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [commentmodal, setCommentModal] = useState(false);
  const [commentData, setCommentData] = useState();
  const [commentsArray, setCommentsArray] = useState<commentTypeProp["data"]>({
    data: [],
  });
  const [author, setAuthor] = useState(false);
  const ref = UseClickOutside(handleclick);
  const handleClose = () => {
    handleclick();
  };
  const { state } = userValue();
  const handleCommentModal = () => {
    setCommentModal(false);
  };

  const handleComment = async (data: any) => {
    let textdata = JSON.stringify(data);
    let commentdata = await createComment(textdata, {
      user: state?.user ? state?.user?.data.id : "",
      post: postId,
    });
    if (commentdata) {
      setCommentData(commentdata);
    }
  };

  useEffect(() => {
    const handleAllComments = async () => {
      let data = await GetPostComments({ post: postId });
      if (data.status === 200) {
        setCommentsArray(data);
        console.log(data);
      }
      if (data.data.commenterId === state.user?.data.id) {
        setAuthor(true);
      }
    };

    handleAllComments();
  }, [commentData]);

  console.log(commentsArray);

  return (
    <div className={styles.commentmodal}>
      <div ref={ref} className={classNames(styles.sidebarStyles, active)}>
        <div className={styles.firstPadding}>
          <div>
            {" "}
            <h2>Replies</h2>
          </div>
          <div className={styles.modalclose} onClick={handleClose}>
            &times;
          </div>

          <div className={styles.borderwrapper}>
            {state?.user !== undefined ? (
              <div>
                <Image
                  src={state?.user?.data?.photo ?? profileimg}
                  alt={`${state.user?.data.anonname}'s anonymous profile picture`}
                  className={styles.profileimg}
                  width={35}
                  height={35}
                />
              </div>
            ) : null}
            <div>
              <h5>{state?.user?.data.anonname}</h5>
            </div>
            <SigninModal
              modalstate={commentmodal}
              handlefunction={handleCommentModal}
            />
            {state?.user?.data !== undefined ? (
              <form onSubmit={handleSubmit(handleComment)}>
                <textarea
                  placeholder="Write a thoughtful advice..."
                  className={styles.textarea}
                  {...register("text")}
                />
                <div className={styles.btnDiv}>
                  <Button pinkOutline>Cancel</Button>

                  <Button primary>
                    {isSubmitting ? <Loader color="#fff" /> : "Reply"}
                  </Button>
                </div>
              </form>
            ) : (
              <div
                className={styles.openmodal}
                onClick={() => setCommentModal(true)}
              >
                <p>Write a thoughtful advice...</p>
              </div>
            )}
          </div>
        </div>
        <hr className={styles.hrstyles} />
        <div>
          {commentsArray?.data?.length === 0 ? (
            <EmptyState
              heading="No replies yet"
              description="Be the first one to say something thoughful1"
            />
          ) : (
            <div className={styles.commentwrapper}>
              {commentsArray &&
                commentsArray?.data?.map((comment: commentProp) => (
                  <div key={comment.id}>
                    <Image
                      src={comment?.commenter?.photo ?? profileimg}
                      alt={`${comment?.commenter?.anonname}'s anonymous profile picture`}
                      className={styles.profileimg}
                      width={35}
                      height={35}
                    />
                    <div className={styles.authorWrapper}>
                      <h5>{comment?.commenter?.anonname}</h5>
                      {author && (
                        <div className={styles.authorDiv}>
                          <p>author</p>
                        </div>
                      )}
                    </div>
                    <p className={styles.commenttext}>{comment?.text}</p>
                    <hr className={styles.hrstyles} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Commentmodal;
