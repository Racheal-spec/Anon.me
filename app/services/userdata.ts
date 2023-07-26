import { getUserFromCookie } from "@/app/services/Auth";
import { cookies } from "next/headers";

export async function getUser() {
  const user = await getUserFromCookie(cookies());

  // console.log(user);
  return user;
}
