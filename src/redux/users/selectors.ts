import { RootState } from "../store";

export const getCurrentUser = (state: RootState) =>
  state.userSlice.users?.find(
    (user) => user.user_uuid === state.userSlice.sessionInfo?.user_id
  );

export const getUsers = (state: RootState) => state.userSlice.users;

export const getAuthStatus = (state: RootState) => state.userSlice.status;
