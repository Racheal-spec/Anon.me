import { PostAction, PostStateType, PostTypes } from "../Types/reducerTypes";

const PostReducer = (state: PostStateType, action: PostAction) => {
  switch (action.type) {
    case PostTypes.GetPost:
      return {
        ...state,
        post: action.payload,
      };

    default:
      return state;
  }
};

export default PostReducer;
