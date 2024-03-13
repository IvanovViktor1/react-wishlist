import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status } from "../types";
import { ListSliceState, TList } from "./types";
import { addList, editList, getLists } from "./asyncActions";

const initialState: ListSliceState = {
  lists: [],
  status: Status.LOADING,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    // addList(state, action: PayloadAction<TList>) {
    //   //   state.lists?.push(action.payload);
    //   state.lists?.push(action.payload);
    // },
    // removeList(state, action: PayloadAction<ListType>) {
    //   const newListArray = state.lists?.filter(
    //     (list) => list.id !== action.payload.id
    //   ) as ListType[];
    //   state.lists = newListArray;
    // },
  },
  extraReducers: (builder) => {
    //---------------------
    //------addList--------
    //---------------------
    builder.addCase(addList.fulfilled, (state, action) => {
      state.lists?.push(action.payload as TList);
      state.status = Status.SUCCESS;
    });
    builder.addCase(addList.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(addList.rejected, (state, action) => {
      state.status = Status.ERROR;
    });
    //---------------------
    //-----editList--------
    //---------------------
    builder.addCase(editList.fulfilled, (state, action) => {
      const updatedList = action.payload as TList;

      const findIndexListFromState = state.lists?.findIndex(
        (list) => list.id === updatedList.id
      ) as number;

      // const newLists = state.lists?.splice(
      //   findIndexListFromState,
      //   findIndexListFromState,
      //   action.payload as TList
      // );

      // if (state.lists && state.lists.length) {
      //   state.lists = newLists as TList[];
      // }

      if (state.lists) {
        state.lists[findIndexListFromState] = updatedList;
      }

      state.status = Status.SUCCESS;
    });
    builder.addCase(editList.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(editList.rejected, (state, action) => {
      state.status = Status.ERROR;
    });
    //---------------------
    //------getList--------
    //---------------------
    builder.addCase(getLists.fulfilled, (state, action) => {
      state.lists = action.payload as TList[];
      state.status = Status.SUCCESS;
    });
    builder.addCase(getLists.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(getLists.rejected, (state, action) => {
      state.status = Status.ERROR;
    });
  },
});

// export const { addList, removeList } = listSlice.actions;

export default listSlice.reducer;
