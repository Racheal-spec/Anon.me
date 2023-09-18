import {
  DashboardAction,
  DashboardReducerType,
  DashboardTypes,
} from "../../Types/reducerTypes";

export const initialDashboardVal: DashboardReducerType = {
  toggle: false,
};

const DashboardReducer = (
  state: DashboardReducerType,
  action: DashboardAction
): DashboardReducerType => {
  switch (action.type) {
    case DashboardTypes.Set_Toggle:
      console.log(`toggle: ${!action.payload.toggle}`);
      return {
        ...state,
        toggle: !action.payload.toggle,
      };

    default:
      return state;
  }
};

export default DashboardReducer;
