"use client";
import { SearchTypes } from "@/app/Types/reducerTypes";
import { searchPosts } from "@/app/context/Actions/Actions";
import { useSearchValue } from "@/app/context/SearchContext";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import BorderCard from "@/app/components/BorderCard/BorderCard";
import { postType } from "@/app/Types/posts";
import { IoIosArrowDown } from "react-icons/io";
import EmptyState from "@/app/components/EmptyState/EmptyState";
import SearchLoader from "@/app/components/SearchLoader/SearchLoader";
import { changeTextFromHTML } from "@/app/services/HtmltoText";
const SearchComp = () => {
  const param = useSearchParams().get("title");
  const { searchstate, searchdispatch } = useSearchValue();
  const take = 4;
  const [lastCursor, setLastCursor] = useState("");
  const [searched, setSearched] = useState<postType[] | null>(
    searchstate?.results?.data || null
  );
  const [isloading, setloading] = useState(false);

  const fetchResult = async () => {
    setloading(true);
    if (param !== null) {
      let data = await searchPosts({
        search: param,
        take: take,
        lastCursor: lastCursor,
      });
      if (data) {
        searchdispatch({
          type: SearchTypes.GetSearchPost,
          payload: data,
        });
        setloading(false);
      }
      setLastCursor(data?.results?.metaData.lastCursor);
      setSearched(data?.data);
    }
  };
  console.log(searched);
  const handleMore = () => {
    setSearched((prev) => {
      return [...(prev?.length ? prev : []), ...searched!];
    });
    // setSearched((prev) => setSearched([...searchstate.results.data]));
  };
  useEffect(() => {
    fetchResult();
  }, [param]);
  //console.log(searchstate);
  return (
    <div className={styles.searchCompWrapper}>
      <h1>
        Search result for <span>"{param}"</span>
      </h1>
      {isloading ? (
        <div className={styles.loaderdiv}>
          <SearchLoader />
        </div>
      ) : (
        <div className={styles.resultWrapper}>
          {searched?.map((result: postType) => {
            let excerpt = result?.content.slice(0, 200);
            return (
              <div key={result.id}>
                <BorderCard
                  id={result?.id}
                  title={result?.title}
                  author={result?.author.anonname}
                  excerpts={changeTextFromHTML(excerpt)}
                  postimage={result?.postimage}
                  createdAt={result?.createdAt}
                />
              </div>
            );
          })}
        </div>
      )}

      <div>
        {!isloading && searched?.length === 0 && (
          <EmptyState heading="No search results" />
        )}
      </div>
      {searched?.length !== 0 && (
        <div className={styles.morediv} onClick={handleMore}>
          <div className={styles.moreText}>See more stories</div>

          <IoIosArrowDown fontSize={"1.2rem"} />
        </div>
      )}
    </div>
  );
};

export default SearchComp;
