import Authform from "@/app/components/Form/Authform";
import React, { Suspense } from "react";
import style from "./page.module.css";
import Loading from "../Loading";

const Register = () => {
  return (
    <div className={style.bgWrapper}>
       <Suspense fallback={<Loading />}>
       <Authform mode="register" />
       </Suspense>
 
    </div>
  );
};

export default Register;
