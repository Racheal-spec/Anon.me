"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
  TagsActionType,
  TagsReducerType,
  TagsTypes,
} from "../Types/reducerTypes";
import { getTags } from "./Actions/Actions";
import TagsReducer from "./Reducers/TagsReducer";

type TagsContextType = {
  children: JSX.Element;
  reducer: typeof TagsReducer;
  initialState: TagsReducerType;
};
const TagsinitialContextType = {
  data: [],
};

const TagsContext = createContext<{
  tagsstate: TagsReducerType;
  tagsdispatch: React.Dispatch<TagsActionType>;
}>({
  tagsstate: TagsinitialContextType,
  tagsdispatch: () => [],
});

export const TagsProvider = ({
  children,
  reducer,
  initialState,
}: TagsContextType) => {
  const [tagsstate, tagsdispatch] = useReducer<typeof TagsReducer>(
    reducer,
    initialState
  );
  const fetchTags = async () => {
    let tagsdata = await getTags();

    if (tagsdata) {
      tagsdispatch({
        type: TagsTypes.GetTags,
        payload: tagsdata,
      });
    }
  };

  useEffect(() => {
    fetchTags();
  }, [tagsdispatch]);
  return (
    <TagsContext.Provider value={{ tagsstate, tagsdispatch }}>
      {children}
    </TagsContext.Provider>
  );
};

export const useTagsValue = () => {
  const context = useContext(TagsContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export default TagsContext;
