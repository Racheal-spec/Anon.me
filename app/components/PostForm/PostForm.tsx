import React from "react";
import style from "./PostForm.module.css";
import { BiImageAdd } from "react-icons/bi";
import { useForm } from "react-hook-form";
import Image from "next/image";
import ComboBox from "@/app/uikits/ComboBox/ComboBox";
import dynamic from "next/dynamic";
import { PostFormType } from "@/app/Types/global";
import { MdCancelPresentation } from "react-icons/md";
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
  handleCancel,
  onEditorStateChange,
}: PostFormType) => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div className={style.post_div}>
      {!imagefile ? (
        <div className={style.coverImgDiv}>
          <div>
            <BiImageAdd fontSize={"1.4rem"} />
          </div>
          <div>
            <label className={style.labelclass} id="file-input-label" htmlFor="file-input">
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
      ): (
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

     
  {
    imagefile && (
      <MdCancelPresentation className={style.cancelimgbtn} onClick={handleCancel}  />
    )
  }
      <ComboBox
        name={"Category"}
        id={categoryId}
        value={categoryId}
        options={tagsstate}
        label={"Choose a Category"}
        onChange={handleselect}
        control={control ? control : null}
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
