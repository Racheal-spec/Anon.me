"use client";
import React, { useEffect, useState } from "react";
import styles from "./Commentmodal.module.css";
import LogoComp from "@/app/components/LogoComp/LogoComp";
import classNames from "classnames";
import { UseClickOutside } from "@/hooks/ClickOutside";

const Commentmodal = ({
  active,
  handleclick,
}: {
  active: string;
  handleclick: () => void;
  toggle: boolean;
}) => {
  console.log(active);
  const ref = UseClickOutside(handleclick);
  console.log(ref);
  const handleClose = () => {
    handleclick();
  };
  return (
    <div className={styles.commentmodal}>
      <div ref={ref} className={classNames(styles.sidebarStyles, active)}>
        <div className={styles.sidelogo}>
          <LogoComp />
        </div>
        <h2>Commentssss</h2>
        <div className={styles.modalclose} onClick={handleClose}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default Commentmodal;
