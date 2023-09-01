"use client";
import { UserProvider } from "./userContext";
import UserReducer from "./Reducers/userReducer";
import { initialVal } from "./Reducers/userReducer";
import { ReactNode } from "react";
import { PostProvider } from "./postContext";
import PostReducer, { initialPostStateVal } from "./Reducers/postReducer";
import { BookmarkProvider, initialBookState } from "./bookmarkContext";
import BookmarkReducer from "./Reducers/bookmarkReducer";

type childrenType = {
  children: JSX.Element;
};
export const MainContext = ({ children }: childrenType) => {
  return (
    <>
      <UserProvider reducer={UserReducer} initialState={initialVal}>
        <PostProvider
          Reducer={PostReducer}
          initialPostState={initialPostStateVal}
        >
          <BookmarkProvider
            BMReducer={BookmarkReducer}
            initialBMState={initialBookState}
          >
            {children}
          </BookmarkProvider>
        </PostProvider>
      </UserProvider>
    </>
  );
};
