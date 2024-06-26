import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { supabase } from "../index";
import { IUser } from "../models/IUser";

export type TList = {
  date_of_creation: string;
  description: string | null;
  hidden: boolean;
  id: number;
  name: string;
  user_uuid: string;
};

export type TNewList = {
  description?: string | null;
  hidden?: boolean;
  name: string;
  user_id: number;
};
const baseQuery = fetchBaseQuery({
  baseUrl: "https://vxrcktkkwrusbwueauis.supabase.co",
});
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 5 });

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    getAllLists: builder.query<TList[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("lists")
          .select("*")
          .order("id", { ascending: true });
        if (error) {
          throw { error };
        }

        return { data };
      },
    }),

    //________________________________________________________________
    //________________________________________________________________
    //________________________________________________________________
    //________________________________________________________________
    //________________________________________________________________
    //________________________________________________________________
    getListsByUserId: builder.query<TList[] | null, number>({
      queryFn: async (user_id: number) => {
        let retries = 5;
        while (retries > 0) {
          if (typeof user_id !== "number") {
            console.warn("user_id is not a number, retrying...");
            await new Promise((resolve, reject) => {
              setTimeout(resolve, 1000);
            });
            retries--;
            continue;
          }

          const { data, error } = await supabase
            .from("lists")
            .select("*")
            .eq("user_id", user_id)
            .order("id", { ascending: true });
          if (error) {
            console.error(error);
            throw { error };
          }

          return { data };
        }
        throw Error("Failed to get lists after 3 retries");
      },
    }),
    //________________________________________________________________
    //________________________________________________________________
    //________________________________________________________________
    //________________________________________________________________
    getListsById: builder.query<TList[] | null, number>({
      queryFn: async (id: number) => {
        const { data, error } = await supabase
          .from("lists")
          .select("*")
          .eq("id", id)
          .order("id", { ascending: true });
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    addNewList: builder.mutation<TList[], TNewList>({
      queryFn: async (newList) => {
        const { data, error } = await supabase
          .from("lists")
          .insert([
            {
              description: newList.description,
              hidden: newList.hidden,
              name: newList.name,
              user_id: newList.user_id,
            },
          ])
          .select();
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    editList: builder.mutation<TList[], TList>({
      queryFn: async (updatedList) => {
        const { data, error } = await supabase
          .from("lists")
          .update({
            description: updatedList.description,
            hidden: updatedList.hidden,
            name: updatedList.name,
          })
          .eq("id", updatedList.id)
          .select();
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    setVisibleList: builder.mutation<TList[], TList>({
      queryFn: async (updatedList) => {
        const { data, error } = await supabase
          .from("lists")
          .update({
            hidden: updatedList.hidden,
          })
          .eq("id", updatedList.id)
          .select();
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    removeList: builder.mutation<TList[], number>({
      queryFn: async (id: number) => {
        const { data, error } = await supabase
          .from("lists")
          .delete()
          .eq("id", id)
          .select();
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
  }),
});
