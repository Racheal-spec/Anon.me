import { postType } from "@/app/Types/posts";
import {
  PostActionType,
  PostStateType,
  PostTypes,
} from "../../Types/reducerTypes";

export const initialPostStateVal: PostStateType = {
  data: [] || null,
  singlepost: {
    title: "",
    excerpts: "",
    content: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    published: false,
    deleted: null,
    authorId: "",
    author: {
      id: "",
      createdAt: new Date(),
      anonname: "",
      password: "",
      isAdmin: false,
      uniqueid: "",
      photo: null,
    },
  },
};

// export const initialPostStateVal: PostStateType = {
//   data: [] || null,
// };
// export const initialSinglePostVal: postType = {
//   title: "",
//   excerpts: "",
//   content: "",
//   id: "",
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   published: false,
//   deleted: null,
//   authorId: "",
// };

const PostReducer = (state: PostStateType, action: PostActionType) => {
  switch (action.type) {
    case PostTypes.GetPost:
      return {
        ...state,
        post: action.payload.data,
      };
    case PostTypes.GetSinglePost:
      return {
        ...state,
        singlepost: action.payload.data,
      };
    default:
      return state;
  }
};

export default PostReducer;
