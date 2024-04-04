import React, { FC, useState } from "react";
import styles from "./lists.module.scss";
import FilterBlock from "./filter";
import MainBlock from "./mainBlock/mainBlock";
import { Layout } from "../layout";
const Lists: FC = () => {
  return (
    <Layout>
      <div className={styles.mainLists}>
        <MainBlock />
      </div>
    </Layout>
  );
};

export default Lists;
