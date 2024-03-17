import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../index";
import { IUser } from "../models/IUser";
import { AuthError, User } from "@supabase/supabase-js";
import { url } from "inspector";

export type TRegisterData = {
  email: string;
  password: string;
};

export const sessionApi = createApi({
  reducerPath: "sessionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vxrcktkkwrusbwueauis.supabase.co",
  }),
  endpoints: (builder) => ({
    registerUserFomAuth: builder.mutation({
      queryFn: async (userData: TRegisterData) => {
        const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
        });

        if (error) {
          throw { error };
        }

        return { data };
      },
    }),
  }),
});
