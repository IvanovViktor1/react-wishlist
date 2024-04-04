import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../index";
import { IUser } from "../models/IUser";

export type TFrend = {
  id: number;
  user_id: number;
  owner_id: string;
};

export const frendsApi = createApi({
  reducerPath: "frendsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vxrcktkkwrusbwueauis.supabase.co",
  }),
  endpoints: (builder) => ({
    getAllFrends: builder.query<TFrend[], string>({
      queryFn: async (owner_id: string) => {
        // const { data, error } = await supabase
        //   .from("frends")
        //   .select("*")
        //   .eq("owner_id", owner_id)
        //   .order("id", { ascending: true });
        // if (error) {
        //   throw { error };
        // }
        // return { data };
        let retries = 5;
        while (retries > 0) {
          if (typeof owner_id !== "string") {
            console.warn("owner_id is not a string, retrying...");
            await new Promise((resolve, reject) => {
              setTimeout(resolve, 1000);
            });
            retries--;
            continue;
          }

          const { data, error } = await supabase
            .from("frends")
            .select("*")
            .eq("owner_id", owner_id)
            .order("id", { ascending: true });
          if (error) {
            console.error(error);
            throw { error };
          }

          return { data };
        }
        throw Error("Failed to get lists after 3 retries");
      },
      // },
    }),
    addNewFrend: builder.mutation<TFrend[], number>({
      queryFn: async (newFrendId: number) => {
        const { data, error } = await supabase
          .from("frends")
          .insert([
            {
              user_id: newFrendId,
            },
          ])
          .select();
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    removeFrend: builder.mutation<TFrend[], number>({
      queryFn: async (id: number) => {
        const { data, error } = await supabase
          .from("frends")
          .delete()
          .eq("user_id", id)
          .select();
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
  }),
});
