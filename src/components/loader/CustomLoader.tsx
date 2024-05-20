import { Spin } from "antd";
import React, { FC } from "react";
import styles from "./loader.module.scss";

interface ICustomLoader {
  text?: string;
}

const CustomLoader: FC<ICustomLoader> = ({ text = "Загрузка..." }) => {
  const inlineStyle = {
    "--loading-content": `"${text}"`,
  } as React.CSSProperties;

  return <div className={styles.loader} style={inlineStyle}></div>;
};

export default CustomLoader;
