"use client";
import React, { useState } from "react";
import style from "../createpost/page.module.css";
import Button from "../../components/Button/button";
const newPosts = async (post) => {
  // let url = process.env.BASE_URL as string;
  // console.log(url);
  //http://localhost:3000/api/getposts
  const res = await fetch("http://localhost:3000/api/data/createpost");
  if (!res.ok) {
    console.log(res);
  }
  return await res.json(post);
};
const Createpost = () => {
  const initialState = {
    title: "",
    content: "",
    excerpts: "",
    author: "",
  };
  const [post, setPost] = useState(initialState);
  const newData = async () => {
    const data = await newPosts(post);
    console.log(data);
  };
  const handleChange = (event) => {
    const name = event?.target.name;
    setPost({
      ...post,
      [name]: event.target.value,
    });
    console.log(post);
  };
  const handleSubmit = () => {
    newData();
    console.log(post);
  };
  //console.log(`userdata: ${JSON.stringify(userdata)}`);
  return (
    <div>
      <div className={style.post_div}>
        <h2>Create a New Post</h2>
        <form className={style.form_wrapper} onSubmit={handleSubmit}>
          <label className={style.label}>Title</label>
          <input
            className={style.form_input}
            type="text"
            name="title"
            placeholder="your blog title here..."
            onChange={handleChange}
          />
          <label className={style.label}>Post Excerpts</label>
          <textarea
            className={style.form_excerpts}
            placeholder="write excerpts..."
            name="excerpts"
            onChange={handleChange}
          />
          <label className={style.label}>Post</label>
          <textarea
            className={style.form_mainpost}
            placeholder="your post here..."
            name="content"
            onChange={handleChange}
          />
          <Button primary type="submit">
            Create Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Createpost;
