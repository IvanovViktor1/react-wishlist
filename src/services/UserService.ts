import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../index";
import { IUser } from "../models/IUser";

export type TNewUser = Omit<IUser, "id">;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vxrcktkkwrusbwueauis.supabase.co",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          throw { error };
        }

        return { data };
      },
    }),
    addNewUsers: builder.mutation<IUser[], TNewUser>({
      queryFn: async (newUser) => {
        const { data, error } = await supabase
          .from("users")
          .insert([
            {
              name: newUser.name,
              phone: newUser.phone,
              user_uuid: newUser.user_uuid,
            },
          ])
          .select();

        if (error) {
          throw { error };
        }

        return { data };
      },
    }),
  }),
});
