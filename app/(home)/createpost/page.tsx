"use client";
import React, { useState } from "react";
import style from "../createpost/page.module.css";
import Button from "../../components/Button/button";

const Createpost = () => {
  const initialState = {
    title: "",
    content: "",
    excerpts: "",
    author: "",
  };
  const [post, setPost] = useState(initialState);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/data/createpost", {
        method: "post",
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          excerpts: post.excerpts,
          author: post.author,
        }),
      });
      if (res.ok) {
        const newpost = await res.json();
        console.log(`newpost: ${newpost}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    const name = event?.target.name;
    setPost({
      ...post,
      [name]: event.target.value,
    });
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
            value={post.title}
            onChange={handleChange}
          />
          <label className={style.label}>Post Excerpts</label>
          <textarea
            className={style.form_excerpts}
            placeholder="write excerpts..."
            name="excerpts"
            value={post.excerpts}
            onChange={handleChange}
          />
          <label className={style.label}>Post</label>
          <textarea
            className={style.form_mainpost}
            placeholder="your post here..."
            name="content"
            value={post.content}
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
