"use client";
import { UserProvider } from "./userContext";
import UserReducer from "../context/userReducer";
import { initialVal } from "../context/userReducer";
import { ReactNode } from "react";
import { PostProvider, initialPostStateVal } from "./postContext";
import PostReducer from "./postReducer";

export const MainContext = ({ children }) => {
  return (
    <>
      <UserProvider reducer={UserReducer} initialState={initialVal}>
        <PostProvider
          Reducer={PostReducer}
          initialPostState={initialPostStateVal}
        >
          {children}
        </PostProvider>
      </UserProvider>
    </>
  );
};
