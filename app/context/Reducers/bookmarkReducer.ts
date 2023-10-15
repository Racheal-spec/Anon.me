import {
  BookmarkAction,
  BookmarkStateType,
  BookmarkTypes,
} from "@/app/Types/reducerTypes";

const BookmarkReducer = (
  state: BookmarkStateType,
  action: BookmarkAction
): BookmarkStateType => {
  switch (action.type) {
    case BookmarkTypes.SetBookmarks:
      return {
        ...state,
        data: action.payload.data,
      };

    default:
      return state;
  }
};

export default BookmarkReducer;
