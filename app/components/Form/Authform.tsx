"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { login, registeruser } from "../../services/api";
import Input from "../../uikits/Input/Input";
import Link from "next/link";
import Button from "../../uikits/Button/button";
import style from "./authform.module.css";
import { BsArrowRight } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserSchema,
  UserSchemaType,
} from "@/app/services/validations/user.schema";
import { toast } from "react-toastify";
//import loader from "../../Assets/svgs/loader.svg";
import Loader from "../Loader/Loader";

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
  anonname: "",
  email: "",

  password: "",
};
const initialStateLogin = {
  email: "",
  password: "",
  photo: "",
};

const Authform = ({ mode }: { mode: "register" | "login" }) => {
  const state = mode === "register" ? initialStateReg : initialStateLogin;
  const [show, setShow] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
  });
  console.log(isSubmitting);
  const handleFormSubmit: SubmitHandler<UserSchemaType> = async (state) => {
    try {
      console.log("lllll");
      if (mode === "register") {
        let result = await registeruser(state);
        if (result) {
          router.replace("/home");
        }
      } else {
        let loginresult = await login(state);
        console.log(`loginnnnn: ${loginresult}`);
        if (loginresult) {
          router.replace("/home");
        }
      }
      // setLoading(true);
    } catch (error) {
      console.error(error);
      toast.error(`Unable to ${mode}`);
    }
  };

  const content = mode === "register" ? registerUser : logininUser;

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className={style.formWrapper}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={style.formBg}>
        <h1 className={style.formheader}>{content.header}</h1>
        <p className={style.formtext}>{content.subheader}</p>
        {mode === "register" && (
          <div>
            <div>
              <div className={style.inputlabel}>
                <label>Anon Name</label>
              </div>
              <input
                placeholder="Anonymous name"
                {...register("anonname")}
                className={style.inputStyle}
              />
              {errors.anonname && (
                <span className={style.spanclass}>
                  {errors.anonname.message}
                </span>
              )}
            </div>
          </div>
        )}
        <div>
          <div className={style.inputlabel}>
            <label>Email</label>
          </div>
          <div>
            <input
              placeholder="user@email.com"
              type="email"
              {...register("email")}
              className={style.inputStyle}
            />
            {errors.email && (
              <span className={style.spanclass}>{errors.email.message}</span>
            )}
          </div>
          <div className={style.inputlabel}>
            <label>Password</label>
          </div>
          <div className={style.pwdInputDiv}>
            <input
              placeholder="Password"
              type={show ? "text" : "password"}
              {...register("password")}
              className={style.inputStyle}
              // className=""
              // value={inputState.password}
              // onChange={(e) =>
              //   setInputState((el) => ({ ...el, password: e.target.value }))
              // }
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
          {errors.password && (
            <span className={style.spanclass}>{errors.password.message}</span>
          )}
          <div>
            <div>
              <Button
                rectPrimary
                props={{ className: style.btnWrapper }}
                type="submit"
              >
                <div className={style.btnContentDiv}>
                  {content.buttonText}
                  {isSubmitting && (
                    <div className={style.loadingIcon}>
                      <Loader color="#333333" />
                    </div>
                  )}

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
