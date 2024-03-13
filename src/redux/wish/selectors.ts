import { RootState } from "../store";
import { TWish } from "./types";

export const wishState = (state: RootState) => state.wishSlice;

export const getWishsById = (list_id: number) => (state: RootState) =>
  state.wishSlice.wishs?.filter((wish) => wish.id_list === list_id) as
    | TWish[]
    | null;
