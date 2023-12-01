"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import style from "../createpost/page.module.css";
import "../../../globalstyles/globals.css";
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
import Loading from "../../Loading";
import PageHeader from "../PageHeader/PageHeader";


type postDataType = {
  data: postType;
};
const Createpost = () => {
  const [postdata, setPostData] = useState<postDataType>();
  const [imagefile, setImageFile] = useState("");
  const [imageData, setImageData] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);
  const { tagsstate } = useTagsValue();
  const router = useRouter();
  const { handleSubmit, setValue } = useForm();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const titleref = useRef<HTMLHeadingElement | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const firstrender = useRef(false);

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
    imageData ? formData.append("postimage", imageData) : null;
    // Use setValue to update the title in React Hook Form
    setValue("title", titleref.current?.innerText);

    try {
     if(formData){
      setLoading(true);
       console.log(formData);
      const res = await createNewPost(formData);
      // console.log(res);
      if (res.statusText === "created") {
        setPostData(res);
        setLoading(false);
        toast.success("Your post has been saved as draft!");
      }
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

  console.log(imageData, imagefile)

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

  // useEffect(() => {
  //  const firstRender = true;
  //  if(firstRender)
  // }, [])

  const handleCancel = () => {

    setImageData(null);
    setImageFile("");
  };

  

  return (
    <Suspense fallback={<Loading />}>
    <div className={style.mainWrapper}>
    

      <PostForm
        imagefile={imagefile}
        titleref={titleref}
        handleStateChange={handleStateChange}
        categoryId={categoryId}
        tagsstate={tagsstate?.data || []}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        handleselect={handleselect}
        handleCancel={handleCancel}
      />
        <PageHeader
        handleFormSubmit={handleSubmit(handleFormSubmit)}
        loading={isLoading}
        id={postdata ? postdata?.data?.id : ""}
      />
    </div>
    </Suspense>
  );
};

export default Createpost;
