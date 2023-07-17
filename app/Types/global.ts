import { ReactNode } from "react";

export type CardProp = {
  children: ReactNode;
  className: string;
};
export type InputProp = {
  className: string;
  //   placeholder: string;
  //   value:
};
export type ButtonProp = {
  title: string;
  outline: boolean;
  primary: boolean;
  props: {
    className: string;
  };
  type: string;
  children: ReactNode;
  onMouseEnter: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export type modeProp = {
  mode: string;
};
