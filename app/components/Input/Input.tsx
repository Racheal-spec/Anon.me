import { InputProp } from "@/app/Types/global";
import React, { FC } from "react";

const Input: FC<InputProp> = ({ className, ...props }) => {
  return <input className={className} {...props} />;
};

export default Input;
