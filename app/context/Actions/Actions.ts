import { toast } from "react-toastify";
import { postParamsType } from "../../Types/posts";
import { getalltags } from "@/app/services/api";

export const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/user", {
      cache: "no-store",
    });
    if (!res.ok) {
      let err = await res.json();
      console.log(err);
      // toast.error(err.message);
    }
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async ({ take, lastCursor }: postParamsType) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/data/posts?take=${take}&lastCursor=${lastCursor}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      let err = await res.json();
      console.log(err);
      // toast.error(err.message);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
export const getSinglePost = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/data/posts/${id}`);
    if (!res.ok) {
      let err = await res.json();
      console.log(err);
      // toast.error(err.message);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const createNewPost = async (formdata: any) => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/posts/createpost", {
      method: "POST",
      body: formdata,
    });
    if (!res.ok) {
      let err = await res.json();
      console.log(err);
      toast.error(err.message);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const setPublishPost = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/data/posts/publish/${id}`,
      {
        method: "PUT",
      }
    );
    if (!res.ok) {
      let err = await res.json();
      console.log(err);
      // toast.error(err.message);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPublishedPosts = async ({
  take,
  lastCursor,
}: postParamsType) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/data/posts/published?take=${take}&lastCursor=${lastCursor}`
    );
    if (!res.ok) {
      let err = await res.json();
      console.log(err);
      // toast.error(err.message);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
export const searchPosts = async ({
  take,
  lastCursor,
  search,
}: postParamsType) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/data/posts/search?title=${search}&take=${take}&lastCursor=${lastCursor}`
    );
    if (!res.ok) {
      let err = await res.json();
      console.log(err);
      // toast.error(err.message);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getTags = async () => {
  try {
    let res = await getalltags();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editPost = async (formdata, { id }) => {
  try {
    const res = await fetch(`http://localhost:3000/api/auth/posts/edit/${id}`, {
      method: "PUT",
      body: formdata,
    });
    if (!res.ok) {
      let err = await res.json();
      console.log(err);
      toast.error(err.message);
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
