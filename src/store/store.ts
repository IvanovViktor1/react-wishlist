import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import { userApi } from "../services/UserService";
import { sessionApi } from "../services/SessionService";

export const rootReducer = combineReducers({
  userReducer,
  [userApi.reducerPath]: userApi.reducer,
  [sessionApi.reducerPath]: sessionApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefauleMiddleware) =>
      getDefauleMiddleware()
        .concat(userApi.middleware)
        .concat(sessionApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
