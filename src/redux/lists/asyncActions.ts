import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../..";
import { TList } from "./types";

type TListQuery = Omit<TList, "id">;

export const addList = createAsyncThunk("list/add", async () => {
  const { data, error } = await supabase
    .from("lists")
    .insert([
      {
        name: "Новый лист",
        description: "Описание",
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

export const editList = createAsyncThunk("list/edit", async (list: TList) => {
  const { description, hidden, id, name, user_uuid, date_of_creation } = list;

  const { data, error } = await supabase
    .from("lists")
    .update({
      description,
      hidden,
      name,
    })
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

export const getLists = createAsyncThunk("list/getLists", async () => {
  const { data: lists, error } = await supabase.from("lists").select("*");

  try {
    if (lists) {
      return lists;
    }
  } catch (err) {
    console.log(error);
  }
});
