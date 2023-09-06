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
        return val?.id === action.payload.data?.id;
      });
      if (bookmarkedPost) {
        toast.warn(`${bookmarkedPost.title} has already been bookmarked`);
      } else {
        state.data?.push({ ...action.payload.data });
        toast.success("Post has been bookmarked!");
      }
      return {
        ...state,
        data: [...state.data],
      };
    case BookmarkTypes.DeleteBookmarks:
      let deletedBookmarks = state.data.filter((val) => {
        return val.id !== action.payload.data.id;
      });
      if (deletedBookmarks) {
        toast.success("Post has been deleted!");
      }
      return {
        ...state,
        data: deletedBookmarks,
      };
    default:
      return state;
  }
};

export default BookmarkReducer;
