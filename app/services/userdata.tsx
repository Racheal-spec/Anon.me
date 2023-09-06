"use client";

import { useCallback, useEffect } from "react";
import { getUsers } from "../context/Actions/Actions";
import { Types } from "../Types/reducerTypes";
import { userValue } from "../context/userContext";

// export async function getUser() {
//   const user = await getUserFromCookie(cookies());

//   // console.log(user);
//   return user;
// }

export const handleuser = () => {
  const { state, dispatch } = userValue();
  const fetchUser = useCallback(() => {
    async () => {
      let data = await getUsers();

      if (dispatch) {
        dispatch({
          type: Types.GetUser,
          payload: data,
        });
      }
    };
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);
  console.log(state);
  return state;
};
