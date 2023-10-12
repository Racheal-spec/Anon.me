import { createContext, useContext, useEffect, useReducer } from "react";
import {
  BookmarkAction,
  BookmarkStateType,
  BookmarkTypes,
} from "../Types/reducerTypes";
import BookmarkReducer from "./Reducers/bookmarkReducer";
import { GetBookmarks } from "./Actions/Actions";
import { userValue } from "./userContext";

type BookmarkContextType = {
  children: JSX.Element;
  BMReducer: typeof BookmarkReducer;
  initialBMState: BookmarkStateType;
};
export const initialBookState: BookmarkStateType = [];

const BookmarkContext = createContext<{
  bookmarkstate: BookmarkStateType;
  bookmarkdispatch: React.Dispatch<BookmarkAction>;
}>({
  bookmarkstate: initialBookState,
  bookmarkdispatch: () => [] || null,
});

export const BookmarkProvider = ({
  children,
  BMReducer,
  initialBMState,
}: BookmarkContextType) => {
  const [bookmarkstate, bookmarkdispatch] = useReducer<typeof BookmarkReducer>(
    BMReducer,
    initialBMState
  );
  const { state } = userValue();

  useEffect(() => {
    const handleAllBookmarks = async () => {
      console.log(state?.user?.data.id);
      if (state?.user?.data.id) {
        let bookmarkdata = await GetBookmarks({
          userid: state?.user?.data.id as string,
        });
        if (bookmarkdata) {
          bookmarkdispatch({
            type: BookmarkTypes.SetBookmarks,
            payload: bookmarkdata?.data,
          });
        }
      }
    };
    handleAllBookmarks();
  }, [bookmarkdispatch, state?.user?.data]);

  return (
    <BookmarkContext.Provider value={{ bookmarkstate, bookmarkdispatch }}>
      {children}
    </BookmarkContext.Provider>
  );
};
export const useBookmarkValue = () => useContext(BookmarkContext);
export default BookmarkContext;
