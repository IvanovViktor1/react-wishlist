import { AuthError, User } from "@supabase/supabase-js";
import { Status } from "../types";

export type TSignUp = {
  email: string;
  phone: number;
  name: string;
  password: string;
};

export type TSignIn = {
  email: string;
  password: string;
};

export interface UserSliceState {
  sessionInfo: SessionInfo | null;
  status: Status;
  users: TUser | null;
}

export type SessionInfo = {
  user_id: string;
  user_email: string;
};

export type TUser = {
  id: number;
  name: string;
  phone: number | null;
  user_uuid: string;
}[];
