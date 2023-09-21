"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import style from "./profile.module.css";
import { DASHBOARDPROFILE } from "@/app/Routes/RoutesUrl";
import { UseClickOutside } from "@/hooks/ClickOutside";
import { eventType } from "@/app/Types/user";

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
const Profile = ({ handleProfile }: { handleProfile }) => {
  let router = useRouter();
  const [logout, setLogout] = useState(false);

  const ref = UseClickOutside(handleProfile);
  console.log(logout);

  const SignOutUser = async () => {
    await deleteUser();
    setLogout(true);
  };
  useEffect(() => {
    if (logout) {
      router.refresh();
      console.log("deletee");
    }
  }, [logout]);

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
