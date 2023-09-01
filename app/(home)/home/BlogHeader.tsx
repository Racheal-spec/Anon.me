"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import styles from "./page.module.css";
import Tags from "@/app/components/Tags/Tags";
import { MdArrowRightAlt } from "react-icons/md";
import { handleuser } from "@/app/services/userdata";

const BlogHeader = () => {
  let state = handleuser();
  return (
    <section>
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
    </section>
  );
};

export default BlogHeader;
