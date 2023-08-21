"use client";
import { UserProvider } from "./userContext";
import UserReducer from "../context/userReducer";
import { initialVal } from "../context/userReducer";
import { ReactNode } from "react";
import { PostProvider } from "./postContext";
import PostReducer, { initialPostState } from "./postReducer";

export const MainContext = ({ children }) => {
  return (
    <>
      <UserProvider reducer={UserReducer} initialState={initialVal}>
        <PostProvider
          PostReducer={PostReducer}
          initialPostState={initialPostState}
        >
          {children}
        </PostProvider>
      </UserProvider>
    </>
  );
};
