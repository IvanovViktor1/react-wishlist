import React, { FC } from "react";
import styles from "./lists.module.scss";
import FilterList from "./filter";
import MainBlock from "./mainBlock/mainBlock";
const Lists: FC = () => {
  return (
    <div className={styles.mainLists}>
      <FilterList />
      <MainBlock />
    </div>
  );
};

export default Lists;
