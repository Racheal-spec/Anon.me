"use client";
import { createContext, useContext, useReducer } from "react";
import { ActionType, UserReducerType } from "../Types/reducerTypes";
import UserReducer from "./Reducers/userReducer";

type UserContextType = {
  children: JSX.Element;
  reducer: typeof UserReducer;
  initialState: UserReducerType;
};
const UserContextType = {
  user: null,
};

const UserContext = createContext<{
  state: UserReducerType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: UserContextType,
  dispatch: () => null,
});

export const UserProvider = ({
  children,
  reducer,
  initialState,
}: UserContextType) => {
  const [state, dispatch] = useReducer<typeof UserReducer>(
    reducer,
    initialState
  );
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const userValue = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export default UserContext;
