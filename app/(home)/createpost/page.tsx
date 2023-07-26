import React from "react";
import style from "../createpost/page.module.css";
import Button from "../../components/Button/button";
import { getUser } from "@/app/services/userdata";

const Createpost = async () => {
  const user = await getUser();

  return (
    <div>
      <div className={style.post_div}>
        <h2>Create a New Post</h2>
        <form className={style.form_wrapper}>
          <label className={style.label}>Title</label>
          <input
            className={style.form_input}
            type="text"
            placeholder="your blog title here..."
          />
          <label className={style.label}>Post Excerpts</label>
          <textarea
            className={style.form_excerpts}
            placeholder="write excerpts..."
          />
          <label className={style.label}>Post</label>
          <textarea
            className={style.form_mainpost}
            placeholder="your post here..."
          />
          <Button primary>Create Post</Button>
        </form>
      </div>
    </div>
  );
};

export default Createpost;
