"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import style from "./profile.module.css";
import { DASHBOARD } from "@/app/Routes/RoutesUrl";
import { UseClickOutside } from "@/hooks/ClickOutside";

const deleteUser = async () => {
  // let url = process.env.BASE_URL as string;
  // console.log(url);
  //http://localhost:3000/api/getposts
  const res = await fetch("http://localhost:3000/api/auth/logout");
  if (!res.ok) {
    console.log(res);
  }
  return await res.json();
};
const Profile = ({ handleProfile }) => {
  let router = useRouter();

  const ref = UseClickOutside(handleProfile);
  console.log(ref);

  const SignOutUser = async () => {
    let logout = await deleteUser();
    if (logout) {
      router.refresh();
      console.log("deletee");
    }
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
