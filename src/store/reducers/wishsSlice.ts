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
import { TWish, wishApi } from "../../services/WishService";
import { TList, wishlistApi } from "../../services/ListService";

interface WishsState {
  wishs: TWish[];
  lists: TList[];
  isLoading: boolean;
  // error: string | FetchBaseQueryError | AuthError | null | undefined;
}

const initialState: WishsState = {
  wishs: [],
  lists: [],
  isLoading: false,
  // error: "",
};

export const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // _________________________________
    // ______________wishs_____________
    // _________________________________
    builder.addMatcher(
      wishApi.endpoints.getAllWishsInCategories.matchFulfilled,
      (state, action: PayloadAction<TWish[]>) => {
        state.wishs = action.payload;
      }
    );

    builder.addMatcher(
      sessionApi.endpoints.signIn.matchRejected,
      (state, action) => {
        state.wishs = [];
      }
    );
    // _________________________________
    // _________lists__________
    // _________________________________
    builder.addMatcher(
      wishlistApi.endpoints.getListsByUserId.matchFulfilled,
      (state, action: PayloadAction<TList[] | null>) => {
        if (action.payload) {
          state.lists = action.payload;
        } else {
          state.lists = [];
        }
      }
    );
    builder.addMatcher(
      wishlistApi.endpoints.getListsByUserId.matchRejected,
      (state, action) => {
        state.lists = [];
      }
    );
  },
});

export const {} = wishSlice.actions;

export default wishSlice.reducer;
