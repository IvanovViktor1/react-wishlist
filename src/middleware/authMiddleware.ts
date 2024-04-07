import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { supabase } from "..";
import { logout, setSession } from "../store/reducers/authSlice";

export const authMiddleware: Middleware<{}, RootState> =
  (store) => (next) => async (action) => {
    console.log(action);
    // Вызывайте функцию next сразу, чтобы не блокировать поток действий
    next(action);

    // Проверка аутентификации пользователя
    const currentSession = (await supabase.auth.getSession()).data.session;
    const currentUser = (await supabase.auth.getUser()).data.user;

    if (currentSession && currentUser) {
      // Если пользователь аутентифицирован, сохраняем его данные в состояние
      store.dispatch(
        setSession({ session: currentSession, user: currentUser })
      );
    } else {
      // Если нет сессии или пользователя, очищаем данные пользователя в состоянии
      store.dispatch(logout());
    }
  };
// export const authMiddleware: Middleware<{}, RootState> =
//   (store) => (next) => (action) => {
//     console.log("Auth Middleware triggered:", action);
//     next(action);
//   };
