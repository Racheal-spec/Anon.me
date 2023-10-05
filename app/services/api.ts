import { FC } from "react";
import { APIProp } from "../Types/global";
import { postType } from "../Types/posts";
import { UserSchemaType } from "./validations/user.schema";
import { toast } from "react-toastify";

export const fetcher: FC<APIProp> = async ({
  url,
  method,
  body,
  json = true,
}) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.log("not okkkk", res);
    return res.json().then((data) => toast.error(data.message));
  }
  if (json) {
    const data = await res.json();
    // console.log(data);
    return data;
  }
};

export const registeruser: FC<UserSchemaType> = async (user) => {
  return fetcher({
    url: "/api/data/register",
    method: "POST",
    body: user,
    json: true,
  });
};

export const login: FC<UserSchemaType> = async (user) => {
  return fetcher({
    url: "/api/data/login",
    method: "POST",
    body: user,
    json: true,
  });
};

export const userapi: FC<UserSchemaType> = async () => {
  return fetcher({
    url: `${process.env.BASE_URL}/api/auth/user`,
    method: "GET",
    json: true,
  });
};
export const getallposts = async () => {
  return fetcher({
    url: "/api/data/posts",
    method: "GET",
    json: true,
  });
};

export const createpost: FC<postType> = async (post) => {
  return fetcher({
    url: "/api/auth/posts/createpost",
    method: "POST",
    body: post,
    json: true,
  });
};

export const getsinglepost = async () => {
  return fetcher({
    url: "/api/data/posts/:id",
    method: "GET",
    json: true,
  });
};

export const publishPost = async (id: string) => {
  return fetcher({
    url: `/api/data/posts/publish/${id}`,
    method: "PUT",
    json: true,
  });
};

export const editPost: FC<postType> = async (post, id) => {
  return fetcher({
    url: `/api/auth/posts/edit/${id}`,
    method: "PUT",
    body: post,
    json: true,
  });
};

export const getalltags = async () => {
  return fetcher({
    url: "/api/data/tags",
    method: "GET",
    json: true,
  });
};

// export const postLikes = async ({
//   user,
//   post,
// }: {
//   user: string;
//   post: string;
// }) => {
//   return fetcher({
//     url: `http://localhost:3000/api/auth/posts/like?user=${user}&post=${post}`,
//     method: "POST",
//     json: true,
//   });
// };
