import {
  createApi,
  fetchBaseQuery,
  retry,
  skipToken,
} from "@reduxjs/toolkit/query/react";
import { supabase } from "../index";
import { IUser } from "../models/IUser";

export type TListsRequestData = {
  user_id: number;
  sortByDate: boolean; // по дате
  sortByHidden: boolean; // сначала скрытые от других
  sortValue: boolean; // по дате
};

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
          // .order("id", { ascending: true });
          .order("date_of_creation", { ascending: false });
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
    //________________________________________________________________
    //________________________________________________________________
    //________________________________________________________________
    //________________________________________________________________
    getListsByUserId: builder.query<TList[] | null, TListsRequestData>({
      queryFn: async (listsRequestData) => {
        let retries = 5;
        while (retries > 0) {
          if (typeof listsRequestData.user_id !== "number") {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            retries--;
            continue;
          }
          const { data, error } = await supabase
            .from("lists")
            .select("*")
            .eq("user_id", listsRequestData.user_id)
            .order(
              `${
                listsRequestData.sortByHidden ? "hidden" : "date_of_creation"
              }`,
              { ascending: listsRequestData.sortValue }
            );

          if (error) {
            throw new Error(error.message);
          }
          return { data };
        }
        throw Error("Failed to get lists after 5 retries");
      },
    }),
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
