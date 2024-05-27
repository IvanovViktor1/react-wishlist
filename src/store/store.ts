import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import wishReducer from "./reducers/wishsSlice";
import sortAndFilterReducer from "./reducers/sortAndFilterSlice";
import { sessionApi } from "../services/SessionService";
import { wishlistApi } from "../services/ListService";
import { wishApi } from "../services/WishService";
import { frendsApi } from "../services/FrendService";

export const rootReducer = combineReducers({
  userReducer,
  sortAndFilterReducer,
  wishReducer,
  [sessionApi.reducerPath]: sessionApi.reducer,
  [frendsApi.reducerPath]: frendsApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [wishApi.reducerPath]: wishApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefauleMiddleware) =>
      getDefauleMiddleware()
        .concat(sessionApi.middleware)
        .concat(frendsApi.middleware)
        .concat(wishlistApi.middleware)
        .concat(wishApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
