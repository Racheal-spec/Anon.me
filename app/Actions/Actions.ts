import { postParamsType } from "../Types/posts";

export const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/user");
    if (!res.ok) {
      console.log(res);
    }
    return await res?.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async ({ take, lastCursor }: postParamsType) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/data/posts?take=${take}&lastCursor=${lastCursor}`
    );
    if (!res.ok) {
      console.log(res);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
