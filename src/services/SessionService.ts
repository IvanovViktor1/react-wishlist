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
export const sessionApi = createApi({
  reducerPath: "sessionApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://vxrcktkkwrusbwueauis.supabase.co",
  // }),
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
        let retries = 3;
        while (retries > 0) {
          const { data, error } = await supabase.auth.getSession();
          const session = data.session;

          if (error) {
            retries++;
            if (retries === 3) {
              throw { error };
            }
          } else if (session) {
            return { data: session };
          }
        }
      },
    }),
    getUserPhonNumbers: builder.query<number[], void>({
      queryFn: async (): Promise<{ data: number[] } | any> => {
        const { data, error } = await supabase.from("users").select("phone");

        if (error) {
          throw { error };
        }
        if (data) {
          // const newData = data.map((d) => d.phone);
          // console.log(data.map((d) => d.phone));
          return { data: data.map((d) => d.phone) };
          // return { data };
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

        if (data.user) {
          const userI = await supabase
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
          console.log(userI);
          try {
            return { data };
          } catch (error) {
            throw { error };
          }
        }
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
            console.log("поптыка");
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
    getCurrentUserInfo: builder.query<TUser | null, void>({
      queryFn: async (): Promise<{ data: Session } | any> => {
        const { data: dataSession, error: responseErrorSession } =
          await supabase.auth.getUser();

        if (responseErrorSession) {
          throw Error(responseErrorSession.message);
        }

        try {
          if (dataSession.user) {
            const { data, error } = await supabase
              .from("users")
              .select("*")
              .eq("user_uuid", dataSession.user.id)
              .order("id", { ascending: true });
            if (error) {
              console.error(error);
              throw { error };
            }
            return { data: data[0] };
          }
        } catch (error) {
          throw { error };
        }
      },
    }),
  }),
});
