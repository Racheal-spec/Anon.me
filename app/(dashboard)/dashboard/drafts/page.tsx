"use client";
import React, { useState } from "react";
import TableTitle from "../stories/TableTitle";
import { usePostValue } from "@/app/context/postContext";
import styles from "./page.module.css";
import { postType } from "@/app/Types/posts";
import EmptyState from "@/app/components/EmptyState/EmptyState";
import SearchLoader from "@/app/components/SearchLoader/SearchLoader";
import AllStories from "../stories/AllStories";
import { UseResizeScreen } from "@/app/hooks/ResizeScreen";
import { FiMoreVertical } from "react-icons/fi";
import SmallModal from "@/app/components/SmallModal/SmallModal";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { userValue } from "@/app/context/userContext";
import Link from "next/link";
import { EDITDRAFT } from "@/app/Routes/RoutesUrl";
import { deletePost } from "@/app/context/Actions/Actions";
import { toast } from "react-toastify";
import { changeTextFromHTML } from "@/app/services/HtmltoText";
import { FormatDate } from "@/app/services/formatDate";
import Loader from "@/app/components/Loader/Loader";
import Button from "@/app/uikits/Button/button";
import Modal from "@/app/components/Modal/Modal";

const Drafts = () => {
  const { posts, isLoading, ref } = usePostValue();
  let draftsArray: postType[] = [];
  let userPosts: postType[] = [];
  const isMobile = UseResizeScreen();
  const [loadingdelete, setLoadingDelete] = useState(false);
  const { state } = userValue();
  const [draftmodalitem, setDraftModalItem] = useState<boolean[]>(
    new Array(posts?.length || 0).fill(false)
  );
  const [showdeletedraftmodal, setShowDeleteDraftModal] = useState<boolean[]>(
    new Array(posts?.length || 0).fill(false)
  );

  posts?.map((el) => {
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
  };

  const handleDeleteDraftmodal = (index: number) => {
    const updatedDeleteStates = [...showdeletedraftmodal];
    updatedDeleteStates[index] = !updatedDeleteStates[index];
    setShowDeleteDraftModal(updatedDeleteStates);
  };

  const handleDeletedraftStory = async (id: string, index: number) => {
    try {
      setLoadingDelete(true);
      const deleteSinglePost = await deletePost(id);

      if (deleteSinglePost.status === 200) {
        toast.success("Post successfully deleted");
        setLoadingDelete(false);
        handleDeleteDraftmodal(index)
      }
    } catch (error) {}
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
                description={changeTextFromHTML(`${post?.content?.slice(0, 100)}...`)}
                status={
                  isMobile ? (
                    <></>
                  ) : post.published === false ? (
                    <div className={styles.orange}></div>
                  ) : (
                    ""
                  )
                }
                date={`${FormatDate(post?.createdAt)} `}
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
                   
                            <Link href={EDITDRAFT(post?.id)}>
                                  <span>Edit</span>
                                </Link>
                          </div>
                          <div className={styles.modalicondiv}>
                            <MdOutlineDelete color="red" />
                            <span onClick={() => handleDeleteDraftmodal(index)}>Delete</span>
                          </div>
                        </div>
                      </SmallModal>
                    )}
                  </div>
                }
              />

             {/************************DELETE MODAL ****************************/}
             {showdeletedraftmodal[index] && (
                    <Modal handlefunction={() => handleDeleteDraftmodal(index)}>
                      <div className={styles.modal}>
                        <h3>Delete Draft</h3>
                        <p>
                          Are you sure you want to delete this draft? Deleting
                          this draft is permanent and cannot be undone.
                        </p>
                        <div className={styles.btnDiv}>
                          <div>
                            {" "}
                            <Button
                              deepPinkOutline
                              onClick={() => handleDeleteDraftmodal(index)}
                            >
                              Cancel
                            </Button>
                          </div>
                          <Button
                            primary
                            onClick={() => handleDeletedraftStory(post?.id, index)}
                          >
                            {loadingdelete ? (
                              <div className={styles.deletediv}>
                                <Loader color="#fff" />
                                <span>Deleting</span>
                              </div>
                            ) : (
                              " Delete Story"
                            )}
                          </Button>
                        </div>
                      </div>
                    </Modal>
                  )}
                
            </div>
          ))}
        {draftsArray?.length === 0 && (
          <div>
            <EmptyState
              heading="No Drafts Available"
              description="You have no story available at the moment, kindly check back later!"
            />
          </div>
        )}
      </>

      <div ref={ref}>
        {!isLoading ? (
          <div className={styles.postending}>You have reached the end!</div>
        ) : (
          <div>
              <div className={styles.loaderdiv}>
                <SearchLoader />
              </div>
          </div>
        )}
      </div>
      

    {/* <div ref={ref}>
        {lastCursor === null && draftsArray?.length === 0 ? (
          <div className={styles.postending}>You have reached the end!</div>
        ) : (
          <div className={styles.loaderdiv}>
          <SearchLoader />
        </div>
        )}
        
      </div> */}


    </div>
  );
};

export default Drafts;
