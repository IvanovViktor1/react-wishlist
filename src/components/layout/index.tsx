import React, { FC } from "react";
import { Layout as AntdLayout } from "antd";
import styles from "./Layout.module.scss";
import Header from "../header";
import OptionsDrawer from "../options";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.main}>
      <Header />

      {/* <AntdLayout.Content className={styles.content}> */}
      <div className={styles.content}>{children}</div>
      {/* </AntdLayout.Content> */}
    </div>
  );
};
