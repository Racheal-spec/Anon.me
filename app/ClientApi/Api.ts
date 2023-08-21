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

export const getPosts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/data/posts");
    if (!res.ok) {
      console.log(res);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
