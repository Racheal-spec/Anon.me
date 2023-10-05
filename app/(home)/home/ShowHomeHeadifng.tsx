"use client";
import { userValue } from "@/app/context/userContext";
import React from "react";
import styles from "./page.module.css";
import BorderCard from "@/app/components/BorderCard/BorderCard";
import Trending from "@/app/components/Trending/Trending";
import LoggedInBorderComp from "@/app/components/LoggedInBorderComp/LoggedInBorderComp";
import { postType } from "@/app/Types/posts";
import BookmarkSideComp from "@/app/components/BookmarkSideComp/BookmarkSideComp";
import Tags from "@/app/components/Tags/Tags";
import LoginSideComp from "@/app/components/LoginSideComp/LoginSideComp";
import Skeleton from "@/app/components/Skeleton/Skeleton";
import { usePublishedPostValue } from "@/app/context/publishedpostsContext";
import EmptyState from "@/app/components/EmptyState/EmptyState";
import { changeTextFromHTML } from "@/app/services/HtmltoText";
import { useAbly } from "ably/react";

const ShowHomeHeading = () => {
  const { state } = userValue();
  const { publishedposts, ref, lastCursor } = usePublishedPostValue();
  // const client = useAbly();

  // console.log(client);
  return (
    <div>
      <section className={styles.blogsection}>
        {!state.user && <h4 className={styles.headingh4}>Recent Blogs</h4>}

        <div className={styles.blogGrid}>
          <div>
            {state?.user?.status === "ok" && (
              <LoggedInBorderComp
                title="Share Stories Untold and Let the Anon Community Embrace and Support You"
                description="Whether you seek advice during challenging times or simply want to let your creativity run wild, our community is here to embrace and support you. By nurturing these connections, you're not only finding solace but also nurturing your mental well-being."
              />
            )}

            {publishedposts?.length === 0 ? (
              <EmptyState
                heading="No Available Story"
                description="Create a new story or check back later!"
              />
            ) : (
              <div>
                {publishedposts &&
                  publishedposts?.map((val: postType) => {
                    let excerpt = `${val?.content.slice(0, 200)}...`;
                    return (
                      <div key={val?.id}>
                        <BorderCard
                          id={val?.id}
                          title={val?.title}
                          author={val?.author.anonname}
                          excerpts={changeTextFromHTML(excerpt)}
                          postimage={val?.postimage}
                          createdAt={val?.createdAt}
                          likes={val?.likes!}
                        />
                      </div>
                    );
                  })}
              </div>
            )}

            <div ref={ref}>
              {lastCursor === null ? (
                <div className={styles.textcenter}>
                  You have reached the end
                </div>
              ) : (
                <div
                  className={
                    publishedposts?.length! < 4 ? styles.display : styles.block
                  }
                >
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
