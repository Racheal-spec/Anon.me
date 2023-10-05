import { ReactNode } from "react";
import { AuthorProp } from "../user";
import { PostLikeProp } from "../global";

export type postType = {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  deleted: null;
  authorId?: string;
  postimage?: string;
  categoryId: string;
  likes: PostLikeProp[];
  author: AuthorProp;
};
export type ParamType = {
  params: {
    id: string;
  };
};
export type postParamsType = {
  take: number;
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
  likes: PostLikeProp[];
};

export type bookmarkType = Partial<bookmarkProp>;
