import React, { FC, ReactNode } from "react";
import styles from "./button.module.css";
import classNames from "classnames";

type ButtonProp = {
  title: string;
  outline: boolean;
  primary: boolean;
  props: {
    className: string;
  };
  children: ReactNode;
};
const Button: FC<Partial<ButtonProp>> = ({
  title,
  outline,
  primary,
  children,
  //   ...props
}) => {
  return (
    <div>
      <button
        className={classNames(styles.btnstyle, {
          [styles.outlineBtn]: Boolean(outline),
          [styles.primaryBtn]: Boolean(primary),
          //   [props?.props?.className!]: true,
        })}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
