import { ReactNode } from "react";
import { AuthorProp } from "../user";

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
};

export type bookmarkType = Partial<bookmarkProp>;
