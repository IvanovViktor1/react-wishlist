import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../index";
import { Session } from "@supabase/supabase-js";

export type TUserMetadata = {
  name: string;
  phone: number;
};

export type TAuthData = {
  email: string;
  password: string;
};

export interface IResponseRegister {
  session: Session;
  dbUser: TUser;
}

export type TUser = {
  id: number;
  name: string;
  phone: number | null;
  user_uuid: string;
  email: string;
};

export type TCustomRegister = {
  email: string;
  password: string;
  name: string;
  phone: number;
};

export type TCurrentResponse = {
  session: Session;
  dbUser: TUser;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    login: builder.mutation<TCurrentResponse, TAuthData>({
      queryFn: async (
        userData: TAuthData
      ): Promise<{ data: TCurrentResponse } | any> => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userData.email,
          password: userData.password,
        });

        if (error) {
          console.log(error);
        }
        if (data && data.user) {
          try {
            const { data: dbData, error } = await supabase
              .from("users")
              .select("*")
              .eq("user_uuid", data.user.id)
              .order("id", { ascending: true });

            if (dbData) {
              return { session: data.session, dbUser: dbData[0] };
            }
          } catch (error) {
            console.log(error);
          }
        }
      },
    }),
    current: builder.query<TCurrentResponse | null, void>({
      queryFn: async (): Promise<{ data: TCurrentResponse } | any> => {
        const { data, error } = await supabase.auth.getSession();
        const session = data.session;

        if (session) {
          const { data: dbData, error } = await supabase
            .from("users")
            .select("*")
            .eq("user_uuid", session.user.id)
            .order("id", { ascending: true });

          if (dbData) {
            console.log(dbData[0]);
            return { session: session, dbData: dbData[0] };
          }
        }
      },
    }),

    register: builder.mutation<IResponseRegister, TCustomRegister>({
      queryFn: async (newUser): Promise<{ data: IResponseRegister } | any> => {
        const { data, error } = await supabase.auth.signUp({
          email: newUser.email,
          password: newUser.password,
          options: {
            data: {
              name: newUser.name,
              phone: newUser.phone,
            } as TUserMetadata,
          },
        });

        if (error) {
          return error;
        }

        if (data.user) {
          try {
            const { data: userData, error: insertError } = await supabase
              .from("users")
              .insert([
                {
                  name: newUser.name,
                  phone: newUser.phone,
                  user_uuid: data.user.id,
                  email: newUser.email,
                },
              ])
              .select();

            if (userData) {
              return {
                session: data.session,
                dbUser: userData[0],
              };
            }
          } catch (error) {
            console.log(error);
          }
        }
      },
    }),
  }),
});

export const { useCurrentQuery, useRegisterMutation, useLoginMutation } =
  authApi;

export const {
  endpoints: { login, register, current: currentUser },
} = authApi;
