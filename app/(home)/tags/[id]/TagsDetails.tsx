"use client";
import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import styles from "./page.module.css";
import { getSingleTag } from "@/app/context/Actions/Actions";
import SearchLoader from "@/app/components/SearchLoader/SearchLoader";
import BorderCard from "@/app/components/BorderCard/BorderCard";
import { TagsProp } from "@/app/Types/global";

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

  console.log(singletag);
  return (
    <div className={styles.tagswrapper}>
      <div>{singletag?.title ?? ""}</div>
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
                  excerpts={excerpt}
                  postimage={result?.postimage}
                  createdAt={result?.createdAt}
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
