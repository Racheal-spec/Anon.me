import { ActionType, UserReducerType } from "../Types/reducerTypes";
import { UserProp } from "../Types/user";

export const initialVal: UserReducerType = {
  user: null,
};

export enum Types {
  GetUser = "SET_USER",
}
const UserReducer = (state: UserReducerType, action: ActionType) => {
  switch (action.type) {
    case Types.GetUser:
      return {
        user: action.payload,
      };
    default:
      break;
  }
};

export default UserReducer;
