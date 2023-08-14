import { InputProp } from "@/app/Types/global";
import React, { FC } from "react";
import style from "./input.module.css";

const InputField: FC<InputProp> = ({
  className,
  placeholder,
  type,
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
