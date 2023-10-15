"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "../createpost/page.module.css";
import "../../globalstyles/globals.css";
import { useForm } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";
import { editPost, getSinglePost } from "@/app/context/Actions/Actions";
import { postType } from "@/app/Types/posts";
import { useTagsValue } from "@/app/context/TagsContext";
import { useRouter, useSearchParams } from "next/navigation";
import { CREATEPOST } from "@/app/Routes/RoutesUrl";
import PostForm from "@/app/components/PostForm/PostForm";
import PageHeader from "../PageHeader/PageHeader";
import emptyrect from "../../Assets/images/emptyrect.png";

const Editpost = () => {
  const [, setImageFile] = useState("");
  const [, setImageData] = useState<File | null>(null);
  const [titledata, setTitleData] = useState();
  const [isUpdatingLoading, setUpdatingLoading] = useState(false);
  const [editstatus, setEditStatus] = useState(false);
  const { tagsstate } = useTagsValue();
  const router = useRouter();
  const { handleSubmit, setValue } = useForm();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const edittitleref = useRef<HTMLHeadingElement | null>(null);
  const [updatecategoryId, setUpdateCategoryId] = useState("");
  const [singlepostData, setSinglePostData] = useState<postType | null>(null);
  const firstRender = useRef(true);

  //==========================HANDLERS=================================//
  const convertContentToRaw = () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };
  const handleEditEditorChange = (newstate: EditorState) => {
    setEditorState(newstate);
  };
  let params = useSearchParams();
  let postId = params.get("draft");

  const handleEditImageStateChange = (event: any) => {
    const file = event?.target?.files[0];
    setImageData(file);
    setImageFile(URL.createObjectURL(file));
  };

  const handleEditselect = (e: any) => {
    setUpdateCategoryId(e.target.value);
  };

  const handleEdit = async (data: any) => {
    setTitleData(data);
    const file = data?.postimage?.[0];
    const formData = new FormData();
    const postData = JSON.stringify({
      title: edittitleref.current?.innerText,
      content: convertContentToRaw(),
      categoryId: updatecategoryId,
    });
    formData.append("postData", postData);
    file ? formData.append("postimage", file) : null;
    // Use setValue to update the title in React Hook Form
    setValue("title", edittitleref.current?.innerText);
    try {
      setUpdatingLoading(true);
      let res = await editPost(formData, { id: postId as string });
      console.log(res);
      if (res.status === 200) {
        setUpdatingLoading(false);
        toast.success("Post updated successfully!");
      }
    } catch (error) {
      console.log(error);
      if (error) {
        setUpdatingLoading(false);
      }
    }
  };

  //==============================USEEFFECTS====================================//
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      } else {
        handleEdit(titledata);
      }
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [edittitleref, titledata, updatecategoryId, editorState]);
  useEffect(() => {
    const fetchData = async () => {
      let response = await getSinglePost(postId as string);
      setSinglePostData(response);
    };

    fetchData();
  }, [postId]);

  //useEffect for when the page reloads
  useEffect(() => {
    if (singlepostData) {
      if (postId !== undefined && singlepostData?.content) {
        const responseContent = convertFromHTML(singlepostData?.content);
        const contentState = ContentState?.createFromBlockArray(
          responseContent.contentBlocks
        );
        setEditorState(EditorState?.createWithContent(contentState));
      } else {
        router.replace(CREATEPOST);
      }
      if (edittitleref && edittitleref.current && singlepostData) {
        const title = singlepostData.title || "";
        setValue("title", (edittitleref.current.innerText = title));
        setUpdateCategoryId(singlepostData?.categoryId);
      }
      if (singlepostData?.published === true) {
        setEditStatus(true);
      }
    }
  }, [singlepostData]);

  return (
    <div className={style.mainWrapper}>
      <PageHeader
        editstatus={editstatus}
        loading={isUpdatingLoading}
        id={postId ?? ""}
      />

      <PostForm
        imagefile={singlepostData?.postimage ?? emptyrect}
        titleref={edittitleref}
        handleStateChange={handleEditImageStateChange}
        tagsstate={tagsstate?.data || []}
        editorState={editorState}
        onEditorStateChange={handleEditEditorChange}
        handleselect={handleEditselect}
        categoryId={updatecategoryId}
      />
    </div>
  );
};

export default Editpost;