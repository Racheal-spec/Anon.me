"use client";

import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { register, login } from "../../services/api";
import { UserProp } from "../../Types/user";
import Input from "../Input/Input";
import Link from "next/link";
import Button from "../Button/button";
import { modeProp } from "@/app/Types/global";

const registerUser = {
  linkurl: "/login",
  linkText: "Already have an account",
  header: "creeate a new account",
  subheader: "whatever comes to mind",
  buttonText: "Register",
};

const logininUser = {
  linkurl: "/register",

  linkText: "Don't have an account",
  header: "Welcome Back",
  subheader: "Enter your credentials to signin",
  buttonText: "Login",
};
const initialStateReg = {
  uniqueid: "",
  anonname: "",
  password: "",
};
const initialStateLogin = {
  uniqueid: "",
  password: "",
};

const Authform = ({ mode }: { mode: "register" | "login" }) => {
  const state = mode === "register" ? initialStateReg : initialStateLogin;
  const [formState, setFormState] = useState<UserProp>(state);
  const [error, setError] = useState("");
  const router = useRouter();
  //using usecallbacks to optimize against rerenders. unless one of the dependencies change, thesame function is used accross multiple components
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (mode === "register") {
          await register(formState);
          console.log("yolo");
        } else {
          await login(formState);
        }
        router.replace("/");
      } catch (error) {
        setError(`Unable to ${mode}`);
      } finally {
        setFormState(state);
      }
    },
    [formState.anonname, formState.password, formState.uniqueid]
  );

  const content = mode === "register" ? registerUser : logininUser;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <div>
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
          </div>
        )}
        <div>
          <div>
            <div>UniqueId</div>
            <Input
              placeholder="unique id"
              className=""
              value={formState.uniqueid}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormState((el) => ({ ...el, uniqueid: e.target.value }))
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
        </div>
      </form>
    </div>
  );
};

export default Authform;
