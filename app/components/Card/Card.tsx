import { CardProp } from "@/app/Types/global";
import React, { FC } from "react";

const Card: FC<CardProp> = ({ children, className }) => {
  return (
    <div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Card;
