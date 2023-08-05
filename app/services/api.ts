import { FC } from "react";
import { UserProp } from "../Types/user";
import { APIProp } from "../Types/global";
import { postType } from "../Types/posts";
import { NextResponse } from "next/server";

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
    console.log("not okkkk");
    throw new Error("API Error");
  }
  if (json) {
    const data = await res.json();
    console.log(`data: ${JSON.stringify(data)}`);
    return data;
  }
};

// export const createfetcher = async ({ url, method, body, json = true }) => {
//   const res = await fetch(url, {
//     method,
//     ...(body && { body: JSON.stringify(body) }),
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     console.log("not okkkk");
//     throw new Error("API Error");
//   }
//   if (json) {
//     const data = await res.json();
//     console.log(`data: ${JSON.stringify(data)}`);
//     return NextResponse.json(data);
//   }
// };

export const register: FC<UserProp> = async (user) => {
  return fetcher({
    url: "/api/data/register",
    method: "post",
    body: user,
    json: true,
  });
};

export const login: FC<UserProp> = async (user) => {
  return fetcher({
    url: "/api/data/login",
    method: "POST",
    body: user,
    json: true,
  });
};

export const userapi: FC<UserProp> = async () => {
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
    url: "/api/data/createpost",
    method: "POST",
    body: post,
    json: true,
  });
};
