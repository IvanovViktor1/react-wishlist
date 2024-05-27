import React from "react";
import styles from "./filterBlock.module.scss";
import { SettingOutlined } from "@ant-design/icons";
const FilterBlock = () => {
  return (
    <div className={styles.settingsLists}>
      <div className={styles.btnOpen}>
        <SettingOutlined className={styles.btnOpen} />
        Настройки
      </div>
    </div>
  );
};

export default FilterBlock;
