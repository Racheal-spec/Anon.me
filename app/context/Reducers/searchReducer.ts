import {
  SearchAction,
  SearchStateType,
  SearchTypes,
} from "../../Types/reducerTypes";

export const initialSearchStateVal: SearchStateType = {
  results: {
    data: [] || null,
  },
};

const SearchReducer = (state: SearchStateType, action: SearchAction) => {
  switch (action.type) {
    case SearchTypes.GetSearchPost:
      return {
        ...state,
        results: action.payload,
      };

    default:
      return state;
  }
};

export default SearchReducer;
