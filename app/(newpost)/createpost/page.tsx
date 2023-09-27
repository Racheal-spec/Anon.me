"use client";
import React, { useRef, useState } from "react";
import style from "../createpost/page.module.css";
import PageHeader from "./PageHeader/PageHeader";
import { BiImageAdd } from "react-icons/bi";
import "../../globalstyles/globals.css";
import Image from "next/image";
import { useForm } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";
import { createNewPost, setPublishPost } from "@/app/context/Actions/Actions";
import { postType } from "@/app/Types/posts";

const Editor = dynamic(
  async () => {
    const mod = await import("react-draft-wysiwyg");
    return mod.Editor;
  },
  { ssr: false }
);
const Createpost = () => {
  const [postdata, setPostData] = useState<postType>();
  const [imagefile, setImageFile] = useState("");
  const [imageData, setImageData] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isPublishLoading, setPublishLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const titleref = useRef<HTMLHeadingElement | null>(null);

  const convertContentToRaw = () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };
  const handleEditorChange = (event) => {
    setEditorState(event);
  };

  const handleFormSubmit = async (data: any) => {
    const file = data?.postimage?.[0];
    const formData = new FormData();
    const postData = JSON.stringify({
      title: titleref.current?.innerText,
      content: convertContentToRaw(),
    });
    formData.append("postData", postData);
    file ? formData.append("postimage", file) : null;
    try {
      setLoading(true);
      const res = await createNewPost(formData);
      if (res.statusText === "created") {
        setPostData(res);
        setLoading(false);
        toast.success("Story created successfully!");
      }
    } catch (error) {
      console.log(error);
      if (error) {
        setLoading(false);
      }
    }
  };

  const handlePublished = async () => {
    try {
      setPublishLoading(true);

      let data = await setPublishPost(postdata?.id!);

      if (data.message.code === "P2025") {
        setPublishLoading(false);
        toast.warning(data.message.meta.cause);
      }
      if (data.status === 200) {
        toast.success("You have just published a new story!");
      }

      return data;
    } catch (error) {
      console.error(error);
      setPublishLoading(false);
    }
  };

  console.log(postdata, isLoading);

  // const handleChange = (event) => {
  //   const name = event?.target.name;
  //   setPost({
  //     ...post,
  //     [name]: event.target.value,
  //   });
  //   console.log(post);
  // };

  //console.log(`userdata: ${JSON.stringify(userdata)}`);
  return (
    <div className={style.mainWrapper}>
      <PageHeader
        handleFormSubmit={handleSubmit(handleFormSubmit)}
        handlePublished={handlePublished}
        loading={isLoading}
        isPublishLoading={isPublishLoading}
      />

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
                    onChange(event) {
                      const file = event?.target?.files[0];

                      setImageData(file);
                      setImageFile(URL.createObjectURL(file));
                    },
                  })}
                  //onChange={handleFileChange}
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
            onEditorStateChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Createpost;
