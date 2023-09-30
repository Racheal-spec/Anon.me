"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  ActionType,
  TagsActionType,
  TagsReducerType,
  TagsTypes,
  Types,
  UserReducerType,
} from "../Types/reducerTypes";
import UserReducer from "./Reducers/userReducer";
import { getTags, getUsers } from "./Actions/Actions";
import TagsReducer from "./Reducers/TagsReducer";

type TagsContextType = {
  children: JSX.Element;
  reducer: typeof TagsReducer;
  initialState: TagsReducerType;
};
const TagsinitialContextType = {
  data: null,
};

const TagsContext = createContext<{
  tagsstate: TagsReducerType;
  tagsdispatch: React.Dispatch<TagsActionType>;
}>({
  tagsstate: TagsinitialContextType,
  tagsdispatch: () => null,
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

    if (tagsdispatch) {
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
