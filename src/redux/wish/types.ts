import { Status } from "../types";

export interface WishSliceState {
  wishs: TWish[] | null;
  status: Status;
}

export type TWish = {
  description: string | null;
  hidden: boolean;
  id: number;
  id_list: number;
  link: string | null;
  price: string | null;
  title: string;
};
