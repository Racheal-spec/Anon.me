//need to use middleware to protect my app from unauthenticated users.
//(i)check if the request coming in is to a resource i want to protect, if it is,
//(ii)check to see if there's a jwt in the cookie header
//(iii)if there is, verify the token and then proceed to do whatever I was going to do.
//for now, nextjs cookie is only readonly, so I have to use a thirdparty library to set it.

import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

//This function from the services folder had to be written here again bcus the initial one has
//... bcryt in it(which only works on node) and next edge runtime does not support that. Next middleware only works on edge

const PUBLIC_FILE = /\.(.*)$/;
export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  console.log(`jwtpayload: ${payload.payload}`);
  return payload;
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  //The block of code below checks to see if requests are from these urls, if they are, it runs.
  //i.e these are resources users are free to acesss
  //   console.log(`req: ${req.cookies}`);
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/home") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }
  //const jwt = req.cookies.get(process.env.COOKIE_NAME);
  let cookie_name = process.env.COOKIE_NAME;
  //   console.log(cookie_name);
  const jwt = req.cookies.get(cookie_name);

  if (!jwt) {
    req.nextUrl.pathname = "/home";
    return NextResponse.redirect(req.nextUrl);
  }
  try {
    await validateJWT(jwt?.value);
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl);
  }
}
