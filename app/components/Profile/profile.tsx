import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import style from "./profile.module.css";
import { DASHBOARD } from "@/app/RoutesUrl";
import { UseClickOutside } from "@/hooks/ClickOutside";
import { eventType } from "../Navbar/navbar";

const Profile = ({ handleProfile }) => {
  let router = useRouter();

  const ref = UseClickOutside(handleProfile);
  console.log(ref);
  const SignOutUser = async () => {
    // let signout = await supabase.auth.signOut();
    // if (signout) {
    //   window.location.reload();
    //   toast.success("You have successfully signed out!");
    //   router("/");
    // }
  };
  return (
    <div className={style.profileDiv} ref={ref}>
      <ul>
        <Link
          href={DASHBOARD}
          className={style.profilelink}
          aria-label="dashboard"
        >
          <li>Dashboard</li>
        </Link>
        <hr className={style.hrStyle} />
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
