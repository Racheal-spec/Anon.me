"use client";
import { userValue } from "@/app/context/userContext";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { MdArrowRightAlt } from "react-icons/md";
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

const ShowHomeHeading = () => {
  const { state } = userValue();
  const { poststate, postdispatch } = usePostValue();
  const { ref, inView } = useInView();
  const [lastCursor, setLastCursor] = useState("");
  const [take, setTake] = useState(
    state.user === null || state.user === undefined ? 5 : 7
  );
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
  };
  useEffect(() => {
    newData();
  }, []);

  const fetchMorePosts = async () => {
    const moredata = await getPosts({
      take: take,
      lastCursor: lastCursor,
    });
    if (moredata) {
      postdispatch({
        type: PostTypes.GetPost,
        payload: moredata.data,
      });
    }
    setTake(take);
    setPosts((prev) => {
      return [...(prev?.length ? prev : []), ...moredata?.data];
    });
    setLastCursor(moredata?.metaData?.lastCursor);
  };
  console.log(lastCursor);
  console.log(posts);
  useEffect(() => {
    if (inView) {
      fetchMorePosts();
      console.log("inviewwww");
    }
    console.log("notinview");
  }, [inView]);
  return (
    <div>
      {state?.user === undefined || state?.user === null ? (
        <main className={styles.showheader}>
          <div className={styles.fakeBtnWrapper}>
            <div>
              <p>Join Anon Blogging Community</p>
            </div>
            <div className={styles.arrowicon}>
              <MdArrowRightAlt color="white" fontSize={"1.5rem"} />
            </div>
          </div>
          <div className={styles.description}>
            <h2 className={styles.heading}>
              Blog Incognito: Your Voice, Your Way
            </h2>
            <p>
              Join an anonymous blogging community where you can openly share
              your stories, thoughts, and dreams without fear or judgment.
            </p>
          </div>
        </main>
      ) : (
        ""
      )}
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
                    title={val?.title}
                    description={val?.excerpts}
                    authorid={val?.authorId}
                    createdAt={val?.createdAt}
                  />
                </div>
              ))}
            <div ref={ref}>
              {lastCursor === null ? "" : <div>Loading......</div>}
            </div>
          </div>

          <div className={styles.trendingCard}>
            <div>
              <Trending
                title="Return to Normal: Why I Have Been Gone"
                name="Richard Norson"
                date="22.10.2022"
              />
            </div>
            <div>
              <BookmarkSideComp
                title="Richard Norton photorealistic rendering as real photos"
                name="Rachel Tomi"
              />
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
