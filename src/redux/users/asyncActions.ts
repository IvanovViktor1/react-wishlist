import { createAsyncThunk } from "@reduxjs/toolkit";
import { SessionInfo, TSignIn, TSignUp } from "./types";
import { supabase } from "../..";

export const signUpUser = createAsyncThunk(
  "user/sigup",
  async (userData: TSignUp) => {
    const queryRegister = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    try {
      if (
        queryRegister.data &&
        queryRegister.data.user &&
        queryRegister.data.user.id &&
        queryRegister.data.user.email
      ) {
        const nSessionInfo = {
          user_id: queryRegister.data.user.id,
          user_email: queryRegister.data.user.email,
        };

        const querySetInfoFromDB = await supabase
          .from("users")
          .insert([
            {
              name: userData.name,
              phone: userData.phone,
              user_uuid: queryRegister.data.user.id,
            },
          ])
          .select();

        if (querySetInfoFromDB.data) {
          try {
            return nSessionInfo as SessionInfo;
          } catch (err) {
            console.log(err);
            console.log(querySetInfoFromDB.error);
          }
        }
      }
    } catch (err) {
      if (queryRegister.error) {
        return queryRegister.error;
      }
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/signin",
  async (userData: TSignIn) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });

    try {
      if (data && data.session) {
        return data.session?.user;
      }
    } catch (err) {
      return error?.message;
    }
  }
);

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const query = supabase
    .from("users")
    .select("*")
    .order("id", { ascending: true });
  const { data } = await query!;
  return data;
});

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUsers",
  async () => {
    const { data, error } = await supabase.auth.getSession();
    try {
      if (data && data.session && data.session.user) {
        return data.session.user;
      }
    } catch (err) {
      console.log(error);
    }
  }
);
