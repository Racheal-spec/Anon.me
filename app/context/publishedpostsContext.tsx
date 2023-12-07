import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  PublishedAction,
  PublishedStateType,
  PublishedTypes,
} from "../Types/reducerTypes";

import { getPublishedPosts } from "./Actions/Actions";
import { useInView } from "react-intersection-observer";
import { postType } from "../Types/posts";
import { userValue } from "./userContext";
import PublishedReducer, {
  initialPublishedStateVal,
} from "./Reducers/publishedReducer";

type PublishedPostContextType = {
  children: JSX.Element;
  Reducer: typeof PublishedReducer;
  initialPublishedState: PublishedStateType;
};

const PublishedPostContext = createContext<{
  publishedstate: PublishedStateType;
  publisheddispatch: React.Dispatch<PublishedAction>;
  ref: () => void;
  isLoading: boolean;
  publishedposts: postType[] | null;
  lastCursor: string;
}>({
  publishedstate: initialPublishedStateVal,
  publisheddispatch: () => null,
  ref: () => null,
  isLoading: false,
  publishedposts: initialPublishedStateVal.data || null,
  lastCursor: "",
});

export const PublishedProvider = ({
  children,
  Reducer,
  initialPublishedState,
}: PublishedPostContextType) => {
  const [publishedstate, publisheddispatch] = useReducer<
    typeof PublishedReducer
  >(Reducer, initialPublishedState);

  const { state } = userValue();
  const { ref, inView } = useInView();
  let [lastCursor, setLastCursor] = useState("");
  const [take] = useState(7);
  const [isLoading, setLoading] = useState(false);
  const [publishedposts, setPublishedPosts] = useState<postType[]>([]);

  const fetchMorePublishedPosts = async () => {
    setLoading(true);
    const publisheddata = await getPublishedPosts({
      take: take,
      lastCursor: lastCursor,
    });
    if (publisheddata) {
      publisheddispatch({
        type: PublishedTypes.Get_Published,
        payload: publisheddata?.data,
      });
   
      setLoading(false);
    }
    setPublishedPosts((prev) => [
      ...(prev || []),  
      ...(publisheddata?.data || []).filter(
        (item: any) => !prev.some((prevItem) => prevItem.id === item.id)
      ),
    ]);
    
    // setPublishedPosts((prev) => [
    //   ...(prev?.length ? prev : []),
    //   ...(publisheddata?.data?.length ? publisheddata?.data : []),
    // ]);
    //setPublishedPosts(publisheddata?.data?.length ? publisheddata?.data : []);
    setLastCursor(publisheddata?.metaData?.lastCursor);
  };

  useEffect(() => {
    if (state?.user === null || state?.user === undefined) {
      return;
    } else if (inView && state.user !== null) {
      fetchMorePublishedPosts();
    }
  }, [inView]);

  useEffect(() => {
    fetchMorePublishedPosts();
  }, []);
  
  return (
    <PublishedPostContext.Provider
      value={{
        publishedstate,
        publisheddispatch,
        ref,
        isLoading,
        lastCursor,
        publishedposts,
      }}
    >
      {children}
    </PublishedPostContext.Provider>
  );
};
export const usePublishedPostValue = () => {
  const context = useContext(PublishedPostContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export default PublishedPostContext;
