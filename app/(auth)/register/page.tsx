import Authform from "@/app/components/Form/Authform";
import React from "react";
import style from "./page.module.css";
import Link from "next/link";
import { HOME } from "@/app/Routes/RoutesUrl";

const Register = () => {
  return (
    <div className={style.bgWrapper}>
      <Authform mode="register" />
    </div>
  );
};

export default Register;
