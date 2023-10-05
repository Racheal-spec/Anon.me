import {
  PostlikeActionType,
  PostlikeReducerType,
  PostlikeTypes,
} from "@/app/Types/reducerTypes";

export const initialPostLike = {
  data: null,
};

const PostlikeReducer = (
  state: PostlikeReducerType,
  action: PostlikeActionType
) => {
  switch (action.type) {
    case PostlikeTypes.GetPostlike:
      return {
        ...state,
        data: action.payload.data,
      };

    default:
      return state;
  }
};

export default PostlikeReducer;
