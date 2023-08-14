"use client";
import { UserProvider } from "./userContext";
import UserReducer from "../context/userReducer";
import { initialVal } from "../context/userReducer";

export const MainContext = ({ children }) => {
  return (
    <>
      <UserProvider reducer={UserReducer} initialState={initialVal}>
        {children}
      </UserProvider>
    </>
  );
};
