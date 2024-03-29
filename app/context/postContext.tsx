import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  PostActionType,
  PostStateType,
  PostTypes,
} from "../Types/reducerTypes";
import PostReducer, { initialPostStateVal } from "./Reducers/postReducer";
import { getPosts } from "./Actions/Actions";
import { useInView } from "react-intersection-observer";
import { postType } from "../Types/posts";
import { userValue } from "./userContext";

type PostContextType = {
  children: JSX.Element;
  Reducer: typeof PostReducer;
  initialPostState: PostStateType;
};

const PostContext = createContext<{
  poststate: PostStateType;
  postdispatch: React.Dispatch<PostActionType>;
  ref: () => void;
  isLoading: boolean;
  posts: postType[] | null;
 // fetchMorePosts: (take: number | null) => void;
  lastCursor: string;
}>({
  poststate: initialPostStateVal,
  postdispatch: () => [] || null,
  ref: () => null,
  isLoading: false,
  posts: initialPostStateVal.data || null,
  //fetchMorePosts: () => null,
  lastCursor: "",
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
  const { state } = userValue();
  const { ref, inView } = useInView();
  let [lastCursor, setLastCursor] = useState("");
  //const [take] = useState(7);
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState<postType[]>([]);

  const fetchMorePosts = async () => {
    setLoading(true);
    const moredata = await getPosts();
    if (moredata) {
      postdispatch({
        type: PostTypes.GetPost,
        payload: moredata,
      });
      setLoading(false);
    }
    // setPosts((prev) => [
    //   ...(prev?.length ? prev : []),
    //   ...(moredata?.data?.length ? moredata?.data : []),
    // ]);
    setPosts((prev) => [
      ...(prev || []),  
      ...(moredata?.data || []).filter(
        (item: any) => !prev.some((prevItem) => prevItem.id === item.id)
      ),
    ]);

    setLastCursor(moredata?.metaData?.lastCursor);
  };

  useEffect(() => {
    if (state?.user === null || state?.user === undefined) {
      return;
    } else if (inView && state.user !== null) {
      fetchMorePosts();
    }
  }, [inView]);

  useEffect(() => {
    fetchMorePosts();
  }, []);
  return (
    <PostContext.Provider
      value={{ poststate, postdispatch, ref, isLoading, lastCursor, posts }}
    >
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
