"use client";

import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { register, signin } from "../../services/api";
import { UserProp } from "../../Types/user";
import Input from "../Input/Input";
import Link from "next/link";
import Button from "../Button/button";
import { modeProp } from "@/app/Types/global";

const registerUser = {
  linkurl: "/signin",
  linkText: "Already have an account",
  header: "creeate a new account",
  subheader: "whatever comes to mind",
  buttonText: "Register",
};

const logininUser = {
  linkurl: "/login",
  linkText: "Don't have an account",
  header: "Welcome Back",
  subheader: "Enter your credentials to signin",
  buttonText: "Login",
};
const initialState = {
  uniqueid: "",
  anonname: "",
  password: "",
};
const Authform: FC<modeProp> = ({ mode }) => {
  const [formState, setFormState] = useState<UserProp>({ ...initialState });
  const [eror, setError] = useState("");
  const router = useRouter();
  //using usecallbacks to optimize against rerenders. unless one of the dependencies change, thesame function is used accross multiple components
  const handleSubmit = useCallback(async (e: any) => {
    e.preventDefault();
    if (mode === "register") {
      await register(formState);
    } else {
      await signin(formState);
    }
    setFormState(initialState);
    router.replace("/");
  }, []);

  const content = mode === "register" ? registerUser : logininUser;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {mode === "register" ? (
          <div>
            <div>
              <div>UniqueId</div>
              <Input
                className=""
                placeholder="unique id"
                value={formState.uniqueid}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormState((el) => ({ ...el, uniqueid: e.target.value }))
                }
              />
            </div>
            <div>
              <div>Anon Name</div>
              <Input
                placeholder="anonymous name"
                className=""
                value={formState.anonname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormState((el) => ({ ...el, anonname: e.target.value }))
                }
              />
            </div>
            <div>
              <div>Password</div>
              <Input
                placeholder="password"
                className=""
                value={formState.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormState((el) => ({ ...el, password: e.target.value }))
                }
              />
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div>UniqueId</div>
              <Input
                placeholder="unique id"
                className=""
                value={formState.anonname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormState((el) => ({ ...el, anonname: e.target.value }))
                }
              />
            </div>
            <div>
              <div>Password</div>
              <Input
                placeholder="password"
                className=""
                value={formState.anonname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormState((el) => ({ ...el, password: e.target.value }))
                }
              />
            </div>
          </div>
        )}
        <div>
          <div>
            <span>
              <Link href={content.linkurl}>{content.linkText}</Link>
            </span>
          </div>
          <div>
            <Button type="submit">{content.buttonText}</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Authform;
