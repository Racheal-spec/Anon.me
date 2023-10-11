import { InputProp } from "@/app/Types/global";
import React, { FC } from "react";
import style from "./input.module.css";
import { useForm } from "react-hook-form";
import {
  UserSchema,
  UserSchemaType,
} from "@/app/services/validations/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";

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
      // {...register(inputname ?? "")}
      {...props}
      value={value}
      // onChange={onChange}
    />
  );
};

export default InputField;
