import { InputProp } from "@/app/Types/global";
import React, { FC } from "react";
import style from "./input.module.css";

const InputField: FC<Partial<InputProp>> = ({
  className,
  placeholder,
  type,
  onKeyDown,
  onChange,
  defaultValue,
  inputname,
  value,
  register,
  disabled,
  ...props
}) => {
  return (
    <input
      className={style.inputStyle}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
      {...props}
      value={value}
    />
  );
};

export default InputField;
