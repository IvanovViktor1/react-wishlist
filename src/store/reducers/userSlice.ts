import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { AuthError, Session, User } from "@supabase/supabase-js";
import {
  IResponseRegister,
  TResponseCurrentUserInfo,
  TUser,
  sessionApi,
} from "../../services/SessionService";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type ISession = {
  user: User | null;
  session: Session | null;
};

interface UserState {
  user: TUser | null;
  session: Session | null;
  isLoading: boolean;
  error: string | FetchBaseQueryError | AuthError | null | undefined;
}

const initialState: UserState = {
  user: null,
  session: null,
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    newSessionInfo: (state, action: PayloadAction<Session>) => {
      state.session = action.payload;
    },

    exitUser: (state) => {
      state.session = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      // _________________________________
      // ______________signIn_____________
      // _________________________________
      sessionApi.endpoints.signIn.matchFulfilled,
      (state, action: PayloadAction<ISession>) => {
        state.session = action.payload.session;
        state.error = "";
      }
    );
    builder.addMatcher(
      sessionApi.endpoints.signIn.matchRejected,
      (state, action) => {
        state.session = null;
        state.error = action.error.message;
      }
    );
    // _________________________________
    // _________getUserSession__________
    // _________________________________
    builder.addMatcher(
      sessionApi.endpoints.getCurrentUserInfo.matchFulfilled,
      (state, action: PayloadAction<TResponseCurrentUserInfo>) => {
        state.isLoading = false;
        if (action.payload) {
          state.session = action.payload.session;
          state.user = action.payload.user;
        } else {
          console.log("Session not found");
          state.session = null;
          state.user = null;
        }
      }
    );
    builder.addMatcher(
      sessionApi.endpoints.getCurrentUserInfo.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.session = null;
        state.user = null;
        state.error = action.error?.message || "An unknown error occurred";
      }
    );
    // _________________________________
    // __________customRegister_________
    // _________________________________
    builder.addMatcher(
      sessionApi.endpoints.customRegister.matchFulfilled,
      (state, action: PayloadAction<IResponseRegister>) => {
        state.isLoading = false;
        if (action.payload) {
          state.session = action.payload.session;
          state.user = action.payload.user;
          state.error = "";
        } else {
          console.log("Register data not found");
          state.session = null;
          state.user = null;
        }
      }
    );
    builder.addMatcher(
      sessionApi.endpoints.customRegister.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.session = null;
        state.user = null;
        state.error = action.error?.message || "An unknown error occurred";
      }
    );
  },
});

export const { newSessionInfo, exitUser } = userSlice.actions;

export default userSlice.reducer;
