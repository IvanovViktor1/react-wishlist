import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status } from "../types";
import { TWish, WishSliceState } from "./types";
import { addWish, editWish, getWishs } from "./asyncActions";

const initialState: WishSliceState = {
  wishs: [],
  status: Status.LOADING,
};

const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //---------------------
    //------addWish--------
    //---------------------
    builder.addCase(addWish.fulfilled, (state, action) => {
      state.wishs?.push(action.payload as TWish);
      state.status = Status.SUCCESS;
    });
    builder.addCase(addWish.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(addWish.rejected, (state) => {
      state.status = Status.ERROR;
    });

    //---------------------
    //-----editWish--------
    //---------------------
    builder.addCase(editWish.fulfilled, (state, action) => {
      const updatedWish = action.payload as TWish;
      const findIndexWishFromState = state.wishs?.findIndex(
        (wish) => wish.id === updatedWish.id
      ) as number;
      if (state.wishs) {
        state.wishs[findIndexWishFromState] = updatedWish;
      }
      state.status = Status.SUCCESS;
    });
    builder.addCase(editWish.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(editWish.rejected, (state) => {
      state.status = Status.ERROR;
    });

    //---------------------
    //------getList--------
    //---------------------
    builder.addCase(getWishs.fulfilled, (state, action) => {
      state.wishs = action.payload as TWish[];
      state.status = Status.SUCCESS;
    });
    builder.addCase(getWishs.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(getWishs.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export default wishSlice.reducer;
