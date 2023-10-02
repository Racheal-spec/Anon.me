import React from "react";
import style from "./PostForm.module.css";
import { BiImageAdd } from "react-icons/bi";
import { useForm } from "react-hook-form";
import Image from "next/image";
import ComboBox from "@/app/uikits/ComboBox/ComboBox";
import dynamic from "next/dynamic";

const Editor = dynamic(
  async () => {
    const mod = await import("react-draft-wysiwyg");
    return mod.Editor;
  },
  { ssr: false }
);
const PostForm = ({
  imagefile,
  handleStateChange,
  categoryId,
  tagsstate,
  handleselect,
  titleref,
  editorState,
  onEditorStateChange,
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div className={style.post_div}>
      {!imagefile && (
        <div className={style.coverImgDiv}>
          <div>
            <BiImageAdd fontSize={"1.4rem"} />
          </div>
          <div>
            <label id="file-input-label" htmlFor="file-input">
              Add Cover Image
              <input
                type="file"
                id="file-input"
                {...register("postimage", {
                  onChange: handleStateChange,
                })}
              />
            </label>
          </div>
        </div>
      )}

      {imagefile && (
        <div>
          <Image
            src={imagefile}
            width={1000}
            height={500}
            className={style.coverimgshow}
            alt="uploaded-image"
          />
        </div>
      )}

      <ComboBox
        name={"Category"}
        id={categoryId}
        value={categoryId}
        options={tagsstate}
        label={"Choose a Category"}
        onChange={handleselect}
      />

      <h1
        ref={titleref}
        contentEditable={true}
        className={style.headingH1}
        data-text="New Story Title Here..."
      ></h1>
      <div>
        <Editor
          editorStyle={{
            minHeight: "auto",
            width: "100%",
            backgroundColor: "#F0F0F0",
            padding: "10px",
            marginTop: "0px",
          }}
          placeholder="Start typing your story..."
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
      </div>
    </div>
  );
};

export default PostForm;
