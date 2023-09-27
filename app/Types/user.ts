export type AuthorProp = {
  id: string;
  createdAt: Date;
  anonname: string;
  password: string;
  isAdmin: boolean;
  uniqueid: string;
  photo: string | null;
};
export interface UserProp {
  data: AuthorProp;
}
export type eventType = {
  onClick: (
    e: React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLElement>
  ) => void;
};

export type userType = {
  user: () => UserProp;
};
