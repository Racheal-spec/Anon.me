"use client";
import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import LogoComp from "@/app/components/LogoComp/LogoComp";
import classNames from "classnames";
import Link from "next/link";
import {
  BOOKMARKS,
  CREATEPOST,
  DASHBOARDACCOUNT,
  DASHBOARDDRAFTS,
  DASHBOARDPROFILE,
  DASHBOARDSTORIES,
} from "@/app/Routes/RoutesUrl";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAutoStories } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { BsPencilSquare, BsBookmarks } from "react-icons/bs";
import { GrUserSettings } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { logoutUser } from "@/app/context/Actions/Actions";

const Sidebar = ({
  active,
}: {
  active: string;
  handleclick: () => void;
  toggle: boolean;
}) => {
  console.log(active);
  const items = [
    {
      id: "profile",
      label: "Profile",
      path: DASHBOARDPROFILE,
      icon: <CgProfile />,
    },
    {
      id: "stories",
      label: "Stories",
      path: DASHBOARDSTORIES,
      icon: <MdOutlineAutoStories />,
    },
    {
      id: "drafts",
      label: "All Drafts",
      path: DASHBOARDDRAFTS,
      icon: <RiDraftLine />,
    },
    {
      id: "write",
      label: "Write",
      path: CREATEPOST,
      icon: <BsPencilSquare />,
    },
    {
      id: "bookmarks",
      label: "Bookmarks",
      path: BOOKMARKS,
      icon: <BsBookmarks />,
    },

    {
      id: "account",
      label: "Account",
      path: DASHBOARDACCOUNT,
      icon: <GrUserSettings />,
    },
  ];
  const [activeLink, setActiveLink] = useState("");

  const handleclick = (linkid: string) => {
    setActiveLink(linkid);
  };
  useEffect(() => {
    handleclick(activeLink);
  }, [activeLink]);

  const SignOutUser = async () => {
    let logoutdata = await logoutUser();
     if (logoutdata){
     window.location.reload();
     }
   
   };
 
 

  return (
    <div className={classNames(styles.sidebarStyles, active)}>
      <div className={styles.sidelogo}>
        <LogoComp />
      </div>

      <ul className={styles.sideul}>
        <div className={styles.menutext}>
          <p>MENU</p>
        </div>
        {items.map((item) => (
          <li className={styles.sideli} key={item.id}>
            <Link href={item.path} onClick={() => handleclick(item.id)}>
              <div
                className={
                  activeLink === item.id
                    ? styles.activeclass
                    : styles.sidelabeldiv
                }
              >
                <div className={styles.sideicon}> {item.icon}</div>
                <div>
                  <span className={styles.sidespan}> {item.label}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.logouttext} onClick={SignOutUser}>
        <BiLogOut color="#ff0f7b" />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
