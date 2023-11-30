"use client";
import React, { useEffect, useState } from "react";
import styles from "./Trending.module.css";
import { bookmarkType, trendingProp } from "@/app/Types/posts";
import { TrendingPosts } from "@/app/context/Actions/Actions";
import { FormatDate } from "@/app/services/formatDate";
import Link from "next/link";
import { POSTDETAILS } from "@/app/Routes/RoutesUrl";

const Trending = () => {
  const [trending, setTrending] = useState<trendingProp>();
  const trendingposts = async () => {
    let data = await TrendingPosts();
    if (data) {
      setTrending(data);
    }
  };
  useEffect(() => {
    trendingposts();
  }, []);
  // console.log(trending);
  return (
    <div className={styles.trendingCardWrapper}>
      <h4>Trending Stories</h4>
      {trending?.data?.length !== 0 &&
        trending &&
        trending?.data?.map((el) => (
          <div key={el?.id} className={styles.subDiv}>
            <Link href={POSTDETAILS(el?.id as string)}>
              <h5>{el.title}</h5>
            </Link>

            <div className={styles.smalldiv}>
              <div>
                <p>{el.author.anonname}</p>
              </div>
              <div className={styles.dateDiv}>
                <p>{FormatDate(el.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
        {
          trending?.data.length === 0 ? (
            <div className={styles.emptystories}>
               <p>There are no available stories trending.</p>
            </div>
          ) : ("")
        }
    </div>
  );
};

export default Trending;
