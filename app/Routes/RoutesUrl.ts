export const HOME = "/home";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const CREATEPOST = "/createpost";
export const BOOKMARKS = "/bookmarks";
export const DASHBOARD = "/dashboard";
export const SEARCH = (title: string) => `/search?title=${title}`;
export const POSTDETAILS = (id: string) => `/post/${id}`;
