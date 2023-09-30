"use client";
import React, { useState } from "react";
import StatusComp from "../stories/StatusComp";
import TableTitle from "../stories/TableTitle";
import { usePostValue } from "@/app/context/postContext";
import styles from "./page.module.css";
import { postType } from "@/app/Types/posts";
import EmptyState from "@/app/components/EmptyState/EmptyState";
import SearchLoader from "@/app/components/SearchLoader/SearchLoader";
import AllStories from "../stories/AllStories";
import { UseResizeScreen } from "@/hooks/ResizeScreen";
import { FiMoreVertical } from "react-icons/fi";
import SmallModal from "@/app/components/SmallModal/SmallModal";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { userValue } from "@/app/context/userContext";

const Drafts = () => {
  const { lastCursor, posts, isLoading, ref } = usePostValue();
  let draftsArray: postType[] = [];
  let userPosts: postType[] = [];
  const isMobile = UseResizeScreen();
  const { state } = userValue();
  const [draftmodalitem, setDraftModalItem] = useState<boolean[]>(
    new Array(posts?.length || 0).fill(false)
  );
  posts?.map((el) => {
    console.log(el?.authorId === state?.user?.data?.id);
    if (el?.authorId === state?.user?.data?.id) {
      userPosts.push(el);
    }
  });
  userPosts?.map((el) => {
    if (el.published === false) {
      draftsArray.push(el);
    }
  });
  const handleDraftModal = (index: number) => {
    // toggles the modal state for the post at the given index by creating a copy of modalitem,
    //changing the value at that index, and then updating the state using setModalItem.
    const updatedStates = [...draftmodalitem];
    updatedStates[index] = !updatedStates[index];
    setDraftModalItem(updatedStates);
    // console.log(!updatedStates[index]);
  };

  return (
    <div className={styles.draftsWrapper}>
      <div className={styles.colorDiv}>
        <span>Status: &nbsp;</span>
        <div className={styles.orange}></div>
        <p> Unpublished({draftsArray?.length})</p>
      </div>
      <TableTitle
        title="Title"
        status="Status"
        date="Date/Time"
        action={null}
      />
      <>
        {draftsArray &&
          draftsArray?.map((post, index) => (
            <div key={post?.id}>
              <AllStories
                title={post.title}
                description={post?.content?.slice(0, 100)}
                status={
                  isMobile ? (
                    <></>
                  ) : post.published === false ? (
                    <div className={styles.orange}></div>
                  ) : (
                    ""
                  )
                }
                date={`${post?.createdAt} `}
                action={
                  <div className={styles.iconwrapper}>
                    <FiMoreVertical
                      onClick={() => {
                        handleDraftModal(index);
                      }}
                      className={styles.icondiv}
                    />

                    {draftmodalitem[index] && (
                      <SmallModal
                        handlefunction={() => handleDraftModal(index)}
                        modalitem={post}
                      >
                        <div>
                          <div className={styles.modalicondiv}>
                            <BiEditAlt />
                            <span>Edit</span>
                          </div>
                          <div className={styles.modalicondiv}>
                            <MdOutlineDelete color="red" />
                            <span>Delete</span>
                          </div>
                        </div>
                      </SmallModal>
                    )}
                  </div>
                }
              />
            </div>
          ))}
        {posts?.length === 0 && (
          <div>
            <EmptyState
              heading="No Available Story"
              description="You have no story available at the moment, kindly check back later!"
            />
          </div>
        )}
      </>

      <div ref={ref}>
        {lastCursor === null ? (
          <div className={styles.postending}>You have reached the end!</div>
        ) : (
          <div>
            {isLoading || lastCursor !== null ? (
              <div className={styles.loaderdiv}>
                <SearchLoader />
              </div>
            ) : posts?.length === 0 ? (
              "No Draft"
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drafts;
