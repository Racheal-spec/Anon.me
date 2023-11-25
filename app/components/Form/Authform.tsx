"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, registeruser } from "../../services/api";
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
import Loader from "../Loader/Loader";
import ComboBox from "@/app/uikits/ComboBox/ComboBox";
import { countries } from "countries-list";
import { HOME } from "@/app/Routes/RoutesUrl";
import { IoIosArrowRoundBack } from "react-icons/io";
import { loginUsers, registerUsers } from "@/app/context/Actions/Actions";

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
  location: "",
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
    control,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
  });
  const countriesArray = Object.values(countries);

  const [selectedLocation, setSelectedLocation] = useState(""); // Initial or controlled value

  const handleFormSubmit: SubmitHandler<UserSchemaType> = async (state) => {
    try {
      if (mode === "register") {
        let result: any = await registerUsers(state);
        if (result?.status === "created") {
          router.replace("/home");
        }
      } else {
        let loginresult: any = await loginUsers(state);
        if (loginresult?.status === "ok") {
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



  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLocation(event.target.value);

  };

  console.log(countriesArray)

  return (
    <div className={style.formWrapper}>
       
      <form onSubmit={handleSubmit(handleFormSubmit)} className={style.formBg}>
        <h1 className={style.formheader}>{content.header}</h1>
        <p className={style.formtext}>{content.subheader}</p>
        {mode === "register" && (
          <div>
            <div>
              <div className={style.inputlabel}>
                <label>
                  Anon Name<span className={style.spancolor}>*</span>
                </label>
              </div>
              <div className={style.pwdInputDiv}>
              <div><p>Anon</p></div>
          
                  <div className={style.divider}></div>
          
              <input
                placeholder="Anonymous name"
                {...register("anonname")}
                className={style.inputStyle}
              />

            
              </div>
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
            <label>
              Email<span className={style.spancolor}>*</span>
            </label>
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

          <div>
            <div className={style.inputlabel}>
              <label>
                {" "}
                Password<span className={style.spancolor}>*</span>
              </label>
            </div>
            <div className={style.pwdInputDiv}>
              <input
                placeholder="Password"
                type={show ? "text" : "password"}
                {...register("password")}
                className={style.inputStyle}
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
          </div>

          {mode === "register" && (
            <div>
              <ComboBox
                options={countriesArray && countriesArray ? countriesArray : []}
                id={"location"}
                label={"Location"}
                value={selectedLocation} // Pass the value from state
                onChange={handleLocationChange}
                name="location"
                control={control ? control : null}
              />
              {errors?.location && (
                <span className={style.spanclass}>
                  {errors?.location.message}
                </span>
              )}
            </div>
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
     <div className={style.homelink}>
<IoIosArrowRoundBack />
     <Link href={HOME}>
        Go back home
      </Link>
     </div>
    </div>
  );
};

export default Authform;
