import React from "react";
import styles from "./LoginSideComp.module.css";
import Button from "../../uikits/Button/button";
import Link from "next/link";
import { LOGIN, REGISTER } from "@/app/Routes/RoutesUrl";

const LoginSideComp = () => {
  return (
    <div className={styles.loginCompWrapper}>
      <div className={styles.loginCompDiv}>
        <h3>
          {" "}
          Discover the Magic of Anonymous Blogging: Reveal Your Truth, Not Your
          Identity
        </h3>
        <p>
          Are you ready to embark on a journey of unfiltered self-expression?
          Connect with a community that values your words, celebrates your
          uniqueness, and encourages open dialogue.
        </p>
        <div className={styles.btnFlex}>
        <Link href={REGISTER}>
          <Button primary>
              Get started for free
          </Button>
          </Link>
          <div className={styles.secondBtn}>
          <Link href={LOGIN}>
            <Button deepPinkOutline>
              Login
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSideComp;
