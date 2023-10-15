import {
  TagsActionType,
  TagsReducerType,
  TagsTypes,
} from "../../Types/reducerTypes";

export const initialTagsVal: TagsReducerType = {
  data: null,
};

const TagsReducer = (
  state: TagsReducerType,
  action: TagsActionType
): TagsReducerType => {
  switch (action.type) {
    case TagsTypes.GetTags:
      return {
        ...state,
        data: action?.payload.data,
      };

    default:
      return state;
  }
};

export default TagsReducer;
