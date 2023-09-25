import { bookmarkType, postType } from "./posts";
import { UserProp } from "./user";

//==============ENUMS================//
export enum Types {
  GetUser = "SET_USER",
}
export enum PostTypes {
  GetPost = "GET_POST",
  GetSinglePost = "GET_SINGLE_POST",
}
export enum BookmarkTypes {
  SetBookmarks = "SET_BOOKMARKS",
  DeleteBookmarks = "DELETE_BOOKMARKS",
}
export enum SearchTypes {
  GetSearchPost = "GET_SEARCHED_POST",
}
export enum DashboardTypes {
  Set_Toggle = "SET_TOGGLE",
}

//==============USER TYPES================//
export type ActionType = {
  type: Types.GetUser | "SET_TOGGLE";
  payload: UserProp;
};
export type UserReducerType = {
  user: UserProp | null;
};
//==============POST TYPES================//
export type PostStateType = {
  data: postType[] | null;
  singlepost: postType;
};
export type PostAction = {
  type: PostTypes.GetPost;
  payload: {
    data: postType[] | null;
  };
};
export type PostActionType = PostAction | SinglePostAction;
//==============SINGLE POST TYPES================//
export type SinglePostAction = {
  type: PostTypes.GetSinglePost;
  payload: {
    data: postType | null;
  };
};
//==============SEARCH TYPES================//
export type SearchStateType = {
  results: {
    data: postType[] | null;
  };
};
export type SearchAction = {
  type: SearchTypes.GetSearchPost;
  payload: {
    data: postType[] | null;
  };
};
//==============BOOKMARK TYPES================//
export type BookmarkStateType = {
  data: bookmarkType[];
};
export type BookmarkAction = {
  type: BookmarkTypes.SetBookmarks | BookmarkTypes.DeleteBookmarks;
  payload: {
    data: bookmarkType;
  };
};

//===================DASHBOARD TYPES=================//

export type DashboardReducerType = {
  toggle: boolean;
};

export type DashboardAction = {
  type: DashboardTypes.Set_Toggle;
  payload: {
    toggle: DashboardReducerType["toggle"];
  };
};
