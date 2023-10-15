"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DashboardNav from "../DashboardNav/DashboardNav";
import styles from "./SideNav.module.css";

const SideNav = () => {
  const [toggle, setToggle] = useState(false);

  const handleclick = () => {
    setToggle(!toggle);
  };

  // console.log(`sidenav: ${toggle}`);

  let active = toggle ? styles.open : styles.close;

  return (
    <div>
      <div>
        <Sidebar handleclick={handleclick} toggle={toggle} active={active} />
      </div>
      <div>
        <DashboardNav handleclick={handleclick} toggle={toggle} />
      </div>
    </div>
  );
};

export default SideNav;
