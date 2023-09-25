"use client";
import { userValue } from "@/app/context/userContext";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

import BorderCard from "@/app/components/BorderCard/BorderCard";
import Trending from "@/app/components/Trending/Trending";
import LoggedInBorderComp from "@/app/components/LoggedInBorderComp/LoggedInBorderComp";
import { getPosts } from "@/app/context/Actions/Actions";
import { PostTypes } from "@/app/Types/reducerTypes";
import { usePostValue } from "@/app/context/postContext";
import { postType } from "@/app/Types/posts";
import BookmarkSideComp from "@/app/components/BookmarkSideComp/BookmarkSideComp";
import Tags from "@/app/components/Tags/Tags";
import { InView, useInView } from "react-intersection-observer";
import LoginSideComp from "@/app/components/LoginSideComp/LoginSideComp";
import Skeleton from "@/app/components/Skeleton/Skeleton";

const ShowHomeHeading = () => {
  const { state } = userValue();

  const { lastCursor, posts, isLoading, ref } = usePostValue();

  return (
    <div>
      <section className={styles.blogsection}>
        {!state.user && <h4 className={styles.headingh4}>Recent Blogs</h4>}

        <div className={styles.blogGrid}>
          <div>
            {state.user && (
              <LoggedInBorderComp
                title="Share Stories Untold and Let the Anon Community Embrace and Support You"
                description="Whether you seek advice during challenging times or simply want to let your creativity run wild, our community is here to embrace and support you. By nurturing these connections, you're not only finding solace but also nurturing your mental well-being."
              />
            )}

            {/* {isLoading ? (
              // <div className={styles.emptystateImgDiv}>
              //   <Image
              //     src={empty_state}
              //     className={styles.emptystateImg}
              //     alt="empty_blog"
              //   />
              //   <h2>No Available Post Yet</h2>
              //   <p>
              //     There's no blog available at the moment, kindly check back
              //     later!
              //   </p>
              // </div>
              <div>
                <Skeleton />
                <Skeleton />
              </div>
            ) : ( */}
            <div>
              {posts &&
                posts?.map((val: postType) => {
                  let excerpt = val?.content.slice(0, 200);
                  return (
                    <div key={val?.id}>
                      <BorderCard
                        id={val?.id}
                        title={val?.title}
                        author={val?.author.anonname}
                        excerpts={excerpt}
                        postimage={val?.postimage}
                        createdAt={val?.createdAt}
                      />
                    </div>
                  );
                })}
            </div>

            <div ref={ref}>
              {lastCursor === null ? (
                "You have reached the end"
              ) : (
                <div>
                  {" "}
                  <Skeleton />
                </div>
              )}
            </div>
          </div>

          <div className={styles.trendingCard}>
            <div>
              <Trending
                title="Return to Normal: Why I Have Been Gone"
                author="Richard Norson"
                createdAt="22.10.2022"
              />
            </div>
            <div>
              {state?.user === null || state?.user === undefined ? (
                <LoginSideComp />
              ) : (
                <BookmarkSideComp />
              )}
            </div>
            <div>
              <Tags />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowHomeHeading;
