export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
{
  /******************ROUTES********************/
}
export const HOME = "/home";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const CREATEPOST = "/dashboard/createpost";
export const BOOKMARKS = "/bookmarks";
export const DASHBOARDPROFILE = "/dashboard/profile";
export const DASHBOARDSTORIES = "/dashboard/stories";
export const DASHBOARDDRAFTS = "/dashboard/drafts";
export const DASHBOARDACCOUNT = "/dashboard/account";
export const SEARCH = (title: string) => `/search?title=${title}`;
export const POSTDETAILS = (id: string) => `/post/${id}`;
export const EDITDRAFT = (id: string) => `/dashboard/edit?draft=${id}`;
export const TAGSDETAILS = (id: string) => `/tags/${id}`;
