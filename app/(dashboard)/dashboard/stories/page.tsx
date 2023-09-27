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
import { UseResizeScreen } from "@/hooks/ResizeScreen";
import SmallModal from "@/app/components/SmallModal/SmallModal";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import TableTitle from "./TableTitle";
import EmptyState from "@/app/components/EmptyState/EmptyState";
import SearchLoader from "@/app/components/SearchLoader/SearchLoader";
import { userValue } from "@/app/context/userContext";
const Stories = () => {
  const { lastCursor, posts, isLoading, ref } = usePostValue();
  const isMobile = UseResizeScreen();
  const { state } = userValue();
  const [modalitem, setModalItem] = useState<boolean[]>(
    new Array(posts?.length || 0).fill(false)
  );
  // console.log(posts);

  let publishedArray: postType[] = [];
  let deletedArray: postType[] = [];
  let userPosts: postType[] = [];

  posts?.map((el) => {
    console.log(el?.authorId === state?.user?.data?.id);
    if (el?.authorId === state?.user?.data?.id) {
      // console.log(el);
      userPosts.push(el);
    }
  });
  console.log(userPosts);
  userPosts?.map((el) => {
    if (el.published) {
      publishedArray.push(el);
    }
  });
  userPosts?.map((el) => {
    if (el.deleted) {
      deletedArray.push(el);
    }
  });

  const handleModal = (index: number) => {
    // toggles the modal state for the post at the given index by creating a copy of modalitem,
    //changing the value at that index, and then updating the state using setModalItem.
    const updatedStates = [...modalitem];
    updatedStates[index] = !updatedStates[index];
    setModalItem(updatedStates);
    // console.log(!updatedStates[index]);
  };

  return (
    <div className={styles.storieswrapper}>
      <MainTab>
        <TabsBody title="Stories">
          <StatusComp
            allpost={userPosts ? userPosts?.length : 0}
            published={publishedArray.length}
            deleted={deletedArray.length}
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
                    date={`${post?.createdAt} `}
                    tags={["post, stories"]}
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
            {userPosts?.length === 0 && (
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
                ) : null}
              </div>
            )}
          </div>
        </TabsBody>

        {/**================SECOND TAB=================== */}
        <TabsBody title="Published">
          <StatusComp
            allpost={userPosts ? userPosts?.length : 0}
            published={publishedArray.length}
            deleted={deletedArray.length}
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
                    date={`${post?.createdAt} `}
                    tags={["post, stories"]}
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
        {/**================THIRD TAB=================== */}
        <TabsBody title="Deleted">
          <StatusComp
            allpost={userPosts ? userPosts?.length : 0}
            published={publishedArray.length}
            deleted={deletedArray.length}
          />
          <TableTitle
            title="Title"
            status="Status"
            date="Date/Time"
            action={null}
          />

          <>
            {deletedArray &&
              deletedArray?.map((post, index) => (
                <div key={post?.id}>
                  <AllStories
                    title={post.title}
                    description={post?.content?.slice(0, 100)}
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
                                <span>Restore Story</span>
                              </div>
                            </div>
                          </SmallModal>
                        )}
                      </div>
                    }
                  />
                </div>
              ))}
            {deletedArray.length === 0 && (
              <div>
                <EmptyState
                  heading="No deleted post"
                  description="You have no deleted story at the moment"
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
