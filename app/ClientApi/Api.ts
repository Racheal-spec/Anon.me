import { Types } from "../context/userReducer";

export const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/user");
    if (!res.ok) {
      console.log(res);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

// export const getUsersAction = async () => {
//   return {
//     type: Types.GetUser,
//     payload: {
//       user: await getUsers(),
//     },
//   };
// };
