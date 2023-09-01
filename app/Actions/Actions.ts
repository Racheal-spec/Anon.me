import { bookmarkType, postParamsType } from "../Types/posts";
import { BookmarkTypes } from "../Types/reducerTypes";
import { useBookmarkValue } from "../context/bookmarkContext";

export const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/user");
    if (!res.ok) {
      console.log(res);
    }
    return await res?.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async ({ take, lastCursor }: postParamsType) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/data/posts?take=${take}&lastCursor=${lastCursor}`
    );
    if (!res.ok) {
      console.log(res);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

// export const bookmarkDispatchAction = ({
//   title,
//   excerpts,
//   id,
//   authorId,
//   createdAt,

// }: bookmarkType) => {
//   //const { bookmarkstate, bookmarkdispatch } = useBookmarkValue();
//   if (dispatch) {
//     dispatch({
//       type: BookmarkTypes.SetBookmarks,
//       payload: {
//         data: [
//           {
//             title,
//             excerpts,
//             id,
//             authorId,
//             createdAt,
//           },
//         ],
//       },
//     });
//     console.log(state);
//     return;
//   }
// };
