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

//==============USER TYPES================//
export type ActionType = {
  type: Types.GetUser;
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
    data: postType;
  };
};
//==============SEARCH TYPES================//
export type SearchStateType = {
  results: postType[] | null;
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
