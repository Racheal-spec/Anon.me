import Authform from "@/app/components/Form/Authform";
import React from "react";
import style from "./page.module.css";

const Register = () => {
  return (
    <div className={style.bgWrapper}>
      <Authform mode="register" />
    </div>
  );
};

export default Register;
