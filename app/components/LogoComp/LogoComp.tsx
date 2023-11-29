import { HOME } from "@/app/Routes/RoutesUrl";
import Link from "next/link";
import React from "react";
import styles from "./LogoComp.module.css";
import { TfiWrite } from "react-icons/tfi";
import { UseResizeScreen } from "@/app/hooks/ResizeScreen";

const LogoComp = () => {
  const isMobile = UseResizeScreen();
  return (
    <div>
      <Link href={HOME}>
        <div className={styles.logowrapper}>
          <div>
            <TfiWrite
              size={isMobile ? "1.0em" : "1.3em"}
              className={styles.logoicon}
            />
          </div>

          <div className={styles.logotext}>
            <p>Penbuddy</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LogoComp;
