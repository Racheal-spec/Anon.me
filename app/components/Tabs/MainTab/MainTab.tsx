import React, { ReactElement, useState } from "react";
import styles from "./MainTab.module.css";
import TabsTitle, { Props as TabsTitleProps } from "../TabsTitle/TabsTitle";

type Props = {
  children: ReactElement<TabsTitleProps>[];
  preSelectedTabIndex?: number;
};

const MainTab = ({ children, preSelectedTabIndex }: Props): JSX.Element => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(
    preSelectedTabIndex || 0
  );

  return (
    <div>
      <ul className={styles.tabUl}>
        {children.map((el, index) => (
          <TabsTitle
            key={el.props.title}
            title={el.props.title}
            index={index}
            isActive={index === selectedTabIndex}
            setSelectedTab={setSelectedTabIndex}
          />
        ))}
      </ul>

      {/* show selected tabs content here by using the suare bracket to access specific selected child */}
      {children[selectedTabIndex]}
    </div>
  );
};

export default MainTab;
