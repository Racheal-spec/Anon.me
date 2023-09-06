import { createContext, useContext, useEffect, useReducer } from "react";
import { BookmarkAction, BookmarkStateType } from "../Types/reducerTypes";
import BookmarkReducer from "./Reducers/bookmarkReducer";

type BookmarkContextType = {
  children: JSX.Element;
  BMReducer: typeof BookmarkReducer;
  initialBMState: BookmarkStateType;
};

export const initialBookState: BookmarkStateType = {
  data: localStorage?.getItem("bookmark")
    ? JSON?.parse(localStorage.getItem("bookmark")!)
    : [],
};

const BookmarkContext = createContext<{
  bookmarkstate: BookmarkStateType;
  bookmarkdispatch: React.Dispatch<BookmarkAction>;
}>({
  bookmarkstate: initialBookState,
  bookmarkdispatch: () => [],
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

  if (typeof window !== "undefined") {
    console.log("You are on the browser");
    // 👉️ can use localStorage here
  } else {
    console.log("You are on the server");
    // 👉️ can't use localStorage
  }

  useEffect(() => {
    if (bookmarkstate) {
      localStorage.setItem("bookmark", JSON.stringify(bookmarkstate.data));
      console.log("settingggg");
    }
  }, [bookmarkstate]);

  return (
    <BookmarkContext.Provider value={{ bookmarkstate, bookmarkdispatch }}>
      {children}
    </BookmarkContext.Provider>
  );
};
export const useBookmarkValue = () => useContext(BookmarkContext);
export default BookmarkContext;
