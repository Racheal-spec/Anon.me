import { FC } from "react";
import { UserProp } from "../Types/user";
import { APIProp } from "../Types/global";

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
    throw new Error("API Error");
  }
  if (json) {
    const data = await res.json();
    return data;
  }
};

export const register: FC<UserProp> = async (user) => {
  return fetcher({
    url: "/api/register",
    method: "post",
    body: user,
    json: true,
  });
};

export const login: FC<UserProp> = async (user) => {
  return fetcher({
    url: "/api/login",
    method: "POST",
    body: user,
    json: true,
  });
};

export const userapi: FC<UserProp> = async () => {
  return fetcher({
    url: `${process.env.BASE_URL}/api/user`,
    method: "GET",
    json: true,
  });
};
export const getallposts = async () => {
  return fetcher({
    url: "/api/posts",
    method: "GET",
    json: true,
  });
};
