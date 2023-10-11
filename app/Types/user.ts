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
  onClick: (
    e: React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLElement>
  ) => void;
};

export type userType = {
  user: () => UserProp;
};
