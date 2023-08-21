"use client";

import { createContext, useContext, useReducer } from "react";

const PostContext = createContext();

export const PostProvider = ({ children, PostReducer, initialPostState }) => {
  const postreducer = useReducer(PostReducer, initialPostState);
  return (
    <PostContext.Provider value={postreducer}>{children}</PostContext.Provider>
  );
};

export const usePostValue = () => useContext(PostContext);

export default PostContext;
