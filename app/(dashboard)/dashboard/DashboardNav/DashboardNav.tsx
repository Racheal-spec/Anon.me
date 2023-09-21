"use client";
import LogoComp from "@/app/components/LogoComp/LogoComp";
import React, { useState } from "react";
import styles from "./Dashboardnav.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { UseResizeScreen } from "@/hooks/ResizeScreen";
import { GrClose } from "react-icons/gr";
import { userValue } from "@/app/context/userContext";
import { dashboardValue } from "@/app/context/DashboardContext";
import { DashboardTypes } from "@/app/Types/reducerTypes";
import Sidebar from "../Sidebar/Sidebar";

type ToggleTypes = {
  toggle: boolean;
  setToggle?: (toggle: boolean) => void;
  handleclick: () => void;
};
const DashboardNav = ({ handleclick, toggle }: ToggleTypes) => {
  const isMobile = UseResizeScreen();
  const { state } = userValue();

  console.log(`servertoggle: ${toggle}`);
  console.log(state.user);

  return (
    <nav className={styles.nav}>
      <div className={styles.menudiv}>
        {!isMobile ? null : toggle ? (
          <GrClose className={styles.closemenuicon} onClick={handleclick} />
        ) : (
          <AiOutlineMenu className={styles.menuicon} onClick={handleclick} />
        )}
      </div>
      <div>
        {/* <h4>{state.user?.user.anonname}</h4>
        <p>{state.user?.user.uniqueid}</p> */}
      </div>
    </nav>
  );
};

export default DashboardNav;
