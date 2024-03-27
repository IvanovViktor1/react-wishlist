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

export interface IResponseRegister {
  user: User | null;
  session: Session | null;
  error: AuthError | null | string;
}

export type TCustomRegister = {
  email: string;
  password: string;
  name: string;
  phone: number;
};
export const sessionApi = createApi({
  reducerPath: "sessionApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://vxrcktkkwrusbwueauis.supabase.co",
  // }),
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      queryFn: async (userData: TAuthData) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userData.email,
          password: userData.password,
        });
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    getUserSession: builder.query<Session, void>({
      queryFn: async (): Promise<{ data: Session } | any> => {
        const { data, error } = await supabase.auth.getSession();

        const session = data.session;

        if (error) {
          throw { error };
        }
        if (session) {
          return { data: session };
        }
      },
    }),
    customRegister: builder.mutation<IResponseRegister, TCustomRegister>({
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

        try {
          return { data };
        } catch (error) {
          throw { error };
        }
      },
    }),
  }),
});
