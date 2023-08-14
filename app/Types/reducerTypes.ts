import { UserProp } from "./user";

type SetUser = {
  type: "SET_USER";
  payload: UserProp;
};
// type Completed = {
//   type: "COMPLETED";

// };
// type Failed = {
//   type: "FAILED";
// };

export type UserReducerType = {
  user: UserProp | null;
};

export type ActionType = SetUser;
