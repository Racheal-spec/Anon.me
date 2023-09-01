"use client";
import { userValue } from "@/app/context/userContext";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

import BorderCard from "@/app/components/BorderCard/BorderCard";
import Trending from "@/app/components/Trending/Trending";
import LoggedInBorderComp from "@/app/components/LoggedInBorderComp/LoggedInBorderComp";
import { getPosts } from "@/app/Actions/Actions";
import { PostTypes } from "@/app/Types/reducerTypes";
import { usePostValue } from "@/app/context/postContext";
import { postType } from "@/app/Types/posts";
import BookmarkSideComp from "@/app/components/BookmarkSideComp/BookmarkSideComp";
import Tags from "@/app/components/Tags/Tags";
import { useInView } from "react-intersection-observer";
import LoginSideComp from "@/app/components/LoginSideComp/LoginSideComp";
import { handleuser } from "@/app/services/userdata";

const ShowHomeHeading = () => {
  // const { state } = userValue();
  let state = handleuser();
  const { poststate, postdispatch } = usePostValue();
  const { ref, inView } = useInView();
  const [lastCursor, setLastCursor] = useState("");
  const [take, setTake] = useState(7);
  const [posts, setPosts] = useState<postType[]>(poststate?.post?.data!);

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
    setPosts(data?.data);
  };
  useEffect(() => {
    if (!inView) {
      newData();
      console.log("loaded newdata againnnnn");
    }
  }, []);

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
    setPosts((prev) => {
      return [...(prev?.length ? prev : []), ...moredata?.data];
    });
    setLastCursor(moredata?.metaData?.lastCursor);
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
            {posts &&
              posts?.map((val: postType) => (
                <div key={val?.id}>
                  <BorderCard
                    id={val?.id}
                    title={val?.title}
                    excerpts={val?.excerpts}
                    authorId={val?.authorId}
                    createdAt={val?.createdAt}
                  />
                </div>
              ))}
            <div ref={ref}>
              {lastCursor === null ||
              state?.user === undefined ||
              state?.user === null ? (
                ""
              ) : (
                <div>Loading......</div>
              )}
            </div>
          </div>

          <div className={styles.trendingCard}>
            <div>
              <Trending
                title="Return to Normal: Why I Have Been Gone"
                authorId="Richard Norson"
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
