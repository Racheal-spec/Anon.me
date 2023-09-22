import React, { useCallback } from "react";
import styles from "./TabsTitle.module.css";

export type Props = {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
  isActive?: boolean;
};
const TabsTitle = (props: Props) => {
  const { title, setSelectedTab, index, isActive } = props;

  const handleOnClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <div>
      <li
        className={`${styles.title} ${isActive ? styles.active : ""}`}
        onClick={handleOnClick}
      >
        <div className={` ${isActive ? styles.active : ""}`}>{title}</div>
      </li>
    </div>
  );
};

export default TabsTitle;
