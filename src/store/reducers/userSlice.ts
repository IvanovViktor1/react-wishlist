import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { IResponseRegister, sessionApi } from "../../services/SessionService";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type ISession = {
  user: User | null;
  session: Session | null;
};

interface UserState {
  users: IUser[] | null;
  session: Session | null;
  isLoading: boolean;
  error: string | FetchBaseQueryError | AuthError | null | undefined;
}

const initialState: UserState = {
  users: [],
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
    builder.addMatcher(
      sessionApi.endpoints.getUserSession.matchFulfilled,
      (state, action: PayloadAction<Session>) => {
        state.isLoading = false;
        if (!action.payload) {
          console.log("Session not found");
        }
        state.session = action.payload;
      }
    );
    builder.addMatcher(
      sessionApi.endpoints.getUserSession.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.session = null;
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      sessionApi.endpoints.customRegister.matchFulfilled,
      (state, action: PayloadAction<IResponseRegister>) => {
        state.session = action.payload.session;

        state.error = "";
      }
    );
    builder.addMatcher(
      sessionApi.endpoints.customRegister.matchRejected,
      (state, action) => {
        state.session = null;

        state.error = action.error.message;
      }
    );
  },
});

export const { newSessionInfo, exitUser } = userSlice.actions;

export default userSlice.reducer;
