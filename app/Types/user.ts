export type AuthorProp = {
  id: string;
  createdAt: Date;
  anonname: string;
  password: string;
  isAdmin: boolean;
  email: string;
  location: string;
  photo: string | null;
};
export type UserProp = {
  data: AuthorProp;
  status: string;
};
export type eventType = {
  // onClick?: (
  //   e:
  //     | React.MouseEvent<HTMLLIElement, MouseEvent>
  //     | React.MouseEvent<HTMLElement, MouseEvent>
  //     | React.MouseEvent<HTMLDivElement, MouseEvent>
  // ) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export type userType = {
  user: () => UserProp;
};
