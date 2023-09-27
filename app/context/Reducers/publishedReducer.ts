import { postType } from "@/app/Types/posts";
import {
  PostActionType,
  PostStateType,
  PostTypes,
  PublishedAction,
  PublishedStateType,
  PublishedTypes,
} from "../../Types/reducerTypes";

export const initialPublishedStateVal: PublishedStateType = {
  data: [] || null,
};

const PublishedReducer = (
  state: PublishedStateType,
  action: PublishedAction
) => {
  switch (action.type) {
    case PublishedTypes.Get_Published:
      return {
        ...state,
        data: action.payload.data,
      };

    default:
      return state;
  }
};

export default PublishedReducer;
