import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../index";
import { IUser } from "../models/IUser";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { url } from "inspector";

export type TUserMetadata = {
  name: string;
  phone: number;
};

export type TAuthData = {
  email: string;
  password: string;
};

export type TUser = {
  id: number;
  name: string;
  phone: number | null;
  user_uuid: string;
  email: string;
};

export const sessionApi = createApi({
  reducerPath: "sessionApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getAllUsers: builder.query<TUser[], void>({
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
    getUserPhonNumbers: builder.query<number[], void>({
      queryFn: async (): Promise<{ data: number[] } | any> => {
        const { data, error } = await supabase.from("users").select("phone");

        if (error) {
          throw { error };
        }
        if (data) {
          return { data: data.map((d) => d.phone) };
        }
      },
    }),
    getUserEmails: builder.query<string[], void>({
      queryFn: async (): Promise<{ data: string[] } | any> => {
        const { data, error } = await supabase.from("users").select("email");
        if (error) {
          throw { error };
        }
        if (data) {
          return { data: data.map((d) => d.email) };
        }
      },
    }),
    getUserInfoById: builder.query<TUser | null, number>({
      queryFn: async (id: number) => {
        let retries = 5;
        while (retries > 0) {
          if (typeof id !== "number") {
            console.warn("id is not a string, retrying...");
            await new Promise((resolve, reject) => {
              setTimeout(resolve, 1000);
            });
            retries--;
            continue;
          }

          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", id)
            .order("id", { ascending: true });
          if (error) {
            console.error(error);
            throw { error };
          }

          return { data: data[0] };
        }
        throw Error("Failed to get lists after 3 retries");
      },
    }),
    getUserInfoByUuid: builder.query<TUser | null, string>({
      queryFn: async (user_uuid: string) => {
        let retries = 5;
        while (retries > 0) {
          if (typeof user_uuid !== "string") {
            console.warn("user_uuid is not a string, retrying...");
            await new Promise((resolve, reject) => {
              setTimeout(resolve, 1000);
            });
            retries--;
            continue;
          }

          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("user_uuid", user_uuid)
            .order("id", { ascending: true });
          if (error) {
            console.error(error);
            throw { error };
          }

          return { data: data[0] };
        }
        throw Error("Failed to get lists after 3 retries");
      },
    }),
  }),
});
