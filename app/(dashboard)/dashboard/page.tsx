import React from "react";
import styles from "./page.module.css";
import Sidebar from "./Sidebar/Sidebar";
import Mainbody from "./Mainbody/Mainbody";

const Dashboard = () => {
  return (
    <div className={styles.mainstyles}>
      <Mainbody />
    </div>
  );
};

export default Dashboard;
