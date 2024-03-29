"use client";
import React from "react";
import styles from "./page.module.css";
import { MdArrowRightAlt } from "react-icons/md";
import { userValue } from "@/app/context/userContext";
import { REGISTER } from "@/app/Routes/RoutesUrl";
import Link from "next/link";

const BlogHeader = () => {
  const { state } = userValue();
  return (
    <section>
      {state?.user?.status !== "ok" ||
      state?.user === undefined ||
      state?.user === null ? (
        <main className={styles.showheader}>
           <Link href={REGISTER}>
          <div className={styles.fakeBtnWrapper}>
            <div>
              <p>Join Anon Blogging Community</p>
            </div>
            <div className={styles.arrowicon}>
              <MdArrowRightAlt color="white" fontSize={"1.5rem"} />
            </div>
          </div>
          </Link>
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
