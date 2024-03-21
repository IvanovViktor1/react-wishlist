import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
  description: string | null;
  hidden: boolean;
  name: string;
  user_uuid: string;
};

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vxrcktkkwrusbwueauis.supabase.co",
  }),
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
    getListsByUserId: builder.query<TList[] | null, string>({
      queryFn: async (user_uuid: string) => {
        const { data, error } = await supabase
          .from("lists")
          .select("*")
          .eq("user_uuid", user_uuid)
          .order("id", { ascending: true });
        if (error) {
          throw { error };
        }

        return { data };
      },
    }),
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
              user_uuid: newList.user_uuid,
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
