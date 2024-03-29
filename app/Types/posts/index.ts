import { ReactNode } from "react";
import { AuthorProp } from "../user";
import { PostLikeProp } from "../global";

export type category = {
  id: string;
  title: string;
}
export type postType = {
  title: string;
  content: string;
  id: string;
  createdAt: any;
  updatedAt: Date;
  published: boolean;
  deleted: null;
  authorId?: string;
  postimage?: string;
  categoryId: string;
  likes: PostLikeProp[];
  likesCount: number;
  author: AuthorProp;
  comments: commentProp[];
  category: category;
};
export type ParamType = {
  params: {
    id: string;
  };
};
export type postParamsType = {
  take?: number;
  lastCursor: string;
  search?: string;
};
type bookmarkProp = {
  title: string;
  excerpts: string;
  id: string;
  createdAt: any;
  postimage: string;
  author: string;
  likes: number | PostLikeProp[];
  post: postType;
  user: AuthorProp;
};

export type bookmarkType = Partial<bookmarkProp>;

export type commentProp = {
  author: any;
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  commenterId: string;
  postId: string;
  commenter: {
    id: string;
    createdAt: string;
    anonname: string;
    isAdmin: boolean;
    photo: string | null;
  };
};
export type commentTypeProp = {
  data: {
    data: commentProp[];
  };
  status: number;
  statusText: string;
};

export type LikeProp = {
  id: string;
  userId: string;
  postId: string;
};
export type trendingProp = {
  data: postType[];
};
