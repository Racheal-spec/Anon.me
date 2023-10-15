import { postType } from "@/app/Types/posts";
import {
  PostActionType,
  PostStateType,
  PostTypes,
} from "../../Types/reducerTypes";

export const initialPostStateVal: PostStateType = {
  data: [] || null,
};

const PostReducer = (
  state: PostStateType,
  action: PostActionType
): PostStateType => {
  switch (action.type) {
    case PostTypes.GetPost:
      return {
        ...state,
        data: action?.payload.data,
      };

    default:
      return state;
  }
};

export default PostReducer;
