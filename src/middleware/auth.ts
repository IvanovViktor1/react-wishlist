import { createListenerMiddleware } from "@reduxjs/toolkit";
import { sessionApi } from "../services/SessionService";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: sessionApi.endpoints.signIn.matchFulfilled,
  effect: async (action, listenerApi) => {
    // listenerApi.cancelActiveListeners();
    // if (action.payload.session.) {
    //   localStorage.setItem("token", action.payload.token);
    // }
  },
});
