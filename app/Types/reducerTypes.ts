import { bookmarkType, postType } from "./posts";
import { UserProp } from "./user";

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

export type ActionType = {
  type: Types.GetUser;
  payload: UserProp;
};
export type UserReducerType = {
  user: UserProp | null;
};

export type PostStateType = {
  data: postType[] | null;
  singlepost: postType;
};

export type BookmarkStateType = {
  data: bookmarkType[];
};
export type BookmarkAction = {
  type: BookmarkTypes.SetBookmarks | BookmarkTypes.DeleteBookmarks;
  payload: {
    data: bookmarkType;
  };
};
export type PostAction = {
  type: PostTypes.GetPost;
  payload: {
    data: postType[] | null;
  };
};
export type SinglePostAction = {
  type: PostTypes.GetSinglePost;
  payload: {
    data: postType;
  };
};
export type PostActionType = PostAction | SinglePostAction;
