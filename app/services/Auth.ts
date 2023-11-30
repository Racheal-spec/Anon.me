import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { AuthorProp } from "../Types/user";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);
export const comparePasswords = async (
  plaintextPwd: string,
  hashedPwd: string
) => {
  const pwd = await bcrypt.hash(plaintextPwd, 10);
  console.log(pwd, hashedPwd);
  return bcrypt.compare(plaintextPwd, hashedPwd);
};

export const createJWT = (user: AuthorProp) => {
  const iat = Math.floor(Date.now() / 1000);
  //token should expire a week from now
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({
    payload: {
      id: user?.id,
      email: user?.email,
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

  return payload.payload;
};

export const obsfucatedEmailNew = (email: string) => {
  const obsEmail = email?.replace("@", "&#64")?.replace(".", "&#46");
  return obsEmail;
};

export const obsfucatedEmail = (email: string) => {
  const parts = email.split('@');
  
  if (parts.length === 2) {
    const username = parts[0];
    const domain = parts[1];
    
    const obfuscatedUsername = username.length > 3
      ? `${username.substring(0, 3)}${'*'.repeat(username.length - 3)}`
      : '*'.repeat(username.length);

    return `${obfuscatedUsername}@${domain}`;
  }

  // If the email does not match the expected format, return the initial obsfucated rmail function email
  return obsfucatedEmailNew(email);

};

