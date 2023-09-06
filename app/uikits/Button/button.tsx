import React, { FC, ReactNode } from "react";
import styles from "./button.module.css";
import classNames from "classnames";
import { ButtonProp } from "@/app/Types/global";

const Button: FC<Partial<ButtonProp>> = ({
  title,
  outline,
  primary,
  rectPrimary,
  pinkOutline,
  deepPinkOutline,
  children,
  onMouseEnter,
  onMouseLeave,
  disabled,
  onClick,
  type,
  ...props
}) => {
  return (
    <div className={styles.root}>
      <button
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        disabled={disabled}
        onClick={onClick}
        {...props}
        className={classNames(styles.btnstyle, {
          [styles.outlineBtn]: Boolean(outline),
          [styles.primaryBtn]: Boolean(primary),
          [styles.rectPrimaryBtn]: Boolean(rectPrimary),
          [styles.pinkOutlineBtn]: Boolean(pinkOutline),
          [styles.deepPinkOutlineBtn]: Boolean(deepPinkOutline),
          [props?.props?.className!]: true,
        })}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
