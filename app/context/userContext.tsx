"use client";
import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

export const UserProvider = ({ children, reducer, initialState }) => {
  const userreducer = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={userreducer}>{children}</UserContext.Provider>
  );
};

export const userValue = () => useContext(UserContext);

export default UserContext;
