"use client";
import { createContext, useContext, useReducer } from "react";
import { DashboardAction, DashboardReducerType } from "../Types/reducerTypes";
import DashboardReducer from "./Reducers/dashboardReducer";

type DashboardContextType = {
  children: JSX.Element;
  reducer: typeof DashboardReducer;
  initialState: DashboardReducerType;
};
export const DashboardContextType = {
  toggle: false,
};

const DashboardContext = createContext<{
  dashboardstate: DashboardReducerType;
  dashboarddispatch: React.Dispatch<DashboardAction>;
}>({
  dashboardstate: DashboardContextType,
  dashboarddispatch: () => false,
});

export const DashboardProvider = ({
  children,
  reducer,
  initialState,
}: DashboardContextType) => {
  const [dashboardstate, dashboarddispatch] = useReducer<
    typeof DashboardReducer
  >(reducer, initialState);
  return (
    <DashboardContext.Provider value={{ dashboardstate, dashboarddispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const dashboardValue = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export default DashboardContext;
