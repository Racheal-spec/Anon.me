import { createContext, useContext, useReducer } from "react";
import { SearchAction, SearchStateType } from "../Types/reducerTypes";
import SearchReducer, { initialSearchStateVal } from "./Reducers/searchReducer";

type SearchContextType = {
  children: JSX.Element;
  Reducer: typeof SearchReducer;
  initialSearchState: SearchStateType;
};

const SearchContext = createContext<{
  searchstate: SearchStateType;
  searchdispatch: React.Dispatch<SearchAction>;
}>({
  searchstate: initialSearchStateVal,
  searchdispatch: () => null,
});

export const SearchProvider = ({
  children,
  Reducer,
  initialSearchState,
}: SearchContextType) => {
  const [searchstate, searchdispatch] = useReducer<typeof SearchReducer>(
    Reducer,
    initialSearchState
  );

  return (
    <SearchContext.Provider value={{ searchstate, searchdispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
export const useSearchValue = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export default SearchContext;
