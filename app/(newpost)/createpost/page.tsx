"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "../createpost/page.module.css";
import PageHeader from "../PageHeader/PageHeader";
import "../../globalstyles/globals.css";
import { useForm } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";
import { createNewPost } from "@/app/context/Actions/Actions";
import { postType } from "@/app/Types/posts";
import { useTagsValue } from "@/app/context/TagsContext";
import { useRouter } from "next/navigation";
import { EDITDRAFT } from "@/app/Routes/RoutesUrl";
import PostForm from "@/app/components/PostForm/PostForm";

type postDataType = {
  data: postType;
};
const Createpost = () => {
  const [postdata, setPostData] = useState<postDataType>();
  const [imagefile, setImageFile] = useState("");
  const [, setImageData] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);
  const { tagsstate } = useTagsValue();
  const router = useRouter();
  const { handleSubmit, setValue } = useForm();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const titleref = useRef<HTMLHeadingElement | null>(null);
  const [categoryId, setCategoryId] = useState("");

  //==========================HANDLERS=================================//
  const convertContentToRaw = () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };
  const handleEditorChange = (event: any) => {
    setEditorState(event);
  };
  const handleFormSubmit = async (data: any) => {
    const file = data?.postimage?.[0];
    const formData = new FormData();
    const postData = JSON.stringify({
      title: titleref.current?.innerText,
      content: convertContentToRaw(),
      categoryId: categoryId,
    });
    formData.append("postData", postData);
    file ? formData.append("postimage", file) : null;
    // Use setValue to update the title in React Hook Form
    setValue("title", titleref.current?.innerText);

    try {
      setLoading(true);
      // console.log(formData);
      const res = await createNewPost(formData);
      // console.log(res);
      if (res.statusText === "created") {
        setPostData(res);
        setLoading(false);
        toast.success("Your post has been saved as draft!");
      }
    } catch (error) {
      console.log(error);
      if (error) {
        setLoading(false);
      }
    }
  };
  const handleStateChange = (event: any) => {
    const file = event?.target?.files[0];
    setImageData(file);
    setImageFile(URL.createObjectURL(file));
  };

  const handleselect = (e: any) => {
    setCategoryId(e.target.value);
  };

  //==============================USEEFFECTS====================================//

  //useEffect for the saved action before the page reloads
  useEffect(() => {
    if (postdata) {
      router.replace(EDITDRAFT(postdata?.data?.id));
    }
  }, [postdata]);

  return (
    <div className={style.mainWrapper}>
      <PageHeader
        handleFormSubmit={handleSubmit(handleFormSubmit)}
        loading={isLoading}
        id={postdata ? postdata?.data?.id : ""}
      />

      <PostForm
        imagefile={imagefile}
        titleref={titleref}
        handleStateChange={handleStateChange}
        categoryId={categoryId}
        tagsstate={tagsstate?.data || []}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        handleselect={handleselect}
      />
    </div>
  );
};

export default Createpost;
