import React, { ReactElement } from "react";
import styles from "./TabsBody.module.css";
type Props = {
  title: string;
  children: ReactElement | ReactElement[];
};

const TabsBody = ({ children }: Props): JSX.Element => {
  return <div>{children}</div>;
};

export default TabsBody;
