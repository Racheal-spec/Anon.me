import Authform from "@/app/components/Form/Authform";
import React, { Suspense } from "react";
import Loading from "../Loading";

const Login = () => {
  return (
    <div>
        <Suspense fallback={<Loading />}>
        <Authform mode={"login"} />
        </Suspense>

    </div>
  );
};

export default Login;
