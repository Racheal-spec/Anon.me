import {
  BookmarkAction,
  BookmarkStateType,
  BookmarkTypes,
} from "@/app/Types/reducerTypes";
import { toast } from "react-toastify";

const BookmarkReducer = (state: BookmarkStateType, action: BookmarkAction) => {
  switch (action.type) {
    case BookmarkTypes.SetBookmarks:
      let bookmarkedPost = state?.data?.find((val) => {
        console.log(val?.id, action.payload.data.id);
        return val?.id === action.payload.data?.id;
      });
      if (bookmarkedPost) {
        console.log(`${bookmarkedPost.title} has already been bookmarked`);
        toast.warn(`${bookmarkedPost.title} has already been bookmarked`);
      } else {
        state.data?.push({ ...action.payload.data });
        console.log(action.payload.data);
        toast.success("Post has been bookmarked!");
      }
      return {
        ...state,
        //data: [...state.data, action.payload.data],
        data: [...state.data],
      };

    default:
      return state;
  }
};

export default BookmarkReducer;
