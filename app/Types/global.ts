import { ReactNode } from "react";
import { UserProp } from "./user";

export type CardProp = {
  children: ReactNode;
  className: string;
};
export type InputProp = {
  className: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  size: string;
  variant: { control: string };
};
export type modeProp = {
  mode: string;
};
export type APIProp = {
  url: string;
  method: string;
  body?: {};
  json: boolean;
};
