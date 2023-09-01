import { bookmarkType, postType } from "./posts";
import { UserProp } from "./user";

export enum Types {
  GetUser = "SET_USER",
}
export enum PostTypes {
  GetPost = "GET_POST",
}
export enum BookmarkTypes {
  SetBookmarks = "SET_BOOKMARKS",
}
type SetUser = {
  type: Types.GetUser;
  payload: UserProp;
};
export type UserReducerType = {
  user: UserProp | null;
};

export type PostStateType = {
  post: {
    data: postType[] | null;
  };
};

export type BookmarkStateType = {
  data: bookmarkType[];
};
export type BookmarkAction = {
  type: BookmarkTypes.SetBookmarks;
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
export type ActionType = SetUser;
