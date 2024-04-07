import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";
import { RootState } from "../store";
import { IResponseRegister, authApi } from "../../services/authApi";

type TResponseSession = {
  session: Session;
  user: User;
};

export type TDatabaseUser = {
  email: string;
  id: number;
  name: string;
  phone: number | null;
  user_uuid: string;
};

interface AuthState {
  dbUser: TDatabaseUser | null;
  session: Session | null;
}

const initialState: AuthState = {
  dbUser: null,
  session: null,
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<TResponseSession>) {
      state.session = action.payload.session;
    },
    logout(state) {
      state.session = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.session = action.payload.session;
        state.dbUser = action.payload.dbUser;
      })
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, action: PayloadAction<IResponseRegister>) => {
          state.dbUser = action.payload.dbUser;
          state.session = action.payload.session;
        }
      )
      .addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
        if (action.payload) {
          state.dbUser = action.payload.dbUser;
        }
      });
  },
});
export const { setSession, logout } = slice.actions;
export default slice.reducer;
export const selectUser = (state: RootState) => state.authSlice.dbUser;
