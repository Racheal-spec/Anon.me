"use client";
import { userValue } from "@/app/context/userContext";
import React from "react";
import styles from "./page.module.css";
import { MdArrowRightAlt } from "react-icons/md";
import BorderCard from "@/app/components/BorderCard/BorderCard";
import Trending from "@/app/components/Trending/Trending";
import LoggedInBorderComp from "@/app/components/LoggedInBorderComp/LoggedInBorderComp";

const ShowHomeHeading = () => {
  const { state } = userValue();
  return (
    <div>
      {!state.user && (
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
            <BorderCard
              title="Return to Normal: Why I Have Been Gone and When New Material is Coming!"
              description="There are a few ways to co and using a time field. The time field could be collected at any frequency like per second, millisecond, minute, hour, etc. "
            />
            <BorderCard
              title="Return to Normal: Why I Have Been Gone and When New Material is Coming!"
              description="There are a few ways to co and using a time field. The time field could be collected at any frequency like per second, millisecond, minute, hour, etc. "
            />
            <BorderCard
              title="Return to Normal: Why I Have Been Gone and When New Material is Coming!"
              description="There are a few ways to co and using a time field. The time field could be collected at any frequency like per second, millisecond, minute, hour, etc. "
            />
            <BorderCard
              title="Return to Normal: Why I Have Been Gone and When New Material is Coming!"
              description="There are a few ways to co and using a time field. The time field could be collected at any frequency like per second, millisecond, minute, hour, etc. "
            />
          </div>
          <div className={styles.trendingCard}>
            <Trending
              title="Return to Normal: Why I Have Been Gone"
              name="Richard Norson"
              date="22.10.2022"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowHomeHeading;
