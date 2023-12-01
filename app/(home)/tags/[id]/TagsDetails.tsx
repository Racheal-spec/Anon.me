"use client";
import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import styles from "./page.module.css";
import { getSingleTag } from "@/app/context/Actions/Actions";
import SearchLoader from "@/app/components/SearchLoader/SearchLoader";
import BorderCard from "@/app/components/BorderCard/BorderCard";
import { TagsProp } from "@/app/Types/global";
import EmptyState from "@/app/components/EmptyState/EmptyState";
import Card from "@/app/components/Card/Card";
import { changeTextFromHTML } from "@/app/services/HtmltoText";

const TagsDetails = () => {
  let params = useParams();
  const [isLoading, setLoading] = useState(false);
  const [singletag, setSingleTag] = useState<TagsProp | null>(null);
  const fetchTag = async () => {
    setLoading(true);
    let data = await getSingleTag(params.id as string);
    if (data) {
      setSingleTag(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTag();
  }, []);

  return (
    <div className={styles.tagswrapper}>
      <div className={styles.banner}>
      {singletag?.posts?.length !== 0 && (
       <h1>{singletag?.title ?? ""}</h1>
      )}
      
      </div>
      {singletag?.posts?.length === 0 && (
          <EmptyState
            heading={`No ${singletag?.title} post Yet`}
            description="No available post for this category, kindly check back later"
          />
      )}
      {isLoading ? (
        <div className={styles.loaderdiv}>
          <SearchLoader />
        </div>
      ) : (
        <div className={styles.resultWrapper}>
          {singletag?.posts?.map((result) => {
            let excerpt = result?.content.slice(0, 200);
            return (
              <div key={result.id}>
                <BorderCard
                  id={result?.id}
                  title={result?.title}
                  author={result?.author?.anonname}
                  excerpts={changeTextFromHTML(excerpt)}
                  postimage={result?.postimage}
                  createdAt={result?.createdAt}
                  likes={result?.likesCount!}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TagsDetails;
