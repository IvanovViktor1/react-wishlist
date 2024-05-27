import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Paths } from "./paths";
import Home from "./pages/home";
import "./index.scss";
import { ConfigProvider, theme } from "antd";
import { createClient } from "@supabase/supabase-js";
import Login from "./components/authentication/Login";
import { Database } from "./database/schema";
import { setupStore } from "./store/store";
import RegisterFragments from "./components/authentication/registerFragments";
import ListsPage from "./pages/lists";
import InformationAboutWishlists from "./pages/informationAboutWishlists";
import AllWishs from "./pages/allWishs";

export const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);
export const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Home />,
  },
  {
    path: Paths.lists,
    element: <ListsPage />,
  },
  {
    path: Paths.allWishs,
    element: <AllWishs />,
  },
  {
    path: Paths.register,
    element: <RegisterFragments />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.info,
    element: <InformationAboutWishlists />,
  },
]);

const store = setupStore();

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
