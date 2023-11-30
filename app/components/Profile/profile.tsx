"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import style from "./profile.module.css";
import { DASHBOARDACCOUNT, DASHBOARDPROFILE } from "@/app/Routes/RoutesUrl";
import { UseClickOutside } from "@/app/hooks/ClickOutside";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/app/context/Actions/Actions";
import { userValue } from "@/app/context/userContext";
import classNames from "classnames";


type ProfileProp = {
  handleProfile: () => void;
};

const Profile = ({ handleProfile }: ProfileProp) => {
  const { state } = userValue();
 // const pathname = usePathname();
  const ref = UseClickOutside(handleProfile);

  const SignOutUser = async () => {
   let logoutdata = await logoutUser();
    if (logoutdata){
      //router.push(pathname);
    window.location.reload();
    }
  };


  return (
    <div className={style.profileDiv} ref={ref}>
      <ul>
        <Link
          href={DASHBOARDPROFILE}
          className={style.profilelink}
          aria-label="dashboard"
        >
          <li>Dashboard</li>
        </Link>
        <Link
          href={DASHBOARDACCOUNT}
          className={style.profilelink}
          aria-label="dashboard_account"
        >
          <li>Account</li>
        </Link>
        <div className={style.hrStyle}></div>
      
      <div className={style.profilediv}>
        <div 
        onClick={SignOutUser}
        className={style.profilelink}
        aria-label="link to signout"
      >
        <li>Sign Out</li>
      </div>
      <div>
        <li className={style.profilename}>
          <span className={style.profilespan}>
          {state?.user?.data?.anonname}
          </span>
          </li>
      </div>
        </div>

      </ul>
    </div>
  );
};

export default Profile;
