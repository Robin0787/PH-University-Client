import { TUserRole } from "./userRole.types";

export type TUser = {
  userId: string;
  role: TUserRole;
  iat: number;
  exp: number;
};
