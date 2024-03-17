import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../..";
import { AppDispatch } from "../store";
import { userSlice } from "./userSlice";

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.usersFetching());
//     const response = await supabase
//       .from("users")
//       .select("*")
//       .order("id", { ascending: true });

//     const { data } = response;
//     dispatch(userSlice.actions.usersFetchingSuccess(data));
//   } catch (e) {
//     if (e instanceof Error) {
//       dispatch(userSlice.actions.usersFetchingError(JSON.stringify(e.message)));
//     }
//   }
// };

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkApi) => {
    try {
      const query = supabase
        .from("users")
        .select("*")
        .order("id", { ascending: true });
      const { data } = await query!;
      return data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkApi.rejectWithValue(e.message);
      }
    }
  }
);
