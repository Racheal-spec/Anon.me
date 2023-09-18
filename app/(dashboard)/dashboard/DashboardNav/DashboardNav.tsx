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
  //   const [toggle, setToggle] = useState(false);
  //   const { dashboardstate, dashboarddispatch } = dashboardValue();

  //   const handleclick = () => {
  //     setToggle(!toggle);
  //     // if (dashboarddispatch) {
  //     //   dashboarddispatch({
  //     //     type: DashboardTypes.Set_Toggle,
  //     //     payload: {
  //     //       toggle: !toggle,
  //     //     },
  //     //   });
  //     // }
  //   };
  //   console.log(toggle);
  console.log(`servertoggle: ${toggle}`);

  return (
    <nav className={styles.nav}>
      <div className={styles.menudiv}>
        {isMobile ? (
          toggle ? (
            <GrClose className={styles.closemenuicon} onClick={handleclick} />
          ) : (
            <AiOutlineMenu className={styles.menuicon} onClick={handleclick} />
          )
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default DashboardNav;
