import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { fetchUsers } from "./ActionCreators";

interface UserState {
  users: IUser[] | null;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    usersFetching(state) {},
    usersFetchingSuccess(state, action: PayloadAction<IUser[] | null>) {},
    usersFetchingError(state, action: PayloadAction<string>) {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload as IUser[];
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.users = [];
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.users = [];
      state.error = action.payload as string;
    });
  },
});

export default userSlice.reducer;
