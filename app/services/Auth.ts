import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { UserProp } from "../Types/user";
import { db } from "./db";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);
export const comparePasswords = (plaintextPwd: string, hashedPwd: string) =>
  bcrypt.compare(plaintextPwd, hashedPwd);

export const createJWT = (user: UserProp) => {
  const iat = Math.floor(Date.now() / 1000);
  //token should expire a week from now
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({
    payload: {
      id: user.id,
      uniqueid: user.uniqueid,
    },
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  console.log(`jwtpayload: ${payload}`);
  return payload.payload;
};

export const getUserFromCookie = async (cookies: any) => {
  const jwt = cookies.get(process.env.COOKIE_NAME);
  console.log(`cookies: ${cookies}`);
  const id = await validateJWT(jwt.value);
  console.log(`idcookie: ${id}`);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });
  return user;
};
