import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import { sessionApi } from "../services/SessionService";
import { wishlistApi } from "../services/ListService";
import { wishApi } from "../services/WishService";
import { frendsApi } from "../services/FrendService";

export const rootReducer = combineReducers({
  userReducer,
  [sessionApi.reducerPath]: sessionApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [wishApi.reducerPath]: wishApi.reducer,
  [frendsApi.reducerPath]: frendsApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefauleMiddleware) =>
      getDefauleMiddleware()
        .concat(sessionApi.middleware)
        .concat(wishlistApi.middleware)
        .concat(wishApi.middleware)
        .concat(frendsApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
