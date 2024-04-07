import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import authSlice from "./reducers/authSlice";
import { sessionApi } from "../services/SessionService";
import { wishlistApi } from "../services/ListService";
import { wishApi } from "../services/WishService";
import { frendsApi } from "../services/FrendService";
import { authMiddleware } from "../middleware/authMiddleware";

export const rootReducer = combineReducers({
  authSlice,
  [authApi.reducerPath]: authApi.reducer,
  [sessionApi.reducerPath]: sessionApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [wishApi.reducerPath]: wishApi.reducer,
  [frendsApi.reducerPath]: frendsApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authMiddleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
