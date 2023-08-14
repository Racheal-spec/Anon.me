"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { register, login } from "../../services/api";
import { UserProp } from "../../Types/user";
import Input from "../Input/Input";
import Link from "next/link";
import Button from "../Button/button";
import style from "./authform.module.css";
import InputField from "../Input/Input";
import { BsArrowRight } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const registerUser = {
  linkurl: "/login",
  linkText: "Already have an account?",
  header: "Create a new account",
  subheader:
    " Join the anon blogging community  today and start sharing your unique perspective.",
  buttonText: "Register",
};

const logininUser = {
  linkurl: "/register",

  linkText: "Don't have an account?",
  header: "Welcome Back",
  subheader:
    "We are so happy to have you here. Enter your credentials to signin",
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
  const [show, setShow] = useState(false);
  const router = useRouter();
  //using usecallbacks to optimize against rerenders. unless one of the dependencies change, thesame function is used accross multiple components
  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      try {
        if (mode === "register") {
          await register(formState);

          console.log(formState);
        } else {
          await login(formState);
          console.log(formState);
        }
      } catch (error) {
        setError(`Unable to ${mode}`);
      } finally {
        setFormState(state);
        router.replace("/home");
      }
    },
    [formState.anonname, formState.password, formState.uniqueid]
  );

  const content = mode === "register" ? registerUser : logininUser;

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className={style.formWrapper}>
      <form onSubmit={handleSubmit} className={style.formBg}>
        <h1 className={style.formheader}>{content.header}</h1>
        <p className={style.formtext}>{content.subheader}</p>
        {mode === "register" && (
          <div>
            <div>
              <label className={style.inputlabel}>Anon Name</label>
              <InputField
                placeholder="Anonymous name"
                className=""
                value={formState.anonname as string}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormState((el) => ({ ...el, anonname: e.target.value }))
                }
              />
            </div>
          </div>
        )}
        <div>
          <div>
            <label className={style.inputlabel}>UniqueId</label>
            <InputField
              placeholder="Unique ID"
              className=""
              value={formState.uniqueid}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormState((el) => ({ ...el, uniqueid: e.target.value }))
              }
            />
          </div>
          <div>
            <label className={style.inputlabel}>Password</label>

            <InputField
              placeholder="Password"
              type={show ? "text" : "password"}
              className=""
              value={formState.password}
              onChange={(e) =>
                setFormState((el) => ({ ...el, password: e.target.value }))
              }
            />
            {show ? (
              <AiFillEye className={style.eyeIcon} onClick={handleShow} />
            ) : (
              <AiFillEyeInvisible
                className={style.eyeIcon}
                onClick={handleShow}
              />
            )}
          </div>
          <div>
            <div>
              <Button
                rectPrimary
                props={{ className: style.btnWrapper }}
                type="submit"
              >
                <div className={style.btnContentDiv}>
                  <div>{content.buttonText}</div>
                  <div className={style.btnIconDiv}>
                    <BsArrowRight fontSize={"1.3rem"} />
                  </div>
                </div>
              </Button>
            </div>
            <div className={style.formlinktext}>
              {content.linkText}
              <span>
                <Link href={content.linkurl}>Sign In</Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Authform;
