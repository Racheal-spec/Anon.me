export type postType = {
  title: string;
  excerpts: string;
  content: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  deleted: null;
  authorId: string;
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
