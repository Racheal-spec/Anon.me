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
import { handleuser } from "@/app/services/userdata";
import empty_state from "../../Assets/images/empty_state.svg";
import Image from "next/image";
import Skeleton from "@/app/components/Skeleton/Skeleton";

const ShowHomeHeading = () => {
  // const { state } = userValue();
  let state = handleuser();
  const { poststate, postdispatch } = usePostValue();
  const { ref, inView } = useInView();
  let [lastCursor, setLastCursor] = useState("");
  const [take, setTake] = useState(7);
  const [posts, setPosts] = useState<postType[]>(poststate?.data!);

  //Using useCallback stops the double function calls but wont render on initial page load
  const newData = async () => {
    const data = await getPosts({
      take: take,
      lastCursor: lastCursor,
    });
    if (data) {
      postdispatch({
        type: PostTypes.GetPost,
        payload: data,
      });
    }
    setLastCursor(data?.metaData?.lastCursor);
    setPosts(data?.data);
  };

  //const firstRender = useRef(false);

  const fetchMorePosts = async () => {
    const moredata = await getPosts({
      take: take,
      lastCursor: lastCursor,
    });
    if (moredata) {
      postdispatch({
        type: PostTypes.GetPost,
        payload: moredata?.data,
      });
    }
    // setTake(take);
    setLastCursor(moredata?.metaData?.lastCursor);
    setPosts((prev) => {
      return [...(prev?.length ? prev : []), ...moredata?.data];
    });
  };

  console.log(lastCursor);
  console.log(posts);
  useEffect(() => {
    if (state?.user === null || state?.user === undefined) {
      return;
    } else if (inView && state.user !== null) {
      fetchMorePosts();
      console.log("loaded fetchmore againnnnn");
    }
  }, [inView]);

  useEffect(() => {
    newData();
    console.log("loaded newdata againnnnn");
  }, []);
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

            {posts?.length === 0 ? (
              <div className={styles.emptystateImgDiv}>
                <Image
                  src={empty_state}
                  className={styles.emptystateImg}
                  alt="empty_blog"
                />
                <h2>No Available Post Yet</h2>
                <p>
                  There's no blog available at the moment, kindly check back
                  later!
                </p>
              </div>
            ) : (
              <>
                {posts &&
                  posts?.map((val: postType) => (
                    <div key={val?.id}>
                      <BorderCard
                        id={val?.id}
                        title={val?.title}
                        excerpts={val?.excerpts}
                        author={val?.author.anonname}
                        createdAt={val?.createdAt}
                      />
                    </div>
                  ))}
              </>
            )}

            <div ref={ref}>
              {lastCursor === null ||
              state?.user === undefined ||
              state?.user === null ? (
                ""
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
