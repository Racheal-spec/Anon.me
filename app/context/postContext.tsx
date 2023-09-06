import { createContext, useContext, useReducer } from "react";
import { PostActionType, PostStateType } from "../Types/reducerTypes";
import PostReducer, { initialPostStateVal } from "./Reducers/postReducer";

type PostContextType = {
  children: JSX.Element;
  Reducer: typeof PostReducer;
  initialPostState: PostStateType;
};

const PostContext = createContext<{
  poststate: PostStateType;
  postdispatch: React.Dispatch<PostActionType>;
}>({
  poststate: initialPostStateVal,
  postdispatch: () => null,
});

export const PostProvider = ({
  children,
  Reducer,
  initialPostState,
}: PostContextType) => {
  const [poststate, postdispatch] = useReducer<typeof PostReducer>(
    Reducer,
    initialPostState
  );

  return (
    <PostContext.Provider value={{ poststate, postdispatch }}>
      {children}
    </PostContext.Provider>
  );
};
export const usePostValue = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export default PostContext;
