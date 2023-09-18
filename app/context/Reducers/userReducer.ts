import { ActionType, Types, UserReducerType } from "../../Types/reducerTypes";

export const initialVal: UserReducerType = {
  user: null,
};

const UserReducer = (
  state: UserReducerType,
  action: ActionType
): UserReducerType => {
  switch (action.type) {
    case Types.GetUser:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
