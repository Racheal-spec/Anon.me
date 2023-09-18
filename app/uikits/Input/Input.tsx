import { InputProp } from "@/app/Types/global";
import React, { FC } from "react";
import style from "./input.module.css";

const InputField: FC<Partial<InputProp>> = ({
  className,
  placeholder,
  type,
  onKeyDown,
  ...props
}) => {
  return (
    <input
      className={style.inputStyle}
      type={type}
      {...props}
      placeholder={placeholder}
    />
  );
};

export default InputField;
