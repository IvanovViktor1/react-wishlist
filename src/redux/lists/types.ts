import { Status } from "../types";

export interface ListSliceState {
  lists: TList[] | null;
  status: Status;
}

export type TList = {
  description: string | null;
  hidden: boolean;
  id: number;
  name: string;
  user_uuid: string;
  date_of_creation: string;
};
