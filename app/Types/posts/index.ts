import { ReactNode } from "react";
import { AuthorProp } from "../user";

export type postType = {
  title: string;
  excerpts: string;
  content: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  deleted: null;
  authorId?: string;
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
};

type bookmarkProp = {
  title: string;
  excerpts: string;
  id: string;
  createdAt: any;
  author: string;
};

export type bookmarkType = Partial<bookmarkProp>;
