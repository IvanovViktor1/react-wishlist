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
  date_of_creation: string;
  title: string;
  image_url: string | null;
  category_id: number;
};

export type TNewWish = {
  description: string | null;
  hidden: boolean;
  id_list: number;
  link: string | null;
  price: number | null;
  title: string;
  image_url: string | null;
  category_id: number;
};

export type TWishsRequestData = {
  id: number;
  sortByDate: boolean; // по дате
  sortByHidden: boolean; // сначала скрытые от других
  sortValue: boolean; // по дате
  categories: number[];
};
export type TWishsRequestData2 = {
  categories: number[];
  listIds: number[];
  sortByDate: boolean;
  sortByHidden: boolean;
  sortByPrice: boolean;
  ascending: boolean;
};

export const wishApi = createApi({
  reducerPath: "wishApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vxrcktkkwrusbwueauis.supabase.co",
  }),
  endpoints: (builder) => ({
    getAllWishsInCategories: builder.query<TWish[], TWishsRequestData2>({
      queryFn: async (wishsRequestData) => {
        let query = supabase.from("wishs").select("*");

        if (wishsRequestData.categories.length > 0) {
          query = query.in("category_id", wishsRequestData.categories);
        }

        if (wishsRequestData.listIds.length > 0) {
          query = query.in(" id_list", wishsRequestData.listIds);
        }

        if (wishsRequestData.sortByDate) {
          query = query.order("date_of_creation", {
            ascending: wishsRequestData.ascending,
          });
        }

        if (wishsRequestData.sortByPrice) {
          query = query.order("price", {
            ascending: wishsRequestData.ascending,
          });
        }

        if (wishsRequestData.sortByHidden) {
          query = query.order("hidden", {
            ascending: wishsRequestData.ascending,
          });
        }

        const { data, error } = await query;
        if (error) {
          console.error("Ошибка при запросе к Supabase:", error);
          throw { error };
        }

        return { data };
      },
    }),
    // ____________________________
    getAllWishs: builder.query<TWish[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("wishs")
          .select("*")
          .order("date_of_creation", { ascending: false });
        // .order("id", { ascending: true });
        if (error) {
          throw { error };
        }

        return { data };
      },
    }),
    // ---------------------------------------------

    getWishsByListId: builder.query<TWish[] | null, TWishsRequestData>({
      queryFn: async (wishsRequestData) => {
        let query = supabase
          .from("wishs")
          .select("*")
          // .in(
          //   "category_id",
          //   wishsRequestData.categories
          // )
          .eq("id_list", wishsRequestData.id)
          .order(
            `${wishsRequestData.sortByHidden ? "hidden" : "date_of_creation"}`,
            { ascending: wishsRequestData.sortValue }
          );

        if (wishsRequestData.categories?.length > 0) {
          query = query.in("category_id", wishsRequestData.categories);
        }
        const { data, error } = await query;
        if (error) {
          console.error("Ошибка при запросе к Supabase:", error);
          throw { error };
        }

        return { data };
      },
    }),

    // ---------------------------------------------
    getWishById: builder.query<TWish | null, number>({
      queryFn: async (id: number) => {
        const { data, error } = await supabase
          .from("wishs")
          .select("*")
          .eq("id", id)
          .order("date_of_creation", { ascending: false });
        if (error) {
          throw { error };
        }
        return { data: data[0] };
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
              image_url: newWish.image_url,
              category_id: newWish.category_id,
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
            image_url: updatedWish.image_url,
            category_id: updatedWish.category_id,
          })
          .eq("id", updatedWish.id)
          .select();
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    editWishVisible: builder.mutation<TWish[], TWish>({
      queryFn: async (updatedWish) => {
        const { data, error } = await supabase
          .from("wishs")
          .update({
            hidden: updatedWish.hidden,
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
