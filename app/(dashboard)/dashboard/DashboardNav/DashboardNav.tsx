"use client";
import React from "react";
import styles from "./Dashboardnav.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { UseResizeScreen } from "@/app/hooks/ResizeScreen";
import { GrClose } from "react-icons/gr";

type ToggleTypes = {
  toggle: boolean;
  setToggle?: (toggle: boolean) => void;
  handleclick: () => void;
};
const DashboardNav = ({ handleclick, toggle }: ToggleTypes) => {
  const isMobile = UseResizeScreen();

  return (
    <nav className={styles.nav}>
      <div className={styles.menudiv}>
        {!isMobile ? null : toggle ? (
          <GrClose className={styles.closemenuicon} onClick={handleclick} />
        ) : (
          <AiOutlineMenu className={styles.menuicon} onClick={handleclick} />
        )}
      </div>
      <div></div>
    </nav>
  );
};

export default DashboardNav;
