import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Paths } from "./paths";
import Home from "./pages/home";
import List from "./pages/list";
import "./index.css";
import { ConfigProvider, theme } from "antd";
import { createClient } from "@supabase/supabase-js";
import Login from "./components/authentication/Login";
import { Database } from "./database/schema";
import { setupStore } from "./store/store";
import RegisterFragments from "./components/authentication/registerFragments";
import Frends from "./pages/frends";
import Lists from "./components/lists";

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
    element: <Lists />,
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
    path: Paths.frends,
    element: <Frends />,
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
