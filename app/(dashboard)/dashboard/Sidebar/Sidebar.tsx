"use client";
import React from "react";
import styles from "./Sidebar.module.css";
import LogoComp from "@/app/components/LogoComp/LogoComp";
import classNames from "classnames";
import Link from "next/link";
import { DASHBOARDPROFILE } from "@/app/Routes/RoutesUrl";
const Sidebar = ({ active }: { active: string }) => {
  console.log(active);
  return (
    <div className={classNames(styles.sidebarStyles, active)}>
      <div>
        <LogoComp />
      </div>

      <ul>
        <li>
          <p>MENU</p>
        </li>
        <li>
          <Link href={DASHBOARDPROFILE}>Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
