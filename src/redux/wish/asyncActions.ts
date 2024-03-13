import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../..";
import { TWish } from "./types";

type TWhishQuery = Omit<TWish, "id">;

export const addWish = createAsyncThunk("wish/add", async (id_list: number) => {
  const { data, error } = await supabase
    .from("wishs")
    .insert([
      {
        description: "Описание",
        hidden: false,
        id_list,
        link: "Ссылка",
        price: "Стоимость",
        title: "Название",
      },
    ])
    .select();
  try {
    if (data) {
      const newData = data[0];
      return newData;
    }
  } catch (err) {
    console.log(error);
  }
});

export const editWish = createAsyncThunk("wish/edit", async (wish: TWish) => {
  const { description, hidden, id, id_list, link, price, title } = wish;

  const { data, error } = await supabase
    .from("wishs")
    .update({ description, hidden, link, price, title })
    .eq("id", id)
    .select();

  try {
    if (data) {
      const newData = data[0];
      return newData;
    }
  } catch (err) {
    console.log(error);
  }
});

export const getWishs = createAsyncThunk("wish/getWishs", async () => {
  const { data: wishs, error } = await supabase.from("wishs").select("*");

  try {
    if (wishs) {
      return wishs;
    }
  } catch (err) {
    console.log(error);
  }
});

// export const getWishListById = createAsyncThunk(
//   "wish/getWishs",
//   async (list_id: number) => {
//     const { data: wishs, error } = await supabase
//       .from("wishs")
//       .select("*")
//       .eq("id_list", list_id);

//     try {
//       if (wishs) {
//         return wishs;
//       }
//     } catch (err) {
//       console.log(error);
//     }
//   }
// );
