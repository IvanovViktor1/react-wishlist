import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status } from "../types";
import { SessionInfo, TUser, UserSliceState } from "./types";
import {
  fetchUsers,
  getCurrentUser,
  signInUser,
  signUpUser,
} from "./asyncActions";
import { AuthError, User } from "@supabase/supabase-js";

const initialState: UserSliceState = {
  sessionInfo: null,
  status: Status.LOADING,
  users: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSessionInfo(state, action: PayloadAction<SessionInfo>) {
      state.sessionInfo = action.payload;
    },
    userExit(state) {
      state.sessionInfo = null;
    },
  },
  extraReducers: (builder) => {
    //signUp__________________________________________
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      const userData = action.payload as SessionInfo;

      state.sessionInfo = {
        user_id: userData.user_id,
        user_email: userData.user_email,
      };
      state.status = Status.SUCCESS;
    });
    builder.addCase(signUpUser.pending, (state, action) => {
      state.status = Status.LOADING;
      state.sessionInfo = null;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.status = Status.ERROR;

      state.sessionInfo = null;
    });
    //signIn__________________________________________
    builder.addCase(signInUser.fulfilled, (state, action) => {
      const userData = action.payload as User;

      state.sessionInfo = {
        user_email: userData.email as string,
        user_id: userData.id,
      };
      state.status = Status.SUCCESS;
    });
    builder.addCase(signInUser.pending, (state, action) => {
      state.status = Status.LOADING;
      state.sessionInfo = null;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.status = Status.ERROR;

      state.sessionInfo = null;
    });
    //fetchUsers________________________________________
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const userData = action.payload as TUser;

      state.users = userData;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.users = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.users = [];
    });
    //getCurrentUser________________________________________
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      const userData = action.payload as User;

      state.sessionInfo = {
        user_id: userData.id as string,
        user_email: userData.email as string,
      };
      state.status = Status.SUCCESS;
    });
    builder.addCase(getCurrentUser.pending, (state, action) => {
      state.sessionInfo = null;
      state.status = Status.LOADING;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.sessionInfo = null;
      state.status = Status.ERROR;
    });
  },
});

export const { setSessionInfo, userExit } = userSlice.actions;

export default userSlice.reducer;
