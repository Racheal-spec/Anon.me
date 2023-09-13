"use client";
import { SearchTypes } from "@/app/Types/reducerTypes";
import { searchPosts } from "@/app/context/Actions/Actions";
import { useSearchValue } from "@/app/context/SearchContext";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SearchComp = () => {
  const param = useSearchParams().get("title");
  const { searchstate, searchdispatch } = useSearchValue();
  console.log(param);
  const fetchResult = async () => {
    if (param !== null) {
      let data = await searchPosts({ search: param });
      if (searchdispatch) {
        searchdispatch({
          type: SearchTypes.GetSearchPost,
          payload: data,
        });
      }
    }
  };
  useEffect(() => {
    fetchResult();
  }, []);
  console.log(searchstate);
  return <div>SearchComp {param}</div>;
};

export default SearchComp;
