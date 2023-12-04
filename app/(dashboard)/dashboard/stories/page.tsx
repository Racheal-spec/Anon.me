"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import MainTab from "@/app/components/Tabs/MainTab/MainTab";
import TabsBody from "@/app/components/Tabs/TabsBody/TabsBody";
import StatusComp from "./StatusComp";
import { usePostValue } from "@/app/context/postContext";
import Loader from "@/app/components/Loader/Loader";
import AllStories from "./AllStories";
import { FiMoreVertical } from "react-icons/fi";
import { postType } from "@/app/Types/posts";
import { UseResizeScreen } from "@/app/hooks/ResizeScreen";
import SmallModal from "@/app/components/SmallModal/SmallModal";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import TableTitle from "./TableTitle";
import EmptyState from "@/app/components/EmptyState/EmptyState";
import SearchLoader from "@/app/components/SearchLoader/SearchLoader";
import { userValue } from "@/app/context/userContext";
import Link from "next/link";
import { EDITDRAFT } from "@/app/Routes/RoutesUrl";
import Modal from "@/app/components/Modal/Modal";
import Button from "@/app/uikits/Button/button";
import { useRouter } from "next/navigation";
import { deletePost, getSingleTag } from "@/app/context/Actions/Actions";
import { toast } from "react-toastify";
import { FormatDate } from "@/app/services/formatDate";


const Stories = () => {
  const { lastCursor, posts, isLoading, ref } = usePostValue();
  const isMobile = UseResizeScreen();
  const { state } = userValue();
  const [modalitem, setModalItem] = useState<boolean[]>(
    new Array(posts?.length || 0).fill(false)
  );
  const [showdeletemodal, setShowDeleteModal] = useState<boolean[]>(
    new Array(posts?.length || 0).fill(false)
  );
  const [loadingdelete, setLoadingDelete] = useState(false);
  const router = useRouter();


  let publishedArray: postType[] = [];
  let userPosts: postType[] = [];
  const userid = state?.user?.data;
  console.log(userid?.id)

  console.log(posts)


  posts?.map((el) => {
    if (el?.authorId === userid?.id) {
      console.log(el);
      userPosts?.push(el);
    }
  });
  
  // const userPosts: postType[] = filteredPosts?.filter((el) => {
  //   console.log(el?.authorId === userid?.id)
  //   return el?.authorId === userid?.id;
  // }) || [];

  userPosts?.map((el) => {
    if (el.published) {
      publishedArray.push(el);
    }
  });

  console.log(userPosts)

  const handleModal = (index: number) => {
    // toggles the modal state for the post at the given index by creating a copy of modalitem,
    //changing the value at that index, and then updating the state using setModalItem.
    const updatedStates = [...modalitem];
    updatedStates[index] = !updatedStates[index];
    setModalItem(updatedStates);
    // console.log(!updatedStates[index]);
  };

  const handleDeletemodal = (index: number) => {
    const updatedDeleteStates = [...showdeletemodal];
    updatedDeleteStates[index] = !updatedDeleteStates[index];
    setShowDeleteModal(updatedDeleteStates);
  };
  const handleDeleteStory = async (id: string, index: number) => {
    try {
      setLoadingDelete(true);
      const deleteSinglePost = await deletePost(id);

      if (deleteSinglePost.status === 200) {
        toast.success("Post successfully deleted");
        setLoadingDelete(false);
        handleDeletemodal(index);
      }
    } catch (error) {}
  };

  return (
    
    <div className={styles.storieswrapper}>
      <MainTab>
        <TabsBody title="All Stories">
          <StatusComp
            allpost={userPosts ? userPosts?.length : 0}
            published={publishedArray.length}
          />
          <TableTitle
            title="Title"
            status="Status"
            date="Date/Time"
            action={null}
            tags="Tags"
          />
          <>
            {userPosts &&
              userPosts?.map((post, index) => (
                <div key={post?.id}>
                  <AllStories
                    title={post.title}
                    status={
                      isMobile ? (
                        <></>
                      ) : post.published ? (
                        <div className={styles.green}></div>
                      ) : (
                        <div className={styles.orange}></div>
                      )
                    }
                    date={`${FormatDate(post?.createdAt)}`}
                    tags={post?.category?.title}
                    action={
                      <div className={styles.iconwrapper}>
                        <FiMoreVertical
                          onClick={() => {
                            handleModal(index);
                          }}
                          className={styles.icondiv}
                        />

                        {modalitem[index] && (
                          <SmallModal
                            handlefunction={() => handleModal(index)}
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
                                <span onClick={() => handleDeletemodal(index)}>
                                  Delete
                                </span>
                              </div>
                            </div>
                          </SmallModal>
                        )}
                      </div>
                    }
                  />
                  {/************************DELETE MODAL ****************************/}
                  {showdeletemodal[index] && (
                    <Modal handlefunction={() => handleDeletemodal(index)}>
                      <div className={styles.modal}>
                        <h3>Delete Story</h3>
                        <p>
                          Are you sure you want to delete this story? Deleting
                          this story is permanent and cannot be undone.
                        </p>
                        <div className={styles.btnDiv}>
                          <div>
                            {" "}
                            <Button
                              deepPinkOutline
                              onClick={() => handleDeletemodal(index)}
                            >
                              Cancel
                            </Button>
                          </div>
                          <Button
                            primary
                            onClick={() => handleDeleteStory(post?.id, index)}
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

            {userPosts?.length === 0 && (
              <div>
                <EmptyState
                  heading="No Available Story"
                  description="You have no story available at the moment, kindly check back later!"
                />
              </div>
            )}
          </>

          {/* <div ref={ref}>
            {lastCursor === null ? (
              <div className={styles.postending}>You have reached the end!</div>
            ) : (
              <div>
                {isLoading || lastCursor !== null ? (
                  <div className={styles.loaderdiv}>
                    <SearchLoader />
                  </div>
                ) : null}
              </div>
            )}
          </div> */}

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
        </TabsBody>

        {/**================SECOND TAB=================== */}
        <TabsBody title="Published">
          <StatusComp
            allpost={userPosts ? userPosts?.length : 0}
            published={publishedArray.length}
          />

          <TableTitle
            title="Title"
            status="Status"
            date="Date/Time"
            tags="Tags"
            action={null}
          />

          <>
            {publishedArray &&
              publishedArray?.map((post, index) => (
                <div key={post?.id}>
                  <AllStories
                    title={post?.title}
                    status={
                      isMobile ? (
                        <></>
                      ) : post.published ? (
                        <div className={styles.green}></div>
                      ) : (
                        <div className={styles.orange}></div>
                      )
                    }
                    date={`${post?.createdAt} `}
                    tags={post?.category?.title}
                    action={
                      <div className={styles.iconwrapper}>
                        <FiMoreVertical
                          onClick={() => {
                            handleModal(index);
                          }}
                          className={styles.icondiv}
                        />

                        {modalitem[index] && (
                          <SmallModal
                            handlefunction={() => handleModal(index)}
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

            {publishedArray?.length === 0 && (
              <div>
                <EmptyState
                  heading="No Published Story"
                  description="You have no story published at the moment, kindly check back!"
                />
              </div>
            )}
          </>
        </TabsBody>
      </MainTab>
    </div>
  );
};

export default Stories;
