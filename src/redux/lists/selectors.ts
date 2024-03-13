import { RootState } from "../store";

export const listsState = (state: RootState) => state.listSlice.lists;
export const listsStatusState = (state: RootState) => state.listSlice.status;
