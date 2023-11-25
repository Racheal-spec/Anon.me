"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import style from "./profile.module.css";
import { DASHBOARDPROFILE } from "@/app/Routes/RoutesUrl";
import { UseClickOutside } from "@/hooks/ClickOutside";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/app/context/Actions/Actions";


type ProfileProp = {
  handleProfile: () => void;
};

const Profile = ({ handleProfile }: ProfileProp) => {
 

  const [logout, setLogout] = useState(false);

 // const pathname = usePathname();
  const ref = UseClickOutside(handleProfile);

  const SignOutUser = async () => {
   let logoutdata = await logoutUser();
    setLogout(true);
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
        <div className={style.hrStyle}></div>
        <div
          onClick={SignOutUser}
          className={style.profilelink}
          aria-label="link to signout"
        >
          <li>Sign Out</li>
        </div>
      </ul>
    </div>
  );
};

export default Profile;
