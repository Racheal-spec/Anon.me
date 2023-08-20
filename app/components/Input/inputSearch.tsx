import { InputProp } from "@/app/Types/global";
import React, { FC } from "react";
import style from "./input.module.css";

const InputSearch: FC<Partial<InputProp>> = ({
  className,
  placeholder,
  type,
  ...props
}) => {
  return (
    <input
      className={style.InputSearch}
      type={type}
      {...props}
      placeholder={placeholder}
    />
  );
};

export default InputSearch;
