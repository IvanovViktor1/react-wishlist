import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../index";
import { IUser } from "../models/IUser";

export type TWish = {
  description: string | null;
  hidden: boolean;
  id: number;
  id_list: number;
  link: string | null;
  price: number | null;
  title: string;
};

export type TNewWish = {
  description: string | null;
  hidden: boolean;
  id_list: number;
  link: string | null;
  price: number | null;
  title: string;
};

export const wishApi = createApi({
  reducerPath: "wishApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vxrcktkkwrusbwueauis.supabase.co",
  }),
  endpoints: (builder) => ({
    getAllWishs: builder.query<TWish[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("wishs")
          .select("*")
          .order("id", { ascending: true });
        if (error) {
          throw { error };
        }

        return { data };
      },
    }),
    getWishsByListId: builder.query<TWish[] | null, number>({
      queryFn: async (id: number) => {
        const { data, error } = await supabase
          .from("wishs")
          .select("*")
          .eq("id_list", id)
          .order("id", { ascending: true });
        if (error) {
          throw { error };
        }

        return { data };
      },
    }),
    getWishById: builder.query<TWish[] | null, number>({
      queryFn: async (id: number) => {
        const { data, error } = await supabase
          .from("wishs")
          .select("*")
          .eq("id", id)
          .order("id", { ascending: true });
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    addNewWish: builder.mutation<TWish[], TNewWish>({
      queryFn: async (newWish) => {
        const { data, error } = await supabase
          .from("wishs")
          .insert([
            {
              description: newWish.description,
              hidden: newWish.hidden,
              id_list: newWish.id_list,
              link: newWish.link,
              price: newWish.price,
              title: newWish.title,
            },
          ])
          .select();
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    editWish: builder.mutation<TWish[], TWish>({
      queryFn: async (updatedWish) => {
        const { data, error } = await supabase
          .from("wishs")
          .update({
            description: updatedWish.description,
            hidden: updatedWish.hidden,
            id_list: updatedWish.id_list,
            link: updatedWish.link,
            price: updatedWish.price,
            title: updatedWish.title,
          })
          .eq("id", updatedWish.id)
          .select();
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    removeWish: builder.mutation<TWish[], number>({
      queryFn: async (id: number) => {
        const { data, error } = await supabase
          .from("wishs")
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
