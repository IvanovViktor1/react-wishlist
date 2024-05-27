import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { supabase } from "../index";
import { IUser } from "../models/IUser";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { url } from "inspector";

export type TResponseCurrentUserInfo = {
  user: TUser;
  session: Session;
};

export type TUserMetadata = {
  name: string;
  phone: number;
};

export type TAuthData = {
  email: string;
  password: string;
};

export interface IResponseRegister {
  user: TUser;
  session: Session;
  error: AuthError | null | string;
}

export type TUser = {
  id: number;
  name: string;
  phone: number | null;
  user_uuid: string;
  email: string;
};

export type TRequestDataRegister = {
  email: string;
  password: string;
  name: string;
  phone: number;
};
export const sessionApi = createApi({
  reducerPath: "sessionApi",
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
    // getUserSession: builder.query<Session, void>({
    //   queryFn: async (): Promise<{ data: Session } | any> => {
    //     let retries = 3;
    //     while (retries > 0) {
    //       const { data, error } = await supabase.auth.getSession();
    //       const session = data.session;

    //       if (error) {
    //         retries++;
    //         if (retries === 3) {
    //           throw { error };
    //         }
    //       } else if (session) {
    //         return { data: session };
    //       }
    //     }
    //   },
    // }),
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
    customRegister: builder.mutation<IResponseRegister, TRequestDataRegister>({
      async queryFn(newUser, _queryApi, _extraOptions, _baseQuery) {
        try {
          const { data: signUpData, error: signUpError } =
            await supabase.auth.signUp({
              email: newUser.email,
              password: newUser.password,
              options: {
                data: {
                  name: newUser.name,
                  phone: newUser.phone,
                } as TUserMetadata,
              },
            });

          if (signUpError) {
            return {
              error: {
                status: "CUSTOM_ERROR",
                data: signUpError.message,
              } as FetchBaseQueryError,
            };
          }

          if (signUpData.user) {
            const { data: registerData, error: registerError } = await supabase
              .from("users")
              .insert([
                {
                  name: newUser.name,
                  phone: newUser.phone,
                  user_uuid: signUpData.user.id,
                  email: newUser.email,
                },
              ])
              .select();

            if (registerError) {
              return {
                error: {
                  status: "CUSTOM_ERROR",
                  data: registerError.message,
                } as FetchBaseQueryError,
              };
            }

            if (registerData) {
              return {
                data: {
                  user: registerData[0],
                  session: signUpData.session,
                } as IResponseRegister,
              };
            }
          }

          return {
            error: {
              status: "CUSTOM_ERROR",
              data: "Error in user registration",
            } as FetchBaseQueryError,
          };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              data: (error as Error).message || "An unknown error occurred",
            } as FetchBaseQueryError,
          };
        }
      },
    }),
    getCurrentUserInfo: builder.query<TResponseCurrentUserInfo, void>({
      async queryFn(arg, queryApi, extraOptions, baseQuery) {
        try {
          const { data: userData, error: errorUser } =
            await supabase.auth.getUser();
          if (errorUser) {
            return {
              error: {
                status: "CUSTOM_ERROR",
                data: errorUser.message,
              } as FetchBaseQueryError,
            };
          }

          const { data: dataSession, error: errorSession } =
            await supabase.auth.getSession();
          if (errorSession) {
            return {
              error: {
                status: "CUSTOM_ERROR",
                data: errorSession.message,
              } as FetchBaseQueryError,
            };
          }

          if (dataSession.session && userData.user) {
            const { data, error } = await supabase
              .from("users")
              .select()
              .eq("user_uuid", userData.user.id)
              .order("id", { ascending: true });
            if (error) {
              return {
                error: {
                  status: "CUSTOM_ERROR",
                  data: error.message,
                } as FetchBaseQueryError,
              };
            }

            return { data: { session: dataSession.session, user: data[0] } };
          } else {
            return {
              error: {
                status: "CUSTOM_ERROR",
                data: "No active session or user found",
              } as FetchBaseQueryError,
            };
          }
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              data: (error as Error).message || "An unknown error occurred",
            } as FetchBaseQueryError,
          };
        }
      },
    }),
  }),
});
