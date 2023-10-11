import { InputProp } from "@/app/Types/global";
import React, { FC } from "react";
import style from "./input.module.css";

const InputSearch: FC<Partial<InputProp>> = ({
  className,
  placeholder,
  type,
  onFocus,
  onBlur,
  onClick,
  ...props
}) => {
  return (
    <input
      className={style.InputSearch}
      type={type}
      {...props}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      placeholder={placeholder}
    />
  );
};

export default InputSearch;
