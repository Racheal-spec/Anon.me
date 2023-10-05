import { PostLikeProp, TagsProp } from "./global";
import { bookmarkType, postType } from "./posts";
import { UserProp } from "./user";

//==============ENUMS================//
export enum Types {
  GetUser = "SET_USER",
}
export enum TagsTypes {
  GetTags = "GET_TAGS",
}
export enum PostlikeTypes {
  GetPostlike = "GET_POSTLIKE",
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
export enum PublishedTypes {
  Get_Published = "GET_PUBLISHED",
}
//==============USER TYPES================//
export type ActionType = {
  type: Types.GetUser | "SET_TOGGLE";
  payload: UserProp;
};
export type UserReducerType = {
  user: UserProp | null;
};
//==============PUBLISHED POST TYPES================//
export type PublishedStateType = {
  data: postType[] | null;
};
export type PublishedAction = {
  type: PublishedTypes.Get_Published;
  payload: {
    data: postType[] | null;
  };
};
//==============POST TYPES================//
export type PostStateType = {
  data: postType[] | null;
  // singlepost: postType;
};
export type PostAction = {
  type: PostTypes.GetPost;
  payload: {
    data: postType[] | null;
  };
};
export type PostActionType = PostAction;
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

//==============TAGS TYPES================//
export type TagsActionType = {
  type: TagsTypes.GetTags;
  payload: {
    data: TagsProp[];
  };
};
export type TagsReducerType = {
  data: TagsProp[] | null;
};

//==============POSTLIKE TYPES================//
export type PostlikeActionType = {
  type: PostlikeTypes.GetPostlike;
  payload: {
    data: PostLikeProp;
  };
};
export type PostlikeReducerType = PostLikeProp | null;
