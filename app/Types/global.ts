import { EditorProps, EditorState } from "draft-js";
import { StaticImageData } from "next/image";
import { ReactElement, ReactNode } from "react";
import { postType } from "./posts";
import { Control, FieldValues } from "react-hook-form";

export type CardProp = {
  children: ReactNode;
  className: string;
};
export type InputProp = {
  className: string;
  placeholder: string;
  value: string;
  defaultValue: string;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  type: string;
  register: () => void;
  disabled: boolean;
  inputname: string;
  props: {
    icon: JSX.Element;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};
export type ButtonProp = {
  title: string;
  outline: boolean;
  primary: boolean;
  props: {
    className: string;
  };
  rectPrimary: boolean;
  pinkOutline: boolean;
  deepPinkOutline: boolean;
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

export type StoriesProp = {
  title: string;
  tags?: string[] | string;
  status: string | JSX.Element;
  description?: string;
  date: string;
  action: ReactElement | null;
};
export type EmptyStateProp = {
  heading: string;
  description?: string;
};
export type PostLikeProp = {
  status: number | null;
  data: {
    id: string;
    userId: string;
    postId: string;
  };
  isLiked: boolean;
  count: number;
};

//===========TAGS PROPS================//

export interface TagsProp {
  id: string;
  title: string;
}

export type JWTProp = {
  id: string;
  email: string;
};

export type ComboBoxType = {
  disabled?: boolean;
  label: string;
  id: string;
  name: string;
  options: any[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>, arg: string) => void;
  control?: any;
};

export type PostFormType = {
  imagefile: string | StaticImageData;
  handleStateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categoryId: string;
  tagsstate: TagsProp[];
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
  handleselect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  titleref: React.LegacyRef<HTMLHeadingElement>;
};

export type SmallModalProp = {
  handlefunction: () => void;
  children: ReactNode;
  modalitem: postType;
};
