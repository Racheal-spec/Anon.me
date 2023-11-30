import { toast } from "react-toastify";
import { postParamsType } from "../../Types/posts";
import { getalltags } from "@/app/services/api";
import { BASE_URL } from "@/app/Routes/RoutesUrl";
import { UserSchemaType } from "@/app/services/validations/user.schema";

export const registerUsers = async (user: any) => {
  try {
    const res = await fetch(`${BASE_URL}/api/data/register`, {
      method: "POST",
      body: JSON.stringify(user)
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
}

export const loginUsers = async (user: any) => {
  try {
    const res = await fetch(`${BASE_URL}/api/data/login`, {
      method: "POST",
      body: JSON.stringify(user)
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
}
export const getUsers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/user`, {
      cache: "no-store",
    });
    if (!res.ok) {
      let err = await res.json();
      console.log(err);
      return err;
      // toast.error(err.message);
    }
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/user`, {
      method: "DELETE",
      cache: "no-store",
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

export const logoutUser = async () => {
 try {
  const res = await fetch(`${BASE_URL}/api/auth/logout`);
  if (!res.ok) {
    console.log(res);
  }
  return await res.json();
 } catch (error) {
  console.log(error);
 }
};

export const editUsers = async (formdata: any) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/user`, {
      cache: "no-store",
      method: "PUT",
      body: formdata,
    });
    if (!res.ok) {
      let err = await res.json();
      console.log(err);
      return err;
      // toast.error(err.message);
    }
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserImage = async ({user}: {user: string}) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/user/deleteimage?user=${user}`, {
      method: "DELETE",
      cache: "no-store",
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

export const getPosts = async ({ take, lastCursor }: postParamsType) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/data/posts?take=${take}&lastCursor=${lastCursor}`,
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
    const res = await fetch(`${BASE_URL}/api/data/posts/${id}`);
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
    const res = await fetch(`${BASE_URL}/api/auth/posts/createpost`, {
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
    const res = await fetch(`${BASE_URL}/api/data/posts/publish/${id}`, {
      method: "PUT",
    });
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
      `${BASE_URL}/api/data/posts/published?take=${take}&lastCursor=${lastCursor}`
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
      `${BASE_URL}/api/data/posts/search?title=${search}&take=${take}&lastCursor=${lastCursor}`
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
    const res = await fetch(`${BASE_URL}/api/data/tags`);
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

export const getSingleTag = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/data/tags/${id}`);
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

export const editPost = async (formdata: any, { id }: { id: string }) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/posts/edit/${id}`, {
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

export const deletePost = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/posts/delete/${id}`, {
      method: "DELETE",
      cache: "no-store",
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

export const likePost = async ({
  user,
  post,
}: {
  user: string;
  post: string;
}) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/auth/posts/like?user=${user}&post=${post}`,
      {
        method: "POST",
        cache: "no-store",
      }
    );
    if (!res.ok) {
      let err = await res.json();
      return Promise.reject(err);
    }
    let data = await res.json();
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const createComment = async (
  commentbody: any,
  {
    user,
    post,
  }: {
    user: string;
    post: string;
  }
) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/auth/posts/comment?user=${user}&post=${post}`,
      {
        method: "POST",
        cache: "no-store",
        body: commentbody,
      }
    );
    if (!res.ok) {
      let err = await res.json();
      return err;
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const GetPostComments = async ({ post }: { post: string }) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/posts/comment?post=${post}`);
    if (!res.ok) {
      let err = await res.json();
      return err;
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const toggleBookmark = async ({
  user,
  post,
}: {
  user: string;
  post: string;
}) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/auth/posts/bookmark?user=${user}&post=${post}`,
      {
        method: "POST",
        cache: "no-store",
      }
    );
    if (!res.ok) {
      let err = await res.json();
      return Promise.reject(err);
    }
    let data = await res.json();
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const GetBookmarks = async ({ userid }: { userid: string }) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/auth/posts/bookmark?user=${userid}`
    );
    if (!res.ok) {
      let err = await res.json();
      return err;
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteBookmark = async ({
  user,
  post,
}: {
  user: string;
  post: string;
}) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/auth/posts/bookmark?user=${user}&post=${post}`,
      {
        method: "DELETE",
        cache: "no-store",
      }
    );
    if (!res.ok) {
      let err = await res.json();
      return err;
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const TrendingPosts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/data/posts/trending`, {
      cache: "no-store",
    });
    if (!res.ok) {
      let err = await res.json();
      console.log(err);
      return err;
      // toast.error(err.message);
    }
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log(error);
  }
};
