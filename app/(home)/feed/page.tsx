"use client";
import { useEffect } from "react";

const getPosts = async () => {
  // let url = process.env.BASE_URL as string;
  // console.log(url);
  //http://localhost:3000/api/getposts
  const res = await fetch("http://localhost:3000/api/getposts");
  if (!res.ok) {
    console.log(res);
  }
  return await res.json();
};
const Feed = () => {
  const newData = async () => {
    const data = await getPosts();
    console.log(data);
  };

  useEffect(() => {
    newData();
  }, []);
  return (
    <div>
      <div>My Feed</div>
    </div>
  );
};

export default Feed;
