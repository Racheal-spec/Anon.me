"use client";
import { UserProvider } from "./userContext";
import UserReducer from "./Reducers/userReducer";
import { initialVal } from "./Reducers/userReducer";
import { PostProvider } from "./postContext";
import PostReducer, { initialPostStateVal } from "./Reducers/postReducer";
import { BookmarkProvider, initialBookState } from "./bookmarkContext";
import BookmarkReducer from "./Reducers/bookmarkReducer";
import { SearchProvider } from "./SearchContext";
import SearchReducer, { initialSearchStateVal } from "./Reducers/searchReducer";
import { DashboardContextType, DashboardProvider } from "./DashboardContext";
import DashboardReducer from "./Reducers/dashboardReducer";

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
            <SearchProvider
              Reducer={SearchReducer}
              initialSearchState={initialSearchStateVal}
            >
              <DashboardProvider
                reducer={DashboardReducer}
                initialState={DashboardContextType}
              >
                {children}
              </DashboardProvider>
            </SearchProvider>
          </BookmarkProvider>
        </PostProvider>
      </UserProvider>
    </>
  );
};
