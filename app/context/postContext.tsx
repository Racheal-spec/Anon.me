"use client";

import { createContext, useContext, useReducer } from "react";
import { PostAction, PostStateType } from "../Types/reducerTypes";
import PostReducer from "./postReducer";

export const initialPostStateVal = {
  post: {
    data: [] || null,
  },
};

const PostContext = createContext<{
  poststate: PostStateType;
  postdispatch: React.Dispatch<PostAction>;
}>({
  poststate: initialPostStateVal,
  postdispatch: () => [] || null,
});

export const PostProvider = ({ children, Reducer, initialPostState }) => {
  const [poststate, postdispatch] = useReducer<typeof PostReducer>(
    Reducer,
    initialPostState
  );
  return (
    <PostContext.Provider value={{ poststate, postdispatch }}>
      {children}
    </PostContext.Provider>
  );
};
export const usePostValue = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export default PostContext;
