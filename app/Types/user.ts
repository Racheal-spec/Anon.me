export interface UserProp {
  id: string;
  createdAt: Date;
  anonname: string;
  password: string;
  isAdmin: boolean;
  uniqueid: string;
  photo: string | null;
}
